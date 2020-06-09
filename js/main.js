window.onload = function(){
    const canvas = document.getElementById('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const background = new Background();
    gameLoop();
    //ctx.drawImage(document.getElementById('bird'), 200, 200);
    ctx.fillStyle = "#fff";
    function gameLoop(){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        background.update();
        background.render(ctx);
        window.requestAnimationFrame(gameLoop);
    }
}

const Background = function(){
    this.bgPosition = 0;
    this.fgPosition = 0;
    this.speed = 10;
    this.bgImage = document.getElementById('bg');
}

Background.prototype.update = function(){
    this.bgPosition -= this.speed;
}

Background.prototype.render = function(ctx){
    ctx.drawImage(this.bgImage, this.bgPosition, 0);
}