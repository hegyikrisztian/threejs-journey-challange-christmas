import * as THREE from 'three'
import Game from "../Game";
import CANNON from 'cannon';
import { v4 as uuidv4 } from 'uuid';
import Fence from '../World/Fence';


export default class FenceColliders {

    constructor() {
        
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources
        this.resource = this.resources.items.fenceColliders
        this.physicalWorld = this.game.physics
        this.debug = this.game.debug

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("FenceColliders")
        }

        this.setColliders()
    }

    setColliders() {

        this.resource.scene.traverse((child) => {
            if (child.isMesh && child.name.includes("fencecollider")) {

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
        
                this.physicalWorld.addBody(body, `fence_collider${uuidv4()}`)

                // Add to scene
                const fenceModel = new Fence(worldPosition, worldQuaternion)
                this.scene.add(fenceModel.mesh)
            }
        })
    }
}