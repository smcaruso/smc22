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
            35,
            this.app.sizes.width / this.app.sizes.height,
            0.1,
            100
        );

        this.instance.position.set(6, 4, 8);
        this.app.scene.add(this.instance);

    }

    setOrbitControls() {

        this.controls = new OrbitControls(this.instance, this.app.canvas);
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