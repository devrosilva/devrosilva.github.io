const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let currentPage = "home";
const pages = ['home', 'projects', 'about'];

const home = document.getElementById('home');
const projects = document.getElementById('projects');
const about = document.getElementById('about');
const scrollIcon = document.getElementById('scroll-icon-container');
const mainContainer = document.getElementById('main-container');

const projectsList = {
    'drumKit': {
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
 
const balls = Ball.generateBalls(30);
function run(){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < balls.length; i++){
        balls[i].update();
    }
    requestAnimationFrame(run);
}
run();

const createProjectsThumbnails = () => {
    return Object.keys(projectsList).forEach(key => {
        const projectsDiv = document.getElementById('projects-list');
        const project = projectsList[key];
              
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.style.marginRight = '10px';

        const a = document.createElement('a');
        a.href = project.imageLink;

        const img = document.createElement('img');
        img.src = project.imageLink;
        img.width = Math.floor(window.innerWidth / 100 * 20);
        img.height = Math.floor(window.innerWidth / 100 * 10);
        
        a.appendChild(img)
        div.appendChild(a);

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
createProjectsThumbnails();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

window.addEventListener('wheel', e => {
    if(e.deltaY > 0){
        if(currentPage === 'home') {
            window.scrollTo({top: window.innerHeight + 1, behavior: 'smooth'});
            currentPage = 'projects';
        }
        else if(currentPage === 'projects') {
            window.scrollTo({top: window.innerHeight * 2 + 1, behavior: 'smooth'});
            currentPage = 'about';
        }
    }
    else{
        if(currentPage === 'projects') {
            window.scrollTo({top: 0, behavior: 'smooth'});
            currentPage = 'home';
        }
        else if(currentPage === 'about') {
            window.scrollTo({top: window.innerHeight + 1, behavior: 'smooth'});
            currentPage = 'projects';
        }
    }
})

mainContainer.addEventListener('scroll', e => {
    setTimeout(() => {
        if(e.deltaY > 0){
            if(currentPage === 'home') {
                window.scrollTo({top: window.innerHeight + 1, behavior: 'smooth'});
                currentPage = 'projects';
            }
            else if(currentPage === 'projects') {
                window.scrollTo({top: window.innerHeight * 2 + 1, behavior: 'smooth'});
                currentPage = 'about';
            }
        }
        else{
            if(currentPage === 'projects') {
                window.scrollTo({top: 0, behavior: 'smooth'});
                currentPage = 'home';
            }
            else if(currentPage === 'about') {
                window.scrollTo({top: window.innerHeight + 1, behavior: 'smooth'});
                currentPage = 'projects';
            }
        }
      }, 1000);
})

scrollIcon.addEventListener('click', e => {
    window.scrollTo({top: window.innerHeight + 1, behavior: 'smooth'});
    currentPage = 'projects';
})
