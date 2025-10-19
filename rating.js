
function initializeStarRating() {
    const allStars = document.querySelectorAll('.user-rating .star');

    allStars.forEach(star => {
        
        star.addEventListener('click', function() {
            const ratingValue = parseInt(this.getAttribute('data-value'));
            
            const rateableCard = this.closest('.rateable-card');
            
            if (!rateableCard) {
                console.error("Parent .rateable-card not found for the clicked star.");
                return;
            }

            const starsInGroup = rateableCard.querySelectorAll('.star');
            const messageElement = rateableCard.querySelector('.rating-message');
            
            starsInGroup.forEach(s => {
                const starValue = parseInt(s.getAttribute('data-value'));
                if (starValue <= ratingValue) {
                    s.classList.add('selected'); 
                } else {
                    s.classList.remove('selected'); 
                }
            });

            let messageText = `You rated this ${ratingValue} star${ratingValue > 1 ? 's' : ''}. Thank you!`;
            messageElement.textContent = messageText;
            
            const cardId = rateableCard.getAttribute('data-movie-id') || rateableCard.getAttribute('data-series-id') || 'Unknown Media';
            console.log(`Rating set for: ${cardId} to ${ratingValue} stars.`);
        });
        
        const userRatingContainer = star.closest('.user-rating');
        
        star.addEventListener('mouseover', function() {
            const hoverValue = parseInt(this.getAttribute('data-value'));
            userRatingContainer.querySelectorAll('.star').forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= hoverValue) {
                    s.style.color = '#ffcc00'; 
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            userRatingContainer.querySelectorAll('.star').forEach(s => {
                if (!s.classList.contains('selected')) {
                    s.style.color = ''; 
                } else {
                    s.style.color = '#FFD700';
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeStarRating);