import App from "./app/app.js";
import featuredProjects from "./featured.json";
import moreProjects from "./moreprojects.json";

// parse project JSON into HTML for SEO:

const featuredProjectSection = document.querySelector(".featuredprojectstxt");
const moreProjectsSection = document.querySelector(".moreprojectstxt");

featuredProjects.forEach(function(each) { PopulateProjetText(each, featuredProjectSection)});
moreProjects.forEach(function(each) { PopulateProjetText(each, moreProjectsSection)});

// Instantiate 3D application

const webGLcanvas = document.getElementById("webglcanvas");
const app = new App(webGLcanvas); // TURN OFF FOR TESTING MOBILE LOADING/SPLASH

// disables mobile overscroll

document.body.addEventListener("touchmove",
    (e) => { e.preventDefault(); },
    { passive: false, useCapture: false }
);

function PopulateProjetText(project, section) {

    let projectEntry = document.createElement("div");
    projectEntry.classList.add("featuredproject");

    let projectTitle = document.createElement("h4");
    projectTitle.innerText = project.title;

    let projectSubtitle = document.createElement("h5");
    projectSubtitle.innerText = project.subtitle;

    let projectDescription = document.createElement("p");
    projectDescription.innerText = project.description;

    section.append(projectTitle, projectSubtitle, projectDescription);

    if (project.awards !== undefined && project.awards.length > 0) {

        let awardsList = document.createElement("ul");

        project.awards.forEach(
            function(each) {
                let awardListItem = document.createElement("li");
                awardListItem.innerText = `${each.status}, ${each.award} - ${each.category} for ${each.project} with ${each.credit}`;
                awardsList.append(awardListItem);
            }
        );

        section.append(awardsList);

    }

    if (project.media !== undefined && project.media.length > 0) {

        let mediaList = document.createElement("ul");

        project.media.forEach(
            function(each) {
                mediaList.innerHTML += `<li><a href="${each}" target=_blank>${each}</a></li>`;
            }
        );

        section.append(mediaList);

    }

    section.append(projectEntry);
    
}