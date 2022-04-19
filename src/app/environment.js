import * as THREE from "three";
import App from "./app.js";

export default class Environment {

    constructor() {

        this.app = new App();
        this.addLights();
        this.processStructure();
        this.app.renderer.instance.shadowMap.needsUpdate = true;

    }

    addLights() {

        const pointLightA = new THREE.PointLight(0xffffff, 500, 50, 2);
        const pointLightB = new THREE.PointLight(0xffffff, 300, 50, 2);
        const pointLightC = new THREE.PointLight(0xffffff, 50, 15, 2);
        const pointLightD = new THREE.PointLight(0xffffff, 50, 20, 2);
        const pointLightE = new THREE.PointLight(0xffffff, 50, 15, 2);

        pointLightA.castShadow = true;
        pointLightB.castShadow = true;
        pointLightC.castShadow = true;
        pointLightD.castShadow = true;
        pointLightE.castShadow = true;
        pointLightA.shadow.mapSize.width = 512;
        pointLightA.shadow.mapSize.height = 512;
        pointLightB.shadow.mapSize.width = 512;
        pointLightB.shadow.mapSize.height = 512;
        pointLightC.shadow.mapSize.width = 512;
        pointLightC.shadow.mapSize.height = 512;
        pointLightD.shadow.mapSize.width = 512;
        pointLightD.shadow.mapSize.height = 512;
        pointLightE.shadow.mapSize.width = 512;
        pointLightE.shadow.mapSize.height = 512;
        pointLightA.shadow.radius = 5;
        pointLightB.shadow.radius = 5;
        pointLightC.shadow.radius = 5;
        pointLightD.shadow.radius = 5;
        pointLightE.shadow.radius = 5;

        pointLightA.position.set(15, 30, -15);
        pointLightB.position.set(-18, 7, 18);
        pointLightC.position.set(6, 5, 3);
        pointLightD.position.set(5, 10, 14);
        pointLightE.position.set(-3.5, 14, 0);

        const UpperStripLightA = new THREE.RectAreaLight(0xffffff, 5, 16, .15);
        // const UpperStripLightB = new THREE.RectAreaLight(0xffffff, 5, 16, .15);
        const UpperStripLightC = new THREE.RectAreaLight(0xffffff, 2, 1, 3.8);
        const UpperStripLightD = new THREE.RectAreaLight(0xffffff, 2, 1, 3.8);
        UpperStripLightA.position.set(-4.76, 8.65, 8);
        // UpperStripLightB.position.set(-4.76, 4.65, 8);
        UpperStripLightC.position.set(-4.76, 6.75, 15.8);
        UpperStripLightD.position.set(-4.76, 6.75, 0.1);
        UpperStripLightA.lookAt(-4.75, 0, 8);
        // UpperStripLightB.lookAt(-4.75, 10, 8);
        UpperStripLightC.lookAt(-4.75, 6.75, 0);
        UpperStripLightD.lookAt(-4.75, 6.75, 15.8);

        const LowerStripLightA = new THREE.RectAreaLight(0xffffff, 5, 16, .15);
        // const LowerStripLightB = new THREE.RectAreaLight(0xffffff, 5, 16, .15);
        const LowerStripLightC = new THREE.RectAreaLight(0xffffff, 2, 1, 3.8);
        const LowerStripLightD = new THREE.RectAreaLight(0xffffff, 2, 1, 3.8);
        LowerStripLightA.position.set(-3.76, 3.7, 0);
        // LowerStripLightB.position.set(-3.76, -0.1, 0);
        LowerStripLightC.position.set(-3.76, 1.8, 7.9);
        LowerStripLightD.position.set(-3.76, 1.8, -7.9);
        LowerStripLightA.lookAt(-3.75, 0, 0);
        // LowerStripLightB.lookAt(-3.75, 1, 0);
        LowerStripLightC.lookAt(-3.75, 1.8, 0);
        LowerStripLightD.lookAt(-3.75, 1.8, 0);

        this.app.scene.add(
            pointLightA,
            pointLightB,
            pointLightC,
            pointLightD,
            pointLightE,
            UpperStripLightA,
            // UpperStripLightB,
            UpperStripLightC,
            UpperStripLightD,
            LowerStripLightA,
            // LowerStripLightB,
            LowerStripLightC,
            LowerStripLightD,
        );

    }

    processStructure() {

        let doubleDecker = new THREE.Object3D();
        let parameters;
        let shadow = true;
        let trans = false;

        const whiteMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

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
                            // roughness: 0.25
                        };
                        this.app.loaders.items.LowerGalleryNormal.encoding = THREE.LinearEncoding;
                        shadow = true;
                        break;
                    
                    case "UpperGallery":
                        parameters = {
                            map: this.app.loaders.items.UpperGalleryDiffuse,
                            metalnessMap: this.app.loaders.items.UpperGalleryMetal,
                            normalMap: this.app.loaders.items.UpperGalleryNormal,
                            roughnessMap: this.app.loaders.items.UpperGalleryRough,
                            metalness: 1,
                            // roughness: 0.25
                        };
                        this.app.loaders.items.UpperGalleryNormal.encoding = THREE.LinearEncoding;
                        shadow = true;
                        break;
                    
                    case "Stairs":
                        parameters = {
                            color: 0x00CEFF,
                            map: this.app.loaders.items.StairsRough,
                            bumpMap: this.app.loaders.items.StairsRough,
                            bumpScale: 0.1,
                            roughnessMap: this.app.loaders.items.StairsRough,
                            roughness: 0.5,
                            transparent: true,
                            opacity: 0.85
                        }
                        shadow = true;
                        break;
                    
                    case "Deck":
                        parameters = {
                            map: this.app.loaders.items.DeckDiffuse,
                            metalnessMap: this.app.loaders.items.DeckMetal,
                            normalMap: this.app.loaders.items.DeckNormal,
                            // normalScale: new THREE.Vector2(0.25, 0.25),
                            roughnessMap: this.app.loaders.items.DeckRough,
                            metalness: 1,
                            // roughness: 0.25
                        };
                        this.app.loaders.items.DeckNormal.encoding = THREE.LinearEncoding;
                        shadow = true;
                        break;
                    
                    case "OpenRectangle":
                        parameters = {
                            map: this.app.loaders.items.RectangleDiffuse,
                            metalnessMap: this.app.loaders.items.RectangleMetal,
                            normalMap: this.app.loaders.items.RectangleNormal,
                            roughnessMap: this.app.loaders.items.RectangleRough,
                            metalness: 1,
                            // roughness: 0.25
                        };
                        this.app.loaders.items.RectangleNormal.encoding = THREE.LinearEncoding;
                        shadow = false;
                        break;
                    
                    case "FloatingCircle":
                        parameters = {
                            // color: 0x00CEFF,
                            color: 0x008bac,
                            map: this.app.loaders.items.CircleRough,
                            bumpMap: this.app.loaders.items.CircleRough,
                            bumpScale: 0.25,
                            roughnessMap: this.app.loaders.items.CircleRough,
                            roughness: 0.5,
                            transparent: true,
                            opacity: 0.5
                        }
                        shadow = false;
                        break;
                    
                    case "FloorPlane":
                        parameters = {
                            color: 0x000550,
                            roughness: 0.85
                        }
                        shadow = false;
                        break;

                    case "GalleryPedestals":
                        parameters = {
                            map: this.app.loaders.items.PedestalDiffuse,
                            roughness: 0.5
                        }
                        shadow = true;
                        break;

                    case "TextFeatured":
                        parameters = {};
                        shadow = false;
                        trans = false;
                        break;

                    case "TextMoreProjects":
                        parameters = {};
                        shadow = false;
                        trans = true;
                        break;
                    
                    case "TextLab":
                        parameters = {};
                        shadow = false;
                        trans = false;
                        break;
                    
                    case "TextInfo":
                        parameters = {};
                        shadow = false;
                        trans = false;
                        break;
                    
                    case "TextStudio":
                        parameters = {};
                        shadow = false;
                        trans = false;
                        break;
                    
                    case "Photo":
                        parameters = {
                            map: this.app.loaders.items.Blockhead,
                            emissiveMap: this.app.loaders.items.Blockhead,
                            emissive: 0xffffff,
                            emissiveIntensity: 0.5,
                            alphaMap: this.app.loaders.items.BlockheadAlpha,
                            transparent: true
                        }
                        shadow = false;
                        break;

                    case "Swatches":
                        parameters = {
                            map: this.app.loaders.items.Swatch,
                            emissiveMap: this.app.loaders.items.Swatch,
                            emissive: 0xffffff,
                            emissiveIntensity: 0.25,
                            alphaMap: this.app.loaders.items.SwatchAlpha,
                            transparent: true
                        }
                        importedMesh.scale.set(1.75, 1.75, 1.75);
                        shadow = false;
                        break;

                    default:
                        console.log(importedMesh.name);
                        break;
                }
                parameters.envMap = this.app.loaders.items.TokyoHDRI;
                parameters.envMapIntensity = 0.25;
                
                importedMesh.castShadow = shadow;
                importedMesh.receiveShadow = shadow;

                if (!parameters.color && !parameters.map) {
                    if (trans) {
                        let transMaterial = new THREE.MeshBasicMaterial({color: 0xfffffff, transparent: true, opacity: 0});
                        importedMesh.material = transMaterial;
                    } else {
                        importedMesh.material = whiteMaterial;
                    }

                } else {
                    importedMesh.material = new THREE.MeshStandardMaterial(parameters);
                }

                doubleDecker.add(importedMesh.clone());
            }
        );

        this.app.scene.add(doubleDecker);
        this.app.camera.moveTo("initial");

    }

}