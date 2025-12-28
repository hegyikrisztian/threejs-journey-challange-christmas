import Game from "../Game";
import CANNON from "cannon";
import { KEYS } from "../Controls/Inputs";


export default class SleighBody {

    constructor() {
        
        this.game = new Game()
        this.time = this.game.time
        this.physicalWorld = this.game.physics
        this.inputs = this.game.inputs

        this.setChassyShape()
        this.setRunnerShape()
        this.setBody()
        this.setMaterial()

    }

    setChassyShape() {
        this.chassyShape = new CANNON.Box(
            new CANNON.Vec3(1 * 0.5, 0.3 * 0.5, 0.5 * 0.5)
        )
    }

    setRunnerShape() {
        this.runnerShape = new CANNON.Box(
            new CANNON.Vec3(1.1 * 0.5, 0.1 * 0.5, 0.14 * 0.5)
        )
    }

    setBody() {
        this.body = new CANNON.Body({
            mass: 5,
            angularDamping: 0.9, // damping values should be between 0-1
            linearDamping: 0.9,
            position: new CANNON.Vec3(0, 3, 0),
        })
        this.body.addShape(this.chassyShape, new CANNON.Vec3(0, 0.15, 0))
        this.body.addShape(this.runnerShape, new CANNON.Vec3(0, 0.05, -0.21))
        this.body.addShape(this.runnerShape, new CANNON.Vec3(0, 0.05, 0.21))
        
        this.body.updateMassProperties();
        
        this.physicalWorld.addBody(this.body, "sleigh")
    }

    setMaterial() {
        this.body.material = this.physicalWorld.metalMaterial
    }

    accelerate(magnitude) {
        const localForward = new CANNON.Vec3(-1, 0, 0)
        const worldForward = new CANNON.Vec3(0, 0, 0)
        this.body.quaternion.vmult(localForward, worldForward)
        this.body.applyForce(
            worldForward.scale(magnitude),
            this.body.position
        )
    }
    
    turn(direction) {
        const speed = 2

        // Flip the sign when going backward
        if (this.inputs.getIsKeyActive(KEYS.S)) {
            direction *= - 1.0    
        }

        this.body.angularVelocity.y = direction * speed
    }
    
    update() {
        
        // Controls
        if (this.inputs.getIsKeyActive(KEYS.W)) {
            this.accelerate(20)
        }

        if (this.inputs.getIsKeyActive(KEYS.S)) {
            this.accelerate(-20)
        }

        if (this.inputs.getIsKeyActive(KEYS.A)) {
            this.turn(0.1)
        }
        else if (this.inputs.getIsKeyActive(KEYS.D)) {
            this.turn(-0.1)
        }
        else {
            this.body.angularVelocity.y = 0
        }
    }
}