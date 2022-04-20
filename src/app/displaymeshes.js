import * as THREE from "three";
import { gsap } from "gsap/all";
import App from "./app.js";
import featuredProjects from "../featured.json";
import labProjects from "../lab.json";

export default class DisplayMeshes {

    constructor() {

        this.featuredProjects = featuredProjects;
        this.labProjects = labProjects;
        this.initial = false;
        
        this.app = new App();
        this.models = [];

        this.createProjects(featuredProjects);
        this.createProjects(labProjects);

    }

    addModels() {

        if (window.location.hash !== "#initial" && this.initial === true) return;

        this.models.forEach((each) => {
            this.app.scene.add(each);
            gsap.to(each.material,
                {opacity: 1, duration: 0.5, onComplete: () => { each.material.transparent = false; }
                }
            );
        });

        this.initial = true;
    }

    createProjects(projectsList) {

        projectsList.forEach(
            (project) => {

                let projectModel;

                if (project.model !== undefined) {
                    projectModel = this.app.loaders.items[project.model].scene.children[0];

                    projectModel.material = new THREE.MeshPhongMaterial();
                    projectModel.material.envMap = this.app.loaders.items.TokyoHDRI;
                    projectModel.material.envMapIntensity = 0.25;
                    projectModel.material.reflectivity = 0.15;
                    projectModel.material.side = THREE.DoubleSide;
                    projectModel.material.transparent = true;
                    projectModel.material.opacity = 0;

                    projectModel.castShadow = true;
                    // projectModel.receiveShadow = true;

                    projectModel.rotateY(Math.PI * 0.5);

                    projectModel.position.set(project.xCoord, project.yCoord, project.zCoord);

                }

                if (project.diffMap) {
                    projectModel.material.map = this.app.loaders.items[project.diffMap];
                }

                if (project.normalMap) {
                    this.app.loaders.items[project.normalMap].encoding = THREE.LinearEncoding;
                    projectModel.material.normalMap = this.app.loaders.items[project.normalMap];
                    projectModel.material.normalScale = new THREE.Vector2(0.5, 0.5);
                }

                // color correction
                if (project.model === "PMIbeam") { 
                    projectModel.material.color = new THREE.Color(0x4F17A8);
                }

                if (projectModel !== undefined) {
                    this.models.push(projectModel);
                }

            }
        )
        
    }



}