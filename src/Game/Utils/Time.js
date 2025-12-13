import EventEmitter from "./EventEmitter";


export default class Time extends EventEmitter {

    constructor() {
        
        super()

        this.start = new Date()
        this.current = this.start
        this.elapsed = 0
        this.delta = 7

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        const currentTime = Date.now()
        this.current = currentTime
        this.delta = currentTime - this.current
        this.elapsed = this.current - this.start

        this.trigger("tick")

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

}