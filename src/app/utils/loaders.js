import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./eventemitter.js";

export default class Loaders extends EventEmitter {

    constructor(sources) {

        super();
        this.sources = sources;

        // Setup

        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();


    }

    setLoaders() {

        this.gltfloader = new GLTFLoader();
        this.textureLoader = new THREE.TextureLoader();
        this.cubeTextureLoader = new THREE.CubeTextureLoader();

    }

    startLoading() {

        for (const source of this.sources) {

            switch (source.type) {
                
                case "gltf":
                    this.gltfloader.load(
                        source.path,
                        (file) => { this.sourceLoaded(source, file); }
                    );
                    break;

                case "texture":
                    this.textureLoader.load(
                        source.path,
                        (file) => { file.flipY = false; this.sourceLoaded(source, file); }
                    );
                    break;

                case "cubeTexture":
                    this.cubeTextureLoader.load(
                        source.path,
                        (file) => { this.sourceLoaded(source, file); }
                        );
                    break;

                default:
                    console.log("Unknown source type");
                    break;

            }

        }

    }

    sourceLoaded(source, file) {

        this.items[source.name] = file;
        this.loaded++;

        if (this.loaded === this.toLoad) {
            this.trigger("ready");
        }

    }

}