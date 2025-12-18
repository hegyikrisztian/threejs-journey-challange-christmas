import * as THREE from 'three'
import Game from "../Game";
import HouseBody from '../Physics/HouseBody';


export default class House {

    constructor(position) {
        
        if (!position.x || !position.y) {
            throw new Error("HOuse needs (x, y) values to set position.")
        }

        this.game = new Game()
        this.scene = this.game.scene
        this.position = new THREE.Vector3().copy({
            x: position.x,
            y: 0.5,
            z: position.y
        })
        this.requestedPresentsCount = 0
        this.isRecievingPresents = false

        this.setGroup()
        this.setGeometry()
        this.setMaterial()
        this.setInstance()
        this.setPhysical()
    }

    setGroup() {
        this.house = new THREE.Group()
        this.house.position.copy(this.position)
        this.scene.add(this.house)
    }

    setGeometry() {
        this.topGeometry = new THREE.ConeGeometry(1.5, 0.5, 4, 1)
        this.baseGeometry = new THREE.BoxGeometry(2, 1, 2)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({ color: "#382720" })
    }

    setInstance() {
        this.top = new THREE.Mesh(this.topGeometry, this.material)
        this.top.rotation.y = Math.PI * 0.25
        this.top.position.y = 0.8
        this.top.castShadow = true
        this.top.recieveShadow = true
        
        this.base = new THREE.Mesh(this.baseGeometry, this.material)
        this.base.castShadow = true
        this.base.recieveShadow = true

        this.house.add(this.top)
        this.house.add(this.base)
    }

    setPhysical() {
        this.physical = new HouseBody(this.position)
    }

}