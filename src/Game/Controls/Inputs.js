

export const KEYS = {
    W: "KeyW",
    S: "KeyS",
    A: "KeyA",
    D: "KeyD",
}

export default class Inputs {

    constructor() {

        this.keyboardInputs = {
            KeyW: false,
            KeyS: false,
            KeyA: false,
            KeyD: false,
        }

        window.addEventListener("keydown", (event) => {
            this.setKey(event.code, true)
        })

        window.addEventListener("keyup", (event) => {
            this.setKey(event.code, false)
        })
    }

    getIsKeyActive(keyCode) {
        return this.keyboardInputs[keyCode]
    }

    setKey(keyCode, active) {
        this.keyboardInputs[keyCode] = active
    }
}