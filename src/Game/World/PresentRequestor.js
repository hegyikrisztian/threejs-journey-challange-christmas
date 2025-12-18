import Game from "../Game";
import House from "./House";


const REQUEST_INTERVAL = 600
const MAX_REQUESTORS_COUNT = 4

export default class PresentRequestor {

    constructor() {

        this.game = new Game()
        this.elapsed = 0
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
        if (this.elapsed % REQUEST_INTERVAL == 0 && requestingHouses.length < MAX_REQUESTORS_COUNT) {
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

            console.log(`I'm a new house ${house.physical.id} and requesting ${house.requestedPresentsCount} presents`);
        }

        this.elapsed++
    }
}