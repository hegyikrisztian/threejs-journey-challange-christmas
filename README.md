# 🎁 Present Delivery!

## Introduction
This was my first ThreeJS project.
It is a minigame where you have to collect presents and deliver them to houses as Santa.

It is accessible live here: https://santa-minigame.vercel.app

This projcet was part of the 2025 Christmas challange in Three JS Journey by Bruno Simon.
https://threejs-journey.com/challenges/021-christmas-3

![santa_minigame_index_gif](public/images/index_gif.gif)

## Tech stack
- HTML
- CSS
- [ThreeJS](https://threejs.org)
- [GSAP](https://gsap.com)
- [Blender](https://www.blender.org)
- [CANNON.JS](https://schteppe.github.io/cannon.js/)

## Setup
```
After you cloned the repo just run
npm install

Then run the project
npm run dev

To build
npm run build
```

## Notes
Altough I would like to improve this game with a lot of stuff, I'm very happy on where it landed.
The biggest challange was suprisingly the physics part. To make this sliegh movement possible I had to revisit the physics lesson in 3jsj.
Also the acceleration part was a bit tricky as well, I had to calculate the current (world) forward direction of the sleigh and apply a force at center of mass in that direction.
For it to not topple over all the time I had to make sure that the friction and restitution are both 0 for the ground and sleigh contact material.

## Credits
- [Volume icon](https://www.freepik.com/icon/volume_8894928#fromView=search&page=1&position=7&uuid=ea77d078-67b1-4a8a-82fa-fc210081fbd7) by icon wind via Freepik
- [Mute icon](https://www.freepik.com/icon/mute_10264286#fromView=search&page=1&position=71&uuid=0c793125-0d5f-44b1-a60c-a9206dd0eae1) by Fathema Khanom  via Freepik
- Background music [Christmas eve whispers](https://pixabay.com/music/christmas-christmas-eve-whispers-439856/) by LP-Studio-music via Pixabay

## Feedback
If you have any suggestions or feedback feel free to reach out on [X](https://x.com/hegyikrisztian1) or Discrod

## License
2025 @ Hegyi Krisztián
This project is under MIT License
For more info see [LICENSE](https://github.com/hegyikrisztian/threejs-journey-challange-christmas/blob/main/LICENSE)

