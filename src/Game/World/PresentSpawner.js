import * as THREE from 'three'
import Game from '../Game'
import Present from './Present'


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
        this.SPAWN_INTERVAL = 600
    }

    update() {
        // Spawn a present every SPAWN_INTERVAL_SECONDS
        
        if (this.elapsed % this.SPAWN_INTERVAL == 0) {
        
            // Find the first available position
            const availablePosition = this.possiblePositions.find(p => p.available)
            availablePosition.available = false
            if (availablePosition) {
                this.presents.push(new Present(availablePosition.vector))
            }
        }

        // Always filter array based on present's life
        this.presents = this.presents.filter(p => p.alive)

        this.elapsed++
    }
}