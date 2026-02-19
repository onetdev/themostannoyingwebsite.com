'use client';

import React, { useEffect, useRef } from 'react';

// Windows 95 3D Maze inspired raycasting screensaver
export function MazeScreensaver() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Maze configuration
    const map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const mapSize = 16;
    let posX = 1.5,
      posY = 1.5; // Start position
    let dirX = -1,
      dirY = 0; // Direction vector
    let planeX = 0,
      planeY = 0.66; // 2D raycaster camera plane

    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      time += 0.02;

      // Automated movement - follow the maze or just move forward and turn at walls
      const moveSpeed = 0.05;
      const rotSpeed = 0.03;

      // Simple AI: Move forward until wall, then turn
      const nextX = posX + dirX * moveSpeed;
      const nextY = posY + dirY * moveSpeed;

      if (map[Math.floor(nextX)][Math.floor(nextY)] === 0) {
        posX = nextX;
        posY = nextY;
      } else {
        // Turn
        const oldDirX = dirX;
        const angle = rotSpeed * 2;
        dirX = dirX * Math.cos(angle) - dirY * Math.sin(angle);
        dirY = oldDirX * Math.sin(angle) + dirY * Math.cos(angle);
        const oldPlaneX = planeX;
        planeX = planeX * Math.cos(angle) - planeY * Math.sin(angle);
        planeY = oldPlaneX * Math.sin(angle) + planeY * Math.cos(angle);
      }

      // Drawing
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floor and Ceiling
      ctx.fillStyle = '#333'; // Ceiling
      ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
      ctx.fillStyle = '#666'; // Floor
      ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

      // Raycasting
      const w = canvas.width;
      const h = canvas.height;

      for (let x = 0; x < w; x += 2) {
        const cameraX = (2 * x) / w - 1;
        const rayDirX = dirX + planeX * cameraX;
        const rayDirY = dirY + planeY * cameraX;

        let mapX = Math.floor(posX);
        let mapY = Math.floor(posY);

        const deltaDistX = Math.abs(1 / rayDirX);
        const deltaDistY = Math.abs(1 / rayDirY);

        let sideDistX, sideDistY;
        let stepX, stepY;

        if (rayDirX < 0) {
          stepX = -1;
          sideDistX = (posX - mapX) * deltaDistX;
        } else {
          stepX = 1;
          sideDistX = (mapX + 1.0 - posX) * deltaDistX;
        }

        if (rayDirY < 0) {
          stepY = -1;
          sideDistY = (posY - mapY) * deltaDistY;
        } else {
          stepY = 1;
          sideDistY = (mapY + 1.0 - posY) * deltaDistY;
        }

        let hit = 0;
        let side = 0;

        while (hit === 0) {
          if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            mapX += stepX;
            side = 0;
          } else {
            sideDistY += deltaDistY;
            mapY += stepY;
            side = 1;
          }
          if (map[mapX][mapY] > 0) hit = 1;
        }

        let perpWallDist;
        if (side === 0)
          perpWallDist = (mapX - posX + (1 - stepX) / 2) / rayDirX;
        else perpWallDist = (mapY - posY + (1 - stepY) / 2) / rayDirY;

        const lineHeight = Math.floor(h / perpWallDist);
        let drawStart = -lineHeight / 2 + h / 2;
        if (drawStart < 0) drawStart = 0;
        let drawEnd = lineHeight / 2 + h / 2;
        if (drawEnd >= h) drawEnd = h - 1;

        // Brick wall colors
        const color = side === 1 ? '#b52a2a' : '#8a1f1f';
        ctx.fillStyle = color;
        ctx.fillRect(x, drawStart, 2, drawEnd - drawStart);

        // Add some "brick" lines
        if (lineHeight > 20) {
          ctx.fillStyle = 'rgba(0,0,0,0.1)';
          ctx.fillRect(x, drawStart + lineHeight * 0.25, 2, 1);
          ctx.fillRect(x, drawStart + lineHeight * 0.5, 2, 1);
          ctx.fillRect(x, drawStart + lineHeight * 0.75, 2, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] cursor-none overflow-hidden"
    />
  );
}
