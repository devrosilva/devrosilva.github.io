const handlePanelClick = e => {
    console.log(e);
    const isExpanded = e.target.tagName === 'SPAN' ? 
    e.target.parentElement.classList.value.includes('expanded-panel') : 
    e.target.classList.value.includes('expanded-panel');

    Array.from(document.querySelectorAll('[id^="background"]'))
        .forEach(background => {
            background.classList.remove('expanded-panel')
            background.firstElementChild?.classList.remove('top-visible-text');
            background.lastElementChild?.classList.remove('bottom-visible-text');
        });
    
    if(isExpanded) return;

    e.target.tagName === 'SPAN' ? 
    e.target.parentElement.classList.add('expanded-panel') :
    e.target.classList.add('expanded-panel');

    e.target.firstElementChild.classList.add('top-visible-text');
    e.target.lastElementChild.classList.add('bottom-visible-text');
};

window.addEventListener('click', handlePanelClick);