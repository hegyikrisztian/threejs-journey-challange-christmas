import * as THREE from 'three'
import Game from '../Game'
import EventEmitter from '../Utils/EventEmitter'


export default class Present extends EventEmitter {
    constructor(position) {
        
        super()

        this.game = new Game()
        this.scene = this.game.scene
        this.time = this.game.time
        this.position = position
        
        this.alive = true
        this.start = 0
        this.PRESENT_LIFE_MILISECONDS = 6000

        this.setGeometry()
        this.setMaterial()
        this.setInstance(position)

        this.on("tick", () => {
            if (this.alive) {
                
                this.update()
            }
        })
    }

    setGeometry() {
        this.geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({ color: "red" })
    }

    setInstance(position) {
        if (!position.x || !position.y) {
            throw new Error("Present needs (x, y) values to set position.")
        }

        this.mesh = new THREE.Mesh(this.geometry, this.material)

        const _position = new THREE.Vector3(
            position.x,
            0.3,
            position.y
        )
        this.mesh.position.copy(_position)

        this.scene.add(this.mesh)
    }

    update() {
        
        if (this.time.elapsed - this.start > this.PRESENT_LIFE_MILISECONDS) {
            this.geometry.dispose()
            this.material.dispose()
            this.scene.remove(this.mesh)

            this.alive = false
        }
        else {
            const elapsedTimeSeconds = this.time.elapsed / 1000
            this.mesh.rotation.y = elapsedTimeSeconds
            this.mesh.position.y = Math.sin(elapsedTimeSeconds * 3) * 0.1 + 0.4
        }
    }
}