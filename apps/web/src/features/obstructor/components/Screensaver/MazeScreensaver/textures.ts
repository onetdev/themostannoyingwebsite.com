import { type OGLRenderingContext, Texture } from 'ogl';

export function getTextures(gl: OGLRenderingContext) {
  function setupNetworkTexture(url: string) {
    const texture = new Texture(gl);
    texture.wrapS = gl.REPEAT;
    texture.wrapT = gl.REPEAT;
    texture.minFilter = gl.LINEAR_MIPMAP_LINEAR;
    texture.magFilter = gl.LINEAR;
    texture.generateMipmaps = true;
    const textureImage = new Image();
    textureImage.src = url;

    textureImage.onload = () => {
      texture.image = textureImage;
    };

    return texture;
  }

  return {
    floor: setupNetworkTexture('/assets/maze-screensaver/maze-floor.webp'),
    ceiling: setupNetworkTexture('/assets/maze-screensaver/maze-ceiling.webp'),
    wall: setupNetworkTexture('/assets/maze-screensaver/maze-wall.webp'),
    overay42: setupNetworkTexture(
      '/assets/maze-screensaver/maze-overlay-42.webp',
    ),
  };
}
