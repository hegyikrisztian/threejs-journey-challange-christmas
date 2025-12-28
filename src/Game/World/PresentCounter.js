import * as THREE from 'three'
import Game from "../Game";


export default class PresentCounter {

    constructor() {
        
        this.game = new Game()
        this.scene = this.game.scene
        this.camera = this.game.camera
        this.debug = this.game.debug
        this.player = this.game.world.player
        this.resources = this.game.resources
        this.resource = this.resources.items.presentCounter

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("PresentCounter")
        }

        this.setCanvas()
        this.setMaterial()
        this.setModel()
        this.setCounter(0) // Initialize
        this.setSpotlight()
    }

    setCanvas() {
        this.canvas = {}
        this.canvas.element = document.createElement("canvas")
        
        this.canvas.element.id = `canvas_present_counter`
        this.canvas.element.width = 200
        this.canvas.element.height = 200
    
        this.canvas.context = this.canvas.element.getContext("2d")
        this.canvas.context.font = "250px Titan One, sans-serif"
        this.canvas.context.fillStyle = "white"
        document.body.appendChild(this.canvas.element)
    }

    setMaterial() {
        this.texture = new THREE.CanvasTexture(this.canvas.element)
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
            transparent: true,
            side: THREE.DoubleSide,
            // color: 0xff0000,
            // wireframe: true
        })
    }

    setModel() {
        this.counterReference = this.resource.scene.children[0].clone()
        this.counter = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            this.material
        )
        this.counter.position.copy(this.counterReference.position)
        this.counter.rotation.set(
            0.546637,
            1.985486,
            -0.45238
        )

        if (this.debug.active) {
            this.debugFolder
                .add(this.counter.rotation, "x")
                .min(-Math.PI)
                .max(Math.PI)

            this.debugFolder
                .add(this.counter.rotation, "y")
                .min(-Math.PI)
                .max(Math.PI)

            this.debugFolder
                .add(this.counter.rotation, "z")
                .min(-Math.PI)
                .max(Math.PI)

        }
        
        // this.counter.material = this.material

        this.scene.add(this.counter)
    }

    setCounter(count) {
        this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height)
        this.canvas.context.fillText(count, 0, 180)
        this.texture.needsUpdate = true
    }

    setSpotlight() {
        this.spotlight = new THREE.SpotLight("#ffd381ff", 12, 5, Math.PI / 4, 0)
        this.spotlight.lookAt(this.counter.position)
        this.spotlight.position.set(
            this.counter.position.x + 1,
            5,
            this.counter.position.z + 0.5
        )
        this.spotlight.target.position.set(
            this.counter.position.x + 0.8,
            this.counter.position.y,
            this.counter.position.z + 0.3
        )

        if (this.debug.active) {
            this.debugFolder
                .add(this.spotlight.rotation, "x").name("spotlightRotationX")
                .min(-Math.PI)
                .max(Math.PI)

            this.debugFolder
                .add(this.spotlight.rotation, "y").name("spotlightRotationY")
                .min(-Math.PI)
                .max(Math.PI)

            this.debugFolder
                .add(this.spotlight.rotation, "z").name("spotlightRotationZ")
                .min(-Math.PI)
                .max(Math.PI)

        }

        // this.scene.add(new THREE.SpotLightHelper(this.spotlight))
        this.scene.add(this.spotlight.target)
        this.scene.add(this.spotlight)
    }

    reset() {
        this.setCounter(0)
    }
}