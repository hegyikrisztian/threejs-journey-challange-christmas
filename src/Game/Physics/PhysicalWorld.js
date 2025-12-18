import Game from "../Game";
import EventEmitter from "../Utils/EventEmitter";
import CANNON from "cannon";

export default class PhysicalWorld extends EventEmitter {

    constructor() {

        super()

        this.game = new Game()
        this.time = this.game.time
        this.bodies = []

        this.setWorld()
        this.setMaterials()

    }
    
    setWorld() {
        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)
    }

    setMaterials() {
        this.metalMaterial = new CANNON.Material("metal")
        this.groundMaterial = new CANNON.Material("ground")

        this.groundMetalContactMaterial = new CANNON.ContactMaterial(
            this.metalMaterial,
            this.groundMaterial,
            {
                friction: 0.0, // Low friction for sliding on snow
                restitution: 0.5, // No bounce - sleigh stays on ground
            }
        )
        this.world.addContactMaterial(this.groundMetalContactMaterial)
    }

    addBody(body, name) {

        if (!body) {
            console.warn("body is required for PhysicalWorld.addBody")
            return
        }
        if (!name || typeof name != "string") {
            console.warn("name is required for PhysicalWorld.addBody and should be of type 'string'")
            return
        }

        // Own array for easier identification in other components
        this.bodies.push({
            name: name,
            body: body
        })

        // Add to CANNON world
        this.world.addBody(body)
    }

    update() {
        this.world.step(1 / 60, this.time.delta, 3)
    }
}