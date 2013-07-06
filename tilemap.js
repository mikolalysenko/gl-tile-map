"use strict"

var ndarray = require("ndarray")
var tileMipMap = require("tile-mip-map")
var createTexture = require("gl-texture2d")

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
  tex.mipSamples = 4
  
  //Set up mipmaps
  for(var i=1; i<pyramid.length; ++i) {
    tex.setPixels(reshapeTileMap(pyramid[i]), 0, 0, i)
  }
  
  return tex
}

module.exports = createTileMap