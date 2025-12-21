import Game from "../Game"


export const KEYS = {
    W: "KeyW",
    S: "KeyS",
    A: "KeyA",
    D: "KeyD",
    Esc: "Escape",
    Enter: "Enter"
}

const sleighControlKeys = [KEYS.W, KEYS.S, KEYS.A, KEYS.D]

export default class Inputs {

    constructor() {

        this.game = new Game()
        this.menu = this.game.menu

        this.keyboardInputs = {
            KeyW: false,
            KeyS: false,
            KeyA: false,
            KeyD: false,
        }

        window.addEventListener("keydown", (event) => {

            // Activate sleigh controls
            if (sleighControlKeys.includes(event.code)) {
                this.setKey(event.code, true)
            }

            // Pause game
            if (event.code == "Escape" && this.game.isPlaying()) {
                this.menu.showBackdrop()
                this.menu.handleMenu(".pause-menu-wrapper", "show")

                this.game.pause()
            }
        })
        
        window.addEventListener("keyup", (event) => {

            // Deactivate sleigh controls
            if (sleighControlKeys.includes(event.code)) {
                this.setKey(event.code, false)
            }
        })
    }

    getIsKeyActive(keyCode) {
        return this.keyboardInputs[keyCode]
    }

    setKey(keyCode, active) {
        this.keyboardInputs[keyCode] = active
    }
}