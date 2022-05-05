let keys = document.querySelectorAll('.key');
let backspace = document.querySelector('.key_backspace');
let tab = document.querySelector('.key_tab');
let del = document.querySelector('.key_del');
let capslock = document.querySelector('.key_capslock');
let enter = document.querySelector('.key_enter');
let shiftLeft = document.querySelector('.key_shift-left');
let shiftRigth = document.querySelector('.key_shift-rigth');
let space = document.querySelector('.key_space');
let arrowUp = document.querySelector('.arrow_up');
let arrowLeft = document.querySelector('.arrow_left');
let arrowDown = document.querySelector('.arrow_down');
let arrowRigth = document.querySelector('.arrow_rigth');

for(let i = 0; i < keys.length; i++){
    keys[i].setAttribute('keyname', keys[i].innerText);
    keys[i].setAttribute('upperKeyname', keys[i].innerText.toUpperCase());
}
window.addEventListener('keydown', function(e){
    for(let i = 0; i < keys.length; i++){
        if(e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('upperKeyname')){
            keys[i].classList.add('active');
        }
        if(e.code == 'Space'){
            space.classList.add('active');
        }
        if(e.code == 'ShiftLeft'){
            shiftRigth.classList.remove('active');
        }
        if(e.code == 'ShiftRigth'){
            shiftLeft.classList.remove('active');
        }
        if(e.code == 'CapsLock'){
            console.log(e.code)
            capslock.classList.add('active');
        }
    }
})

window.addEventListener('keyup', function(e){
    for(let i = 0; i < keys.length; i++){
        if(e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('upperKeyname')){
            keys[i].classList.remove('active');
        }
        if(e.code == 'Space'){
            space.classList.remove('active');
        }
        
        if(e.code == 'ShiftLeft'){
            shiftRigth.classList.remove('active');
        }
        if(e.code == 'ShiftRigth'){
            shiftLeft.classList.remove('active');
        }
    }
})

//function inputTextToTextarea(value) {
  //  textArea.value = textArea.value.slice(0, positionCursor) + value + textArea.value.slice(positionCursor, textArea.value.length);
   // positionCursor++;
//}