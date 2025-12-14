import Game from "../Game";
import CANNON from "cannon";


export default class GroundBody {

    constructor() {
        
        this.game = new Game()
        this.physicalWorld = this.game.physics

        this.setShape()
        this.setBody()
        this.setMaterial()
    }

    setShape() {
        this.shape = new CANNON.Plane(10);
    }

    setBody() {
        this.body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(0, 0, 0),
        })
        this.body.addShape(this.shape)
        this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)

        this.physicalWorld.addBody(this.body, "ground")
    }

    setMaterial() {
        this.body.material = this.physicalWorld.groundMaterial
    }
}