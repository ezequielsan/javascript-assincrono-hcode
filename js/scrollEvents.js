['games-list-principal', 'games-relationed'].forEach(elementId => {

    const scrollElement = document.querySelector('#' + elementId);
    let eventsToCursorGrab = ['mouseleave', 'mouseup'];
    let isMousePressed = false;
    let startX;
    let scrollLeft;

    scrollElement.addEventListener('mousedown', e => {

        isMousePressed = true;

        scrollElement.style.cursor = 'grabbing';

        startX = e.pageX - scrollElement.offsetLeft;
        
        scrollLeft = scrollElement.scrollLeft;

    });

    eventsToCursorGrab.forEach(event => {

        scrollElement.addEventListener(event, () => {

            isMousePressed = false;

            scrollElement.style.cursor = 'grab';
        
        });

    });

    scrollElement.addEventListener('mousemove', e => {

        if (isMousePressed) {

            e.preventDefault();

            const infoX = e.pageX - scrollElement.offsetLeft;

            const distance = (infoX - startX) * 2;

            scrollElement.scrollLeft = scrollLeft - distance;

        }

    });

});