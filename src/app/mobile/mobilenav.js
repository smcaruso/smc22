import * as THREE from "three";
import Sizes from "../utils/sizes.js";
import Time from "../utils/time.js";
import Camera from "../camera.js";
import Loaders from "../utils/loaders.js";
import App from "../app.js";

export default class MobileNav {

    constructor() {

        this.app = new App();
        this.mainNav = {
            group: document.querySelector(".mobilenav.main"),
            about: document.querySelector(".mainmenuitem#about"),
            work: document.querySelector(".mainmenuitem#work"),
            lab: document.querySelector(".mainmenuitem#lab")
        };

        this.mainNav.group.classList.remove("hidden");

        this.mainNav.about.addEventListener("pointerdown", this.selectNav.bind(this));
        this.mainNav.work.addEventListener("pointerdown", this.selectNav.bind(this));
        this.mainNav.lab.addEventListener("pointerdown", this.selectNav.bind(this));

    }
    
    selectNav(pointerEvent) {

        const navElement = ((pointerEvent) => {
            if (pointerEvent.target.nodeName === "SPAN") {
                return pointerEvent.target.parentNode.id;
            } else { return pointerEvent.target.id; }
        })(pointerEvent);

        Object.keys(this.mainNav).forEach(
            (key) => {
                if (key === navElement) {
                    this.mainNav[key].classList.toggle("selected");
                    this.mainNav[key].classList.remove("unselected");
                } else {
                    this.mainNav[key].classList.toggle("unselected");
                    this.mainNav[key].classList.remove("selected");
                }

                // move group of nav to top
                // stack inactive navs under active nav
                // add listener to group to reset
            }
        );
    }

}
