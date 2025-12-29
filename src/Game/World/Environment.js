import * as THREE from "three"
import Game from "../Game";


export default class Environment {

    constructor() {

        this.game = new Game()
        this.resources = this.game.resources
        this.resource = this.resources.items.pointLightPositions
        this.scene = this.game.scene
        this.debug = this.game.debug
        
        if (this.debug.active) {
            this.debugObject = {}
            this.debugFolder = this.debug.ui.addFolder("Lights")
        }

        this.setAmbientLight()
        this.setPoleLights()
    }

    setAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(this.ambientLight);

        if (this.debug.active) {
            this.debugObject.ambientLightColor = 0xffffff

            this.debugFolder.add(this.ambientLight, "intensity", 0, 50, 0.01).name("ambientLightIntensity")
            this.debugFolder
                .addColor(this.debugObject, "ambientLightColor")
                .onChange(() => {
                    this.ambientLight.color.set(this.debugObject.ambientLightColor)
                })
        }
    }

    setPoleLights() {
        this.resource.scene.traverse((child) => {
            if (child.isObject3D) {
                const poleLight = new THREE.PointLight("#ffba3a", 5)
                poleLight.position.copy(child.position)

                this.scene.add(poleLight)
            }
        })
    }
}