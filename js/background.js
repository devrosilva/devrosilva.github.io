const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
const generateBackgroundAnimation = balls => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < balls.length; i++){
        balls[i].update();
    }
    requestAnimationFrame(() => generateBackgroundAnimation(balls));
}

//Initialization
generateBackgroundAnimation(balls);

//Events
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const resizeBalls = Ball.generateBalls(30);
    generateBackgroundAnimation(resizeBalls);
})