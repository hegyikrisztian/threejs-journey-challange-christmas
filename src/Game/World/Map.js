import Game from "../Game";


export default class Map {
    constructor() {
        
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources
        this.resource = this.resources.items.environment

        this.setModel()
    }

    setModel() {
        const model = this.resource.scene
        model.position.set(0, 0, 0)
        model.castShadow = true
        model.recieveShadow = true

        this.scene.add(model)
    }
}