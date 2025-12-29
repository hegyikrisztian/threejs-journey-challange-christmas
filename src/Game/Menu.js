import gsap from "gsap";
import Game from "./Game";


export default class Menu {

    constructor() {

        this.game = new Game()
        this.gameTimer = this.game.gameTimer
        
        this.playButtonElement = document.querySelector(".btn-play")
        this.continueButtonElement = document.querySelector(".btn-continue")
        this.endMenuElement = document.querySelector(".end-menu-wrapper > span")
        this.playAgainButtonElement = document.querySelector(".end-menu-wrapper > button")
        this.tutorialButtonElement = document.querySelector(".btn-tutorial")
        this.tutorialBackButtonElement = document.querySelector(".tutorial-menu-wrapper > button")
        this.audioElement = document.querySelector("#background-music")
        this.audioElement.volume = 0.05
        this.audioControlsButtonElement = document.querySelector(".audio-controls")
        
        this.setPlayButton()
        this.setContinueButton()
        this.setPlayAgainButton()
        this.setTutorialButton()
        this.setTutorialBackButton()
        this.setAudioControlsButton()
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

        const _translateY = action == "show" ? -200 : 1000
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
            
            this.audioElement.play().catch(err => console.log('Audio play failed:', err))
            
            this.handleMenu(".menu-wrapper", "hide")
            this.hideBackdrop()

            // Blur the button to remove focus
            this.playButtonElement.blur()
            this.game.start()            
        }
    }

    // Continue
    setContinueButton() {
        this.continueButtonElement.onclick = () => {
            this.handleMenu(".pause-menu-wrapper", "hide")
            this.hideBackdrop()

            // Blur the button to remove focus
            this.continueButtonElement.blur()
            this.game.continue()
        }
    }

    // End
    showEndMenu(deliveredPresents) {
        this.showBackdrop()
        this.handleMenu(".end-menu-wrapper", "show")

        const _innerHtml = deliveredPresents > 0 ? `You delivered ${deliveredPresents} presents!` : "Nobody got presents :("
        this.endMenuElement.innerHTML = _innerHtml
    }

    // Play again
    setPlayAgainButton() {
        this.playAgainButtonElement.onclick = () => {
            this.handleMenu(".end-menu-wrapper", "hide")
            this.hideBackdrop()

            // Blur the button to remove focus
            this.playAgainButtonElement.blur()
            this.game.start()    
        }
    }

    setTutorialButton() {
        this.tutorialButtonElement.onclick = () => {
            this.handleMenu(".menu-wrapper", "hide")
            this.handleMenu(".tutorial-menu-wrapper", "show")
        }
    }

    setTutorialBackButton() {
        this.tutorialBackButtonElement.onclick = () => {
            this.handleMenu(".tutorial-menu-wrapper", "hide")
            this.handleMenu(".menu-wrapper", "show")
        }
    }

    setAudioControlsButton() {
        this.audioControlsButtonElement.onclick = () => {
            const isPlaying = this.audioControlsButtonElement.dataset.muted === "false"
            
            if (isPlaying) {
                this.audioElement.muted = true
                this.audioControlsButtonElement.style.backgroundImage = "url('/music/unmute.png')"
                this.audioControlsButtonElement.dataset.muted = "true"
    
                this.audioControlsButtonElement.blur()
            }
            else {
                this.audioElement.muted = false
                this.audioElement.play()
                this.audioControlsButtonElement.style.backgroundImage = "url('/music/mute.png')"
                this.audioControlsButtonElement.dataset.muted = "false"
    
                // Remove focus from button
                this.audioControlsButtonElement.blur()
            }
        }
    }
}