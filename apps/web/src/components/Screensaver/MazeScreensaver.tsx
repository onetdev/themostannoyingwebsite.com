'use client';

import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from 'ogl';
import { useEffect, useRef } from 'react';

import { MAZE_24 } from './Maze/data';
import { getTextures } from './Maze/textures';

const ROTATION_DURATION = 500;
const MOVE_DURATION = 1000;
const STEP_BOB_HEIGHT = 0.04;
const TURN_CHANCE = 0.2;

type Direction = 'N' | 'S' | 'E' | 'W';
// Windows 95 3D Maze inspired raycasting screensaver
export function MazeScreensaver() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    const renderer = new Renderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0.1, 0.1, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.depthFunc(gl.LEQUAL);

    const camera = new Camera(gl, {
      fov: 75,
      near: 0.1,
      far: 100,
    });
    const scene = new Transform();

    const textures = getTextures(gl);

    // Geometry
    const geometry = new Plane(gl, {
      width: 1,
      height: 1,
    });

    const texturedVertex = `
      attribute vec3 position;
      attribute vec2 uv;

      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;

      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const texturedFragment = `
      precision highp float;

      uniform sampler2D tMap;
      varying vec2 vUv;

      void main() {
        gl_FragColor = texture2D(tMap, vUv);
      }
    `;

    function createTextureProgram(texture: Texture) {
      return new Program(gl, {
        vertex: texturedVertex,
        fragment: texturedFragment,
        uniforms: {
          tMap: { value: texture },
        },
      });
    }

    const wallProgram = createTextureProgram(textures.wall);
    const floorProgram = createTextureProgram(textures.floor);
    const ceilingProgram = createTextureProgram(textures.ceiling);

    function createWallTile(
      cellX: number,
      cellZ: number,
      direction: Direction,
    ) {
      const mesh = new Mesh(gl, {
        geometry,
        program: wallProgram,
        frustumCulled: true,
      });

      mesh.position.x = cellX;
      mesh.position.z = cellZ;

      // Direction rotation
      switch (direction) {
        case 'N':
          mesh.rotation.y = Math.PI;
          mesh.position.z -= 0.5;
          break;

        case 'S':
          mesh.rotation.y = 0;
          mesh.position.z += 0.5;
          break;

        case 'E':
          mesh.rotation.y = Math.PI / 2;
          mesh.position.x += 0.5;
          break;

        case 'W':
          mesh.rotation.y = -Math.PI / 2;
          mesh.position.x -= 0.5;
          break;
      }

      mesh.setParent(scene);
      return mesh;
    }

    function createFloorTile(cellX: number, cellZ: number) {
      const mesh = new Mesh(gl, {
        geometry,
        program: floorProgram,
        frustumCulled: true,
      });

      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = -0.5;
      mesh.position.x = cellX;
      mesh.position.z = cellZ;

      mesh.setParent(scene);
      return mesh;
    }

    function createCeilingTile(cellX: number, cellZ: number) {
      const mesh = new Mesh(gl, {
        geometry,
        program: ceilingProgram,
        frustumCulled: true,
      });

      mesh.rotation.x = Math.PI / 2;
      mesh.position.y = 0.5;
      mesh.position.x = cellX;
      mesh.position.z = cellZ;

      mesh.setParent(scene);
      return mesh;
    }

    const OFFSET_Z = MAZE_24.length / 2;
    const OFFSET_X = (MAZE_24[0]?.length ?? 0) / 2;

    const DIRS = [
      { vec: [0, -1], yaw: 0 }, // North
      { vec: [1, 0], yaw: -Math.PI / 2 }, // East
      { vec: [0, 1], yaw: Math.PI }, // South
      { vec: [-1, 0], yaw: Math.PI / 2 }, // West
    ];

    const moveState = {
      cx: 0,
      cz: 0,
      dir: 0,
      mode: 'idle' as 'idle' | 'moving' | 'rotating',
      startTime: 0,
      startRot: 0,
      targetRot: 0,
      startPos: [0, 0],
      targetPos: [0, 0],
    };

    // Initialize random position
    const emptyCells: [number, number][] = [];
    MAZE_24.forEach((row, z) => {
      row.forEach((cell, x) => {
        if (cell === 0) emptyCells.push([x, z]);
      });
    });

    if (emptyCells.length > 0) {
      const [sx, sz] =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      moveState.cx = sx;
      moveState.cz = sz;
      moveState.dir = Math.floor(Math.random() * 4);

      camera.position.set(sx - OFFSET_X + 0.5, 0, sz - OFFSET_Z + 0.5);
      camera.rotation.y = DIRS[moveState.dir].yaw;
    }

    MAZE_24.forEach((row, z) => {
      row.forEach((cell, x) => {
        const worldX = x - OFFSET_X + 0.5;
        const worldZ = z - OFFSET_Z + 0.5;

        // We only need floor and ceiling for empty places.
        if (cell === 0) {
          createFloorTile(worldX, worldZ);
          createCeilingTile(worldX, worldZ);
        } else if (cell === 1) {
          const north = MAZE_24[z - 1]?.[x];
          const south = MAZE_24[z + 1]?.[x];
          const east = MAZE_24[z]?.[x + 1];
          const west = MAZE_24[z]?.[x - 1];

          if (north === 0) createWallTile(worldX, worldZ, 'N');
          if (south === 0) createWallTile(worldX, worldZ, 'S');
          if (east === 0) createWallTile(worldX, worldZ, 'E');
          if (west === 0) createWallTile(worldX, worldZ, 'W');
        }
      });
    });

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
      });
    }

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let rafId: number;
    function update(t: number) {
      rafId = requestAnimationFrame(update);

      if (moveState.mode === 'idle') {
        const forwardDir = moveState.dir;
        const leftDir = (moveState.dir + 3) % 4;
        const rightDir = (moveState.dir + 1) % 4;
        const backDir = (moveState.dir + 2) % 4;

        const canGo = (d: number) => {
          const nx = moveState.cx + DIRS[d].vec[0];
          const nz = moveState.cz + DIRS[d].vec[1];
          return (MAZE_24[nz]?.[nx] ?? 1) === 0;
        };

        const sideOptions = [];
        if (canGo(leftDir)) sideOptions.push(leftDir);
        if (canGo(rightDir)) sideOptions.push(rightDir);

        let nextDir;
        if (canGo(forwardDir)) {
          if (sideOptions.length > 0 && Math.random() < TURN_CHANCE) {
            nextDir =
              sideOptions[Math.floor(Math.random() * sideOptions.length)];
          } else {
            nextDir = forwardDir;
          }
        } else if (sideOptions.length > 0) {
          nextDir = sideOptions[Math.floor(Math.random() * sideOptions.length)];
        } else {
          nextDir = backDir;
        }

        if (nextDir !== moveState.dir) {
          moveState.mode = 'rotating';
          moveState.startTime = t;
          moveState.startRot = camera.rotation.y;

          let targetYaw = DIRS[nextDir].yaw;
          while (targetYaw - moveState.startRot > Math.PI)
            targetYaw -= Math.PI * 2;
          while (targetYaw - moveState.startRot < -Math.PI)
            targetYaw += Math.PI * 2;
          moveState.targetRot = targetYaw;
          moveState.dir = nextDir;
        } else {
          moveState.mode = 'moving';
          moveState.startTime = t;
          moveState.startPos = [camera.position.x, camera.position.z];

          moveState.cx += DIRS[moveState.dir].vec[0];
          moveState.cz += DIRS[moveState.dir].vec[1];

          moveState.targetPos = [
            moveState.cx - OFFSET_X + 0.5,
            moveState.cz - OFFSET_Z + 0.5,
          ];
        }
      }

      if (moveState.mode === 'rotating') {
        const elapsed = t - moveState.startTime;
        const progress = easeInOutCubic(
          Math.min(elapsed / ROTATION_DURATION, 1),
        );
        camera.rotation.y =
          moveState.startRot +
          (moveState.targetRot - moveState.startRot) * progress;
        if (progress >= 1) moveState.mode = 'idle';
      }

      if (moveState.mode === 'moving') {
        const elapsed = t - moveState.startTime;
        const rawProgress = Math.min(elapsed / MOVE_DURATION, 1);
        const progress = rawProgress;
        camera.position.x =
          moveState.startPos[0] +
          (moveState.targetPos[0] - moveState.startPos[0]) * progress;
        camera.position.z =
          moveState.startPos[1] +
          (moveState.targetPos[1] - moveState.startPos[1]) * progress;

        // Stepping bob: 2 steps per 1 second movement
        camera.position.y =
          Math.abs(Math.sin(rawProgress * Math.PI * 2)) * STEP_BOB_HEIGHT;

        if (rawProgress >= 1) {
          moveState.mode = 'idle';
          camera.position.y = 0;
        }
      }

      renderer.render({
        scene,
        camera,
      });
    }

    rafId = requestAnimationFrame(update);

    window.addEventListener('resize', resize);
    resize();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="border-border fixed inset-0 z-9999 cursor-none overflow-hidden"
    />
  );
}
