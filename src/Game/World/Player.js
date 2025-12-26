import gsap from 'gsap'
import Game from '../Game'
import Sleigh from './Sleigh'


const PRESENT_VICINITY_THRESHOLD = 1

export default class Player {

    constructor(presentSpawner, presentRequestor) {
        
        this.game = new Game()
        this.worldPresents = presentSpawner.presents
        this.worldHouses = presentRequestor.houses
        this.sleigh = new Sleigh()
        this.ownedPresentsCount = 0
        this.deliveredPresentsCount = 0
        this.presentCounterElement = document.querySelector(".owned-presents-counter > p")
        
        // Deliver presents
        window.addEventListener("keypress", (event) => {
            
            if (event.code == "Enter") {

                this.worldHouses.forEach(_house => {

                    // Use the house base for calculations
                    // TODO* use house.model when model is in
                    const houseVicinityThresholdX = 2
                    const houseVicinityThresholdZ = 2

                    const minX = _house.house.position.x - houseVicinityThresholdX
                    const maxX = _house.house.position.x + houseVicinityThresholdX
                    const isInVicinityX = this.sleigh.group.position.x >= minX && this.sleigh.group.position.x <= maxX

                    const minZ = _house.house.position.z - houseVicinityThresholdZ
                    const maxZ = _house.house.position.z + houseVicinityThresholdZ
                    const isInVicinityZ = this.sleigh.group.position.z >= minZ && this.sleigh.group.position.z <= maxZ

                    const isInVicinity = isInVicinityX && isInVicinityZ
                    
                    if (_house.isRecievingPresents && isInVicinity) {

                        // If player has no presents shake counter
                        if (this.ownedPresentsCount == 0) {
                            gsap.to(
                                ".owned-presents-counter > p",
                                {
                                    x: "+=5",
                                    repeat: 5,
                                    yoyo: true,
                                    duration: 0.1
                                }
                            )
                            gsap.to(
                                ".owned-presents-counter > p",
                                {
                                    x: "-=5",
                                    repeat: 5,
                                    yoyo: true,
                                    duration: 0.1
                                }
                            )
                        }

                        const maxDeliverablePresents = _house.requestedPresentsCount - _house.recievedPresentsCount
                        const availablePresents = Math.min(this.ownedPresentsCount, maxDeliverablePresents)
                        
                        _house.recievedPresentsCount += availablePresents
                        
                        this.deliveredPresentsCount += availablePresents

                        this.ownedPresentsCount -= availablePresents
                        this.presentCounterElement.innerHTML = this.ownedPresentsCount
                    }
                    
                })
            }
        })

    }

    reset() {
        // debugger
        this.sleigh.group.position.set(0, 0, 0)
        this.sleigh.physical.body.position.set(0, 0, 0)
        this.ownedPresentsCount = 0
        this.deliveredPresentsCount = 0
        this.presentCounterElement.innerHTML = 0
    }

    update() {
        this.worldPresents.forEach(_present => {

            const minX = _present.mesh.position.x - PRESENT_VICINITY_THRESHOLD
            const maxX = _present.mesh.position.x + PRESENT_VICINITY_THRESHOLD
            const isInVicinityX = this.sleigh.group.position.x >= minX && this.sleigh.group.position.x <= maxX
            
            const minZ = _present.mesh.position.z - PRESENT_VICINITY_THRESHOLD
            const maxZ = _present.mesh.position.z + PRESENT_VICINITY_THRESHOLD
            const isInVicinityZ = this.sleigh.group.position.z >= minZ && this.sleigh.group.position.z <= maxZ
            
            const isInVicinity = isInVicinityX && isInVicinityZ
            
            if (_present.pickable && isInVicinity) {
                this.ownedPresentsCount++
                this.presentCounterElement.innerHTML = this.ownedPresentsCount
                _present.destroy()
            }
            
        })
        console.log(this.sleigh.group.position);
        this.sleigh.update()
    }
}