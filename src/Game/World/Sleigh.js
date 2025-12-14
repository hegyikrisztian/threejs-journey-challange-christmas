import * as THREE from "three"
import Game from "../Game";
import EventEmitter from "../Utils/EventEmitter";


export default class Sleigh extends EventEmitter {

    constructor() {

        super()

        this.game = new Game()
        this.scene = this.game.scene
        this.physicalWorld = this.game.physics

        this.setGroup()
        this.setChassy()
        this.setRightRunner()
        this.setLeftRunner()
    }

    setGroup() {
        this.sleigh = new THREE.Group()
        this.scene.add(this.sleigh)
    }

    setChassy() {
        this.chassy = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.3, 0.5),
            new THREE.MeshNormalMaterial({}),
        )
        this.chassy.castShadow = true
        this.chassy.position.set(0, 0.15, 0)
        this.sleigh.add(this.chassy)
    }

    setRightRunner() {
        this.rightRunner = new THREE.Mesh(
            new THREE.BoxGeometry(1.1, 0.1, 0.14),
            new THREE.MeshNormalMaterial({}),
        )
        this.rightRunner.castShadow = true;
        this.rightRunner.position.set(0, 0.05, 0.21)
        this.sleigh.add(this.rightRunner)
    }

    setLeftRunner() {
        this.leftRunner = new THREE.Mesh(
            new THREE.BoxGeometry(1.1, 0.1, 0.14),
            new THREE.MeshNormalMaterial({}),
        )
        this.leftRunner.castShadow = true
        this.leftRunner.position.set(0, 0.05, -0.21)
        this.sleigh.add(this.leftRunner)
    }

    update() {
        const sleighBody = this.physicalWorld.bodies.find(body => body.name == "sleigh")
        
        this.sleigh.position.copy(sleighBody.body.position)
        this.sleigh.quaternion.copy(sleighBody.body.quaternion)
    }
}