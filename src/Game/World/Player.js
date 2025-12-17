import Game from '../Game'
import Sleigh from './Sleigh'


const VICINITY_THRESHOLD = 0.5

export default class Player {

    constructor(presentSpawner) {
        
        this.game = new Game()
        this.worldPresents = presentSpawner.presents
        this.sleigh = new Sleigh()
        this.ownedPresentsCount = 0
        
    }

    update() {
        this.worldPresents.forEach(_present => {

            const minX = _present.mesh.position.x - VICINITY_THRESHOLD
            const maxX = _present.mesh.position.x + VICINITY_THRESHOLD
            const isInVicinityX = this.sleigh.group.position.x >= minX && this.sleigh.group.position.x <= maxX
            
            const minZ = _present.mesh.position.z - VICINITY_THRESHOLD
            const maxZ = _present.mesh.position.z + VICINITY_THRESHOLD
            const isInVicinityZ = this.sleigh.group.position.z >= minZ && this.sleigh.group.position.z <= maxZ
            
            const isInVicinity = isInVicinityX && isInVicinityZ
            
            if (_present.alive && isInVicinity) {
                this.ownedPresentsCount++
                _present.destroy()
            }
            
        })

        this.sleigh.update()
    }
}