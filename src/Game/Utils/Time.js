import EventEmitter from "./EventEmitter";


export default class Time extends EventEmitter {

    constructor() {
        
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 0.016  // ~60fps in seconds

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        const currentTime = Date.now()
        this.delta = (currentTime - this.current) / 1000  // Convert to seconds
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger("tick")

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

}