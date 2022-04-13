import * as THREE from "three";
import { gsap } from "gsap/all";
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
        
        this.instance.position.set(65, 20, 40);

        this.app.scene.add(this.instance);

    }

    setOrbitControls() {

        this.controls = new OrbitControls(this.instance, this.app.canvas);
        // this.controls.target.set(3, 4, 6);
        this.controls.target.set(3, 34, 6);
        this.controls.enableDamping = true;

    }

    resize() {

        this.instance.aspect = this.app.sizes.width / this.app.sizes.height;
        this.instance.updateProjectionMatrix();

    }

    update() {

        this.controls.update();

    }

    moveTo(view) {

        switch (view) {

            case "initial":
                gsap.to(this.instance.position, {y: 2, duration: 3, ease: "back.out(1)"});
                gsap.to(this.controls.target, {y: 4, duration: 3, ease: "back.out(1)"})
                break;

            case "UpperGallery":
                break;

        }
        console.log(`clicking ${view}`);

    }

}