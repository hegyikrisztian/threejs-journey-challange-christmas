import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import CANNON from 'cannon'
import GUI from 'lil-gui'

/**
 * Setup
 */
// Debug
const gui = new GUI({
  width: 300
})

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
camera.position.z = 0
camera.position.x = -7
camera.position.y = 6

/**
 * Physics
 */
const physicsWorld = new CANNON.World()
physicsWorld.gravity.set(0, - 9.82, 0)

// Sphere body
const sphereShape = new CANNON.Sphere(0.5)
const sphereBody = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(0, 0, 0),
  shape: sphereShape
})
physicsWorld.addBody(sphereBody)

// Floor body
const floorShape = new CANNON.Plane(10)
const floorBody = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(0, - 0.5, 0),
  shape: floorShape
})
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
physicsWorld.addBody(floorBody)

scene.add(new THREE.AxesHelper())

/**
 * Controls
 */
window.addEventListener("keydown", (event) => {

  switch (event.key) {
    case "w":
      sphereBody.applyForce(new CANNON.Vec3(50, 0, 0), new CANNON.Vec3(0, 0, 0))
      break
    case "a":
      break
    case "d":
      break
    case "s":
      sphereBody.applyForce(new CANNON.Vec3(-50, 0, 0), new CANNON.Vec3(0, 0, 0))
      break
    default:
      break
  }

})
window.addEventListener("keyup", (event) => {

  if (event.key == "w" || event.key == "s") {
    sphereBody.velocity.set(0, 0, 0)

    /* TODO: reduce the velocity to 0 when stopping */
  }

})


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
directionalLight.position.x = - 6
directionalLight.position.y = 2
directionalLight.castShadow = true
scene.add(directionalLight)

/**
 * Test cube
 */
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({ color: "white", metalness: 0.7, roughness: 0.5 })
)
sphere.castShadow = true
scene.add(sphere)

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshStandardMaterial({ color: "white", metalness: 0.7, roughness: 0.5 })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
floor.position.y = - 0.5
floor.scale.x = 16
floor.scale.y = 8
scene.add(floor)


const renderer = new THREE.WebGLRenderer({ canvas })
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)
controls.enabled = false
gui.add(controls, 'enabled').name("controls")


const clock = new THREE.Clock()
let previousTime = 0;
const tick = () => {
  
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime

  // Update physics world
  physicsWorld.step(1 / 60, deltaTime, 3)
  sphere.position.copy(sphereBody.position)

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Request next frame with tick
  window.requestAnimationFrame(tick)
}

tick()

