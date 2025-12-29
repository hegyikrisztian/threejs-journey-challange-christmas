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

        this.instance.position.set(
            23.181431899694708,
            25.279492539483208,
            -4.882740747862395
        )

        this.game.scene.add(this.instance)

    }
    
    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enabled = false
        this.controls.enableDamping = true
        this.controls.target.set(
            0.3,
            0,
            -4
        )
        this.controls.update()
        
        if (this.debug.active) {
            this.debugFolder.add(this.controls, "enabled")
        }
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        if (this.controls.enabled) {
            this.controls.update()
        }
    }
}