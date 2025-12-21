import gsap from "gsap";
import Game from "./Game";


export default class Menu {

    constructor() {

        this.game = new Game()
        this.gameTimer = this.game.gameTimer
        this.world = this.game.world
        this.player = this.world.player
        
        this.playButtonElement = document.querySelector(".btn-play")
        this.continueButtonElement = document.querySelector(".btn-continue")
        this.endMenuElement = document.querySelector(".end-menu-wrapper > span")
        this.playAgainButtonElement = document.querySelector(".end-menu-wrapper > button")

        this.setPlayButton()
        this.setPause()
        this.setContinueButton()
        this.setPlayAgainButton()
    }

    hideBackdrop() {
        gsap.to(
            ".menu-backdrop",
            {
                backdropFilter: "blur(0px)",
                duration: 0.5,
                stagger: 0.3,
                ease: "linear",
                onComplete: () => {
                    gsap.set(
                        ".menu-backdrop",
                        {
                            translateY: 1000,
                            ease: "linear"
                        }
                    )
                }
            }
        )
    }

    showBackdrop() {
        gsap.set(
            ".menu-backdrop",
            {
                translateY: 0,
                ease: "linear",
                onComplete: () => {
                    gsap.to(
                        ".menu-backdrop",
                        {
                            backdropFilter: "blur(5px)",
                            duration: 0.5,
                            stagger: 0.3,
                            ease: "linear",
                        }
                    )
                }
            }
        )
    }

    handleMenu(target, action) {
        if (typeof target != "string" || !["hide", "show"].includes(action)) {
            throw new Error("Wrong parameters for handleMenu")
        }

        const _translateY = action == "show" ? -60 : 500
        gsap.to(
            target,
            {
                translateY: _translateY,
                duration: 0.5,
                ease: "elastic.inOut(1,0.75)",
            }
        )
    }

    // Start
    setPlayButton() {
        this.playButtonElement.onclick = () => {
            this.handleMenu(".menu-wrapper", "hide")
            this.hideBackdrop()

            this.game.start()            
        }
    }
    
    // Pause
    setPause() {
        window.addEventListener("keydown", (event) => {
            if (event.code == "Escape" && this.game.isPlaying()) {
                this.showBackdrop()
                this.handleMenu(".pause-menu-wrapper", "show")

                this.game.pause()
            }
        })
    }

    // Continue
    setContinueButton() {
        this.continueButtonElement.onclick = () => {
            this.handleMenu(".pause-menu-wrapper", "hide")
            this.hideBackdrop()

            this.game.continue()
        }
    }

    // End
    showEndMenu() {
        this.showBackdrop()
        this.handleMenu(".end-menu-wrapper", "show")

        this.endMenuElement.innerHTML = `You delivered ${this.player.deliveredPresentsCount} presents!`
    }

    // Play again
    setPlayAgainButton() {
        this.playAgainButtonElement.onclick = () => {
            this.handleMenu(".end-menu-wrapper", "hide")
            this.hideBackdrop()

            this.game.start()    
        }
    }
}