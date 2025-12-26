import * as THREE from 'three'
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import EventEmitter from "./EventEmitter";


export default class Resources extends EventEmitter {

    constructor(sources) {
        
        super()

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath("/draco/")

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        this.loaders = {
            gltfLoader: gltfLoader,
            cubeTextureLoader: new  THREE.CubeTextureLoader(),
            textureLoader: new THREE.TextureLoader(),
        }
    }

    startLoading() {
        for (const source of this.sources) {
            this.loaders[source.loader].load(
                source.path,
                (file) => {
                    this.sourceLoaded(source, file)
                }
            )
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded++
        
        if (this.toLoad === this.loaded) {
            this.trigger("ready")
        }
    }

    setManager() {

        this.manager = new THREE.LoadingManager(
            () => console.log("Loaded everything"),
            (url, loaded, total) => console.log(`Loading ${url}. Loaded ${loaded} of ${total} resources`),
            (url) => console.warn(`Error loading ${url}`)
        )

        for (const loader of Object.values(this.loaders)) {
            loader.manager = this.manager
        }
    }
}