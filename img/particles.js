const canvas = document.getElementById('canvas-particulas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particulasArray;

class Particula {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 0.4) - 0.2;
        this.directionY = (Math.random() * 0.4) - 0.2;
        this.size = Math.random() * 2 + 1;
        this.color = '#4d7cfe';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0){
            this.directionY = -this.diretionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init() {
    particulasArray = [];
    let numeroDeParticulas = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numeroDeParticulas; i++) {
        particulasArray.push(new Particula());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    for(let i = 0; i < particulasArray.length; i++) {
        particulasArray[i].update();
    }
    connect();
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particulasArray.length; a++) {
        for (let b = a; b < particulasArray.length; b++) {
            let distance = ((particulasArray[a].x - particulasArray[b].x) * (particulasArray[a].x - particulasArray[b].x)) +
                ((particulasArray[a].y - particulasArray[b].y) * (particulasArray[a].y - particulasArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(77, 124, 254,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particulasArray[a].x, particulasArray[a].y);
                ctx.lineTo(particulasArray[b].x, particulasArray[b].y);
                ctx.stroke();
            }
        }
    }
}
window.addEventListener('resize', function() {
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
    init();
});

init();
animate();
