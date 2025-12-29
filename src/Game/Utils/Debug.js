import GUI from "lil-gui"


export default class Debug {

    constructor() {
        
        this.active = false  // window.location.hash.includes("#debug")

        if (this.active) {
            this.ui = new GUI({ width: 200 })
        }
    }
}