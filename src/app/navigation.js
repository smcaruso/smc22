import * as THREE from "three";
import App from "./app.js";

export default class Navigation {

    constructor() {

        this.app = new App();

        this.raycaster = new THREE.Raycaster();
        this.intersections = [];

        

    }

}