import Game from "../Game"
import CANNON from "cannon"


export default class HouseBody {

     constructor(position, id) {
            
        this.game = new Game()
        this.physicalWorld = this.game.physics
        this.position = new CANNON.Vec3().copy(position)  // Unify position
        this.id = id

        this.setShape()
        this.setBody()
        this.setMaterial()
    }

    setShape() {
        this.shape = new CANNON.Box(
            new CANNON.Vec3(2 * 0.5, 1 * 0.5, 2 * 0.5)
        );
    }

    setBody() {
        this.body = new CANNON.Body({
            mass: 0,
            position: this.position,
        })
        this.body.addShape(this.shape)
        
        this.physicalWorld.addBody(this.body, `house_${this.id}`)
    }

    setMaterial() {
        this.body.material = this.physicalWorld.groundMaterial
    }
}