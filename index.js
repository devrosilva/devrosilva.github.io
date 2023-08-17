const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let currentPage = "home";
const pages = ['home', 'projects', 'about'];
const scrollIcon = document.getElementById('scroll-icon-container');

const projectsList = {
    'drumkit': {
        'name': 'Drum Kit',
        'description': 'Play the drums using the keyboard keys',
        'imageLink' : './images/drumKit.png'
    },
    'clock': {
        'name': 'Clock',
        'imageLink' : './images/clock.png'
    }
}

class Ball{
    constructor(){
        const colors = ['#348888', '#22BABB', '#9EF8EE', '#FA7F08', '#F24405']; 
        const idx = Math.floor(Math.random() * colors.length);
        const color = colors[idx];

        this._radius = Math.random() * 19 + 1;
        this._x = Math.random() * innerWidth - this._radius;
        this._y = Math.random() * innerHeight - this._radius;; 
        this._dx = Math.random() * 4;
        this._dy = Math.random() * 4; 
        this._color = color;
    }

    draw(){
        const color = this._color;
        ctx.beginPath();
        ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();
    }

    update(){
        if(this._x + this._radius > innerWidth || this._x - this._radius < 0){
            this._dx = -this._dx;
        }
        if(this._y + this._radius > innerHeight || this._y - this._radius < 0){
            this._dy = -this._dy;
        }
        this._x += this._dx;
        this._y += this._dy;

        this.draw();
    }

    static generateBalls(amount){
        const balls = [];
        for(let i = 0; i < amount; i++){
            const ball = new Ball();
            balls.push(ball);
        }
        return balls; 
    }
}

//Functions definitions
const balls = Ball.generateBalls(30);
const generateBackgroundAnimation = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < balls.length; i++){
        balls[i].update();
    }
    requestAnimationFrame(generateBackgroundAnimation);
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
    window.scrollTo({top: position, behavior: 'smooth'});
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

//Initialization
generateBackgroundAnimation();
createProjectsThumbnails();

//Events
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

window.addEventListener('wheel', e => {
    if(e.deltaY > 0){
        if(currentPage === 'home') {
            updateCurrentPage('projects', window.innerHeight + 1);
        }
        else if(currentPage === 'projects') {
            updateCurrentPage('about', window.innerHeight * 2 + 1);
        }
    }
    else{
        if(currentPage === 'projects') {
            updateCurrentPage('home', 0);
        }
        else if(currentPage === 'about') {
            updateCurrentPage('projects', window.innerHeight + 1);
        }
    }
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
    updateCurrentPage('projects', window.innerHeight + 1);
})