import { OrbitControls } from "three/examples/jsm/Addons.js";
import Game from "./Game";


export default class Camera {

    constructor() {
        this.game = new Game()
        this.sizes = this.game.sizes
        this.canvas = this.game.canvas
        this.aspectRatio = this.sizes.width / this.sizes.height

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.aspectRatio,
            0.1,
            10
        )
        this.instance.position.set(-7, 6, 0)
        this.game.scene.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize() {
        this.instance.ascpet = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix() 
    }

    update() {
        this.controls.update()
    }
}