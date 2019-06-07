var gridSize = 130
var arraySize = (gridSize*gridSize)
var chanceOfLife = 0.07
//the "isAlive" array stores true/false for each of our cells telling us which ones are alive: 
var isAlive = []
var nextTurnIsAlive = []

function setup() {
  createCanvas(500, 500);
  //to start, we randomly assign each cell as living or dead (boolean true or false) 
  for(var i = 0;i<arraySize;i++){
  	var alive = (Math.random() < chanceOfLife)
  	isAlive.push(alive)
	}
  frameRate(60)
}

function draw() {
  background(0);
  //each frame we show the cells that are alive
  showAliveCells()
  //then we determine which ones should be alive next turn and update our array
  decideWhichCellShouldBeAliveNextTurn()
}

function showAliveCells(){
	//we loop through our entire array and draw a black square if it is alive
  var cellWidth = width/gridSize;
  var x = 0;
  var y = 0;
  for(var i = 0;i<arraySize;i++){
    if(isAlive[i]){
      fill(200,0,255)
    } else {
      //fill(255,140,0)
      fill("black")
    }
    rect(x, y, cellWidth, cellWidth);
    
    x += cellWidth
  	if((i+1) % gridSize == 0){
      x = 0
      y += cellWidth
    }
  }
}

function decideWhichCellShouldBeAliveNextTurn(){
  //Here we need to loop through our cells and decide whether or not 
  //they should be alive next turn. 
  
  for(var i = 0;i<arraySize;i++){
    var numberOfLivingNeighbors = howManyNeighborsAreAlive(i)
    nextTurnIsAlive[i] = isAlive[i]
    
    //HOMEWORK: complete the section below. I've partially filled it out for you. 
  	//this function loops through our entire array and decides which cells should be alive
  	//next turn. 
    
    //Rules:
    //1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
		//2. Any live cell with two or three live neighbours lives on to the next generation.
		//3. Any live cell with more than three live neighbours dies, as if by overpopulation.
		//4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    //Example: 
    //uncomment the code below. That is rule #1. Homework is to add rules #2-4 from this link:
    //https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
    
    if(isAlive[i] && numberOfLivingNeighbors < 3){
    	nextTurnIsAlive[i] = false
    }
    
    if(isAlive[i] && numberOfLivingNeighbors >5 ){
    	nextTurnIsAlive[i] = false
    }
    
    if(!isAlive[i] && numberOfLivingNeighbors ==3 ){
    	nextTurnIsAlive[i] = true
    }
    //hint: you actually don't need to do anything for rule #2, so just worry about #3 and #4. 
    
		//HOMEWORK END 
  }

  for(var i = 0;i<arraySize;i++){
    isAlive[i] = nextTurnIsAlive[i]
  }
}




//This big function is used to calculate how many neighboring cells are alive. 
//The only reason it looks so complicated is because it has to account for situations 
//where a cell is on the very left/right/top/bottom of the area and therefore doesn't 
//have neighboring cells in that direction. 
//Don't worry about understanding this function.
//Just understand that all it's doing is counting how many 
//cells next to a particular cell are alive. 
function howManyNeighborsAreAlive(index){
  var neighborsAlive = 0
  var isVeryTop = (index < gridSize)
  var isVeryBottom = (index >= (gridSize*gridSize-gridSize-1))
  var isVeryLeft = (index%gridSize == 0)
  var isVeryRight = (index%gridSize == (gridSize-1))

  if(!isVeryTop){
    //count all neighbors above
    var topIndex = index-gridSize
    if(isAlive[topIndex]){
      neighborsAlive++
    }

    if(!isVeryLeft){
      if(isAlive[topIndex-1]){
        neighborsAlive++
      }
    }

    if(!isVeryRight){
      if(isAlive[topIndex+1]){
        neighborsAlive++
      }
    }
  }

  if(!isVeryBottom){
    //count all neighbors above
    var bottomIndex = index+gridSize
    if(isAlive[bottomIndex]){
      neighborsAlive++
    }

    if(!isVeryLeft){
      if(isAlive[bottomIndex-1]){
        neighborsAlive++
      }
    }

    if(!isVeryRight){
      if(isAlive[bottomIndex+1]){
        neighborsAlive++
      }
    }
  }

  if(!isVeryLeft){
    var leftIndex = index-1
    if(isAlive[leftIndex]){
      neighborsAlive++
    }
  }

  if(!isVeryRight){
    var rightIndex = index+1
    if(isAlive[rightIndex]){
      neighborsAlive++
    }
  }
  return neighborsAlive
}
