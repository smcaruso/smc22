import * as THREE from "three";
import Renderer from "./utils/renderer.js";
import Sizes from "./utils/sizes.js";
import Time from "./utils/time.js";
import Camera from "./camera.js";
import sources from "./sources.json"
import Loaders from "./utils/loaders.js";
import DisplayMeshes from "./displaymeshes.js";
import Environment from "./environment.js";
import Navigation from "./navigation.js";

let instance = null;

export default class App {

    constructor(canvas) {

        // Global access
        if (instance) {
            return instance;
        }

        instance = this;
        
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
        this.loaders.on("ready",
        () => {
            if (window.innerWidth >= 430) {
                    this.nav = new Navigation();
                    this.environment = new Environment();
                    this.displayMeshes = new DisplayMeshes();
                    const aboutSection = document.querySelector(".aboutsection");
                    aboutSection.classList.remove("hidden");
                } else {
                    console.log(`Loading mobile env for screen width ${window.innerWidth}`)
                }
            }
        )

    }

    resize() {

        this.renderer.resize();
        this.camera.resize();

    }

    update() {

        this.renderer.update();
        this.camera.update();

    }

}