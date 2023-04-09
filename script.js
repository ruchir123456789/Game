// game constants and variables
let inputDir = { x: 0, y: 0 }
const foodsound = new Audio('food.mp3')
const gameoversound = new Audio('gameover.mp3')
const movesound = new Audio('move.mp3')
const musicsound = new Audio('music.mp3')
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }
let board = document.getElementById("board");

// main function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();


}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {

            return true;
        }
    }

    // if you get colided with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}
function gameEngine() {
    musicsound.play();
    // part 1: updating the snake Array & food 
    if (isCollide(snakeArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("game over Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;

    }
    // if you have eaten the food,increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        foodsound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "HiScore:" + hiscoreval;


        }
        scoreBox.innerHTML = "score:" + score;
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element =array[i];

        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2:dispaly the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('snake');
        if (index === 0) {
            snakeElement.classList.add('head');

        }
        else {
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);


    });


    // dispaly the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}















// main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "hiscore :" + hiscore;
}


up.addEventListener("click", e => {
    inputDir = { x: 0, y: 1 } //start the game
    movesound.play();
    console.log("ArrowUp");
    inputDir.x = 0;
    inputDir.y = -1;
})


down.addEventListener("click", e => {
    inputDir = { x: 0, y: 1 } //start the game
    movesound.play();
    console.log("ArrowDown");
    inputDir.x = 0;
    inputDir.y = 1;
   
})
left.addEventListener("click", e => {
    inputDir = { x: 0, y: 1 } //start the game
    movesound.play();
    console.log("ArrowLeft");
    inputDir.x = -1;
    inputDir.y = 0;
    
})
right.addEventListener("click", e => {
    inputDir = { x: 0, y: 1 } //start the game
    movesound.play();
    console.log("ArrowRight");
    inputDir.x = 1;
    inputDir.y = 0;
    
    
})
    window.requestAnimationFrame(main);  //this is to constantly render the changes in the game
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;


            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;


            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;


            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;


            break;
        default:
            break;
    }
})
