(function(){
    const TestDiv = document.getElementById('HeaderAnim');
    const rootStyles = getComputedStyle(document.documentElement);
    const _particleCount = rootStyles.getPropertyValue('--particleCount').trim();

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        w = canvas.width  = TestDiv.offsetWidth,
        h = canvas.height = TestDiv.offsetHeight,
        particles = [],
        properties = {
            bgColor             : '#111013',
            particleColor       : 'rgba(255, 40, 40, 1)',
            particleRadius      : 3,
            particleCount       : _particleCount,
            particleMaxVelocity : 0.30,
            lineLength          : 150,
            particleLife        : 150,
        };

    TestDiv.appendChild(canvas);
    canvas.classList.add('CanvasBgr');

    // при ресайзе обновляем размеры под сам блок
    window.addEventListener('resize', () => {
        w = canvas.width  = TestDiv.offsetWidth;
        h = canvas.height = TestDiv.offsetHeight;
    });

    class Particle{
        constructor(){
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.life = Math.random()*properties.particleLife*60;
        }
        position(){
            if(this.x + this.velocityX > w || this.x + this.velocityX < 0) this.velocityX *= -1;
            if(this.y + this.velocityY > h || this.y + this.velocityY < 0) this.velocityY *= -1;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
        reCalculateLife(){
            if(this.life < 1){
                this.x = Math.random()*w;
                this.y = Math.random()*h;
                this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.life = Math.random()*properties.particleLife*60;
            }
            this.life--;
        }
    }

    function reDrawBackground(){
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    function drawLines(){
        for(let i in particles){
            for(let j in particles){
                let x1 = particles[i].x,
                    y1 = particles[i].y,
                    x2 = particles[j].x,
                    y2 = particles[j].y,
                    length = Math.hypot(x2 - x1, y2 - y1);

                if(length < properties.lineLength){
                    let opacity = 1-length/properties.lineLength;
                    ctx.lineWidth = 0.5;
                    ctx.strokeStyle = 'rgba(255, 40, 40,'+opacity+')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }
        }
    }

    function reDrawParticles(){
        for(let i in particles){
            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
        }
    }

    function loop(){
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init(){
            console.log(_particleCount);
            console.log('test');
        for(let i = 0 ; i < properties.particleCount ; i++){
            particles.push(new Particle());
        }
        loop();
    }

    init();
}());
