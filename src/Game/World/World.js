import Game from "../Game";
import Ground from "./Ground";
import Sleigh from "./Sleigh";


export default class World {

    constructor() {

        this.ground = new Ground()
        this.sleigh = new Sleigh()
    }

    update() {
        this.sleigh.update()
    }
}