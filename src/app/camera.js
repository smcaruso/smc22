import * as THREE from "three";
import { gsap } from "gsap/all";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import App from "./app.js";

export default class Camera {

    constructor() {

        this.app = new App();

        this.setInstance();
        this.setOrbitControls();

        this.views = {

            initial: {
                x: 65,
                y: 2,
                z: 40,
                tX: 3,
                tY: 4,
                tZ: 6,
                duration: 3,
                ease: "back.out(1)",
                hash: "#mainmenu"
            },

            main: {
                x: 65,
                y: 2,
                z: 40,
                tX: 3,
                tY: 4,
                tZ: 6,
                duration: 1,
                ease: "power3.inOut",
                hash: "#mainmenu"
            },

            UpperGallery: {
                x: 30,
                y: 6.5,
                z: 8,
                tX: -1,
                tY: 6.5,
                tZ: 8,
                duration: 1,
                ease: "power3.inOut",
                hash: "#lab"
            },

            LowerGallery: {
                x: 32,
                y: 1,
                z: 0,
                tX: 0,
                tY: 1,
                tZ: 0,
                duration: 1,
                ease: "power3.inOut",
                hash: "#work"
            },

            Deck: {
                x: 0.3,
                y: 1.35,
                z: 42,
                tX: 0.3,
                tY: 0.2,
                tZ: 0,
                duration: 1,
                ease: "power3.inOut",
                hash: "#about"
            }
            
        }; // views lib

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
        this.controls.enabled = false;

    }

    resize() {

        this.instance.aspect = this.app.sizes.width / this.app.sizes.height;
        this.instance.updateProjectionMatrix();

    }

    update() {

        this.controls.update();

    }

    moveTo(view) {

        window.location = this.views[view].hash;

        gsap.killTweensOf(this.instance.position);
        gsap.killTweensOf(this.controls.target);

        gsap.to(this.instance.position, {
            x: this.views[view].x,
            y: this.views[view].y,
            z: this.views[view].z,
            duration: this.views[view].duration,
            ease: this.views[view].ease
        });

        gsap.to(this.controls.target, {
            x: this.views[view].tX,
            y: this.views[view].tY,
            z: this.views[view].tZ,
            duration: this.views[view].duration,
            ease: this.views[view].ease
        });

    }

}