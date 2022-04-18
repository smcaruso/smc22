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
                hash: "#initial"
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
            },

            GoogleAssistantStage: {
                x: 6,
                y: 2, // 1
                z: 5.35, // 5
                tX: 2,
                tY: 1.25, // 1
                tZ: 5.35, // 5
                duration: 1,
                ease: "power3.inOut",
                hash: "#googleassistant"
            },

            PMIbeam: {
                x: 6,
                y: 2, // 1
                z: 2.85, // 2.5
                tX: 2,
                tY: 1.25, // 1
                tZ: 2.85, // 2.5
                duration: 1,
                ease: "power3.inOut",
                hash: "#pmiawards"
            },

            GoogleIOKiosk: {
                x: 6,
                y: 2, // 1
                z: 0.35, // 0
                tX: 2,
                tY: 1.25, // 1
                tZ: 0.35, // 0
                duration: 1,
                ease: "power3.inOut",
                hash: "#googleio"
            },

            PacFriend: {
                x: 6,
                y: 2, // 1
                z: -2.15, // -2.5
                tX: 2,
                tY: 1.25, // 1
                tZ: -2.15, // -2.5
                duration: 1,
                ease: "power3.inOut",
                hash: "#pizzahut"
            },

            ChennisChair: {
                x: 6,
                y: 2, // 1
                z: -4.65, // -5
                tX: 2,
                tY: 1.25, // 1
                tZ: -4.65, // -5
                duration: 1,
                ease: "power3.inOut",
                hash: "#usopen"
            },

            Headset: {
                x: 5,
                y: 6.95, // 5.95
                z: 13.35, // 13
                tX: 1,
                tY: 6.2, // 5.95
                tZ: 13.35, // 13
                duration: 1,
                ease: "power3.inOut",
                hash: "#vr"
            },

            Laptop: {
                x: 5,
                y: 6.95, // 5.95
                z: 10.85, // 10.5
                tX: 1,
                tY: 6.2, // 5.95
                tZ: 10.85, // 10.5
                duration: 1,
                ease: "power3.inOut",
                hash: "#interactive"
            },

            Animation: {
                x: 5,
                y: 6.95, // 5.95
                z: 8.35, // 8
                tX: 1,
                tY: 6.2, // 5.95
                tZ: 8.35, // 8
                duration: 1,
                ease: "power3.inOut",
                hash: "#animation"
            },

            PCB: {
                x: 5,
                y: 6.95, // 5.95
                z: 5.85, // 5.5
                tX: 1,
                tY: 6.2, // 5.95
                tZ: 5.85, // 5.5
                duration: 1,
                ease: "power3.inOut",
                hash: "#proto"
            },

            Mac: {
                x: 5,
                y: 6.95, // 5.95
                z: 3.35, // 3
                tX: 1,
                tY: 6.2, // 5.95
                tZ: 3.35, // 3
                duration: 1,
                ease: "power3.inOut",
                hash: "#vintage"
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
        this.controls.target.set(3, 34, 6);
        this.controls.enableDamping = true;
        this.controls.enabled = false;
        // this.controls.enableZoom = false;
        // this.controls.enablePan = false;
        // this.controls.minAzimuthAngle = 0.65;
        // this.controls.maxAzimuthAngle = 2.5;
        // this.controls.minPolarAngle = 1.4;
        // this.controls.maxPolarAngle = 1.64;

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