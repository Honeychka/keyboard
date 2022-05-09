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
        let backspace = document.querySelector('.key_backspace');
        let capslock = document.querySelector('.key_capslock');
        let shiftLeft = document.querySelector('.key_shift-left');
        let shiftRigth = document.querySelector('.key_shift-rigth');
        let space = document.querySelector('.key_space');
        let arrowRight = document.querySelector('.right');
        let arrowLeft = document.querySelector('.left');
        let arrowUp = document.querySelector('.up');
        let arrowDown = document.querySelector('.down');
        let alt = document.querySelector('.key_alt');
        

for(let i = 0; i < keys.length; i++){
    keys[i].setAttribute('keyname', keys[i].innerText);
    keys[i].setAttribute('upperKeyname', keys[i].innerText.toUpperCase());
}
window.addEventListener('keydown', function(e){
    for(let i = 0; i < keys.length; i++){
        if(e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('upperKeyname')){
            keys[i].classList.add('active');
            
            if(capslock.classList.contains('active')){
                if(e.code !== 'Enter' && e.code !== 'Space' && e.code !== 'Backspace' && e.code !== 'CapsLock' && e.code !== 'ShiftLeft' && e.code !== 'ShiftRight' && e.code !== 'Tab'){
                
                    Keyboard.properties.value += e.key.toUpperCase();
                }
            }else if(e.code !== 'Enter' && e.code !== 'Space' && e.code !== 'Backspace' && e.code !== 'CapsLock' && e.code !== 'ShiftLeft' && e.code !== 'ShiftRight' && e.code !== 'Tab'){
                Keyboard.properties.value += e.key
            }
        }
    }
    if(e.code == 'ArrowRight'){
        arrowRight.classList.add('active');
        Keyboard.properties.value += '▸';
    }
    if(e.code == 'ArrowLeft'){
        arrowLeft.classList.add('active');
        Keyboard.properties.value += '◂';
    }
    if(e.code == 'ArrowUp'){
        arrowUp.classList.add('active');
        Keyboard.properties.value += '▴';
    }
    if(e.code == 'ArrowDown'){
        arrowDown.classList.add('active');
        Keyboard.properties.value += '▾';
    }

    if(e.code == 'Space'){
        space.classList.add('active');
        Keyboard.properties.value += ' ';
    }
    if(e.code == 'Backspace'){
        backspace.classList.add('active');
        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.value.length - 1);
    }
    if(e.code == 'CapsLock'){
        capslock.classList.add('active', Keyboard.properties.capsLock);
        Keyboard._toggleCapsLock();
        Keyboard.properties.value += '';
    }
    if(e.code == 'Tab'){
        tab.classList.add('active');
        textarea.focus()
        Keyboard.properties.value += '  ';
    }
    if(e.code == 'ShiftLeft'){
        shiftRigth.classList.remove('active');
        Keyboard._toggleCapsLock();
        Keyboard.properties.value += '';
       // alt.addEventListener('keydown', LanguageToggler);

    }
    if(e.code == 'ShiftRight'){
        shiftLeft.classList.remove('active');
        Keyboard._toggleCapsLock();
        Keyboard.properties.value += '';
    }
    return Keyboard.properties.value;
})

window.addEventListener('keyup', function(e){
    for(let i = 0; i < keys.length; i++){
        if(e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('upperKeyname')){
            keys[i].classList.remove('active');
        }
        if(e.code == 'Space'){
            space.classList.remove('active');
        }
        if(e.code == 'Tab'){
            textarea.focus()
            tab.classList.remove('active');
        }
        if(e.code == 'ShiftLeft'){
            shiftRigth.classList.remove('active');
            Keyboard._toggleCapsLock();
        }
        if(e.code == 'ShiftRight'){
            shiftLeft.classList.remove('active');
            Keyboard._toggleCapsLock();
        }
        if(e.code == 'ArrowRight'){
            arrowRight.classList.remove('active');
        }
        if(e.code == 'ArrowLeft'){
            arrowLeft.classList.remove('active');
        }
        if(e.code == 'ArrowUp'){
            arrowUp.classList.remove('active');
        }
        if(e.code == 'ArrowDown'){
            arrowDown.classList.remove('active');
        }
    }
})
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", 
            "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "ShiftLt", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "arrowUp", "ShiftRt",  
            "CtrlLt", "windows", "AltLt", " ", "arrowLt", "arrowDn", "arrowRt", 
        ];

        keyLayout.forEach(key => {
            const keyElement = document.createElement("div");
            keyElement.classList.add("key");

            keyElement.addEventListener("mousedown", () => {
                keyElement.classList.add("active");
            });

            keyElement.addEventListener("mouseup", () => {
                keyElement.classList.remove("active");

            });

            let arrowClicker = (ico) => {
                keyElement.addEventListener("click", () => {
                this.properties.value += `${ico}`;
                this._triggerEvent("oninput");
            })}

            switch (key) {
                case "Backspace":
                    keyElement.classList.add("key_backspace");
                    keyElement.innerHTML = "Backspace";

                    keyElement.addEventListener("mousedown", () => {
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
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "  ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "ShiftLt":
                    keyElement.classList.add("key_shift-left");
                    keyElement.innerHTML = "Shift";

                    keyElement.addEventListener("mousedown", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("active", this.properties.capsLock);
                    });

                    keyElement.addEventListener("mouseup", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("active", this.properties.capsLock);
                    });

                    break;

                case "ShiftRt":
                    keyElement.classList.add("key_shift-rigth");
                    keyElement.innerHTML = "Shift";

                    keyElement.addEventListener("mousedown", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("active", this.properties.capsLock);
                    });

                    keyElement.addEventListener("mouseup", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("active", this.properties.capsLock);
                    }); 

                    break;

                case "CtrlLt":
                    keyElement.innerHTML = "Ctrl";
                    break;

                case "AltLt":
                    keyElement.innerHTML = "Alt";
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
                    keyElement.innerHTML = `<img src="./assets/img/arrow.png" alt="arrow" class="arrow arrow_up">`;
                    keyElement.classList.add('key_arrow');
                    keyElement.classList.add('up');
                    let ico = '▴'

                   arrowClicker(ico)

                    break;
                   
                case "arrowLt":
                    keyElement.innerHTML = `<img src="./assets/img/arrow.png" alt="arrow" class="arrow arrow_left">`;
                    keyElement.classList.add('key_arrow');
                    keyElement.classList.add('left');
                    let icon = '◂'

                    arrowClicker(icon)

                    break;

                case "arrowRt":
                    keyElement.innerHTML = `<img src="./assets/img/arrow.png" alt="arrow" class="arrow  arrow_rigth">`;
                    keyElement.classList.add('key_arrow');
                    keyElement.classList.add('right');
                    let icona = '▸'

                    arrowClicker(icona)

                    break;

                case "arrowDn":
                    keyElement.innerHTML = `<img src="./assets/img/arrow.png" alt="arrow" class="arrow arrow_down">`;
                    keyElement.classList.add('key_arrow');
                    keyElement.classList.add('down');
                    let ic = '▾'

                    arrowClicker(ic)

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
        Keyboard.properties.capsLock = !Keyboard.properties.capsLock;
        

        for (const key of Keyboard.elements.keys) {
            if (key.getAttribute('keyname')  == languageObj["en"][key.getAttribute('keyname')]) {
                key.textContent = Keyboard.properties.capsLock ? (key.textContent = `${key.getAttribute('upperkeyname')}`) : key.textContent = `${key.getAttribute('keyname')}`;
            }
        }
        
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    }
};



window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
});


const languageObj = {
    'en': {
        "`": "`",
        "q": "q", 
        "w": "w", 
        "e": "e", 
        "r": "r", 
        "t": "t", 
        "y": "y", 
        "u": "u", 
        "i": "i", 
        "o": "o", 
        "p": "p",
        "[": "[",
        "]": "]",
        "a": "a", 
        "s": "s", 
        "d": "d", 
        "f": "f", 
        "g": "g", 
        "h": "h", 
        "j": "j", 
        "k": "k", 
        "l": "l",
        ";": ";", 
        "'": "'",  
        "z": "z", 
        "x": "x", 
        "c": "c", 
        "v": "v", 
        "b": "b", 
        "n": "n", 
        "m": "m",
        ",": ",",
        ".": ".",
        "?": "?",
    },
    'ru': {
        "`": "ё",
        "q": "й", 
        "w": "ц", 
        "e": "у", 
        "r": "к", 
        "t": "е", 
        "y": "н", 
        "u": "г", 
        "i": "ш", 
        "o": "щ", 
        "p": "з",
        "[": "х",
        "]": "ъ",
        "a": "ф", 
        "s": "ы", 
        "d": "в", 
        "f": "а", 
        "g": "п", 
        "h": "р", 
        "j": "о", 
        "k": "л", 
        "l": "д",
        ";": "ж", 
        "'": "э",  
        "z": "я", 
        "x": "ч", 
        "c": "с", 
        "v": "м", 
        "b": "и", 
        "n": "т", 
        "m": "ь",
        ",": "б",
        ".": "ю",
        "?": ".",
    }
  };