import Ground from "./Ground";
import PresentSpawner from './PresentSpawner';
import Player from "./Player";
import PresentRequestor from "./PresentRequestor";


export default class World {

    constructor() {

        this.ground = new Ground()
        this.presentSpawner = new PresentSpawner()
        this.presentRequestor = new PresentRequestor()
        this.player = new Player(this.presentSpawner, this.presentRequestor)
    }

    update() {
        this.presentSpawner.update()
        this.player.update()
        this.presentRequestor.update()
    }
}