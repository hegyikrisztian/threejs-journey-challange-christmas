import * as THREE from 'three'
import Game from "../Game";
import CANNON from 'cannon';
import { v4 as uuidv4 } from 'uuid';
import Fence from '../World/Fence';


export default class HouseColliders {

    constructor() {
        
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources
        this.resource = this.resources.items.houseColliders
        this.physicalWorld = this.game.physics

        this.setColliders()
    }

    setColliders() {

        this.resource.scene.traverse((child) => {
            if (child.isMesh && child.name.includes("house_collider")) {

                // Get geometry bounding box (local space)
                child.geometry.computeBoundingBox()
                const bbox = child.geometry.boundingBox
                const size = new THREE.Vector3()
                bbox.getSize(size)
                
                // Apply the mesh scale to the size
                size.multiply(child.scale)
                
                const shape = new CANNON.Box(
                    new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)
                )
                const body = new CANNON.Body({
                    mass: 0,
                    shape,
                })

                // Get world position and rotation
                const worldPosition = new THREE.Vector3()
                const worldQuaternion = new THREE.Quaternion()
                child.getWorldPosition(worldPosition)
                child.getWorldQuaternion(worldQuaternion)

                body.position.copy(worldPosition)
                body.quaternion.copy(worldQuaternion)
        
                this.physicalWorld.addBody(body, `house_collider${uuidv4()}`)
            }
        })
    }
}