import * as THREE from "three"
import Game from "../Game"
import GroundBody from "../Physics/GroundBody"


export default class Ground {

    constructor() {

        this.game = new Game()
        this.scene = this.game.scene
        
        // this.setGeometry()
        // this.setMaterial()
        // this.setMesh()
        this.setPhysical()
    }
    
    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(1, 1)
    }
    
    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: "white",
            metalness: 0.7,
            roughness: 0.5,
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.mesh.rotation.x = -Math.PI * 0.5
        this.mesh.scale.x = 16
        this.mesh.scale.y = 8
        
        // this.scene.add(this.mesh)
    }

    setPhysical() {
        this.physical = new GroundBody()
    }
}