window.onload = function(){
    const canvas = document.getElementById('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const background = new Background(canvas, ctx);
    const bird = new Bird(250, 250, ctx);
    const pipes = [];
    this.setInterval(function(){
        let pipeSet = generateRandomPipes(ctx, canvas.width, canvas.height);
        pipes.push(pipeSet.top, pipeSet.bottom);
    }, 1000);

    gameLoop();
    
    ctx.fillStyle = "#fff";
    function gameLoop(){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        background.update();
        background.render();
        pipes.forEach(function(pipe){
            pipe.update();
            pipe.render();
        });
       
        bird.update();
        bird.render();
        window.requestAnimationFrame(gameLoop);
    }
}

// Creating background
const Background = function(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.bgPosition = 0;
    this.fgPosition = 0;
    this.speed = 2;
    this.bgImage = document.getElementById('bg');
    this.bgWidth = 1080;
}

Background.prototype.update = function(){
    this.bgPosition -= this.speed;
    if(this.bgPosition < -this.bgWidth){
        this.bgPosition = 0;
    }
}

Background.prototype.render = function(ctx){
    for(let i = 0; i < this.canvas.width/this.bgWidth + 1; i++){
        this.ctx.drawImage(this.bgImage, this.bgPosition + i * this.bgWidth, 0);
    }
}

//Creating bird
const Bird = function(xCord, yCord, ctx){
    this.xCord = xCord;
    this.yCord = yCord;
    this.ctx = ctx;
    this.velY = 0;
    this.birdImg = document.getElementById('bird');
    this.width = 90;
    this.height = 51;
    let self = this;
    window.addEventListener('keydown', function(e){
        //console.log(this);
        if(e.keyCode === 32){
            self.velY = -16;
        }
    });
}

Bird.prototype.update = function(){
    this.yCord += this.velY;
    this.velY += 1.5;
}

Bird.prototype.render = function(){
    let renderX = this.xCord - this.width/2;
    let renderY = this.yCord - this.height/2;
    this.ctx.drawImage(this.birdImg, renderX, renderY);
}

//Creating pipes
const Pipe = function(xCord, yCord, length, speed, ctx){
    this.xCord = xCord;
    this.yCord = yCord;
    this.length = length;
    this.ctx = ctx;
    this.speed = speed;
}

Pipe.prototype.update = function(){
    this.xCord -= this.speed;
}

Pipe.prototype.render = function(){
    this.ctx.save();
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(this.xCord, this.yCord, 150, this.length);
    this.ctx.fillStyle = "#0f0";
    this.ctx.fillRect(this.xCord + 5, this.yCord + 5, 140, this.length - 10)

    this.ctx.restore();
}

//Generating random pipes
function generateRandomPipes(ctx, canvasWidth, canvasHeight){
    let lengthTop = Math.round(Math.random()*200 + 50);
    let lengthBottom = canvasHeight - 200 - lengthTop;
    let returnVal = {};
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
    returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthTop, 4, ctx);
    return returnVal;
}