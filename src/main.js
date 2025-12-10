import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'


/**
 * Setup
 */
const canvas = document.querySelector("#webgl")
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Resize
window.addEventListener("resize", () => {

  // Update size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(sizes.width, sizes.height)
})

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = -4
camera.position.x = -3
camera.position.y = 2

/**
 * Test cube
 */
scene.add(
  new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: "red" })
  )
)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)

const clock = new THREE.Clock()
let previousTime = 0;
const tick = () => {
  
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime

  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()

