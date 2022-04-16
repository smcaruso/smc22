import * as THREE from "three";
import App from "./app.js";

export default class Navigation {

    constructor() {

        this.app = new App();

        this.raycaster = new THREE.Raycaster();
        this.intersections = [];
        this.pointer = new THREE.Vector2(-1, -1);

        let UpperGallery = document.getElementById("menulab");
        let LowerGallery = document.getElementById("menuwork");
        let Deck = document.getElementById("menuabout");
        this.mainMenu = {UpperGallery, LowerGallery, Deck};
        
        UpperGallery.addEventListener("pointermove", (event) => { event.stopPropagation(); })
        LowerGallery.addEventListener("pointermove", (event) => { event.stopPropagation(); })
        Deck.addEventListener("pointermove", (event) => { event.stopPropagation(); })

        window.addEventListener("pointermove", this.checkIntersections.bind(this));
        window.addEventListener("pointerup", this.onPointerUp.bind(this));

    }

    checkIntersections(moveEvent) {

        this.pointer.x = (moveEvent.clientX / this.app.sizes.width) * 2 - 1;
        this.pointer.y = -(moveEvent.clientY / this.app.sizes.height) * 2 + 1;
        
        this.intersections.length = 0;
        
        this.raycaster.setFromCamera(this.pointer, this.app.camera.instance);
        this.raycaster.intersectObjects(this.app.scene.children, true, this.intersections);

        if (this.intersections.length === 0) {
            this.app.canvas.style.cursor = "default";
            Object.keys(this.mainMenu).forEach(
                (key) => {
                    this.mainMenu[key].classList.add("inactive");
                    this.app.canvas.style.cursor = "default";
                }
            );
        } else if (this.intersections.length > 0) {
            this.processIntersections();
        }

    }

    processIntersections() {

        let intersectedName = "";
        let selection = false;

        if (this.intersections.length > 0) {
            if (this.intersections[0].object.name === "GalleryPedestals" ||
                this.intersections[0].object.name === "OpenRectangle" ||
                this.intersections[0].object.name === "Stairs") {
                    intersectedName = this.intersections[1].object.name;
                } else {
                    intersectedName = this.intersections[0].object.name;
                }
        }

        switch (window.location.hash) {

            case "#mainmenu":

                Object.keys(this.mainMenu).forEach(
                    (key) => {
                        if (key === intersectedName) {
                            this.mainMenu[key].classList.remove("inactive");
                            this.app.canvas.style.cursor = "pointer";
                            selection = true;
                        } else {
                            this.mainMenu[key].classList.add("inactive");
                        }
                    }
                );

                break;
                
            case "#about":
                break;

            case "#lab":
                // show menu labels for lab projects
                // and hide inactive labels
                break;
            
            case "#work":
                break;

            default:
                console.log(window.location.hash)

        }

        if (!selection) { this.app.canvas.style.cursor = "default"; }

    }

    onPointerUp(upEvent) {

        let location = "initial";
        if (this.intersections.length > 0) {
            location = this.intersections[0].object.name;
        }

        this.app.camera.moveTo(location);

    }

}