let currentPage = "home";
let currentTop = 0;
let isScrolling = false;

const pages = ['home', 'projects', 'about'];
const scrollIcon = document.getElementById('scroll-icon-container');
const instagramLogo = document.getElementById('instagram-logo');
const linkedInLogo = document.getElementById('linkedin-logo');
const twitterLogo = document.getElementById('twitter-logo');

const projectsList = {
    'drumkit': {
        'name': 'Drum Kit',
        'description': 'Play the drums using the keyboard keys',
        'imageLink' : './images/drumKit.png'
    },
    'clock': {
        'name': 'Clock',
        'imageLink' : './images/clock.png'
    },
    'flexpanels': {
        'name': 'Flex Panels',
        'imageLink' : './images/flexpanels.png'
    }
}

const openProjectModal = (project) => {
    const modal = document.getElementById('project-modal');
    modal.setAttribute('src', `./projects/${project}/index.html`);
    const top = window.innerHeight + 1;
    modal.style.top = `${top}px`;
    modal.classList.remove('hidden');
}

const closeProjectModal = e => {
    const modal = document.getElementById('project-modal');
    const target = e.target?.id;
    if (modal && (e?.key === "Escape" || ['projects', 'close-button'].includes(target)) && !modal.classList.contains("hidden")) {
        modal.classList.add('hidden');
        modal.setAttribute('src', '');
    }
}

const updateCurrentPage = (page, position) => {
    document.getElementById(`${currentPage}Header`).classList.remove("activeHeader");
    document.getElementById(`${page}Header`).classList.add("activeHeader");
    currentPage = page;
    currentTop = position;
    window.scrollTo({top: position, behavior: 'smooth'});
}

const delayScrolling = () => {
    isScrolling = true;
    setTimeout(() => isScrolling = false, 700);
}

const createProjectsThumbnails = () => {
    return Object.keys(projectsList).forEach(key => {
        const projectsDiv = document.getElementById('projects-list');
        const project = projectsList[key];
              
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.style.marginRight = '10px';
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => openProjectModal(key));
        
        const img = document.createElement('img');
        img.src = project.imageLink;
        img.width = Math.floor(window.innerWidth / 100 * 20);
        img.height = Math.floor(window.innerWidth / 100 * 10);
        div.appendChild(img);

        const textDiv = document.createElement('div');
        textDiv.textContent = project.name;
        textDiv.style.position = 'absolute';
        textDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        textDiv.style.bottom = '8px';
        textDiv.style.padding = '5px 0';
        textDiv.style.width = '100%';
        textDiv.style.textAlign = 'center';
        div.appendChild(textDiv);

        projectsDiv.appendChild(div);
    })
}

const handleSocialMediaIcons = e => {
    if(e.type === 'mouseover'){
        e.target.style.scale = 1.1;
        e.target.style.opacity = 1;
    }
    else{
        e.target.style.scale = 1;
        e.target.style.opacity = 0.6;
    }
}

//Initialization
createProjectsThumbnails();

//Events
window.addEventListener('wheel', e => {
    if(isScrolling) {
        updateCurrentPage(currentPage, currentTop);
        return;
    }

    if(!isScrolling && e.deltaY > 0){
        if(currentPage === 'home') {
            updateCurrentPage('projects', window.innerHeight + 1);
        }
        else if(currentPage === 'projects') {
            updateCurrentPage('about', (window.innerHeight * 2) + 1);
        }
    }
    else if (!isScrolling && e.deltaY < 0){
        if(currentPage === 'projects') {
            updateCurrentPage('home', 0);
        }
        else if(currentPage === 'about') {
            updateCurrentPage('projects', window.innerHeight + 1);
        }
    }
    delayScrolling();
})

window.addEventListener('click', e => {
    const target = e.target?.id.split('Header')[0];
    if(pages.includes(target)){
        let newCurrentPage = 0;
        if(target === 'projects') newCurrentPage = window.innerHeight + 1;
        else if(target === 'about') newCurrentPage = window.innerHeight * 2 + 1;
        updateCurrentPage(target, newCurrentPage);
    }
})

window.addEventListener('click', closeProjectModal);
document.addEventListener("keydown", closeProjectModal);

scrollIcon.addEventListener('click', () => {
    if(isScrolling) {
        updateCurrentPage(currentPage, currentTop);
        return;
    }
    updateCurrentPage('projects', window.innerHeight + 1);
    delayScrolling();
})

instagramLogo.addEventListener('mouseover', handleSocialMediaIcons);
instagramLogo.addEventListener('mouseleave', handleSocialMediaIcons);
linkedInLogo.addEventListener('mouseover', handleSocialMediaIcons);
linkedInLogo.addEventListener('mouseleave', handleSocialMediaIcons);
twitterLogo.addEventListener('mouseover', handleSocialMediaIcons);
twitterLogo.addEventListener('mouseleave', handleSocialMediaIcons);