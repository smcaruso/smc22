import * as THREE from "three";
import App from "./app.js";
import featuredProjects from "../featured.json";
import labProjects from "../lab.json";
import moreProjects from "../moreprojects.json";

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
        this.labMenu = this.createNavTags(labProjects);
        this.projectMenu = this.createNavTags(featuredProjects);

        UpperGallery.addEventListener("pointermove", (event) => { event.stopPropagation(); })
        LowerGallery.addEventListener("pointermove", (event) => { event.stopPropagation(); })
        Deck.addEventListener("pointermove", (event) => { event.stopPropagation(); })

        window.addEventListener("pointermove", this.checkIntersections.bind(this));
        window.addEventListener("pointerup", this.onPointerUp.bind(this));

        window.addEventListener("hashchange", (event) => {

            switch (window.location.hash) {

                case "#mainmenu":
                    this.app.camera.moveTo("main")
                    let back = document.querySelectorAll(".backbutton");
                    console.log(back)
                    back.forEach( (each) => { each.remove(); } );
                    break;

                case "#lab":
                    this.app.camera.moveTo("UpperGallery");
                    this.createBackButton();
                    break;
                
                case "#work":
                    this.app.camera.moveTo("LowerGallery");
                    this.createBackButton();
                    break;

                case "#about":
                    this.app.camera.moveTo("Deck");
                    this.createBackButton();
                    break;

            }

        });

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
        } else if (this.intersections.length > 0 && this.intersections[0].object) {
            this.processIntersections(moveEvent);
        }

    }

    processIntersections(moveEvent) {

        let intersectedName = "";
        let selection = false;

        if (this.intersections.length > 0) {
            if (this.intersections[0].object.name === "GalleryPedestals" ||
                this.intersections[0].object.name === "OpenRectangle" ||
                this.intersections[0].object.name === "Stairs" &&
                this.intersections.length > 1) {
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
                this.labMenu.forEach( (navTag) => {
                    if (intersectedName === navTag.id) {
                        navTag.style.left = `${moveEvent.clientX}px`;
                        navTag.classList.remove("inactive");
                        this.app.canvas.style.cursor = "pointer";
                        selection = true;
                    } else { navTag.classList.add("inactive"); }
                });
                break;
            
            case "#work":
                this.projectMenu.forEach( (navTag) => {
                    if (intersectedName === navTag.id) {
                        navTag.style.left = `${moveEvent.clientX}px`;
                        navTag.classList.remove("inactive");
                        this.app.canvas.style.cursor = "pointer";
                        selection = true;
                    } else { navTag.classList.add("inactive"); }
                });
                if (intersectedName === "TextMoreProjects") {
                        this.app.canvas.style.cursor = "pointer";
                        selection = true;
                }
                break;

            default:
                console.log(window.location.hash)

        }

        if (!selection) { this.app.canvas.style.cursor = "default"; }

    }

    onPointerUp(upEvent) {

        let location = "main";
        if (this.intersections.length > 0) { location = this.intersections[0].object.name; }

        switch (window.location.hash) {

            case "#mainmenu":
                if (location === "UpperGallery" || location === "LowerGallery" || location === "Deck") {
                    this.app.camera.moveTo(location);
                    this.createBackButton();
                }
                break;

            case "#work":
                if (this.intersections[0].object.name === "TextMoreProjects") {
                    this.createMoreProjects();
                    return;
                }
                featuredProjects.forEach( (project) => {
                    if (project.model === location) {
                        this.createProjectWindow(project)
                    }
                });
                break;

            case "#lab":
                labProjects.forEach( (project) => {
                    if (project.model === location) {
                        this.createProjectWindow(project)
                    }
                });
                break;

            case "#about":
                break;

        }

        // if (window.location.hash === "#mainmenu")
        // this.app.camera.moveTo(location);
        // this.createBackButton();

        Object.keys(this.mainMenu).forEach(
            (key) => { this.mainMenu[key].classList.add("inactive"); }
        );

    }

    createBackButton() {

        let backButton = document.createElement("div");
        backButton.classList.add("backbutton");
        backButton.innerText = "Back";
        document.body.append(backButton);

        backButton.addEventListener("pointerup", (event) => {
            this.app.camera.moveTo("main");
            backButton.remove();
        });

    }

    createNavTags(projects) {

        const navTags = [];

        projects.forEach(
            (project) => {
                let navTag = document.createElement("div");
                navTag.classList.add("projectmenu");
                navTag.classList.add("inactive");
                navTag.id = project.model;

                let navLabel = document.createElement("div");
                navLabel.classList.add("label");
                navLabel.innerText = project.title;
                navTag.append(navLabel);
                
                navTags.push(navTag);
                document.body.append(navTag);
            }
        );

        return navTags;

    }

    createMoreProjects() {

        this.intersections.length = 0;
        let projectIndex = 0;

        let moreProjectsWindow = document.createElement("div");
        let moreProjectsHeadline = document.createElement("div");
        let projectInfoSidebar = document.createElement("div");
        let projectTitle = document.createElement("div");
        let projectSubtitle = document.createElement("div");
        let projectDescription = document.createElement("div");
        let projectMedia = document.createElement("div");
        let closeButton = document.createElement("div");
        let prevNext = document.createElement("div");
        let previousButton = document.createElement("span");
        let nextButton = document.createElement("span");
        
        moreProjectsWindow.classList.add("moreprojects");
        moreProjectsHeadline.classList.add("headline");
        projectInfoSidebar.classList.add("sidebar");
        projectTitle.classList.add("title");
        projectSubtitle.classList.add("sub");
        projectDescription.classList.add("description");
        projectMedia.classList.add("media");
        closeButton.classList.add("closebutton");
        prevNext.classList.add("prevnext");
        previousButton.classList.add("previousbutton");
        nextButton.classList.add("nextbutton");
        closeButton.innerText = "Close";
        previousButton.innerText = "Previous ";
        nextButton.innerText = " Next";
        moreProjectsHeadline.innerText = "More Projects";

        nextProject(0);
        
        prevNext.append(previousButton, nextButton);
        projectInfoSidebar.append(projectTitle, projectSubtitle, projectDescription);
        moreProjectsWindow.append(
            moreProjectsHeadline,
            projectInfoSidebar,
            projectMedia,
            closeButton,
            prevNext
        );
        
        document.body.append(moreProjectsWindow);
        moreProjectsWindow.addEventListener("pointermove", (event) => { event.stopPropagation(); })

        closeButton.addEventListener("pointerup", () => { moreProjectsWindow.remove(); })
        nextButton.addEventListener("pointerup", () => { nextProject(1); })
        previousButton.addEventListener("pointerup", () => { nextProject(-1); })

        function nextProject(interval) {

            projectIndex += interval;
            if (projectIndex > moreProjects.length - 1) {
                projectIndex = 0;
            } else if (projectIndex < 0) {
                projectIndex = moreProjects.length - 1;
            }
            console.log(projectIndex)

            projectTitle.innerText = moreProjects[projectIndex].title;
            projectSubtitle.innerText = moreProjects[projectIndex].subtitle;
            projectDescription.innerText = moreProjects[projectIndex].description;

            projectMedia.innerHTML = "";
    
            moreProjects[projectIndex].media.forEach( (mediaItem) => {
                let image = new Image();
                image.src = mediaItem;
                projectMedia.append(image);
            });
        }

    }

    createProjectWindow(project) {
        console.log(project)
    }

}