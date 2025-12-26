import Game from "../Game";


export default class Fence {

    constructor(position, rotation) {
        
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources
        this.resource = this.resources.items.fence
        
        this.position = position
        this.rotation = rotation
        
        this.setModel()
    }
    
    setModel() {
        this.mesh = this.resource.scene.children[0].clone()
        this.mesh.position.copy(this.position)
        this.mesh.quaternion.copy(this.rotation)
    }
}