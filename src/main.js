import Game from "./Game/Game";

const canvas = document.querySelector("#webgl")
const game = new Game(canvas)

// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/Addons.js";
// import CANNON from "cannon";
// import GUI from "lil-gui";

// /**
//  * Setup
//  */
// // Debug
// const gui = new GUI({
//   width: 300,
// });

// const canvas = document.querySelector("#webgl");
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// // Resize
// window.addEventListener("resize", () => {
//   // Update size
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   // Update renderer
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setSize(sizes.width, sizes.height);
// });

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   35,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.z = 0;
// camera.position.x = -7;
// camera.position.y = 6;

// /**
//  * Physics
//  */
// const physicsWorld = new CANNON.World();
// physicsWorld.gravity.set(0, -9.82, 0);

// // Main body for sleigh
// const sleighBody = new CANNON.Body({
//   mass: 5,
//   angularDamping: 0.9, // damping values should be between 0-1
//   linearDamping: 0.9,
//   position: new CANNON.Vec3(0, 0, 0),
// });

// // Shapes for sleigh
// const sleighChassyShape = new CANNON.Box(
//   new CANNON.Vec3(1 * 0.5, 0.3 * 0.5, 0.5 * 0.5)
// );
// const sleighRunnerShape = new CANNON.Box(
//   new CANNON.Vec3(1.1 * 0.5, 0.1 * 0.5, 0.14 * 0.5)
// );
// sleighBody.addShape(sleighChassyShape, new CANNON.Vec3(0, 0.15, 0)); // main body on top
// sleighBody.addShape(sleighRunnerShape, new CANNON.Vec3(0, 0.05, -0.21)); // left runner
// sleighBody.addShape(sleighRunnerShape, new CANNON.Vec3(0, 0.05, 0.21)); // right runner

// sleighBody.updateMassProperties();

// // Offset center of mass
// // sleighBody.shapeOffsets.forEach(offset => {
// //   offset.y -= 0.3
// // })
// // sleighBody.updateMassProperties()

// physicsWorld.addBody(sleighBody);

// // Floor body with material for friction
// const groundMaterial = new CANNON.Material("ground");
// const floorShape = new CANNON.Plane(10);
// const floorBody = new CANNON.Body({
//   mass: 0,
//   position: new CANNON.Vec3(0, 0, 0),
//   shape: floorShape,
//   material: groundMaterial,
// });
// floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
// physicsWorld.addBody(floorBody);

// // Box material
// const boxMaterial = new CANNON.Material("box");

// // Contact material (defines what happens when box touches ground)
// const boxGroundContactMaterial = new CANNON.ContactMaterial(
//   boxMaterial,
//   groundMaterial,
//   {
//     friction: 0.0, // Low friction for sliding on snow
//     restitution: 0.0, // No bounce - sleigh stays on ground
//   }
// );
// physicsWorld.addContactMaterial(boxGroundContactMaterial);
// sleighBody.material = boxMaterial;

// // scene.add(new THREE.AxesHelper())

// const accelerate = (magnitude) => {
//   // Get the sleigh's forward direction in world space
//   const localForward = new CANNON.Vec3(1, 0, 0); // Local forward direction
//   const worldForward = new CANNON.Vec3();

//   // Transform local forward to world space using sleigh's rotation
//   sleighBody.quaternion.vmult(localForward, worldForward);

//   // Apply force in the direction the sleigh is facing
//   sleighBody.applyForce(
//     worldForward.scale(magnitude),
//     sleighBody.position // Apply at center of mass
//   );
// };

// const turn = (direction) => {
//   // Apply angular velocity to rotate the sleigh
//   // Positive = counter-clockwise (turn left), Negative = clockwise (turn right)
//   const turnSpeed = 2; // Adjust this for faster/slower turning
//   sleighBody.angularVelocity.y = direction * turnSpeed;
// };

// /**
//  * Controls
//  */
// const inputs = {
//   KeyW: false,
//   KeyS: false,
//   KeyA: false,
//   KeyD: false,
// };
// window.addEventListener("keydown", (event) => {
//   inputs[event.code] = true;
// });
// console.log(physicsWorld.bodies);
// window.addEventListener("keyup", (event) => {
//   inputs[event.code] = false;
// });

// /**
//  * Lights
//  */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
// directionalLight.position.x = -6;
// directionalLight.position.y = 2;
// directionalLight.castShadow = true;
// scene.add(directionalLight);

// /**
//  * Test sleigh
//  */
// // Create a group to hold all sleigh parts
// const sleigh = new THREE.Group();
// scene.add(sleigh);

// // Main body (offset matches CANNON shape offset: 0, 0.15, 0)
// const sleighChassy = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 0.3, 0.5),
//   new THREE.MeshNormalMaterial({})
// );
// sleighChassy.castShadow = true;
// sleighChassy.position.set(0, 0.15, 0);
// sleigh.add(sleighChassy);

// // Left runner (offset matches CANNON shape offset: 0, 0.05, -0.21)
// const sleighRunnerLeft = new THREE.Mesh(
//   new THREE.BoxGeometry(1.1, 0.1, 0.14),
//   new THREE.MeshNormalMaterial({})
// );
// sleighRunnerLeft.castShadow = true;
// sleighRunnerLeft.position.set(0, 0.05, -0.21);
// sleigh.add(sleighRunnerLeft);

// // Right runner (offset matches CANNON shape offset: 0, 0.05, 0.21)
// const sleighRunnerRight = new THREE.Mesh(
//   new THREE.BoxGeometry(1.1, 0.1, 0.14),
//   new THREE.MeshNormalMaterial({})
// );
// sleighRunnerRight.castShadow = true;
// sleighRunnerRight.position.set(0, 0.05, 0.21);
// sleigh.add(sleighRunnerRight);

// const floor = new THREE.Mesh(
//   new THREE.PlaneGeometry(5, 5),
//   new THREE.MeshStandardMaterial({
//     color: "white",
//     metalness: 0.7,
//     roughness: 0.5,
//   })
// );
// floor.receiveShadow = true;
// floor.rotation.x = -Math.PI * 0.5;
// floor.scale.x = 16;
// floor.scale.y = 8;
// scene.add(floor);

// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setSize(sizes.width, sizes.height);

// const controls = new OrbitControls(camera, canvas);
// controls.enabled = true;
// gui.add(controls, "enabled").name("controls");

// const clock = new THREE.Clock();
// let previousTime = 0;
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();
//   const deltaTime = elapsedTime - previousTime;
//   previousTime = elapsedTime;

//   // Update physics world
//   physicsWorld.step(1 / 60, deltaTime, 3);

//   // Move the sleigh forward/backward (in the direction it's facing)
//   if (inputs.KeyW) accelerate(30); // Forward
//   if (inputs.KeyS) accelerate(-30); // Backward

//   // Turn the sleigh (rotate it)
//   if (inputs.KeyA) turn(1); // Turn left (counter-clockwise)
//   else if (inputs.KeyD) turn(-1); // Turn right (clockwise)
//   else sleighBody.angularVelocity.y = 0; // Stop turning when key released

//   // Update sleigh group from physics body - all children move together!
//   sleigh.position.copy(sleighBody.position);
//   sleigh.quaternion.copy(sleighBody.quaternion);

//   // Update controls
//   controls.update();

//   // Render
//   renderer.render(scene, camera);

//   // Request next frame with tick
//   window.requestAnimationFrame(tick);
// };

// tick();
