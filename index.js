const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        let title = document.createElement("h1");
        let textarea = document.createElement("textarea");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("wrapper");
        textarea.classList.add("textarea");
        textarea.setAttribute('inputmode', 'text');
        title.classList.add("title");
        this.elements.keysContainer.classList.add("keyboard");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".key");

        // Add to DOM
        this.elements.main.appendChild(title);
        this.elements.main.appendChild(textarea);
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".textarea").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });

        let keys = document.querySelectorAll('.key');
        let tab = document.querySelector('.key_tab');
        let capslock = document.querySelector('.key_capslock');
        let shiftLeft = document.querySelector('.key_shift-left');
        let shiftRigth = document.querySelector('.key_shift-rigth');
        let space = document.querySelector('.key_space');
        

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
        if(e.code == 'ShiftRight'){
            shiftLeft.classList.remove('active');
        }
        if(e.code == 'CapsLock'){
            capslock.classList.toggle('active');
        }
        if(e.code == 'Tab'){
            tab.classList.add('active');
            textarea.focus()
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
        if(e.code == 'ShiftRight'){
            shiftLeft.classList.remove('active');
        }
        if(e.code == 'Tab'){
            textarea.focus()
            tab.classList.remove('active');
        }
    }
})
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del",
            "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "ShiftLt", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "arrowUp", "ShiftRt", 
            "CtrlLt", "windows", "AltLt", " ", "AltRt", "arrowLt", "arrowDn", "arrowRt", "CtrlRt"
        ];

        keyLayout.forEach(key => {
            const keyElement = document.createElement("div");
            keyElement.classList.add("key");

            let arrowClicker = () => {
                keyElement.addEventListener("click", () => {
                this.properties.value += "=>";
                this._triggerEvent("oninput");
            })}

            switch (key) {
                case "Backspace":
                    keyElement.classList.add("key_backspace");
                    keyElement.innerHTML = "Backspace";

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "CapsLock":
                    keyElement.classList.add("key_capslock");
                    keyElement.innerHTML = "CapsLock";

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("active", this.properties.capsLock);
                    });

                    break;
                
                case "Tab":
                    keyElement.classList.add("key_tab");
                    keyElement.innerHTML = "Tab";
                    break;

                case "ShiftLt":
                    keyElement.classList.add("key_shift-left");
                    keyElement.innerHTML = "Shift";
                    break;

                case "ShiftRt":
                    keyElement.classList.add("key_shift-rigth");
                    keyElement.innerHTML = "Shift";
                    break;

                case "CtrlLt":
                    keyElement.innerHTML = "Ctrl";
                    break;

                case "CtrlRt":
                    keyElement.innerHTML = "Ctrl";
                    break;

                case "AltLt":
                    keyElement.innerHTML = "Alt";
                    break;

                case "AltRt":
                    keyElement.innerHTML = "Alt";
                    break;
                     
                case "Del":
                    keyElement.classList.add("key_del");
                    keyElement.innerHTML = "Del";
                    break;   

                case "Enter":
                    keyElement.classList.add("key_enter");
                    keyElement.innerHTML = "Enter";
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case " ":
                    keyElement.classList.add("key_space");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "arrowUp":
                    keyElement.innerHTML = `<img src="./assets/img/arrow.png" alt="arrow" class="arrow">`;
                    keyElement.classList.add('arrow_up');

                   arrowClicker()

                    break;
                   
                case "arrowLt":
                    keyElement.innerHTML = `<img src="./assets/img/arrow.png" alt="arrow" class="arrow">`;
                    keyElement.classList.add('arrow_left');

                   arrowClicker()

                    break;

                case "arrowRt":
                    keyElement.innerHTML = `<img src="./assets/img/arrow.png" alt="arrow" class="arrow">`;
                    keyElement.classList.add('arrow_rigth');

                   arrowClicker()

                    break;

                case "arrowDn":
                    keyElement.innerHTML = `<img src="./assets/img/arrow.png" alt="arrow" class="arrow">`;
                    keyElement.classList.add('arrow_down');

                   arrowClicker()

                    break;

                case "windows":
                    keyElement.innerHTML = `<img src="./assets/img/windows.png" alt="windows" class="windows">`;
                
                    break;    

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);
        });

        return fragment;
        
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
      //  this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
      //  this.elements.main.classList.add("keyboard--hidden");
    }
};



window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
});



//function inputTextToTextarea(value) {
  //  textArea.value = textArea.value.slice(0, positionCursor) + value + textArea.value.slice(positionCursor, textArea.value.length);
   // positionCursor++;
//}