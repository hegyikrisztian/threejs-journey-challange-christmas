import * as THREE from "three"
import Game from "../Game";
import EventEmitter from "../Utils/EventEmitter";
import SleighBody from "../Physics/SleighBody";


export default class Sleigh extends EventEmitter {

    constructor() {

        super()

        this.game = new Game()
        this.resources = this.game.resources
        this.inputs = this.game.inputs
        this.scene = this.game.scene

        // Models
        this.chassyResource = this.resources.items.chassy
        this.runnerLeftResource = this.resources.items.runnerLeft
        this.runnerRightResource = this.resources.items.runnerRight

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
        this.chassy = this.chassyResource.scene.children[0].clone()
        this.chassy.position.set(0, 0.35, 0)

        this.group.add(this.chassy)
    }

    setRightRunner() {
        this.rightRunner = this.runnerRightResource.scene.children[0].clone()
        this.rightRunner.position.set(-0.11, 0.15, -0.2)
        
        this.group.add(this.rightRunner)
    }
    
    setLeftRunner() {
        this.leftRunner = this.runnerLeftResource.scene.children[0].clone()
        this.leftRunner.position.set(-0.11, 0.15, 0.2)

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