import * as THREE from 'three'
import Game from '../Game'
import gsap from 'gsap'


const PRESENT_DEATH_OFFSET_MILISECONDS = 300
const PRESENT_DEATH_OFFSET_SECONDS = PRESENT_DEATH_OFFSET_MILISECONDS / 1000
const PRESENT_LIFE_MILISECONDS = 8000 + PRESENT_DEATH_OFFSET_MILISECONDS

const typeLightColorMap = {
    1: "#ffba3a",
    2: "#3ad1ff"
}

export default class Present {

    constructor(position, type = 1) {

        if (typeof position.x !== "number" || typeof position.y !== "number") {
            throw new Error("Present needs (x, y) values to set position.")
        }

        if (typeof type !== "number" || type < 0 || type > 2) {
            throw new Error("House type can only be 1, 2 (number)")
        }

        this.game = new Game()
        this.resources = this.game.resources
        this.resource = this.resources.items[`present_${type}`]
        this.scene = this.game.scene
        this.time = this.game.time
        this.position = position
        
        this.type = type
        this.alive = true
        this.start = Date.now()
        this.elapsed = Date.now()
        this.pickable = true

        this.setModel(position)

    }

    setModel(position) {
        this.mesh = this.resource.scene.children[0].clone()

        const _position = new THREE.Vector3(
            position.x,
            0.3,
            position.y
        )
        this.mesh.position.copy(_position)
        this.mesh.scale.multiplyScalar(0)

        // Light model
        this.pointLight = new THREE.PointLight(typeLightColorMap[this.type], 0)
        this.pointLight.position.set(
            position.x,
            this.type === 1 ? 0.8 : 1,
            position.y
        )
        
        this.scene.add(this.pointLight)
        this.scene.add(this.mesh)
    }

    destroy() {
        this.pickable = false
        
        gsap.to(
            this.pointLight,
            {
                intensity: 0,
                duration: PRESENT_DEATH_OFFSET_SECONDS,
                ease: "linear",
                onComplete: () => {
                    this.scene.remove(this.pointLight)
                }
            }
        )

        gsap.to(
            this.mesh.scale,
            {
                x: 0,
                y: 0,
                z: 0,
                duration: PRESENT_DEATH_OFFSET_SECONDS,
                ease: "linear",
                onComplete: () => {
                    // Properly dispose of geometries and materials
                    this.mesh.traverse((child) => {
                        if (child.isMesh) {
                            if (child.geometry) child.geometry.dispose()
                            
                            if (child.material) {
                                if (Array.isArray(child.material)) {
                                    child.material.forEach(material => material.dispose())
                                } else {
                                    child.material.dispose()
                                }
                            }
                        }
                    })

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

            if (this.pointLight.intensity === 0) {
                gsap.to(
                    this.pointLight,
                    {
                        intensity: 0.7,
                        duration: PRESENT_DEATH_OFFSET_SECONDS,
                        ease: "linear",
                    }
                )
            }
        }

        this.elapsed = Date.now()
    }
}