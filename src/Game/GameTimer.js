import * as THREE from 'three'
import Game from "./Game";



export default class GameTimer {

    constructor() {
        
        this.game = new Game()
        this.gameTime = 0
        this.isPasued = false
        this.isStarted = false
        this.isEnded = false
        
    }
}