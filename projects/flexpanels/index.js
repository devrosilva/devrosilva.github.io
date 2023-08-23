const handlePanelClick = e => {
    const isExpanded = e.target.classList.value.includes('expanded-panel');

    Array.from(document.querySelectorAll('[id^="background"]'))
        .forEach(background => {
            background.classList.remove('reduced-panel');
            background.classList.remove('expanded-panel')
        });
    
    if(isExpanded) return;
    else e.target.classList.add('expanded-panel');
}

window.addEventListener('click', handlePanelClick);