import Game from "../Game";
import House from "./House";


export default class PresentRequestor {

    constructor() {

        this.game = new Game()
        this.elapsed = 0

        // Store these 2 values inside class, to change it as game goes on
        // to increase difficulty
        this.requestInterval = 600
        this.maxRequestorCount = 4

        this.houses = [
            new House({ x: 5, y: 5 }),
            new House({ x: 1, y: -3 }),
            new House({ x: -7, y: 2 }),
            new House({ x: 1, y: 9 }),
            new House({ x: 10, y: -1 }),
            new House({ x: 7, y: 6 }),
            new House({ x: 1, y: 1 }),
            new House({ x: -6, y: -2 }),
        ]
        
    }

    update() {
        // Make a house request presents every SPAWN_INTERVAL
        const requestingHouses = this.houses.filter(h => h.isRecievingPresents)
        if (this.elapsed % this.requestInterval == 0 && requestingHouses.length < this.maxRequestorCount) {
            // Pick a random house
            let randIndex

            while (!this.houses.find((h, i) => !h.isRecievingPresents && i == randIndex)) {
                randIndex =  Math.floor(0 + Math.random() * this.houses.length)
            }

            const house = this.houses.find((h, i) => !h.isRecievingPresents && i == randIndex)
            if (house) {
                house.isRecievingPresents = true
                house.requestedPresentsCount = 1 + Math.trunc(Math.random() * 6)
            }
        }

        this.houses.forEach(h => h.isRecievingPresents && h.update())

        this.elapsed++
    }
}