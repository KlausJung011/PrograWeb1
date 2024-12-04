// Sistema de likes
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const count = this.querySelector('.like-count');
        
        if (icon.classList.contains('bi-heart')) {
            icon.classList.replace('bi-heart', 'bi-heart-fill');
            count.textContent = parseInt(count.textContent) + 1;
        } else {
            icon.classList.replace('bi-heart-fill', 'bi-heart');
            count.textContent = parseInt(count.textContent) - 1;
        }
    });
});

// Arte Generativo con p5.js
// Sketch 1: Partículas Conectadas
let sketch1 = new p5(function(p) {
    let particles = [];

    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, 400);
        canvas.parent('sketch1');
        for(let i = 0; i < 50; i++) {
            particles.push({
                pos: p.createVector(p.random(p.width), p.random(p.height)),
                vel: p.createVector(p.random(-1, 1), p.random(-1, 1)),
                color: p.color(p.random(255), p.random(255), p.random(255)) // Asignar color aleatorio
            });
        }
    };

    p.draw = function() {
        p.background(0, 10);
        
        particles.forEach((particle, i) => {
            particle.pos.add(particle.vel);
            
            if(particle.pos.x < 0 || particle.pos.x > p.width) particle.vel.x *= -1;
            if(particle.pos.y < 0 || particle.pos.y > p.height) particle.vel.y *= -1;
            
            particles.slice(i + 1).forEach(other => {
                let d = p.dist(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
                if(d < 100) {
                    p.stroke(particle.color, 100 - d); // Usar color de la partícula
                    p.line(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
                }
            });
            
            p.fill(particle.color); // Usar color de la partícula
            p.noStroke();
            p.ellipse(particle.pos.x, particle.pos.y, 6, 6); // Aumentar tamaño
        });
    };
});

// Sketch 2: Ondas de Color
let sketch2 = new p5(function(p) {
    let angle = 0;

    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, 400);
        canvas.parent('sketch2');
    };

    p.draw = function() {
        p.background(0, 20);
        p.translate(p.width/2, p.height/2);
        
        for(let i = 0; i < 50; i++) {
            let x = p.cos(angle + i * 0.2) * 500;
            let y = p.sin(angle + i * 0.5) * 100;
            p.fill(p.map(i, 0, 50, 50, 255), p.map(i, 0, 50, 255, 0), 255, 150); // Color arcoíris con transparencia
            p.noStroke();
            p.ellipse(x, y, 30, 30); // Aumentar tamaño
        }
        
        angle += 0.025;
    };
});

// Sketch 3: Campo de Flujo
let sketch3 = new p5(function(p) {
    let particles = [];
    let noiseScale = 0.0005;

    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, 400);
        canvas.parent('sketch3');
        for(let i = 0; i < 2000; i++) {
            particles.push({
                pos: p.createVector(p.random(p.width), p.random(p.height)),
                prev: p.createVector(0, 0),
                vel: p.createVector(0, 0)
            });
        }
    };

    p.draw = function() {
        p.background(0, 4);
        
        particles.forEach(particle => {
            let angle = p.noise(particle.pos.x * noiseScale, particle.pos.y * noiseScale) * p.TWO_PI * 8;
            
            particle.prev.set(particle.pos);
            particle.vel.set(p.cos(angle), p.sin(angle));
            particle.vel.mult(0.05); // Aumentar velocidad
            particle.pos.add(particle.vel);
            
            //if(particle.pos.x < 0) particle.pos.x = p.width;
            //if(particle.pos.x > p.width) particle.pos.x = 0;
            //if(particle.pos.y < 0) particle.pos.y = p.height;
            //if(particle.pos.y > p.height) particle.pos.y = 0;
            
            p.stroke(255, 250); // Aumentar transparencia
            p.line(particle.prev.x, particle.prev.y, particle.pos.x, particle.pos.y);
        });
    };
});