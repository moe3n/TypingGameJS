// taking all the fields needed to be altered
const typingText = document.querySelector('.typing-text p'),
inpField = document.querySelector('.wrapper .input-field'),
mistakeTag = document.querySelector('.mistake span'),
timeTag = document.querySelector('.time span b'),
wpmTag = document.querySelector('.wpm span'),
cpmTag = document.querySelector('.cpm span'),
tryAgain =document.querySelector('button');


let timer,
maxTime = 60,
timeLeft = maxTime, 
charIndex=mistakes=isTyping=0;
function randomParagraph(){
    // random index <= paragraph length
    let randomIndex = Math.floor(Math.random() * paragraphs.length); // Math.random() returns a value between 1 and 0;
    
    typingText.innerHTML = "";
    // split each char. each char to a span tag
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag =`<span>${span}</span>`; //here we are creating span tag for each letter of the paragraph and storing it in spanTag variable
        typingText.innerHTML += spanTag;
    });
    // focusing input field on keydown or click event
    document.addEventListener("keydown", ()=> inpField.focus());
    typingText.addEventListener('click', ()=> inpField.focus());

}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    let contextChar = characters[charIndex].innerText;
    if (charIndex <characters.length && timeLeft>0) {
        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping=true;
        }
        if(typedChar==null){
            
    
            charIndex--;// aage because aage katle na mistake kombe duh
            if(characters[charIndex].classList.contains('incorrect')){
                mistakes--;
    
            }
            characters[charIndex].classList.remove('correct','incorrect');
        }else{
            if(contextChar === typedChar){
    
            // if user typed character and shown character match then add the
            // 'correct' class else add the incorrect class
            characters[charIndex].classList.add("correct");
            } 
            else{
                // if user typed character and shown character don't match then add the
                // 'incorrect' class else add the incorrect class
                mistakes++;
                characters[charIndex].classList.add('incorrect');
              
                    
            }
              charIndex++;// increment charIndex either user typed correct or incorrect character
        }
        
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add('active');
        mistakeTag.innerText=mistakes;
        let wpm = Math.round((((charIndex-mistakes)/5)/ (maxTime-timeLeft))*60); // say 10s e 5 word so 1s e and 60s e koto
        wpm = wpm<0 || !wpm || wpm == Infinity ? 0:wpm;
        cpmTag.innerText = charIndex - mistakes;
        wpmTag.innerText = wpm;
    } else {
        inpField.value="";
        clearInterval(timer);
    }

       
}

function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        timeTag.innerText=timeLeft;
    }
    else{
        clearInterval(timer);
    }
}

function resetGame(){
    randomParagraph();
    inpField.value="";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex=mistakes=isTyping=0;
    timeTag.innerText=timeLeft;
    cpmTag.innerText = 0;
    wpmTag.innerText = 0;
    mistakeTag.innerText = mistakes;
    

}
randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgain.addEventListener('click', resetGame);



