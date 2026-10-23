const carousels = document.querySelectorAll(".js-carousel");

carousels.forEach((carousel) => {
    const viewport = carousel.querySelector(".carousel-viewport");
    const slides = [...carousel.querySelectorAll(".carousel-slide")];
    const dots = [...carousel.querySelectorAll(".carousel-dot")];
    const arrows = [...carousel.querySelectorAll(".carousel-arrow")];

    let activeIndex = Number(carousel.dataset.initialSlide || 0);

    /* Идэвхтэй цэгийг тодруулах */
    function updateDots(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    /* Сонгосон карт руу гүйлгэх */
    function goToSlide(index, behavior = "smooth") {
        activeIndex = Math.max(0, Math.min(index, slides.length - 1));

        const slide = slides[activeIndex];

        const targetLeft =
            slide.offsetLeft -
            (viewport.clientWidth - slide.clientWidth) / 2;

        viewport.scrollTo({
            left: targetLeft,
            behavior: behavior
        });

        updateDots(activeIndex);
    }

    /* Төвд хамгийн ойр байгаа картын индекс */
    function findActiveSlide() {
        const center = viewport.scrollLeft + viewport.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        slides.forEach((slide, i) => {
            const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
            const distance = Math.abs(center - slideCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        });

        return closestIndex;
    }

    /* Зүүн, баруун сум */
    arrows.forEach((arrow) => {
        arrow.addEventListener("click", () => {
            const movement = Number(arrow.dataset.move);
            goToSlide(activeIndex + movement);
        });
    });

    /* Pagination цэгүүд */
    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            goToSlide(Number(dot.dataset.slide));
        });
    });

    /* Хэрэглэгч гараар гүйлгэх үед идэвхтэй цэгээ шинэчлэх */
    let scrollTimeout;

    viewport.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            activeIndex = findActiveSlide();
            updateDots(activeIndex);
        }, 100);
    });

    /* Хуудас ачаалагдахад сонгосон картаа төвд байрлуулах */
    requestAnimationFrame(() => {
        goToSlide(activeIndex, "auto");
    });

    /* Цонхны хэмжээг өөрчлөхөд төвлөрлийг хадгална */
    window.addEventListener("resize", () => {
        goToSlide(activeIndex, "auto");
    });
});