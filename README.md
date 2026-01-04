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

## Notes
Altough I would like to improve this game with a lot of stuff, I'm very happy on where it landed.
The biggest challange was suprisingly the physics part. To make this sliegh movement possible I had to revisit the physics lesson in 3jsj.
Also the acceleration part was a bit tricky as well, I had to calculate the current (world) forward direction of the sleigh and apply a force at center of mass in that direction.
For it to not topple over all the time I had to make sure that the friction and restitution are both 0 for the ground and sleigh contact material.

## Feedback
If you have any suggestions or feedback feel free to reach out on [X](https://x.com/hegyikrisztian1) or Discrod

## License
2025 @ Hegyi Krisztián
This project is under MIT License
For more info see LICENSE

