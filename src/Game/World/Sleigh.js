import * as THREE from "three"
import Game from "../Game";
import EventEmitter from "../Utils/EventEmitter";
import SleighBody from "../Physics/SleighBody";


export default class Sleigh extends EventEmitter {

    constructor() {

        super()

        this.game = new Game()
        this.inputs = this.game.inputs
        this.scene = this.game.scene

        this.setGroup()
        this.setChassy()
        this.setRightRunner()
        this.setLeftRunner()
        this.setPhysical()

    }

    setGroup() {
        this.group = new THREE.Group()

        this.scene.add(this.group)
    }

    setChassy() {
        this.chassy = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.3, 0.5),
            new THREE.MeshNormalMaterial({}),
        )
        this.chassy.castShadow = true
        this.chassy.position.set(0, 0.15, 0)

        this.group.add(this.chassy)
    }

    setRightRunner() {
        this.rightRunner = new THREE.Mesh(
            new THREE.BoxGeometry(1.1, 0.1, 0.14),
            new THREE.MeshNormalMaterial({}),
        )
        this.rightRunner.castShadow = true;
        this.rightRunner.position.set(0, 0.05, 0.21)

        this.group.add(this.rightRunner)
    }

    setLeftRunner() {
        this.leftRunner = new THREE.Mesh(
            new THREE.BoxGeometry(1.1, 0.1, 0.14),
            new THREE.MeshNormalMaterial({}),
        )
        this.leftRunner.castShadow = true
        this.leftRunner.position.set(0, 0.05, -0.21)

        this.group.add(this.leftRunner)
    }

    setPhysical() {
        this.physical = new SleighBody()
    }

    update() {
        this.physical.update()
        
        this.group.position.copy(this.physical.body.position)
        this.group.quaternion.copy(this.physical.body.quaternion)
    }
}