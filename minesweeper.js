function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.bee = false;
    this.revealed = false;
}
Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.bee) {
            fill(127);
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        } else {
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
                textAlign(CENTER);
                fill(0);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
            }
        }
    }
}
Cell.prototype.countBees = function() {
    if (this.bee) {
        this.neighborCount = -1;
        return;
    }
    var total = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
        var i = this.i + xoff;
        if (i < 0 || i >= cols) continue;
        for (var yoff = -1; yoff <= 1; yoff++) {
            var j = this.j + yoff;
            if (j < 0 || j >= rows) continue;
            var neighbor = grid[i][j];
            if (neighbor.bee) {
                total++;
            }
        }
    }
    this.neighborCount = total;
}
Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}
Cell.prototype.reveal = function() {
    this.revealed = true;
    if (this.neighborCount == 0) {
        // flood fill time
        this.floodFill();
    }
}
Cell.prototype.floodFill = function() {
    for (var xoff = -1; xoff <= 1; xoff++) {
        var i = this.i + xoff;
        if (i < 0 || i >= cols) continue;
        for (var yoff = -1; yoff <= 1; yoff++) {
            var j = this.j + yoff;
            if (j < 0 || j >= rows) continue;
            var neighbor = grid[i][j];
            // Note the neighbor.bee check was not required.
            // See issue #184
            if (!neighbor.revealed) {
                neighbor.reveal();
            }
        }
    }
}
function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}
var grid;
var cols;
var rows;
var w = 20;
var totalBees = 30;
function setup() {
    createCanvas(401, 401);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }
    // Pick totalBees spots
    var options = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }
    for (var n = 0; n < totalBees; n++) {
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];
        // Deletes that spot so it's no longer an option
        options.splice(index, 1);
        grid[i][j].bee = true;
        
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].countBees();
        }
    }
}
function gameOver() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
}
function mousePressed() {

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal();
                if (grid[i][j].bee) {
                    gameOver();
                }
            }
        }
    }
}
function draw() {
    background(255);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}
