let Charcter1 = 'red';
let Charcter2 = 'red';
let Charcter3 = 'red';
const img1 = gebid('img1');
const img2 = gebid('img2');
const img3 = gebid('img3');
const gameContainer = gebid('gameContainer');
const playerDiv = gebid('player');
const playerDiv2 = gebid('player2');
const playerDiv3 = gebid('player3');
const timer = gebid('timer');
let touching = false;
let started = false;
gebid('player').style.display = "block";
gebid('player2').style.display = "block";
gebid('player3').style.display = "block";
const player = {
    x: 1.6,
    y: 0,
    width: 5.567765567765568,
    height: 3.8095238095238098,
    speed: 0.6,
    velocityY: 0,
    gravity: -0.03,
    jumping: false,
    BP:100
};
const player2 = {
    x: 3.6630036630036633,
    y: 3.6630036630036633,
    width: 5.567765567765568,
    height: 3.8095238095238098,
    speed: 0.6,
    velocityY: 0,
    gravity: -0.03,
    jumping: false,
    BP:100
};
const player3 = {
    x: 36.630036630036633,
    y: 3.6630036630036633,
    width: 5.567765567765568,
    height: 3.8095238095238098,
    speed:0.6,
    velocityY: 0,
    gravity: -0.03,
    jumping: false,
    BP:100
};
let platforms = [
    { x:0,y:0,width:100,height:1.611721611721612},//This is the ground ***DON"T CHANGE THE ORDER***
];
setInterval(TimerCheck,1000)
setInterval(Decrease,100)
function Decrease() {
    try {
        Object.values(keyCombo).forEach(key => {
            if(key.ms > 0){
                key.ms -= 100;
            }else{
                delete keyCombo[key.name]
            }
        });
    } catch (error) {
        alert('The error is '+error)
    }
}
const keys = {};
const keyCombo = {} ;
document.addEventListener('keydown', function(e) {
    keys[e.key.toUpperCase()] = true;
    keyCombo[e.key.toUpperCase()] = {};
    keyCombo[e.key.toUpperCase()].ms = 1000;
    keyCombo[e.key.toUpperCase()].name = ''+e.key.toUpperCase()+random(0,200);
});
document.addEventListener('keyup', function(e) {
    keys[e.key.toUpperCase()] = false;
});
let platformCount = 0;
function gameLoop() {
    if(started == true){
    if (keys['ARROWLEFT']) {
        player.x -= player.speed;
        playerDiv.style.animation = `0.5s ease 0s infinite normal none running ${Charcter1}-state-moving-left`
    }
    if (keys['ARROWRIGHT']) {
        player.x += player.speed;
        playerDiv.style.animation = `0.5s ease 0s infinite normal none running ${Charcter1}-state-moving-right`
    }
    if (keys['A']) {
        player2.x -= player2.speed;
        playerDiv2.style.animation = `0.5s ease 0s infinite normal none running ${Charcter2}-state-moving-left`
    }
    if (keys['D']) {
        player2.x += player2.speed;
        playerDiv2.style.animation = `0.5s ease 0s infinite normal none running ${Charcter2}-state-moving-right`
    }
    if (keys['J']) {
        player3.x -= player3.speed;
        playerDiv3.style.animation = `0.5s ease 0s infinite normal none running ${Charcter3}-state-moving-left`
    }
    if (keys['L']) {
        player3.x += player3.speed;
        playerDiv3.style.animation = `0.5s ease 0s infinite normal none running ${Charcter3}-state-moving-right`
    }
    //not moving
    if (!keys['ARROWLEFT']&&!keys['ARROWRIGHT']) {
        if(playerDiv.style.animation == `0.5s ease 0s infinite normal none running ${Charcter1}-state-moving-left`){
        playerDiv.style.backgroundImage = `url("assets/turtle/${Charcter1}/(state-ready-left).png")`;
        }else if(playerDiv.style.animation == `0.5s ease 0s infinite normal none running ${Charcter1}-state-moving-right`){
        playerDiv.style.backgroundImage = `url("assets/turtle/${Charcter1}/(state-ready-right).png")`;
        }
        setTimeout(() => { playerDiv.style.animation = ``; }, 200);
    }
    if (!keys['A']&&!keys['D']) {
        if(playerDiv2.style.animation == `0.5s ease 0s infinite normal none running ${Charcter2}-state-moving-left`){
        playerDiv2.style.backgroundImage = `url("assets/turtle/${Charcter2}/(state-ready-left).png")`;
        }else if(playerDiv2.style.animation == `0.5s ease 0s infinite normal none running ${Charcter2}-state-moving-right`){
        playerDiv2.style.backgroundImage = `url("assets/turtle/${Charcter2}/(state-ready-right).png")`;
        }
        setTimeout(() => { playerDiv2.style.animation = ``; }, 200);
    }
    if (!keys['J']&&!keys['L']) {
        if(playerDiv3.style.animation == `0.5s ease 0s infinite normal none running ${Charcter3}-state-moving-left`){
        playerDiv3.style.backgroundImage = `url("assets/turtle/${Charcter3}/(state-ready-left).png")`;
        }else if(playerDiv3.style.animation == `0.5s ease 0s infinite normal none running ${Charcter3}-state-moving-right`){
        playerDiv3.style.backgroundImage = `url("assets/turtle/${Charcter3}/(state-ready-right).png")`;
        }
        setTimeout(() => { playerDiv3.style.animation = ``; }, 200);
    }

    //jumping
    if (keys['ARROWUP'] && player.jumping == false && player.speed != 0) {
            player.jumping = true;
            player.velocityY = 1;

    }
    if(keys['W'] && player2.jumping == false && player2.speed != 0){
            player2.jumping = true;
            player2.velocityY = 1;
    }
    if(keys['I'] && player3.jumping == false && player3.speed != 0){
            player3.jumping = true;
            player3.velocityY = 1;
    }
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    player2.velocityY += player2.gravity;
    player2.y += player2.velocityY;
    player3.velocityY += player3.gravity;
    player3.y += player3.velocityY;
    platforms.forEach(platform => {
        if (areTouching(player,platform)) {
            if (player.velocityY < 0) {
                player.y = platform.y + platform.height;
                player.velocityY = 0;
                player.jumping = false;
            }
        }
        if (areTouching(player2,platform)) {
            if (player2.velocityY < 0) {
                player2.y = platform.y + platform.height;
                player2.velocityY = 0;
                player2.jumping = false;
            }
        }
        if (areTouching(player3,platform)) {
            if (player3.velocityY < 0) {
                player3.y = platform.y + platform.height;
                player3.velocityY = 0;
                player3.jumping = false;
            }
        }
    });
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > 100) {
        player.x = 100 - player.width;
    }
    if (player2.x < 0) {
        player2.x = 0;
    }
    if (player2.x + player2.width > 100) {
        player2.x = 100 - player2.width;
    }
    if (player3.x < 0) {
        player3.x = 0;
    }
    if (player3.x + player3.width > 100) {
        player3.x = 100 - player3.width;
    }
    playerDiv.style.left = player.x + 'vw';
    playerDiv.style.bottom = player.y + 'vw';
    playerDiv2.style.left = player2.x + 'vw';
    playerDiv2.style.bottom = player2.y + 'vw';
    playerDiv3.style.left = player3.x + 'vw';
    playerDiv3.style.bottom = player3.y + 'vw';
    requestAnimationFrame(gameLoop);
}
}
function areTouching(player,player2) {
    if(
    player2.x < player.x + player.width &&
    player2.x + player2.width > player.x &&
    player2.y < player.y + player.height &&
    player2.y + player2.height > player.y){
        return true
    }
}
function areTouchingAOE(AOE,player2) {
    if(
    player2.x < (AOE.x*1.5) + AOE.width &&
    player2.x + player2.width > (AOE.x*1.5) &&
    player2.y < (AOE.y*1.5) + (AOE.height) &&
    player2.y + player2.height > (AOE.y*1.5)){
        return true
    }
}
function random(min,max) {
return Math.floor((Math.random())*(max-min+1))+min;
}
function TimerCheck(){
    if(started == true){
        if (parseInt(timer.textContent) >= 1) {
            timer.textContent = parseInt(timer.textContent) - 1
        }
        else{
            started = false
            gebid('endDiv').style.display = 'block';
            
        }
    }
}
function createPlatforms(idx = 0) {
    platforms.forEach(platform => {
        const platformDiv = document.createElement('div');
        platformDiv.classList.add('platform');
        platformDiv.style.bottom = platform.y + 'vw';
        platformDiv.style.height = platform.height + 'vw';
        platformDiv.style.backgroundImage = 'url("assets/other/cloud.png")';
        platformDiv.style.backgroundColor = 'transparent';
        platformDiv.style.left = platform.x + 'vw';
        platformDiv.style.width = platform.width + 'vw'; 
        platformDiv.id = `platform${idx}`
        gameContainer.appendChild(platformDiv);
        idx++
    });
}    

window.onbeforeunload = function() {
     return "Nah don't leave";
};
function startGame() {
    gebid('selectCharcter').style.display = 'none';
    gebid('endDiv').style.display = 'none'
    gebid('gameContainer').style.display = 'block';
    playerDiv.style.backgroundImage = `url("assets/turtle/${Charcter1}/(state-ready-left).png")`;
    playerDiv2.style.backgroundImage = `url("assets/turtle/${Charcter2}/(state-ready-right).png")`;
    playerDiv3.style.backgroundImage = `url("assets/turtle/${Charcter3}/(state-ready-left).png")`;
    playerDiv.style.backgroundSize = "5.567765567765568vw 3.8095238095238098vw";
    playerDiv2.style.backgroundSize = "5.567765567765568vw 3.8095238095238098vw";
    playerDiv3.style.backgroundSize = "5.567765567765568vw 3.8095238095238098vw";
    playerDiv.style.width = "5.567765567765568vw";
    playerDiv2.style.width = "5.567765567765568vw";
    playerDiv3.style.width = "5.567765567765568vw";
    playerDiv.style.height = "3.8095238095238098vw";
    playerDiv2.style.height = "3.8095238095238098vw";
    playerDiv3.style.height = "3.8095238095238098vw";
    player.width = 5.567765567765568;
    player2.width = 5.567765567765568;
    player3.width = 5.567765567765568;
    player.height = 3.8095238095238098;
    player2.height = 3.8095238095238098;
    player3.height = 3.8095238095238098;
    player2.x = 0;
    player2.y = 1.6;
    player.x = 94.9;
    player.y = 1.6;
    if(multimode == '2'){
        player3.y = 1364
        player3.x = 1;
        gebid('BP1h3').textContent = '100/100';
        gebid('BP2h3').textContent = '100/100';
        gebid('BP3h3').textContent = '100/100';
        gebid('BP3div').style.display = 'none';
    }else if(multimode == '3'){
        player3.y = 1.6;
        player3.x = 50;
        gebid('BP1h3').textContent = '100/100';
        gebid('BP2h3').textContent = '100/100';
        gebid('BP3h3').textContent = '100/100';
    }
    timer.textContent = gebid('timeSet').value
    started = true;
    createPlatforms()
    gameLoop()
    playerDiv.style.opacity = 1
    playerDiv2.style.opacity = 1
    if (multimode == '3') {
        playerDiv3.style.opacity = 1
        player3.jumping = false;
        player3.gravity = -0.3;
    }
}
window.startGame = startGame;
//Menu stuff
let submit1 = false;
let submit2 = false;
let submit3 = false;
let multimode = null;
let audio = gebid('audio');
let keyBindings = {
    player1: localStorage.getItem("player1") || "W",
    player2: localStorage.getItem("player2") || "ARROWRIGHT",
    player3: localStorage.getItem("player3") || "J"
};
let dark = {
    backgroundColor: 'darkblue',
    text: 'teal',
    multi: 'darkred',
    single: 'darkslategrey',
    menus: 'blue'
};
let light = {
    backgroundColor: 'blue',
    text: 'teal',
    multi: 'red',
    single: 'DodgerBlue',
    menus: 'teal'
};
let color = light;

function volume() {
    let audiovolume = gebid('slider').value;
    audio.volume = (audiovolume / 100);
}

function select1() {
    if (Charcter1 == 'red') {
        img1.src = 'assets/turtle/box/(state-ready-left).png';
        Charcter1 = 'box';
    } else if (Charcter1 == 'box') {
        img1.src = 'assets/turtle/paint/(state-ready-left).png';
        Charcter1 = 'paint';
    } else if (Charcter1 == 'paint') {
        img1.src = 'assets/turtle/yellow/(state-ready-left).png';
        Charcter1 = 'yellow';
    } else if (Charcter1 == 'yellow') {
        img1.src = 'assets/turtle/red/(state-ready-left).png';
        Charcter1 = 'red';
    }
}

function select2() {
    if (Charcter1 == 'paint') {
        img1.src = 'assets/turtle/box/(state-ready-left).png';
        Charcter1 = 'box';
    } else if (Charcter1 == 'yellow') {
        img1.src = 'assets/turtle/paint/(state-ready-left).png';
        Charcter1 = 'paint';
    } else if (Charcter1 == 'red') {
        img1.src = 'assets/turtle/yellow/(state-ready-left).png';
        Charcter1 = 'yellow';
    } else if (Charcter1 == 'box') {
        img1.src = 'assets/turtle/red/(state-ready-left).png';
        Charcter1 = 'red';
    }
}

function select3() {
    if (Charcter2 == 'red') {
        img2.src = 'assets/turtle/box/(state-ready-right).png';
        Charcter2 = 'box';
    } else if (Charcter2 == 'box') {
        img2.src = 'assets/turtle/paint/(state-ready-right).png';
        Charcter2 = 'paint';
    } else if (Charcter2 == 'paint') {
        img2.src = 'assets/turtle/yellow/(state-ready-right).png';
        Charcter2 = 'yellow';
    } else if (Charcter2 == 'yellow') {
        img2.src = 'assets/turtle/red/(state-ready-right).png';
        Charcter2 = 'red';
    }
}

function select4() {
    if (Charcter2 == 'paint') {
        img2.src = 'assets/turtle/box/(state-ready-right).png';
        Charcter2 = 'box';
    } else if (Charcter2 == 'yellow') {
        img2.src = 'assets/turtle/paint/(state-ready-right).png';
        Charcter2 = 'paint';
    } else if (Charcter2 == 'red') {
        img2.src = 'assets/turtle/yellow/(state-ready-right).png';
        Charcter2 = 'yellow';
    } else if (Charcter2 == 'box') {
        img2.src = 'assets/turtle/red/(state-ready-right).png';
        Charcter2 = 'red';
    }
}

function select5() {
    if (Charcter3 == 'red') {
        img3.src = 'assets/turtle/box/(state-ready-left).png';
        Charcter3 = 'box';
    } else if (Charcter3 == 'box') {
        img3.src = 'assets/turtle/paint/(state-ready-left).png';
        Charcter3 = 'paint';
    } else if (Charcter3 == 'paint') {
        img3.src = 'assets/turtle/yellow/(state-ready-left).png';
        Charcter3 = 'yellow';
    } else if (Charcter3 == 'yellow') {
        img3.src = 'assets/turtle/red/(state-ready-left).png';
        Charcter3 = 'red';
    }
}
  
function select6() {
    if (Charcter3 == 'paint') {
        img3.src = 'assets/turtle/box/(state-ready-left).png';
        Charcter3 = 'box';
    } else if (Charcter3 == 'yellow') {
        img3.src = 'assets/turtle/paint/(state-ready-left).png';
        Charcter3 = 'paint';
    } else if (Charcter3 == 'red') {
        img3.src = 'assets/turtle/yellow/(state-ready-left).png';
        Charcter3 = 'yellow';
    } else if (Charcter3 == 'box') {
        img3.src = 'assets/turtle/red/(state-ready-left).png';
        Charcter3 = 'red';
    }
}

function Submit1() {
    submit1 = true;
    if (multimode == '2' && submit2 == true) {
        startGame();
    } else if (multimode == '3' && submit2 == true && submit3 == true){
        startGame();
    }
}
function Submit2() {
    submit2 = true;
    if (multimode == '2' && submit1 == true ) {
        startGame();
    }
    else if(multimode == '3' && submit1 == true && submit3 == true ){
        startGame()
    }
}
function Submit3() {
    submit3 = true;
    if ( submit1 == true && submit2 == true ) {
        startGame();
    }
}
function gebid(e){
    return document.getElementById(e)
}
function changeTheme() {
    if (gebid('theme').value == 'dark') {
        color = dark;
        gebid('gameScreen').style.backgroundColor = color.backgroundColor;
        gebid('theme').style.backgroundColor = color.menus;
        gebid('modeSelect').style.backgroundColor = color.menus;
        gebid('gameContainer').style.backgroundColor = color.single;
    } else if (gebid('theme').value == 'light') {
        color = light;
        gebid('gameScreen').style.backgroundColor = color.backgroundColor;
        gebid('theme').style.backgroundColor = color.menus;
        gebid('modeSelect').style.backgroundColor = color.menus;
        gebid('gameContainer').style.backgroundColor = color.single;
    }
}

function updateFPS() {
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;

    function calculateFPS() {
        frameCount++;
        const now = performance.now();
        const delta = now - lastTime;

        if (gebid('fpsonoff').checked == true) {
            gebid("fpsCounter").style.display = 'block';
        } else {
            gebid("fpsCounter").style.display = 'none';
        }

        if (delta >= 1000) { // Update every second
            fps = Math.round((frameCount / delta) * 1000);
            gebid("fpsCounter").innerText = `FPS: ${fps}`;
            frameCount = 0;
            lastTime = now;
        }

        requestAnimationFrame(calculateFPS);
    }

    requestAnimationFrame(calculateFPS);
}

function multi1() {
    gebid('modeSelect').style.display = 'none';
    gebid('selectCharcter').style.display = 'block';
    gebid('selectCharcter2').style.display = 'block';
    gebid('selectCharcter1').style.display = 'block';
    gebid('selectCharcter1').style.position = 'absolute';
    gebid('selectCharcter1').style.left = '25%'; 
    gebid('img2').style.width = '20vw'; 
    gebid('selectCharcter2').style.position = 'absolute';
    gebid('selectCharcter2').style.right = '5%'; 
    gebid('img1').style.width = '20vw'; 
    gebid('selectCharcter3').style.display = 'none'; 
    gebid('img3').style.display = 'none'; 
    player3.gravity = 0;
    multimode = '2';
}
function multi2() { 
    gebid('modeSelect').style.display = 'none';
    gebid('selectCharcter').style.display = 'block';
    gebid('selectCharcter1').style.display = 'block'; 
    gebid('selectCharcter2').style.display = 'block'; 
    gebid('selectCharcter3').style.display = 'block'; 
    gebid('selectCharcter1').style.position = 'absolute';
    gebid('selectCharcter1').style.left = '15%'; 
    gebid('selectCharcter1').style.bottom = '50%'; 
    gebid('img2').style.width = '18vw';  
    gebid('selectCharcter2').style.position = 'absolute';
    gebid('selectCharcter2').style.right = '1%'; 
    gebid('selectCharcter2').style.bottom = '50%';
    gebid('img1').style.width = '18vw';  
    gebid('selectCharcter3').style.position = 'absolute';
    gebid('selectCharcter3').style.left = '50%'; 
    gebid('selectCharcter3').style.top = '35%'; 
    gebid('img3').style.width = '18vw'; 
    multimode = '3'; 
}
function attack(){
    
}

// List all image paths you want to preload
const assetPaths = [
    "assets/turtle/red/(state-ready-left).png",
    "assets/turtle/red/(state-ready-right).png",
    "assets/turtle/box/(state-ready-left).png",
    "assets/turtle/box/(state-ready-right).png",
    "assets/turtle/paint/(state-ready-left).png",
    "assets/turtle/paint/(state-ready-right).png",
    "assets/turtle/yellow/(state-ready-left).png",
    "assets/turtle/yellow/(state-ready-right).png",
    "assets/other/cloud.png",
];

function preloadAssets(paths, callback) {
    let loaded = 0;
    const total = paths.length;
    if (total === 0) {
        callback();
        return;
    }
    paths.forEach(path => {
        const img = new Image();
        img.onload = img.onerror = function() {
            loaded++;
            if (loaded === total) callback();
        };
        img.src = path;
    });
}

// Example usage: call this before starting the game
preloadAssets(assetPaths, function() {
    // All assets loaded, now you can show the menu or enable the start button
    console.log("All assets loaded!");
    // Optionally, enable UI or call startGame()
});