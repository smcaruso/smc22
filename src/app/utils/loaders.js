import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./eventemitter.js";

export default class Loaders extends EventEmitter {

    constructor(sources) {

        super();
        this.sources = sources;

        // Loading splash
        this.progressbar = document.querySelector(".progress .bar");
        this.splashscreen = document.querySelector(".splash");

        // Setup

        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;
        this.fill = 0;
        this.border = 300;

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
                        (file) => {
                            file.flipY = false;
                            file.encoding = THREE.sRGBEncoding;
                            this.sourceLoaded(source, file);
                        }
                    );
                    break;

                case "cubeTexture":
                    this.cubeTextureLoader.load(
                        source.path,
                        (file) => {
                            file.encoding = THREE.sRGBEncoding;
                            this.sourceLoaded(source, file);
                        }
                        );
                    break;

                default:
                    console.log("Unknown source type");
                    break;

            }

        }

    }

    sourceLoaded(source, file) {

        let barWidth = 300;
        if (window.innerWidth <= 430) { barWidth = 100; }

        // setting width of progress bar per device size. mobile gets a smaller bar.

        this.items[source.name] = file;
        this.loaded++;

        this.fill = (this.loaded / this.toLoad) * barWidth;
        this.border = barWidth + 2 - this.fill;
        this.progressbar.style.borderRightWidth = `${this.border}px`;
        this.progressbar.style.width = `${this.fill}px`;

        // right border is loaded progress

        if (this.loaded === this.toLoad) {
            setTimeout(
                () => {
                    // this.splashscreen.style.opacity = 0;
                    this.splashscreen.classList.add("ready");
                    this.trigger("ready");
                    setTimeout(() => { this.splashscreen.style.display = "none"; }, 2000)
                },
            500);
        }

    }

}