window.onload = function(){
    const canvas = document.getElementById('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const background = new Background(canvas, ctx);
    gameLoop();
    //ctx.drawImage(document.getElementById('bird'), 200, 200);
    ctx.fillStyle = "#fff";
    function gameLoop(){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        background.update();
        background.render();
        window.requestAnimationFrame(gameLoop);
    }
}

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