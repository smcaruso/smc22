import App from "./app/app.js";
import featuredProjects from "./featured.json";
import moreProjects from "./moreprojects.json";

// parse project JSON into HTML for SEO:

const featuredProjectSection = document.querySelector(".featuredprojects");
const moreProjectsSection = document.querySelector(".moreprojects");

featuredProjects.forEach(function(each) { PopulateProjetText(each, featuredProjectSection)});
moreProjects.forEach(function(each) { PopulateProjetText(each, moreProjectsSection)});

// Instantiate 3D application

const webGLcanvas = document.getElementById("webglcanvas");
const app = new App(webGLcanvas);

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

    section.append(projectEntry);
    
}