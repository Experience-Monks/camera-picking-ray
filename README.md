# camera-picking-ray

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Creates a picking ray for a camera. Commonly used for mouse interaction in 2D and 3D games.

The camera is assumed to have a `projection` and `view` matrix, which can be combined and inverted to form `invProjView`. 

```js
var origin = [0, 0, 0]
var direction = [0, 0, 0]

//compute ray and store it in (origin, direction)
pick(origin, direction, mouse, viewport, invProjView)

console.log(origin, direction)
```

Full example, hit-testing against a 3D sphere:

```js
var mat4 = require('gl-mat4')
var pick = require('camera-picking-ray')
var intersect = require('ray-sphere-intersection')

//your camera matrices
var projection = ...
var view = ...
var projView = mat4.multiply([], projection, view)
var invProjView = mat4.invert([], projView)

var mouse = [ screenX, screenHeight - screenY ]
var viewport = [ 0, 0, screenWidth, screenHeight ]

var ray = {
  ro: [0, 0, 0],
  rd: [0, 0, 0]
}

//store result in ray (origin, direction)
pick(ray.ro, ray.rd, mouse, viewport, invProjView)

//let's see if the mouse hit a 3D sphere...
var center = [0, 0, 0],
    radius = 1.5
var hit = intersect([], ray.ro, ray.rd, center, radius)

if (hit) {
  console.log("Mouse hit the sphere at:", hit)
}
```

PRs welcome.

## Usage

[![NPM](https://nodei.co/npm/camera-picking-ray.png)](https://www.npmjs.com/package/camera-picking-ray)

#### `pick(origin, direction, mouse, viewport, invProjView)`

Creates a picking ray for the given `mouse` screen-space position (vec2) and `viewport` screen-space bounds (x, y, width, height). `invProjView` is the inverse of the combined `projection * view` matrix for your camera.

Stores the resulting ray in the first two parameters: `origin` (vec3) and `direction` (vec3).

## See Also

- [ray-sphere-intersection](https://www.npmjs.com/package/ray-sphere-intersection)
- [ray-triangle-intersection](https://www.npmjs.com/package/ray-triangle-intersection)
- [ray-plane-intersection](https://www.npmjs.com/package/ray-plane-intersection)
- [ray-aabb](https://www.npmjs.com/package/ray-aabb)
- [camera-unproject](https://www.npmjs.com/package/camera-unproject)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/camera-picking-ray/blob/master/LICENSE.md) for details.
