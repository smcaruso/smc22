import * as THREE from "three";
import Renderer from "./renderer.js";
import Sizes from "./utils/sizes.js";
import Time from "./utils/time.js";
import Camera from "./camera.js";
import sources from "./sources.json"
import Loaders from "./utils/loaders.js";

let instance = null;

export default class App {

    constructor(canvas) {

        // Global access
        if (instance) {
            return instance;
        }

        instance = this;
        window.experience = this;
        
        // Setup
        this.canvas = canvas;
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.loaders = new Loaders(sources);
        this.camera = new Camera();
        this.renderer = new Renderer();

        // Custom event listeners
        this.sizes.on("resize", () => { this.resize(); });
        this.time.on("tick", () => { this.update(); });

    }

    resize() {

    }

    update() {

    }

}