import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Game from "./Game";


export default class Camera {

    constructor() {
        this.game = new Game()
        this.sizes = this.game.sizes
        this.canvas = this.game.canvas
        this.debug = this.game.debug
        

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("Camera controls")
        }
        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(-7, 6, 0)
        this.game.scene.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true

        if (this.debug.active) {
            this.debugFolder.add(this.controls, "enabled")
        }
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update(sleighPosition) {
        if (this.controls.enabled) {
            this.controls.update()
        }
        else {

            // Follow the player
            const _newPosition = new THREE.Vector3(
                sleighPosition.x - 6,
                sleighPosition.y + 6,
                sleighPosition.z
            )

            this.instance.position.copy(_newPosition)
            this.instance.lookAt(sleighPosition)
        }
    }
}