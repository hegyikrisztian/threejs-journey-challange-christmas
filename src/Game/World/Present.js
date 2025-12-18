import * as THREE from 'three'
import Game from '../Game'
import gsap from 'gsap'


const PRESENT_DEATH_OFFSET_MILISECONDS = 300
const PRESENT_DEATH_OFFSET_SECONDS = PRESENT_DEATH_OFFSET_MILISECONDS / 1000
const PRESENT_LIFE_MILISECONDS = 8000 + PRESENT_DEATH_OFFSET_MILISECONDS

export default class Present {

    constructor(position) {

        this.game = new Game()
        this.scene = this.game.scene
        this.time = this.game.time
        this.position = position
        
        this.alive = true
        this.start = Date.now()
        this.elapsed = Date.now()
        this.pickable = true

        this.setGeometry()
        this.setMaterial()
        this.setInstance(position)

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
        this.mesh.scale.multiplyScalar(0)

        this.scene.add(this.mesh)
    }

    destroy() {
        this.pickable = false
        
        gsap.to(
            this.mesh.scale,
            {
                x: 0,
                y: 0,
                z: 0,
                duration: PRESENT_DEATH_OFFSET_SECONDS,
                ease: "linear",
                onComplete: () => {
                    this.geometry.dispose()
                    this.material.dispose()
                    this.scene.remove(this.mesh)
                    
                    this.alive = false
                }
            }
        )
    }

    update() {
        if (this.elapsed - this.start > PRESENT_LIFE_MILISECONDS) {
            this.destroy()
        }
        else {
            if (this.mesh.scale.equals(new THREE.Vector3(0, 0, 0))) {
                gsap.to(
                    this.mesh.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: PRESENT_DEATH_OFFSET_SECONDS,
                        ease: "linear"
                    }
                )
            }

            const elapsedTimeSeconds = this.time.elapsed / 1000

            this.mesh.rotation.y = elapsedTimeSeconds
            this.mesh.position.y = Math.sin(elapsedTimeSeconds * 3) * 0.1 + 0.4
        }

        this.elapsed = Date.now()
    }
}