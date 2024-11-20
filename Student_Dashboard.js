document.addEventListener('DOMContentLoaded', function() {
    const content = document.querySelector('.announcement-content');
    
    // Clone all announcements and append them to create a seamless loop
    const originalItems = content.innerHTML;
    content.innerHTML = originalItems + originalItems;
    
    let isPaused = false;
    const duration = 20; // Duration in seconds for one complete scroll
    let animationFrame;
    let startTime;
    let pauseStartTime;
    let pauseDuration = 0;
    
    function startScrolling() {
        const height = content.scrollHeight / 2;
        
        if (!startTime) startTime = Date.now();
        
        function animate() {
            if (!isPaused) {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime - pauseDuration;
                const position = (elapsedTime * height) / (duration * 1000);
                
                if (position >= height) {
                    // Reset animation
                    startTime = currentTime;
                    pauseDuration = 0;
                    content.style.transform = 'translateY(0)';
                } else {
                    content.style.transform = `translateY(-${position}px)`;
                }
                
                animationFrame = requestAnimationFrame(animate);
            }
        }
        
        animate();
    }
    
    // Pause on hover
    const container = document.querySelector('.announcement-container');
    container.addEventListener('mouseenter', () => {
        isPaused = true;
        pauseStartTime = Date.now();
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
    
    container.addEventListener('mouseleave', () => {
        isPaused = false;
        pauseDuration += Date.now() - pauseStartTime;
        startScrolling();
    });
    
    // Start the animation
    startScrolling();
});
