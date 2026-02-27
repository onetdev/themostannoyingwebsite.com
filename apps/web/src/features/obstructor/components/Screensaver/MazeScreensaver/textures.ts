import { type OGLRenderingContext, Texture } from 'ogl';

type AssetPaths = {
  mazeFloor: string;
  mazeCeiling: string;
  mazeWall: string;
  mazeOverlayEasteregg: string;
};

export function getTextures(gl: OGLRenderingContext, assets: AssetPaths) {
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
    floor: setupNetworkTexture(assets.mazeFloor),
    ceiling: setupNetworkTexture(assets.mazeCeiling),
    wall: setupNetworkTexture(assets.mazeWall),
    overlayEasteregg: setupNetworkTexture(assets.mazeOverlayEasteregg),
  };
}
