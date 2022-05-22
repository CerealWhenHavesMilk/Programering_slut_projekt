var p = 0;
var g = 0 
var l = 0;

var myGamePiece;

function startGame() {
    myGamePiece = new component(40, 40, "bbike.png", 120, 120,"image");
    notMyGamePiece = new component(40, 40, "rbike.png", 1150, 120,"image")
    notMyGamePiece2 = new component(40,40,"rbike.png", 1200,120,"image")
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1500;
        this.canvas.height = 750;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 1);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speed = 1;
    this.x = x;
    this.y = y;
    this.angle = 0; 
    this.moveAngle= 0;   
   
    this.check = function() {
        if (this.x < 0) 
            this.x = 1400
        if (this.x > 1400)
            this.x = 0
        if (this.y < 0 ) 
            this.y = 750
        if (this.y > 750)
            this.y = 0



    }


    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    
    }
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.translate(this.x,this.y)
        ctx.restore();
        p = (p + 1 - g)
        document.getElementById("Pcounter").innerHTML = "score:" + (p/10);
        

    }

    this.visualrotator = function() {
        document.getElementById("arrow").style.transform = `rotate(${ -1.5707963268 + this.angle}rad)`;



    }
    this.stop = function() {
        this.width = 0
        this.height = 0


    }



}



     

function updateGameArea() {
        myGameArea.clear();
        myGamePiece.moveAngle = 0;
        myGamePiece.speed = 0;
        notMyGamePiece.speed = 2
        notMyGamePiece2.speed = 2
        notMyGamePiece.angle =  (myGamePiece.y / myGamePiece.x)*-Math.PI/2
        notMyGamePiece2.angle = (myGamePiece.x / myGamePiece.y)*-Math.PI/2
        if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.moveAngle = -1; }
        if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.moveAngle = 1; }
        if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speed= 1; }
        if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speed= -1; }
        myGamePiece.check();
        notMyGamePiece.check();
        notMyGamePiece2.check();
        myGamePiece.newPos();
        notMyGamePiece.newPos();
        notMyGamePiece2.newPos();
        myGamePiece.update();
        notMyGamePiece.update();
        notMyGamePiece2.update();
        myGamePiece.visualrotator();
        if ( notMyGamePiece2.x - 40  <  myGamePiece.x && myGamePiece.x < notMyGamePiece2.x + 40 && notMyGamePiece2.y -40 < myGamePiece.y && myGamePiece.y < notMyGamePiece2.y + 40){
            document.getElementById("gameOver").style.display ="flex";
            document.getElementById("finalscore").style.display = "flex";
            myGamePiece.stop();
            notMyGamePiece.stop();
            notMyGamePiece2.stop();
            g = 1
            document.getElementById("finalscore").innerHTML = "score:" + p/10


        }
        if ( notMyGamePiece.x - 40 <  myGamePiece.x && myGamePiece.x < notMyGamePiece.x + 40  &&  myGamePiece.y  > notMyGamePiece.y - 40 && myGamePiece.y < notMyGamePiece.y + 40 ){
            document.getElementById("gameOver").style.display = "flex";
            document.getElementById("finalscore").style.display = "flex";

            myGamePiece.stop();
            notMyGamePiece.stop();
            notMyGamePiece2.stop();
            g = 1
            document.getElementById("finalscore").innerHTML = "score:" + p/10


        }
        

}


