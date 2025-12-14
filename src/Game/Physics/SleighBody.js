import Game from "../Game";
import CANNON from "cannon";


export default class SleighBody {

    constructor() {
        
        this.game = new Game()
        this.physicalWorld = this.game.physics

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
            position: new CANNON.Vec3(0, 0, 0),
        })
        this.body.addShape(this.chassyShape, new CANNON.Vec3(0, 0.15, 0))
        this.body.addShape(this.runnerShape, new CANNON.Vec3(0, 0.05, -0.21))
        this.body.addShape(this.runnerShape, new CANNON.Vec3(0, 0.05, 0.21))
        
        this.body.updateMassProperties();
        
        // Offset center of mass
        // body.shapeOffsets.forEach(offset => {
        //   offset.y -= 0.3
        // })
        // body.updateMassProperties()
        
        this.physicalWorld.addBody(this.body, "sleigh")
    }

    setMaterial() {
        this.body.material = this.physicalWorld.metalMaterial
    }
}