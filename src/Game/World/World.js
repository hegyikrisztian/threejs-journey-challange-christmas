import Ground from "./Ground";
import Sleigh from "./Sleigh";
import PresentSpawner from './PresentSpawner';


export default class World {

    constructor() {

        this.ground = new Ground()
        this.sleigh = new Sleigh()
        this.presentSpawner = new PresentSpawner()
    }

    update() {
        this.sleigh.update()
        this.presentSpawner.update()
    }
}