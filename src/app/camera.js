import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import App from "./app.js";

export default class Camera {

    constructor() {

        this.app = new App();

        this.setInstance();
        this.setOrbitControls();

    }

    setInstance() {

        this.instance = new THREE.PerspectiveCamera(
            15,
            this.app.sizes.width / this.app.sizes.height,
            0.1,
            500
        );
        
        this.instance.position.set(58, 1, 42);
        this.app.scene.add(this.instance);

    }

    setOrbitControls() {

        this.controls = new OrbitControls(this.instance, this.app.canvas);
        this.controls.target.set(3, 4, 6);
        this.controls.enableDamping = true;

    }

    resize() {

        this.instance.aspect = this.app.sizes.width / this.app.sizes.height;
        this.instance.updateProjectionMatrix();

    }

    update() {

        this.controls.update();

    }

}