const keyContainer = document.getElementById("key_container");

const keys = {
    'A': 'CLAP', 
    'S': 'HIHAT',
    'D': 'KICK',
    'F': 'OPENHAT',
    'G': 'BOOM',
    'H': 'RIDE',
    'J': 'SNARE',
    'K': 'TOM',
    'L': 'TINK'
};

const onPressEvent = e => {
    const pressedKey = e.key.toUpperCase();
    document.getElementById(pressedKey).focus();
    const sound = document.getElementById(keys[pressedKey].toLowerCase());
    sound.play();
}

const getKey = (title, text, index) => {
    const key = document.createElement("div");
    key.classList.add('key');
    key.setAttribute('id', `${title}`);
    key.setAttribute('tabindex', `${index}`);

    const h1 = document.createElement('h1');
    const h1Text = document.createTextNode(title);
    h1.appendChild(h1Text);

    const p = document.createElement('p');
    const pText = document.createTextNode(text);
    p.appendChild(pText);

    key.appendChild(h1);
    key.appendChild(p);

    key.addEventListener('keypress', onPressEvent);

    return key;
}

const renderKeys = (container) => {
    return Object.entries(keys).map((key, idx) => {
        return container.appendChild(getKey(key[0], key[1], idx))
    })
}

renderKeys(keyContainer);

//Ghost key trick to keep tabindex active
const ghostKey = getKey('ghostKey', 'ghostKey', 100);
keyContainer.appendChild(ghostKey);
ghostKey.focus();
ghostKey.style.zIndex = -1;
document.getElementById('background_img').addEventListener('click', () => {
    document.getElementById('ghostKey').focus();
})


