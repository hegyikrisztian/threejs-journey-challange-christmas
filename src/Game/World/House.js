import * as THREE from 'three'
import Game from "../Game";
import HouseBody from '../Physics/HouseBody';
import { v4 as uuidv4 } from 'uuid';
import gsap from 'gsap';


export default class House {

    constructor(position) {
        
        if (!position.x || !position.y) {
            throw new Error("HOuse needs (x, y) values to set position.")
        }

        this.game = new Game()
        this.gameTimer = this.game.gameTimer
        this.scene = this.game.scene
        this.camera = this.game.camera
        this.position = new THREE.Vector3().copy({
            x: position.x,
            y: 0.5,
            z: position.y
        })
        this.id = uuidv4()

        this.recievedPresentsCount = 0
        this.requestedPresentsCount = 0
        this.isRecievingPresents = false
        this.canvas = {}
        this.canvas.element = document.createElement("canvas")
        
        this.canvas.element.id = `canvas_${this.id}`
        this.canvas.element.width = 500
        this.canvas.element.height = 250
        this.canvas.element.style.position = 'fixed'
        this.canvas.element.style.width = '160px'
        this.canvas.element.style.height = '80px'
        this.canvas.element.style.top = 0
        this.canvas.element.style.left = 0
        this.canvas.element.style.zIndex = 10

        this.canvas.context = this.canvas.element.getContext("2d")
        this.canvas.context.font = "250px Titan One, sans-serif"
        this.canvas.context.fillStyle = "white"
        this.canvas.context.strokeStyle = "white"
        
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
        this.scoreboardGeometry = new THREE.PlaneGeometry(1, 0.5)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({ color: "#382720" })
        this.canvasTexture = new THREE.CanvasTexture(this.canvas.element)
        this.scoreboardMaterial = new THREE.MeshBasicMaterial({
            map: this.canvasTexture,
            transparent: true
        })
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

        this.scoreboard = new THREE.Mesh(this.scoreboardGeometry, this.scoreboardMaterial)
        this.scoreboard.position.set(
            this.position.x,
            this.position.y + 1.4,
            this.position.z
        )
        // this.scoreboard.scale.multiplyScalar(0)
        this.scoreboard.lookAt(this.camera.instance.position)

        this.scene.add(this.scoreboard)
        this.house.add(this.top)
        this.house.add(this.base)
    }

    setPhysical() {
        this.physical = new HouseBody(this.position, this.id)
    }

    update() {

        if (this.isRecievingPresents) {
            
            const text = `${this.recievedPresentsCount}/${this.requestedPresentsCount}`

            // Scale up
            if (this.scoreboard.scale.equals(new THREE.Vector3())) {
                gsap.to(
                    this.scoreboard.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.5,
                        ease: "elastic.inOut(1,0.75)",
                        onComplete: () => {
                            this.canvas.context.fillText(text, 0, 225)
                            this.canvasTexture.needsUpdate = true
                        }
                    }
                )
            }
            else {
                this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height)
                this.canvas.context.fillText(text, 0, 225)
                this.canvasTexture.needsUpdate = true
            }
        }

        if (this.requestedPresentsCount == this.recievedPresentsCount) {
            gsap.to(
                this.scoreboard.scale,
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 0.5,
                    ease: "elastic.inOut(1,0.75)",
                    onComplete: () => {
                        this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height)
                        this.canvasTexture.needsUpdate = true
                    }
                }
            )

            gsap.set(
                ".bonus-time",
                {
                    opacity: 1,
                    transform: "unset"
                }
            )

            gsap.to(
                ".bonus-time",
                {
                    opacity: 0,
                    translateY: 60,
                    duration: 0.7,
                    delay: 0.2,
                    ease: "back.inOut"
                }
            )

            // Add time to game timer
            this.gameTimer.addTime(6)

            // Reset
            this.isRecievingPresents = false
            this.recievedPresentsCount = 0
        }
    }
}