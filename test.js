var pick = require('./')
var test = require('tape')

var mat4 = require('gl-mat4')
var vec3 = require('gl-vec3')
var Fuzzy = require('test-fuzzy-array')

test('creates a picking ray for a 2D/3D camera', function (t) {
  //could improve/simplify tests here for various cases
  var near = 0.001
  var almostEqual = Fuzzy(t, near)
  var viewport = [0, 0, 128, 256]

  // simulate a camera (projection & view matrices)
  var proj = mat4.create()
  var view = mat4.create()
  var position = [0, 0, -3]
  var direction = [0, 0, -1]
  var up = [0, 1, 0]
  var center = [0, 0, 0]

  mat4.perspective(proj, Math.PI / 4, viewport[2] / viewport[3], near, 1)

  // build view matrix
  vec3.add(center, position, direction)
  mat4.lookAt(view, position, center, up)

  var combined = mat4.multiply([], proj, view)
  var invProj = mat4.invert([], combined)

  var ray = {
    origin: [0, 0, 0],
    direction: [0, 0, 0]
  }

  var mouse
  mouse = [64, 127] //center of screen
  pick(ray.origin, ray.direction, mouse, viewport, invProj)
  almostEqual(ray.origin, [0, 0, -3])
  almostEqual(ray.direction, [0, 0, -1])
  t.end()
})
