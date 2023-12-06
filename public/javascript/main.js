num = document.getElementById('num');
undernum = document.getElementById('undernum');

function updateNum() {
    fetch('/getnumber')
    .then(response => response.text())
    .then(data => {
        num.innerHTML = data;
    });
}

function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

var i = 0;
var dot = 0; // for animType 1

var animType = 2;

var doAnimate = false;

function animation() {
    if(!doAnimate) return;

    var anim = '.........';
    if(animType === 0)
    {
        var index = i % (anim.length*2);
        if(index >= anim.length) {
            index = anim.length*2 - index - 1;
        }
        anim = anim.slice(0, index) + '-' + anim.slice(index+1, anim.length);
    } else if(animType === 1)
    {
        dot += 1;
        if(dot >= anim.length) {
            dot = 0;
        }
        anim = anim.slice(0, dot) + '-' + anim.slice(dot+1, anim.length);
    }
    

    undernum.innerText = anim;

    if(i % (anim.length*2) == 0) {
        animType = (animType + 1) % 2;
        console.log(animType);
    }
    i += 1;
}

function update() {
    const date = new Date();
    var updateDate = new Date();
    updateDate.setHours(18);
    updateDate.setMinutes(0);
    updateDate.setSeconds(30);

    if(date.getDay() <= 4 && date.getHours() == 18 && date.getMinutes() == 0 && date.getSeconds() == 30) {
        updateNum();
    }

    if(date > updateDate || date.getDay() > 5 && !doAnimate) {
        doAnimate = true;
        return;
    }
    doAnimate = false;
    
    var diff = updateDate.getTime() / 1000 - date.getTime() / 1000;

    undernum.innerText = formatTime(new Date((diff-60*60)*1000));
}

updateNum();
update();
setInterval(update, 600);
setInterval(animation, 50);