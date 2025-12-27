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
import GameTimer from "./GameTimer"
import Menu from "./Menu"
import Resources from "./Utils/Resources"
import sources from "./sources"


export default class Game {

    constructor(canvas) {

        // Singleton
        if (Game.instance) {
            return Game.instance
        }
        Game.instance = this

        this.isStarted = false
        this.isEnded = false
        this.isPasued = false

        this.canvas = canvas
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.time = new Time()
        this.gameTimer = new GameTimer()
        this.renderer = new Renderer()
        this.environment = new Environment()
        this.physics = new PhysicalWorld()
        this.menu = new Menu()
        this.inputs = new Inputs()
        this.world = new World()
        
        this.sizes.on("resize", () => {
            this.resize()
        })

        this.time.on("tick", () => {
            this.update()
        })

        window.addEventListener("visibilitychange", () => {
            if (this.isPlaying()) this.pause()
        })
    }

    start() {
        // asdasd
        this.isStarted = true
        this.isEnded = false
        this.isPasued = false
        
        this.gameTimer.start()
        this.world.reset()
        this.canvas.focus()
    }

    pause() {
        this.menu.showBackdrop()
        this.menu.handleMenu(".pause-menu-wrapper", "show")

        this.isPasued = true
    }

    continue() {
        this.isPasued = false
    }

    end() {
        this.isEnded = true
        this.menu.showEndMenu(this.world.player.deliveredPresentsCount)
    }

    isPlaying() {
        return this.isStarted && !this.isPasued && !this.isEnded
    }

    // We call resize here, to be able to control the order
    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        if (this.isPlaying()) {
            this.physics.update()
            this.world.update()
            this.gameTimer.update()
        }

        console.log(this.camera.instance.position);
        this.renderer.update()
    }
}