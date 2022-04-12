import * as THREE from "three";
import RectAreaLightUniformsLib from "three/examples/jsm/lights/RectAreaLightUniformsLib.js"
import App from "./app.js";

export default class Environment {

    constructor() {

        this.app = new App();
        this.addLights();
        this.processStructure();

    }

    addLights() {

        const pointLightA = new THREE.PointLight(0xffffff, 200, 20, 2);
        const pointLightB = new THREE.PointLight(0xffffff, 200, 20, 2);
        const pointLightC = new THREE.PointLight(0xffffff, 200, 20, 2);
        pointLightA.castShadow = true;
        pointLightB.castShadow = true;
        pointLightB.castShadow = true;
        pointLightA.shadow.mapSize.width = 1024;
        pointLightA.shadow.mapSize.height = 1024;
        pointLightB.shadow.mapSize.width = 1024;
        pointLightB.shadow.mapSize.height = 1024;
        pointLightC.shadow.mapSize.width = 1024;
        pointLightC.shadow.mapSize.height = 1024;
        pointLightA.shadow.radius = 5;
        pointLightB.shadow.radius = 5;
        pointLightC.shadow.radius = 5;
        pointLightA.position.set(10, 12, -7);
        pointLightB.position.set(-18, 12, 18);
        pointLightC.position.set(15, 30, 20);

        const UpperStripLightA = new THREE.RectAreaLight(0xffffff, 5, 16, .15);
        const UpperStripLightB = new THREE.RectAreaLight(0xffffff, 5, 16, .15);
        const UpperStripLightC = new THREE.RectAreaLight(0xffffff, 2, 1, 3.8);
        const UpperStripLightD = new THREE.RectAreaLight(0xffffff, 2, 1, 3.8);
        UpperStripLightA.position.set(-4.76, 8.65, 8);
        UpperStripLightB.position.set(-4.76, 4.65, 8);
        UpperStripLightC.position.set(-4.76, 6.75, 15.8);
        UpperStripLightD.position.set(-4.76, 6.75, 0.1);
        UpperStripLightA.lookAt(-4.75, 0, 8);
        UpperStripLightB.lookAt(-4.75, 10, 8);
        UpperStripLightC.lookAt(-4.75, 6.75, 0);
        UpperStripLightD.lookAt(-4.75, 6.75, 15.8);

        const LowerStripLightA = new THREE.RectAreaLight(0xffffff, 5, 16, .15);
        const LowerStripLightB = new THREE.RectAreaLight(0xffffff, 5, 16, .15);
        const LowerStripLightC = new THREE.RectAreaLight(0xffffff, 2, 1, 3.8);
        const LowerStripLightD = new THREE.RectAreaLight(0xffffff, 2, 1, 3.8);
        LowerStripLightA.position.set(-3.76, 3.7, 0);
        LowerStripLightB.position.set(-3.76, -0.1, 0);
        LowerStripLightC.position.set(-3.76, 1.8, 7.9);
        LowerStripLightD.position.set(-3.76, 1.8, -7.9);
        LowerStripLightA.lookAt(-3.75, 0, 0);
        LowerStripLightB.lookAt(-3.75, 1, 0);
        LowerStripLightC.lookAt(-3.75, 1.8, 0);
        LowerStripLightD.lookAt(-3.75, 1.8, 0);

        this.app.scene.add(
            pointLightA,
            pointLightB,
            pointLightC,
            UpperStripLightA,
            UpperStripLightB,
            UpperStripLightC,
            UpperStripLightD,
            LowerStripLightA,
            LowerStripLightB,
            LowerStripLightC,
            LowerStripLightD,
        );

    }

    processStructure() {

        let doubleDecker = new THREE.Object3D();
        let parameters;

        this.app.loaders.items.DoubleDecker.scene.children.forEach(
            (importedMesh) => {
                
                switch (importedMesh.name) {

                    case "LowerGallery":
                        parameters = {
                            map: this.app.loaders.items.LowerGalleryDiffuse,
                            metalnessMap: this.app.loaders.items.LowerGalleryMetal,
                            normalMap: this.app.loaders.items.LowerGalleryNormal,
                            roughnessMap: this.app.loaders.items.LowerGalleryRough,
                            metalness: 1,
                            reflectivity: 1,
                            roughness: 0.25
                        };
                        break;
                    
                    case "UpperGallery":
                        parameters = {
                            map: this.app.loaders.items.UpperGalleryDiffuse,
                            metalnessMap: this.app.loaders.items.UpperGalleryMetal,
                            normalMap: this.app.loaders.items.UpperGalleryNormal,
                            roughnessMap: this.app.loaders.items.UpperGalleryRough,
                            metalness: 1,
                            reflectivity: 1,
                            roughness: 0.25
                        };
                        break;
                    
                    case "Stairs":
                        parameters = {
                            color: 0x00CEFF,
                            roughnessMap: this.app.loaders.items.StairsRough,
                            transparent: true,
                            transmission: 1.0,
                            clearcoat: 1.0
                        }
                        break;
                    
                    case "GlassWall":
                        parameters = {
                            color: 0xffffff,
                            transparent: true,
                            transmission: 1.0,
                            thickness: 1,
                            roughness: 0.6,
                            opacity: 0.75,
                            clearcoat: 1
                        }
                        break;
                    
                    case "Deck":
                        parameters = {
                            map: this.app.loaders.items.DeckDiffuse,
                            metalnessMap: this.app.loaders.items.DeckMetal,
                            normalMap: this.app.loaders.items.DeckNormal,
                            roughnessMap: this.app.loaders.items.DeckRough,
                            metalness: 1,
                            reflectivity: 1,
                            roughness: 0.25
                        }
                        break;
                    
                    case "OpenRectangle":
                        parameters = {
                            map: this.app.loaders.items.RectangleDiffuse,
                            metalnessMap: this.app.loaders.items.RectangleMetal,
                            normalMap: this.app.loaders.items.RectangleNormal,
                            roughnessMap: this.app.loaders.items.RectangleRough,
                            metalness: 1,
                            reflectivity: 1,
                            roughness: 0.25
                        }
                        break;
                    
                    case "FloatingCircle":
                        parameters = {
                            color: 0x00CEFF,
                            roughnessMap: this.app.loaders.items.CircleRough,
                            transparent: true,
                            transmission: 1.0,
                            opacity: 0.75,
                        }
                        break;
                    
                    case "FloorPlane":
                        parameters = {
                            color: 0x000550,
                            roughness: 0.85
                        }
                        break;

                    case "GalleryPedestals":
                        parameters = {
                            map: this.app.loaders.items.PedestalDiffuse,
                            roughness: 0.5
                        }
                        break;
                    
                    case "UpperRailing":
                        parameters = {
                            color: 0xffffff,
                            transparent: true,
                            transmission: 1.0,
                            roughness: 0.5,
                            opacity: 0.75
                        }
                        break;

                    case "TextFeatured":
                        parameters = {
                            color: 0xffffff,
                            emissive: 0xffffff
                        }
                        break;

                    case "TextMoreProjects":
                        parameters = {
                            color: 0xffffff,
                            emissive: 0xffffff
                        }
                        break;
                    
                    case "TextLab":
                        parameters = {
                            color: 0xffffff,
                            emissive: 0xffffff
                        }
                        break;
                    
                    case "TextInfo":
                        parameters = {
                            color: 0xffffff,
                            emissive: 0xffffff
                        }
                        break;
                    
                    case "TextStudio":
                        parameters = {
                            color: 0xffffff,
                            emissive: 0xffffff
                        }
                        break;
                    
                    case "Photo":
                        parameters = {
                            map: this.app.loaders.items.Blockhead,
                            alphaMap: this.app.loaders.items.BlockheadAlpha,
                            transparent: true
                        }
                        break;

                    default:
                        console.log(importedMesh.name);
                        break;
                }
                parameters.envMap = this.app.loaders.items.TokyoHDRI;
                parameters.envMapIntensity = 0.1;
                
                importedMesh.castShadow = true;
                importedMesh.receiveShadow = true;

                importedMesh.material = new THREE.MeshPhysicalMaterial(parameters);

                doubleDecker.add(importedMesh.clone());
            }
        );

        this.app.scene.add(doubleDecker)

    }

}