import * as THREE from "three"
import Camera from "./Camera"
import Sizes from "./Utils/Sizes"
import Renderer from "./Renderer"
import Debug from "./Utils/Debug"
import PhysicalWorld from "./Physics/PhysicalWorld"
import Time from "./Utils/Time"
import Inputs from "./Controls/Inputs"
import Environment from "./World/Environment"
import World from "./World/World"


export default class Game {

    constructor(canvas) {

        // Singleton
        if (Game.instance) {
            return Game.instance
        }
        Game.instance = this

        this.canvas = canvas
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.time = new Time()
        this.renderer = new Renderer()
        this.environment = new Environment()
        this.physics = new PhysicalWorld()
        this.inputs = new Inputs()
        this.world = new World()
        
        this.sizes.on("resize", () => {
            this.resize()
        })

        this.time.on("tick", () => {
            this.update()
        })
    }

    // We call resize here, to be able to control the order
    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.physics.update()
        this.world.update()

        this.camera.update(this.world.player.sleigh.group.position)
        this.renderer.update()
    }
}