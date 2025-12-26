import Ground from "./Ground";
import PresentSpawner from './PresentSpawner';
import Player from "./Player";
import PresentRequestor from "./PresentRequestor";
import Game from "../Game";
import FenceColliders from "../Physics/FenceColliders";


export default class World {

    constructor() {

        this.game = new Game()
        this.ground = new Ground()
        this.presentSpawner = new PresentSpawner()
        this.presentRequestor = new PresentRequestor()
        this.player = new Player(this.presentSpawner, this.presentRequestor)
        this.resources = this.game.resources

        this.resources.on("ready", () => {
            this.fenceColliders = new FenceColliders()
        })

    }

    reset() {
        this.presentRequestor.reset()
        this.player.reset()
    }

    update() {
        this.presentSpawner.update()
        this.player.update()
        this.presentRequestor.update()
    }
}