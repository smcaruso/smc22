import * as THREE from "three";
import Sizes from "../utils/sizes.js";
import Time from "../utils/time.js";
import Camera from "../camera.js";
import Loaders from "../utils/loaders.js";
import App from "../app.js";

export default class MobileNav {

    constructor() {

        this.app = new App();

        this.navItems = new Map();
        this.navItems.set("group", document.querySelector(".mobilenav.main"));
        this.navItems.set("about", document.querySelector(".mainmenuitem#menufirst"));
        this.navItems.set("work", document.querySelector(".mainmenuitem#menusecond"));
        this.navItems.set("lab", document.querySelector(".mainmenuitem#menuthird"));

        this.navItems.forEach(
          (element, item) => {
            if (item !== "group") {
                element.addEventListener("pointerdown", this.navSelect.bind(this));
            } else {
                setTimeout( () => {
                    element.classList.remove("hidden");
                    element.style["transition-duration"] = "0.5s";
                }, 500);
            }
          }
        );

    }
    
    navSelect(pointerEvent) {
      this.navItems.forEach(
        (element, item) => {
          if (element === pointerEvent.target) {
            element.classList.toggle("selected");
            element.classList.remove("unselected");
            this.openPage(item);
          } else {
            element.classList.toggle("unselected");
            element.classList.remove("selected");
          }
        }
      );
    }

    openPage(section) {
        console.log(section)
    }

}
