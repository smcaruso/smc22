import featuredProjects from "./featured.json";
import moreProjects from "./moreprojects.json";

// parse project JSON into HTML for SEO:

let featuredProjectSection = document.querySelector(".featuredprojects");
let moreProjectsSection = document.querySelector(".moreprojects");

featuredProjects.forEach(function(each) { PopulateProjetText(each, featuredProjectSection)});
moreProjects.forEach(function(each) { PopulateProjetText(each, moreProjectsSection)});

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
    section.append(projectEntry);
    
}