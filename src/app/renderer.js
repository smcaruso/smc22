import * as THREE from "three";
import App from "./app.js";

export default class Renderer {

    constructor() {

        this.app = new App();
        this.setInstance();

    }

    setInstance() {

        this.instance = new THREE.WebGLRenderer( {
            canvas: this.app.canvas,
            antialias: true
        } );

        this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        this.instance.toneMapping = THREE.CineonToneMapping;
        this.instance.toneMappingExposure = 1.75;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setClearColor('#211d20');
        this.instance.setSize(this.app.sizes.width, this.app.sizes.height);
        this.instance.setPixelRatio(this.app.sizes.pixelRatio);

    }

    resize() {

        this.instance.setSize(this.app.sizes.width, this.app.sizes.height);
        this.instance.setPixelRatio(this.app.sizes.pixelRatio);

    }

    update() {

        this.instance.render(this.app.scene, this.app.camera.instance);

    }

}