import Ground from "./Ground";
import PresentSpawner from './PresentSpawner';
import Player from "./Player";


export default class World {

    constructor() {

        this.ground = new Ground()
        this.presentSpawner = new PresentSpawner()
        this.player = new Player(this.presentSpawner)
    }

    update() {
        this.presentSpawner.update()
        this.player.update()
    }
}