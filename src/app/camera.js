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

        console.log(window.location.hash)
        switch (view) {

            case "initial":

                gsap.to(this.instance.position, {x: 65, y: 2, z: 40, duration: 3, ease: "back.out(1)"});
                gsap.to(this.controls.target, {x: 3, y: 4, z: 6, duration: 3, ease: "back.out(1)"});
                window.location = "#mainmenu";
                break;

            case "UpperGallery":
                gsap.to(this.instance.position, {x: 30, y: 6.5, z: 8, duration: 0.5});
                gsap.to(this.controls.target, {x: -1, y: 6.5, z: 8, duration: 0.5});
                window.location = "#lab";
                break;

            case "LowerGallery":
                gsap.to(this.instance.position, {x: 32, y: 2, z: 0, duration: 0.5});
                gsap.to(this.controls.target, {x: 0, y: 2, z: 0, duration: 0.5});
                window.location = "#work";
                break;

            case "Deck":
                gsap.to(this.instance.position, {x: 0.3, y: 1.35, z: 42, duration: 0.5});
                gsap.to(this.controls.target, {x: 0.3, y: 0.2, z: 0, duration: 0.5});
                window.location = "#about";
                break;
        }

    }

}