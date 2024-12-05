// Sketch 1: Ramifications
let sketch1 = function(p) {
    let particles = [];
    let maxParticles = 200;
    let particleSize = 6;
    let trailLength = 50;

    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, 400);
        canvas.parent('generative-art-container');

        for (let i = 0; i < maxParticles; i++) {
        particles.push({
            pos: p.createVector(p.random(p.width), p.random(p.height)),
            vel: p.createVector(p.random(-2, 2), p.random(-2, 2)),
            trail: []
        });
        }
    };

    p.draw = function() {
        p.background(0, 10);
        p.noFill();

        particles.forEach((particle) => {
        particle.pos.add(particle.vel);
        particle.trail.push(particle.pos.copy());

        if (particle.pos.x < 0 || particle.pos.x > p.width) particle.vel.x *= -1;
        if (particle.pos.y < 0 || particle.pos.y > p.height) particle.vel.y *= -1;

        p.beginShape();
        for (let i = 0; i < particle.trail.length; i++) {
            let alpha = p.map(i, 0, particle.trail.length, 255, 0);
            p.stroke(255, alpha);
            p.vertex(particle.trail[i].x, particle.trail[i].y);

            if (i > trailLength) {
            particle.trail.shift();
            break;
            }
        }
        p.endShape();

        p.fill(255);
        p.noStroke();
        p.circle(particle.pos.x, particle.pos.y, particleSize);
        });
    };
};

// Lluvia
let sketch2 = function(p) {
    let raindrops = [];
    let maxDrops = 500;
  
    p.setup = function() {
      let canvas = p.createCanvas(p.windowWidth, 400);
      canvas.parent('generative-art-container');
  
      // Crear las gotas de lluvia iniciales
      for (let i = 0; i < maxDrops; i++) {
        raindrops.push({
          x: p.random(p.width),
          y: p.random(-100, 0),
          length: p.random(10, 20),
          speed: p.random(5, 15)
        });
      }
    };
  
    p.draw = function() {
      p.background(0, 20, 40);
      p.noStroke();
      p.fill(173, 216, 230);
  
      // Actualizar y dibujar las gotas de lluvia
      for (let i = 0; i < raindrops.length; i++) {
        let drop = raindrops[i];
        drop.y += drop.speed;
        p.rect(drop.x, drop.y, 2, drop.length);
  
        // Reciclar las gotas que salen de la pantalla
        if (drop.y > p.height + drop.length) {
          drop.y = p.random(-100, 0);
          drop.x = p.random(p.width);
        }
      }
    };
};

// Ondas
let sketch3 = function(p) {
    let particles = [];
    let particleCount = 1000;
    let noiseScale = 0.005;
    let particleSpeed = 0.05;
  
    p.setup = function() {
      let canvas = p.createCanvas(p.windowWidth, 400);
      canvas.parent('generative-art-container');
  
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          pos: p.createVector(p.random(p.width), p.random(p.height)),
          prev: p.createVector(0, 0),
          vel: p.createVector(0, 0)
        });
      }
    };
  
    p.draw = function() {
      p.background(0, 10);
      p.stroke(255, 150);
      p.noFill();
  
      particles.forEach((particle) => {
        let angle = p.noise(particle.pos.x * noiseScale, particle.pos.y * noiseScale) * p.TWO_PI * 4;
        particle.prev.set(particle.pos);
        particle.vel.set(p.cos(angle), p.sin(angle));
        particle.vel.mult(particleSpeed);
        particle.pos.add(particle.vel);
  
        p.line(particle.prev.x, particle.prev.y, particle.pos.x, particle.pos.y);
  
        if (particle.pos.x < 0) particle.pos.x = p.width;
        if (particle.pos.x > p.width) particle.pos.x = 0;
        if (particle.pos.y < 0) particle.pos.y = p.height;
        if (particle.pos.y > p.height) particle.pos.y = 0;
      });
    };
};

// Ondas 2
let sketch4 = function(p) {
    let waves = [];
    let waveCount = 50;
    let waveHeight = 20;
    let waveSpeed = 0.05;
  
    p.setup = function() {
      let canvas = p.createCanvas(p.windowWidth, 400);
      canvas.parent('generative-art-container');
    };
  
    p.draw = function() {
      p.background(0);
      p.noFill();
      p.stroke(255);
  
      // Dibujar las ondas
      for (let i = 0; i < waveCount; i++) {
        let x = p.map(i, 0, waveCount - 1, 0, p.width);
        let y = p.height / 2 + p.sin(x * waveSpeed + p.millis() * 0.001) * waveHeight;
        p.line(x, p.height / 2, x, y);
      }
    };
};

// Burbujas
let sketch5 = function(p) {
    let bubbles = [];
    let maxBubbles = 100;
    let bubbleSpeed = 1;
    let bubbleSize = { min: 10, max: 30 };
  
    p.setup = function() {
      let canvas = p.createCanvas(p.windowWidth, 400);
      canvas.parent('generative-art-container');
    };
  
    p.draw = function() {
      p.background(0, 100, 200);
  
      if (bubbles.length < maxBubbles) {
        bubbles.push({
          x: p.random(p.width),
          y: p.height,
          radius: p.random(bubbleSize.min, bubbleSize.max),
          speed: p.random(bubbleSpeed / 2, bubbleSpeed * 1.5),
          color: p.color(p.random(100, 255), p.random(100, 255), p.random(100, 255), 200)
        });
      }
  
      p.noStroke();
      for (let i = 0; i < bubbles.length; i++) {
        let bubble = bubbles[i];
        bubble.y -= bubble.speed;
        p.fill(bubble.color);
        p.circle(bubble.x, bubble.y, bubble.radius * 2);
  
        if (bubble.y < -bubble.radius) {
          bubbles.splice(i, 1);
          i--;
        }
      }
    };
};

let currentSketch = null;

document.getElementById('btn-sketch1').addEventListener('click', () => {
  if (currentSketch) currentSketch.remove();
  currentSketch = new p5(sketch1, 'generative-art-container');
});

document.getElementById('btn-sketch2').addEventListener('click', () => {
  if (currentSketch) currentSketch.remove();
  currentSketch = new p5(sketch2, 'generative-art-container');
});

document.getElementById('btn-sketch3').addEventListener('click', () => {
  if (currentSketch) currentSketch.remove();
  currentSketch = new p5(sketch3, 'generative-art-container');
});

document.getElementById('btn-sketch4').addEventListener('click', () => {
  if (currentSketch) currentSketch.remove();
  currentSketch = new p5(sketch4, 'generative-art-container');
});

document.getElementById('btn-sketch5').addEventListener('click', () => {
  if (currentSketch) currentSketch.remove();
  currentSketch = new p5(sketch5, 'generative-art-container');
});