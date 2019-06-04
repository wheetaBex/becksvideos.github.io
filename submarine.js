var mainCharacter;
var Maindead = false
var gravity = 9.8 / 30.0;
var backgroundImage;
var mainCharacterImage;
var monsterImage
var groundOffset = 150
var monsterArray = []
var jumpcheck = 0
var monsterx = 600
var scoreElem;
var lives = 3
var health = 100
var direction = "right"
var score = 0
var mx = -0.5
class Character {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.width = width/2 + 10;
        this.length = width/2
        this.color = "blue"
        this.isMonster = false
        this.monsterspeed = -10
        this.monsterx = 100
        this.dead = false
    }

    update() {
        //if (this.x<=0){
        //this.xSpeed*=-1
        //mx *=-1
        // }

        if (this.y + this.width * 0.5 >= (height - groundOffset) && this.ySpeed > 0) {
            this.ySpeed = this.ySpeed * (-0.4)
            this.y = height - this.width * 0.5 - groundOffset
        }
        this.ySpeed += gravity;
        this.y += this.ySpeed;

        this.xSpeed *= 0.8
        this.x += this.xSpeed
    }
    moveBadGuy() {

        this.xSpeed += mx
    }
    touchcheck() {
        if (mainCharacter.x + mainCharacter.width >= this.x && mainCharacter.x <= this.x + this.width && mainCharacter.y + mainCharacter.width >= this.y && mainCharacter.y <= this.y + this.width) {
            if (mainCharacter.y - this.y < -20) {
                this.dead = true
                mainCharacter.ySpeed =-8
                if (Maindead ==false){
                    score++
                }
            } else {
                health-=0.5
            }
        }

    }



    draw() {


        if (this.isMonster) {
            image(monsterImage, this.x, this.y, this.width, this.length)
        } else {
            image(mainCharacterImage, this.x, this.y, this.width, this.width)
        }
    }
}

function setup() {


    createCanvas(650, 350);
    mainCharacter = new Character(200, 200, 60)
    backgroundImage = loadImage("./background ocean.jpeg")
    mainCharacterImage = loadImage("./submarine.png")
    monsterImage = loadImage("./14-2-fish-png-15.png")



    for (var i = 0; i < 1000; i++) {
        var newMonster = new Character(monsterx + i * 150, 150, 80)
        newMonster.isMonster = true
        monsterArray.push(newMonster)
    }
}

function draw() {

    background(0, 200, 150);
    image(backgroundImage, 0, 0, width, height)



    if (keyIsDown(LEFT_ARROW)) {
        //move left
        mainCharacter.xSpeed -= 1.0
        direction = "left"
    }

    if (keyIsDown(RIGHT_ARROW)) {
        //move right
        mainCharacter.xSpeed += 1.0
        direction = "right"
    }

    if (keyIsDown(DOWN_ARROW)) {
        //move right
        mainCharacter.ySpeed += 1.0

    }
    mainCharacter.update();
    mainCharacter.draw()

    fill("red")
    stroke("black")
    rect(10, 10, health * 2, 20)
    fill("white")
    textSize(20)
    text("score:"+ score,width-90,30)

    if (direction == "left") {
        mainCharacterImage = loadImage("./submarine2.png")
    }

    if (direction == "right") {
        mainCharacterImage = loadImage("./image.png")
    }


    for (var i = 0; i < monsterArray.length; i++) {
        if(monsterArray[i].dead){
            monsterArray[i].x = -600


        }
        else{
            monsterArray[i].update()
            monsterArray[i].draw()
            monsterArray[i].moveBadGuy()
        }



        if (monsterArray[i].touchcheck()) {

        }
    }
    if (health <= 0) {
        Maindead = true
        background(0)
        fill("red")
        textSize(70)
        text("You Died", width / 2 - 140, height / 2 - 70, 400, 200)
        textSize(50)
        text("Your score was                " +score, width / 2 - 170, height / 2 +30, 400, 200)
    }
}

function keyPressed() {

    if (key === " " && mainCharacter.y >= 140) {
        mainCharacter.ySpeed -= 10


    }

}