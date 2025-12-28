import * as THREE from 'three'
import Game from "../Game";
import HouseBody from '../Physics/HouseBody';
import { v4 as uuidv4 } from 'uuid';
import gsap from 'gsap';


export default class House {

    constructor(position, rotation, type = 1) {
        
        if (!position.x || !position.y) {
            throw new Error("House needs (x, y) values to set position.")
        }

        if (typeof type !== "number" || type < 0 || type > 3) {
            throw new Error("House type can only be 1, 2 or 3 (number)")
        }

        this.game = new Game()
        this.resources = this.game.resources
        this.resource = this.resources.items[`house_${type}`]

        this.gameTimer = this.game.gameTimer
        this.scene = this.game.scene
        this.camera = this.game.camera
        this.position = new THREE.Vector3().copy({
            x: position.x,
            y: position.y,
            z: position.z
        })
        this.rotation = rotation
        this.id = uuidv4()
        this.type = type

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
        this.canvas.context.strokeStyle = "black"
        this.canvas.context.lineWidth = 20
        this.canvas.context.lineJoin = "round"
        
        this.setModel()
        this.setSpotlight()
        this.setScoreboardGeometry()
        this.setScoreboardMaterial()
        this.setScoreboardInstance()
        this.setPhysical()
    }
    
    setModel() {
        this.house = this.resource.scene.children[0].clone()
        this.house.position.copy(this.position)
        this.house.rotation.copy(this.rotation)
        
        this.house.castShadow = true
        this.house.recieveShadow = true
        this.scene.add(this.house)
    }

    setSpotlight() {
        this.spotlight = new THREE.SpotLight("#ffba3a", 0, 10, Math.PI / 6, 0.5, 1)
        this.spotlight.position.set(this.position.x, 8, this.position.z)
        this.spotlight.target.position.set(this.position.x, 0, this.position.z)
        // Don't cast shadows to save texture units (avoids GPU texture limit)
        this.spotlight.castShadow = false
        
        this.scene.add(this.spotlight)
        this.scene.add(this.spotlight.target)
    }

    setScoreboardGeometry() {
        this.scoreboardGeometry = new THREE.PlaneGeometry(2, 1)
    }

    setScoreboardMaterial() {
        this.canvasTexture = new THREE.CanvasTexture(this.canvas.element)
        this.scoreboardMaterial = new THREE.MeshBasicMaterial({
            map: this.canvasTexture,
            transparent: true,
        })
    }

    setScoreboardInstance() {
        this.scoreboard = new THREE.Mesh(this.scoreboardGeometry, this.scoreboardMaterial)
        
        // Position in front of house
        const offset = new THREE.Vector3(0, 0, 3)
        offset.applyEuler(this.rotation)
        
        this.scoreboard.position.set(
            this.position.x + offset.x,
            4,
            this.position.z + offset.z
        )
        this.scoreboard.lookAt(this.camera.instance.position)

        this.scene.add(this.scoreboard)
    }


    setPhysical() {
        this.physical = new HouseBody(this.position, this.id)
    }

    reset() {
        this.isRecievingPresents = false
        this.recievedPresentsCount = 0
        this.spotlight.intensity = 0
        this.resetScoreboard()
    }

    resetScoreboard() {
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
    }

    update() {

        // Control spotlight based on isRecievingPresents
        if (this.isRecievingPresents) {
            if (this.spotlight.intensity === 0) {
                gsap.to(this.spotlight, { intensity: 50, duration: 0.3 })
            }
            
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
                            this.canvas.context.strokeText(text, 0, 225)
                            this.canvas.context.fillText(text, 0, 225)
                            this.canvasTexture.needsUpdate = true
                        }
                    }
                )
            }
            else {
                this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height)
                this.canvas.context.strokeText(text, 0, 225)
                this.canvas.context.fillText(text, 0, 225)
                this.canvasTexture.needsUpdate = true
            }
        }

        if (this.requestedPresentsCount == this.recievedPresentsCount) {
            this.resetScoreboard()
            
            // Turn off spotlight
            gsap.to(this.spotlight, { intensity: 0, duration: 0.3 })
            
            // Add time to game timer
            const bonusTime = Math.ceil(this.requestedPresentsCount * 1.5) + 1
            this.gameTimer.addTime(bonusTime)

            // Reset
            this.isRecievingPresents = false
            this.recievedPresentsCount = 0
        }
    }
}