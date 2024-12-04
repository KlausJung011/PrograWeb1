
//Reproductores de música

var audio1 = new Audio('/audio/2814 - 恢复.mp3');
var isPlaying1 = false;


function playMusic1() {
    if (isPlaying1) {
        audio1.pause();
    } else {
        audio1.play();
        audio1.volume = 0.5;
    }
    isPlaying1 = !isPlaying1;
}


var audio2 = new Audio('/audio/Ballad.mp3');
var isPlaying2 = false;

function playMusic2() {
    if (isPlaying2) {
        audio2.pause();
    } else {
        audio2.play();
        audio2.volume = 0.3;
    }
    isPlaying2 = !isPlaying2;
}

var audio3 = new Audio('/audio/Neon Indian - SLUMLORD (Official Audio).mp3');
var isPlaying3 = false;

function playMusic3() {
    if (isPlaying3) {
        audio3.pause();
    } else {
        audio3.play();
        audio3.volume = 0.3;
    }
    isPlaying3 = !isPlaying3;
}

var audio4 = new Audio('/audio/Porter Robinson - Goodbye To A World (Official Audio).mp3');
var isPlaying4 = false;

function playMusic4() {
    if (isPlaying4) {
        audio4.pause();
    } else {
        audio4.play();
        audio4.volume = 0.4;
    }
    isPlaying4 = !isPlaying4;
}

var audio5 = new Audio('/audio/Miss Macross.mp3');
var isPlaying5 = false;

function playMusic5() {
    if (isPlaying5) {
        audio5.pause();
    } else {
        audio5.play();
        audio5.volume = 0.4;
    }
    isPlaying5 = !isPlaying5;
}

var audio6 = new Audio('/audio/Flume - Take a Chance feat. Little Dragon.mp3');
var isPlaying6 = false;

function playMusic6() {
    if (isPlaying6) {
        audio6.pause();
    } else {
        audio6.play();
        audio6.volume = 0.4;
    }
    isPlaying6 = !isPlaying6;
}