//const electron = require('electron');
prevImgIndexNum = Math.floor(Math.random()*17)+1;

function initSettings(){
    const root = document.querySelector(':root');
    switch(settings["colorTheme"]){
        case "default":
            root.style.setProperty("--bodyBG", "#1f2225");
            root.style.setProperty("--darkest", "black");
            root.style.setProperty("--brightest", "white");
            root.style.setProperty("--specialBtnsContBG", "#525357");
            root.style.setProperty("--whiteThatAppearsEverywhere", "rgb(225, 223, 220)");
            root.style.setProperty("--typeBtnContBG", "grey");
            root.style.setProperty("--typeBtnsBG", "rgb(103, 101, 101)");
            root.style.setProperty("--specialBtnsBG", "none");
            break;
        case "catpuccin":
            root.style.setProperty("--bodyBG", "rgb(36, 38, 51)");
            root.style.setProperty("--darkest", "black");
            root.style.setProperty("--brightest", "white");
            root.style.setProperty("--specialBtnsContBG", "rgb(28, 30, 40)");
            root.style.setProperty("--whiteThatAppearsEverywhere", "rgb(243, 218, 208)");
            root.style.setProperty("--typeBtnContBG", "rgb(227, 196, 190)");
            root.style.setProperty("--typeBtnsBG", "rgb(200, 174, 169)");
            root.style.setProperty("--specialBtnsBG", "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)");
            break;
    }
    document.getElementById('streakNum').innerHTML = settings["maxStreak"];
    return 0;
}

function changeColorSettings(theme){
    settings["colorTheme"] = theme;
    return initSettings();
}

function img(){
    imgIndexNum = Math.floor(Math.random()*17)+1;
    while(imgIndexNum == prevImgIndexNum){
        imgIndexNum = Math.floor(Math.random()*17)+1;
    }
    prevImgIndexNum = imgIndexNum;
    console.log(imgIndexNum);
    console.log(imgDictionary[imgIndexNum]);
    return document.getElementById("musicImage").src=imgDictionary[imgIndexNum];
}

function defStreak(streak){
    if (parseInt(streak) > parseInt(maxStreak)){
        maxStreak = streak;
        document.getElementById('streakNum').innerHTML = maxStreak;
        document.getElementById("streakCount").classList.add("streakGrow");
        settings["maxStreak"] = maxStreak;
    }
    return setTimeout(function(){
        document.getElementById('streakCount').classList.remove("streakGrow");
    }, 250);
}

function effect(res){
    textBox = document.getElementById('scoreCount');
    val = textBox.textContent;
    if(res == 'corr'){
        textBox.classList.add('plusStreak');
        textBox.textContent = parseInt(val) + 1;
        
    }
    else if(res =='incorr'){
        textBox.classList.add('minusStreak');
        loseLife();
    }
    if(parseInt(textBox.textContent) > 99){
        textBox.style.fontSize = "30px";
    }
    if(parseInt(textBox.textContent) > 999){
        textBox.style.fontSize = "20px";
    }

    return setTimeout(function(){
        textBox.classList.remove("plusStreak");
        textBox.classList.remove("minusStreak");
    }, 250);
    
}
function check(myNum, id){
    button1 = document.getElementById(id);
    button1.disabled = true;
    if(myNum == imgIndexNum){
        button1.classList.add("corr");
        result = 'corr';
    }
    else{
        button1.classList.add("incorr");
        result = 'incorr';
    }
    img();
    effect(result);
    return setTimeout(function(){
        button1.classList.remove("corr");
        button1.classList.remove("incorr");
    }, 250);
}

function changeType(btnId, boxId){
   box = document.getElementById(boxId);
   btn = document.getElementById(btnId);

    if(btn == prevBtn){
        return console.log("SameButtonPressedTwiceErr");
    }

   btn.classList.add("typeButtonDeco");
   box.classList.add("main");

   prevBox.classList.remove("main");
   prevBtn.classList.remove("typeButtonDeco");

   prevBox = box;
   prevBtn = btn;
}

function loseLife(){
    lives -= 1;
    elements = [document.getElementById("life3"), document.getElementById("life2"), document.getElementById("life1")];
    if(lives == 2){
        img();
        return elements[0].classList.add("lostLife");
    }
    else if(lives == 1){
        img();
        return elements[1].classList.add("lostLife");
   }
   else if(lives == 0){
        img();
        return elements[2].classList.add("lostLife");
   }
    else if(lives == -1){
        lives = 3;
        elements[0].classList.remove("lostLife");
        elements[1].classList.remove("lostLife");
        elements[2].classList.remove("lostLife");
        img();
        textBox = document.getElementById('scoreCount');
        val = textBox.textContent;
        textBox.textContent = 0;
        textBox.classList.add('minusStreak');
        defStreak(val);
        setTimeout(function(){
            textBox.classList.remove('minusStreak');
        }, 250);
   }
}

function setSettings(){
    document.styleSheets[0].insertRule('body > *:not(#unblur){filter:blur(10px);}', 0);
    document.getElementById('unblur').style.display = 'flex';
}


function removeSettings(){
    document.getElementById("unblur").style.display = 'none';
    document.styleSheets[0].deleteRule(0);
}
