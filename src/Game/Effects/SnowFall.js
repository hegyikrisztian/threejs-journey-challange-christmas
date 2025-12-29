import * as THREE from 'three'
import Game from "../Game";


export default class SnowFall {
    constructor() {
        
        this.game = new Game()
        this.resources = this.game.resources
        this.resource = this.resources.items.snowFlakeTexture
        this.scene = this.game.scene
        this.time = this.game.time

        this.count = 2000

        this.setGeometry()
        this.setMaterial()
        this.setPositionAttribute()
        this.setVelocityAttribute()
        this.setPoints()
    }

    setGeometry() {
        this.geometry = new THREE.BufferGeometry()
    }

    setMaterial() {
        this.material = new THREE.PointsMaterial({
            map: this.resource,
            transparent: true,
            size: 0.5,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })
    }

    setPoints() {
        this.points = new THREE.Points(this.geometry, this.material)

        this.scene.add(this.points)
    }

    setPositionAttribute() {
        this.positions = new Float32Array(this.count * 3)
        
        for (let i = 0; i < this.positions.length; i++) {
            const i3 = i * 3

            this.positions[i3 + 0] = Math.random() * 30 - 15
            this.positions[i3 + 1] = Math.random() * 15 + 16
            this.positions[i3 + 2] = Math.random() * 50 - 25
        }

        this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.positions, 3))
    }

    setVelocityAttribute() {
        this.velocities = new Float32Array(this.count * 3)

        for (let i = 0; i < this.velocities.length; i++) {
            const i3 = i * 3

            this.velocities[i3 + 0] = Math.floor(Math.random() * 3 - 1.5)
            this.velocities[i3 + 1] = Math.abs(Math.random() * 5 - 0.12)
            this.velocities[i3 + 2] = Math.floor(Math.random() * 3 - 1.5)
        }

        this.geometry.setAttribute("aVelocity", new THREE.Float32BufferAttribute(this.velocities, 3))
    }

    update() {

        for (let i = 0; i < this.count * 3; i++) {
            const i3 = i * 3

            this.points.geometry.attributes.position.array[i3 + 0] -= this.points.geometry.attributes.aVelocity.array[i3 + 0] * 0.1 * (this.time.delta * 60) * 0.1
            this.points.geometry.attributes.position.array[i3 + 1] -= this.points.geometry.attributes.aVelocity.array[i3 + 1] * 0.06 * (this.time.delta * 60) * 0.4
            this.points.geometry.attributes.position.array[i3 + 2] -= this.points.geometry.attributes.aVelocity.array[i3 + 2] * 0.1 * (this.time.delta * 60) * 0.1

            if (this.points.geometry.attributes.position.array[i3 + 1] <= 0) {
                this.points.geometry.attributes.position.array[i3 + 0] = Math.random() * 30 - 15
                this.points.geometry.attributes.position.array[i3 + 1] = Math.random() * 15 + 16
                this.points.geometry.attributes.position.array[i3 + 2] = Math.random() * 50 - 25
            }
        }

        this.points.geometry.attributes.position.needsUpdate = true
    }
}