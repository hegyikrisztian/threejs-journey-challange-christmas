import * as THREE from 'three'
import { EffectComposer, SMAAPass, RenderPass, UnrealBloomPass, GammaCorrectionShader, ShaderPass } from "three/examples/jsm/Addons.js";
import Game from "../Game";


export default class Effects {

    constructor() {

        this.game = new Game()
        this.debug = this.game.debug
        this.sizes = this.game.sizes
        this.scene = this.game.scene
        this.camera = this.game.camera.instance
        this.renderer = this.game.renderer.instance

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("EffectComposer")
        }

        this.setRenderTarget()
        this.setEffectComposer()
        this.addRenderPass()
        this.addBloomPass()
        this.addGammaCorrectionPass()
        this.addSMAAPass()
    }

    setRenderTarget() {
        this.renderTarget = new THREE.WebGLRenderTarget(
            800,
            600,
            {
                samples: this.renderer.getPixelRatio() === 1 ? 2 : 0
            }
        )
    }

    setEffectComposer() {
        this.effectComposer = new EffectComposer(
            this.renderer,
        )

        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
    }

    addRenderPass() {
        this.renderPass = new RenderPass(this.scene, this.camera)
        this.effectComposer.addPass(this.renderPass)
    }

    addBloomPass() {
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(this.sizes.width, this.sizes.height))
        this.bloomPass.strength = 0.05
        this.bloomPass.radius = 0.1
        this.bloomPass.threshold = 0.65
        this.bloomPass.enabled = true

        /* 
            0.08, 0.68, 0.16
            0.13, 0.77, 0.42
            0.1 ,  0.7, 0.5
        */

        if (this.debug.active) {
            this.debugFolder
                .add(this.bloomPass, "strength")
                .min(0)
                .max(2)
                .step(0.01)
                .name("bloomStrength")

            this.debugFolder
                .add(this.bloomPass, "radius")
                .min(0)
                .max(2)
                .step(0.01)
                .name("bloomRadius")

            this.debugFolder
                .add(this.bloomPass, "threshold")
                .min(0)
                .max(1)
                .step(0.01)
                .name("bloomThreshold")

            this.debugFolder
                .add(this.bloomPass, "enabled")
                .min(0)
                .max(1)
                .name("bloomEnabled")

        }

        this.effectComposer.addPass(this.bloomPass)
    }

    addGammaCorrectionPass() {
        this.gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
        this.effectComposer.addPass(this.gammaCorrectionPass)
    }

    addSMAAPass() {
        // if (this.renderer.getPixelRatio() === 1 && !this.renderer.capabilities.isWebGL2) {
            this.smaaPass = new SMAAPass()
            this.effectComposer.addPass(this.smaaPass)
        // }
    }

    resize() {
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        this.effectComposer.render()
    }
}