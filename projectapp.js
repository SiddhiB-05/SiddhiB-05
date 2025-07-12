let gameseq = [];
let userseq = [];
let scorarr = [];

let started = false;
let level = 0;
let h2 = document.querySelector('h2');
let btns = ["yellow","red","green","purple"];
document.addEventListener("keypress",function(){
    if (started == false){
        started = true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("Flash");
    setTimeout(function(){
        btn.classList.remove("Flash");
    },250);
}

function checkAns(idx) {
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        scorarr.push(level);
        let ans = maxscore(scorarr);
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any kry to start.<br> Highest score : ${ans}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    btnFlash(randbtn);
}

function btnPress(){
    let btn = this; //konsa wala color hai woh
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length-1);
}
let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started = false;
    gameseq=[];
    userseq=[];
    level=0;
}
function maxscore(scorarr){
     return Math.max(...scorarr);
}
