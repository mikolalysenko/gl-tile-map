"use strict"

var ndarray = require("ndarray")
var tileMipMap = require("tile-mip-map")
var createTexture = require("gl-texture2d")
var webglew = require("webglew"0)

function reshapeTileMap(tiles) {
  var s = tiles.shape
  return ndarray(tiles.data, [s[0]*s[2], s[1]*s[3], s[4]])
}

function createTileMap(gl, tiles, pad) {
  var pyramid = tileMipMap(tiles, pad)
  
  //Fill in mip levels
  var tex = createTexture(gl, reshapeTileMap(pyramid[0]))

  //Allocate memory (stupid way to do this)
  tex.generateMipmap()

  //Set sample parameters
  tex.magFilter = gl.LINEAR
  tex.minFilter = gl.LINEAR_MIPMAP_LINEAR
  
  //Turn on anisotropic filtering if availablen
  var ext = webglew(gl).EXT_texture_filter_anisotropic
  if(ext) {
    tex.bind()
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, 4);
  }

  //Set up mipmaps
  for(var i=1; i<pyramid.length; ++i) {
    tex.setPixels(reshapeTileMap(pyramid[i]), 0, 0, i)
  }
  
  return tex
}

module.exports = createTileMap