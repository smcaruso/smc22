import * as THREE from "three";
import App from "./app.js";
import featuredProjects from "../featured.json";
import labProjects from "../lab.json";

export default class DisplayMeshes {

    constructor() {

        this.app = new App();
        this.models = [];

        this.createProjects(featuredProjects);
        this.createProjects(labProjects);

        this.models.forEach((each) => {
            this.app.scene.add(each);
        });

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

                    projectModel.castShadow = true;
                    // projectModel.receiveShadow = true;

                    projectModel.rotateY(Math.PI * 0.5);

                    projectModel.position.set(project.xCoord, project.yCoord, project.zCoord);


                }

                if (project.diffMap) {
                    projectModel.material.map = this.app.loaders.items[project.diffMap];
                }

                // if (project.roughMap) {
                //     projectModel.material.roughnessMap = this.app.loaders.items[project.roughMap];
                // }

                // if (project.metalMap) {
                //     projectModel.material.metalnessMap = this.app.loaders.items[project.metalMap];
                // }

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