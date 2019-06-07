var gridSize = 260
var arraySize = (gridSize*gridSize)
var chanceOfLife = 0.08


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
    
    
  
    
    if(isAlive[i] && numberOfLivingNeighbors < 2){
    	nextTurnIsAlive[i] = false
    }
    
    if(isAlive[i] && numberOfLivingNeighbors >3 ){
    	nextTurnIsAlive[i] = false
    }
    
    if(!isAlive[i] && numberOfLivingNeighbors ==3 ){
    	nextTurnIsAlive[i] = true
    }
   
    
	
  }

  for(var i = 0;i<arraySize;i++){
    isAlive[i] = nextTurnIsAlive[i]
  }
}





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
