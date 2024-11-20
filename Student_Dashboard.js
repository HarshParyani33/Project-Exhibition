document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.announcement-container');
    const content = document.querySelector('.announcement-content');
    
    // Calculate the height of a single item
    const itemHeight = content.querySelector('.announcement-item').offsetHeight;
    
    // Clone the first item and append it to the end
    function cloneFirstItem() {
        const firstItem = content.querySelector('.announcement-item');
        const clone = firstItem.cloneNode(true);
        content.appendChild(clone);
    }
    
    let currentPosition = 0;
    let isPaused = false;
    
    function scroll() {
        if (!isPaused) {
            currentPosition++;
            content.style.transform = `translateY(-${currentPosition}px)`;
            
            // When we've scrolled the height of one item, reset to top
            if (currentPosition >= itemHeight) {
                // Move first item to last
                const firstItem = content.querySelector('.announcement-item');
                content.appendChild(firstItem);
                // Reset position
                currentPosition = 0;
                content.style.transform = `translateY(0)`;
            }
        }
        requestAnimationFrame(scroll);
    }

    // Start scrolling
    requestAnimationFrame(scroll);

    // Pause on hover
    container.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    // Resume on mouse leave
    container.addEventListener('mouseleave', () => {
        isPaused = false;
    });
});
