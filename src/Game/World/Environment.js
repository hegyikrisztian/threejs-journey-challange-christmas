import * as THREE from "three"
import Game from "../Game";


export default class Environment {

    constructor() {

        this.game = new Game()
        this.scene = this.game.scene
        this.debug = this.game.debug
        
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("Lights")
            this.debugObject = {}
        }

        this.setAmbientLight()
        // this.setDirectionalLight()
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

        this.pointLight = new THREE.PointLight(0xffffff, 10)
        this.pointLight.position.y = 3
        this.scene.add(this.pointLight)
    }

    setDirectionalLight() {
        this.scene.add(new THREE.AxesHelper())
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        this.directionalLight.position.x = -6;
        this.directionalLight.position.y = 2;
        this.directionalLight.castShadow = true;
        
        // Configure shadow camera to cover your map area
        this.directionalLight.shadow.camera.top = 20
        this.directionalLight.shadow.camera.right = 20
        this.directionalLight.shadow.camera.bottom = -20
        this.directionalLight.shadow.camera.left = -20
        this.directionalLight.shadow.camera.near = 0.1
        this.directionalLight.shadow.camera.far = 40
        
        // Higher resolution for better shadow quality
        this.directionalLight.shadow.mapSize.width = 2048
        this.directionalLight.shadow.mapSize.height = 2048
        
        // Reduce shadow bias for better self-shadowing
        this.directionalLight.shadow.bias = -0.0001
        this.directionalLight.shadow.normalBias = 0.02
        
        this.scene.add(this.directionalLight);

        if (this.debug.active) {
            this.debugObject.directionalLightColor = 0xffffff

            this.debugFolder
                .add(this.directionalLight, 'intensity')
                .name('directionalLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.directionalLight.position, 'x')
                .name('directionalLightX')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.directionalLight.position, 'y')
                .name('directionalLightY')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.directionalLight.position, 'z')
                .name('directionalLightZ')
                .min(-5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .addColor(this.debugObject, "directionalLightColor")
                .onChange(() => {
                    this.directionalLight.color.set(this.debugObject.directionalLightColor)
                })
        }
    }
}