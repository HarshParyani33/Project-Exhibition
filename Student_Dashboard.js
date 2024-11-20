document.addEventListener('DOMContentLoaded', function() {
    const content = document.querySelector('.announcement-content');
    
    // Clone all announcements and append them to create a seamless loop
    const originalItems = content.innerHTML;
    content.innerHTML = originalItems + originalItems;
    
    let isPaused = false;
    const duration = 20; // Duration in seconds for one complete scroll
    
    function startScrolling() {
        const height = content.scrollHeight / 2; // Half because we duplicated the content
        content.style.transition = `transform ${duration}s linear`;
        content.style.transform = `translateY(-${height}px)`;
        
        // Reset when complete
        setTimeout(() => {
            content.style.transition = 'none';
            content.style.transform = 'translateY(0)';
            startScrolling();
        }, duration * 1000);
    }
    
    // Pause on hover
    const container = document.querySelector('.announcement-container');
    container.addEventListener('mouseenter', () => {
        content.style.animationPlayState = 'paused';
        content.style.transition = 'none';
    });
    
    container.addEventListener('mouseleave', () => {
        content.style.animationPlayState = 'running';
        startScrolling();
    });
    
    // Start the animation
    startScrolling();
});
