const newNewsData = [
    {
        imgSrc: "images/thelastofus.jpg",
        alt: "The Last of Us Season 2",
        headline: "The Last of Us Season 2 Delay Confirmed",
        plot: "Production for the highly-anticipated second season of HBO's hit show has been pushed back due to industry strikes. New release window expected in 2026.",
        link: "https://example.com/the-last-of-us-delay"
    },
    {
        imgSrc: "images/duna.jpg",
        alt: "Timothee Chalamet Dune",
        headline: "Dune 3 Officially Greenlit by Warner Bros.",
        plot: "Following the massive success of Part Two, Denis Villeneuve is confirmed to return to direct the third installment, based on 'Dune Messiah'.",
        link: "https://example.com/dune-3-greenlit"
    }
];

function createNewsCard(data) {
    const card = document.createElement('div');
    card.classList.add('media-card');
    card.innerHTML = `
        <img src="${data.imgSrc}" alt="${data.alt}">
        <div>
            <h3>${data.headline}</h3>
            <p>${data.plot}
                <a href="${data.link}" target="_blank">Read more</a>
            </p>
        </div>
    `;
    return card;
}

async function loadMoreContent() {
    const container = document.getElementById('news-container');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (!container || !loadMoreBtn) return;
    
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'Loading...';

    try {
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        const newItems = newNewsData;

        if (newItems.length > 0) {
            newItems.forEach(item => {
                const newCard = createNewsCard(item);
                container.appendChild(newCard);
            });
            loadMoreBtn.textContent = 'Load more news';
        } else {
            loadMoreBtn.textContent = 'No more news';
            loadMoreBtn.disabled = true;
        }

    } catch (error) {
        console.error('Content loading error:', error);
        loadMoreBtn.textContent = 'Load failed. Retry?';
        loadMoreBtn.disabled = false;
    }
    
    if (loadMoreBtn.textContent !== 'No more news') {
        loadMoreBtn.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreContent);
    }
});
