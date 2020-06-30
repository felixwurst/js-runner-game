
// Task: 
// Increase the box speed after every successful jump

window.onload = function(){

    // selectors
    let canvas = document.querySelector('#gameCanvas');
    let scoreSpan = document.querySelector('#scoreSpan');

    // line
    let ctx = canvas.getContext('2d');
    ctx.moveTo(0,100);
    ctx.lineTo(600,100);
    ctx.stroke();

    // // old version without boxSpeed-changes
    // // box
    // let boxCounter = 580;
    // let boxSpeed = 100;
    // boxInterval = setInterval(function(){
    //     ctx.clearRect(boxCounter+20,79,20,20);
    //     ctx.fillStyle = "red";
    //     ctx.fillRect(boxCounter,79,20,20);
    //     if (boxCounter == 0) {
    //         boxCounter = 580;
    //     } else {
    //         boxCounter -= 20;
    //     }
    // }, boxSpeed)

    // box
    let boxCounter = 580;
    let boxSpeed = 150;

    let boxInterval = setInterval(boxSpeedUp, boxSpeed);

    function boxSpeedUp() { 
        ctx.clearRect(boxCounter+20,79,20,20);
        ctx.fillStyle = "red";
        ctx.fillRect(boxCounter,79,20,20);
        if (boxCounter == 0) {
            boxCounter = 580;
            // changes the boxSpeed
            if (boxSpeed == 70) {
                boxSpeed = 150
            } else {
                boxSpeed -= 10;
            }
            console.log(boxSpeed);
            // clear the interval 
            clearInterval(boxInterval);
            // set the interval again with a new speed value
            boxInterval = setInterval(boxSpeedUp, boxSpeed);
        } else {
            boxCounter -= 20;
        }
    }

    // avatar
    let img = document.createElement('img');
    img.src = './img/player_big.png'; // 480 x 60 px
    img.onload = function(e){
        // counters
        let frameCounter = 0;
        let scoreCounter = 0;
        let characterInterval = setInterval(function(){
            ctx.clearRect(0,0,48,99);
            // status running or jumping
            if (status == "running") {
                ctx.drawImage(img,frameCounter,0,48,60,0,39,48,60);
            } else {
                ctx.drawImage(img,frameCounter,0,48,60,0,14,48,60);
            }
            // frameCounter reset or increasing
            if (frameCounter == 336) {
                frameCounter = 0;
            } else {
                frameCounter += 48;
            }
            // crash
            if (boxCounter < 40 && status == "running") {
                clearInterval(boxInterval);
                clearInterval(characterInterval);
                // text 'crash' on canvas
                ctx.font = "30px Georgia";
                ctx.fillText("crash!",65,99);
            }
            // score
            if (boxCounter < 40 && status == "jumping") {
                scoreCounter ++;
                scoreSpan.innerText = scoreCounter;
            }
        }, 150)
    }

    // switch status: running or jumping
    let status = "running";
    window.onkeypress = function(e){
        if (e.key == " ") {
            status = "jumping";
            setTimeout(() => {
                status = "running";
            }, 350);
        }
    }

}
