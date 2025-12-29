import Ground from "./Ground";
import PresentSpawner from './PresentSpawner';
import Player from "./Player";
import PresentRequestor from "./PresentRequestor";
import Game from "../Game";
import FenceColliders from "../Physics/FenceColliders";
import Map from "./Map";
import HouseColliders from "../Physics/HouseColliders";
import PresentCounter from "./PresentCounter";
import SnowFall from "../Effects/SnowFall";


export default class World {

    constructor() {

        this.game = new Game()
        this.ground = new Ground()
        this.resources = this.game.resources
        
        this.resources.on("ready", () => {
            this.fenceColliders = new FenceColliders()
            this.houseColliders = new HouseColliders()
            this.map = new Map()
            this.presentSpawner = new PresentSpawner()
            this.presentRequestor = new PresentRequestor()
            this.presentCounter = new PresentCounter()
            this.player = new Player(this.presentSpawner, this.presentRequestor)
            this.snowFall = new SnowFall()
        })

    }

    reset() {
        this.presentRequestor.reset()
        this.presentCounter.reset()
        this.player.reset()
    }

    update() {
        this.presentSpawner.update()
        this.player.update()
        this.presentRequestor.update()
        this.snowFall.update()
    }
}