gl-tile-map
===========
Generates a WebGL texture atlas for a tile map.

## Install

    npm install gl-tile-map
    
### `require("gl-tile-map")(gl, tiles[, pad])`
Generates a tilemap as atexture object.

* `gl` is a webgl context
* `tiles` is a 5 dimensional ndarray of tiles.
* `pad` is an optional flag that if set pads each tile by a factor of 1/2 along each dimension.

**Returns** A `gl-texture2d` object encoding the atlas

# Credits
(c) 2013 Mikola Lysenko. MIT License