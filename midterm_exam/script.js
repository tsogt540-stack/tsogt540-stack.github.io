const memoryTrack = document.querySelector(".memory-track");
const previousButton = document.querySelector(".memory-prev");
const nextButton = document.querySelector(".memory-next");

if (memoryTrack && previousButton && nextButton) {

    function scrollMemories(direction) {
        const firstCard = memoryTrack.querySelector(".memory-card");

        if (!firstCard) return;

        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = parseFloat(
            getComputedStyle(memoryTrack).gap
        ) || 0;

        memoryTrack.scrollBy({
            left: direction * (cardWidth + gap),
            behavior: "smooth"
        });
    }

    previousButton.addEventListener("click", function () {
        scrollMemories(-1);
    });

    nextButton.addEventListener("click", function () {
        scrollMemories(1);
    });
}