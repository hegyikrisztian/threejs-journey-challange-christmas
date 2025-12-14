import * as THREE from "three"
import Camera from "./Camera"
import Sizes from "./Utils/Sizes"
import Renderer from "./Renderer"
import Debug from "./Utils/Debug"
import PhysicalWorld from "./Physics/PhysicalWorld"
import Time from "./Utils/Time"

export default class Game {

    constructor(canvas) {

        // Singleton
        if (Game.instance) {
            return Game.instance
        }
        Game.instance = this

        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.time = new Time()
        this.sizes = new Sizes()
        this.renderer = new Renderer()
        this.debug = new Debug()
        this.physics = new PhysicalWorld()
    }
}