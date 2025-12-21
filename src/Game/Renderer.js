import * as THREE from "three"
import Game from "./Game";


export default class Renderer {

    constructor() {

        this.game = new Game()
        this.canvas = this.game.canvas
        this.scene = this.game.scene
        this.camera = this.game.camera.instance
        this.sizes = this.game.sizes

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.game.canvas,
            antialias: true
        })
        this.instance.toneMapping = THREE.ACESFilmicToneMapping
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        
    }
    
    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        this.instance.render(this.scene, this.camera)
    }
}
