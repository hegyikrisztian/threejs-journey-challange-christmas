import gsap from "gsap";
import Game from "./Game";


export default class Menu {

    constructor() {

        this.game = new Game()
        this.gameTimer = this.game.gameTimer
        
        this.playButtonElement = document.querySelector(".btn-play")
        this.continueButtonElement = document.querySelector(".btn-continue")

        // Start
        this.playButtonElement.onclick = () => {

            gsap.to(
                ".menu-wrapper",
                {
                    translateY: 500,
                    duration: 0.5,
                    ease: "elastic.inOut(1,0.75)",
                }
            )

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

            this.game.isStarted = true
        }

        // Pause
        window.addEventListener("keydown", (event) => {

            if (event.code == "Escape" && this.game.isStarted) {

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

                gsap.to(
                    ".pause-menu-wrapper",
                    {
                        translateY: 0,
                        duration: 0.5,
                        ease: "elastic.inOut(1,0.75)",
                    }
                )

                this.game.isPasued = true
            }
        })

        // Continue
        this.continueButtonElement.onclick = () => {

            gsap.to(
                ".pause-menu-wrapper",
                {
                    translateY: 500,
                    duration: 0.5,
                    ease: "elastic.inOut(1,0.75)",
                }
            )

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

            this.game.isPasued = false
        }
    }
}