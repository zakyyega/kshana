document.addEventListener("DOMContentLoaded", function () {

    /* ===== MENU (AMAN) ===== */
    const menu = document.querySelector("#menu-btn");
    const navbar = document.querySelector(".navbar");

    if (menu && navbar) {
        menu.addEventListener("click", () => {
            menu.classList.toggle("fa-times");
            navbar.classList.toggle("active");
        });

        window.addEventListener("scroll", () => {
            menu.classList.remove("fa-times");
            navbar.classList.remove("active");
        });
    }

    /* ===== IMAGE SLIDER ===== */
    document.querySelectorAll(".image-slider img").forEach(img => {
        img.addEventListener("click", () => {
            const mainImage = document.querySelector(".main-home-image");
            if (mainImage) mainImage.src = img.src;
        });
    });

    /* ===== SWIPER ===== */
    if (typeof Swiper !== "undefined") {
        new Swiper(".review-slider", {
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 7500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
            },
        });
    }

    /* ===== RATING STAR (FIX TOTAL) ===== */
    const stars = document.querySelectorAll(".rating i");
    const ratingInput = document.getElementById("rating");

    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            ratingInput.value = index + 1;

            stars.forEach(s => s.style.color = "#ccc");
            for (let i = 0; i <= index; i++) {
                stars[i].style.color = "orange";
            }
        });
    });

    /* ===== FORM SUBMIT ===== */
    const form = document.querySelector(".book form");
    const status = document.getElementById("status");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            if (!ratingInput.value) {
                alert("Please select a rating first");
                return;
            }

            if (status) status.innerText = "Sending...";

            const data = {
                name: form.querySelector('input[type="text"]').value,
                email: form.querySelector('input[type="email"]').value,
                number: form.querySelector('input[type="number"]').value,
                rating: ratingInput.value,
                message: form.querySelector("textarea").value
            };

            try {
                const res = await fetch("https://script.google.com/macros/s/AKfycbw6upZMu0B4xc0ta9Q5jLMikGSqjH0XcrK-QJWVOVq-MYb9qaIspELzos8B6B2iPiSS/exec", {
                    method: "POST",
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    if (status) status.innerText = "Review sent successfully!";
                    form.reset();
                    ratingInput.value = "";
                    stars.forEach(s => s.style.color = "#ccc");
                } else {
                    if (status) status.innerText = "Failed to send review.";
                }
            } catch {
                if (status) status.innerText = "Connection error.";
            }
        });
    }

});
