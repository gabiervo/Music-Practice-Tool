const electron = require('electron');

prevNum = Math.floor(Math.random()*7)+1;
function img(){
    num = Math.floor(Math.random()*7)+1;
    while(num == prevNum){
        num = Math.floor(Math.random()*7)+1;
    }
    prevNum = num;
    console.log(num);
    return document.getElementById("musicImage").src=imgDictionary[num];
}

function check(myNum, id){
    button1 = document.getElementById(id);
    if(myNum == num){
        button1.classList.add("corr");
    }
    else{
        button1.classList.add("incorr");
    }
    img();
    return setTimeout(function(){
        button1.classList.remove("corr");
        button1.classList.remove("incorr");
    }, 500);
}