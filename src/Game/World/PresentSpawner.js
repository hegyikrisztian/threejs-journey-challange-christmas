import * as THREE from 'three'
import Game from '../Game'
import Present from './Present'


const SPAWN_INTERVAL = 600

export default class PresentSpawner {

    constructor() {
        
        this.game = new Game()
        this.elapsed = 0

        this.presents = []
        this.possiblePositions = [
            {
                available: true,
                vector: new THREE.Vector2(1, 8)
            },
            {
                available: true,
                vector: new THREE.Vector2(1, 9)
            },
            {
                available: true,
                vector: new THREE.Vector2(2, 4)
            },
            {
                available: true,
                vector: new THREE.Vector2(1, 8)
            },
            {
                available: true,
                vector: new THREE.Vector2(1, 8)
            },
            {
                available: true,
                vector: new THREE.Vector2(1, 2)
            },
            {
                available: true,
                vector: new THREE.Vector2(1, 3)
            },
            {
                available: true,
                vector: new THREE.Vector2(8, 1)
            },
            {
                available: true,
                vector: new THREE.Vector2(1, 8)
            },
            {
                available: true,
                vector: new THREE.Vector2(5, 3)
            },
            {
                available: true,
                vector: new THREE.Vector2(5, 5)
            },
            {
                available: true,
                vector: new THREE.Vector2(1, 1)
            },
            {
                available: true,
                vector: new THREE.Vector2(1, 1)
            },
            {
                available: true,
                vector: new THREE.Vector2(1, 2)
            },
            {
                available: true,
                vector: new THREE.Vector2(6, 1)
            },
            {
                available: true,
                vector: new THREE.Vector2(6, 2)
            },
            {
                available: true,
                vector: new THREE.Vector2(6, 3)
            },
        ]
    }

    update() {
        
        // Spawn a present every SPAWN_INTERVAL
        if (this.elapsed % SPAWN_INTERVAL == 0) {

            // Loop until we get and index that is both available and random
            let randIndex

            while (!this.possiblePositions.find((p, i) => p.available && i == randIndex)) {
                randIndex =  Math.floor(0 + Math.random() * this.possiblePositions.length)
            }

            const availablePosition = this.possiblePositions.find((p, i) => p.available && i == randIndex)
            if (availablePosition) {
                this.presents.push(new Present(availablePosition.vector))
                availablePosition.available = false
            }
        }

        // Update presents
        this.presents.forEach((p, i) => {
            if (p.alive) {
                p.update()
            }
            else {
                
                // Make position available again
                const presentPosition = this.possiblePositions.find(_position => {

                    const _vector = new THREE.Vector3(
                        _position.vector.x,
                        p.mesh.position.y,
                        _position.vector.y,  // Since I store 2D positions in possiblePositions
                    )

                    return _vector.equals(p.mesh.position)
                })

                if (presentPosition) presentPosition.available = true

                // Remove
                this.presents.splice(i, 1)
                
            }
        })

        this.elapsed++
    }
}