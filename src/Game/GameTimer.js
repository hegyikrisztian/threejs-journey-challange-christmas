import Game from "./Game";


export default class GameTimer {

    constructor() {
        
        this.game = new Game()
        this.gameTimeSeconds = 60
        this.isPasued = false
        this.isStarted = false
        this.isEnded = false

        this.gameTimerElement = document.querySelector(".game-time")
        this.interval = null
    }
    
    start() {
        this.reset()
        this.interval = setInterval(() => {

            if (this.game.isPlaying()) {
                this.gameTimeSeconds -= 1
        
                const minutes = Math.floor(this.gameTimeSeconds / 60).toString().padStart(2, '0')
                const seconds = (this.gameTimeSeconds % 60).toString().padStart(2, '0')
        
                this.gameTimerElement.innerHTML = `${minutes}:${seconds}`
            }
        }, 1000)
    }

    addTime(seconds) {
        this.gameTimeSeconds += seconds
    }

    reset() {
        this.gameTimeSeconds = 60
    }
    
    clear() {
        clearInterval(this.interval)
    }
    
    update() {

        // End
        if (this.gameTimeSeconds <= 0) {
            this.clear()
            this.game.end()
        }
    }
}