import { OGLRenderingContext, Texture } from 'ogl';

export function getTextures(gl: OGLRenderingContext) {
  const floor = new Texture(gl);
  floor.wrapS = gl.REPEAT;
  floor.wrapT = gl.REPEAT;
  floor.minFilter = gl.LINEAR_MIPMAP_LINEAR;
  floor.magFilter = gl.LINEAR;
  floor.generateMipmaps = true;
  const floorImg = new Image();
  floorImg.src = '/assets/images/maze_floor.webp';

  floorImg.onload = () => {
    floor.image = floorImg;
  };

  const ceiling = new Texture(gl);
  const ceilingImg = new Image();
  ceilingImg.src = '/assets/images/maze_ceiling.webp';

  ceilingImg.onload = () => {
    ceiling.image = ceilingImg;
  };

  const wall = new Texture(gl);
  const wallImg = new Image();
  wallImg.src = '/assets/images/maze_wall.webp';

  wallImg.onload = () => {
    wall.image = wallImg;
  };

  return {
    floor,
    ceiling: ceiling,
    wall: wall,
  };
}
