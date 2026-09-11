document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // AOS INITIALIZATION
    // =========================================

    if (window.AOS) {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 100,
            delay: 0
        });
    }


    // =========================================
    // GSAP CHECK
    // =========================================

    if (
        !window.gsap ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }


    // =========================================
    // GSAP HERO ANIMATION
    // =========================================

    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    heroTimeline
        .from(".hero-content .section-label", {
            autoAlpha: 0,
            x: -24,
            duration: 0.55
        })

        .from(".hero-content h1", {
            autoAlpha: 0,
            y: 28,
            duration: 0.75
        }, "-=0.2")

        .from(".hero-description", {
            autoAlpha: 0,
            y: 20,
            duration: 0.6
        }, "-=0.45")

        .from(".hero-buttons", {
            autoAlpha: 0,
            y: 16,
            duration: 0.55
        }, "-=0.35")

        .from(".hero-stats", {
            autoAlpha: 0,
            y: 16,
            duration: 0.55
        }, "-=0.4")

        .from(".about-hero .hero-visual", {
            autoAlpha: 0,
            x: 36,
            duration: 0.8
        }, "-=0.7");


    // =========================================
    // FLOATING CARDS
    // =========================================

    gsap.to(".floating-card-one", {
        y: -8,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

    gsap.to(".floating-card-two", {
        y: 7,
        duration: 3.9,
        delay: 0.35,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });


    // =========================================
    // HERO GLOW ANIMATION
    // =========================================

    gsap.to(".hero-glow-one", {
        scale: 1.06,
        opacity: 0.85,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

    gsap.to(".hero-glow-two", {
        scale: 1.05,
        opacity: 0.8,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });


    // =========================================
    // IMAGE HOVER ANIMATION
    // =========================================

    if (
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {

        const hoverTargets = document.querySelectorAll(
            ".visual-frame, .feature-image-frame, .workflow-image-frame, .cta-image"
        );

        hoverTargets.forEach((target) => {

            target.addEventListener("mouseenter", () => {

                gsap.to(target, {
                    y: -6,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });

            });

            target.addEventListener("mouseleave", () => {

                gsap.to(target, {
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto"
                });

            });

        });
    }


    // =========================================
    // CARD HOVER ANIMATION
    // =========================================

    if (
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {

        const cards = document.querySelectorAll(
            ".feature-card, .why-card"
        );

        cards.forEach((card) => {

            card.addEventListener("mouseenter", () => {

                gsap.to(card, {
                    y: -6,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });

            });

            card.addEventListener("mouseleave", () => {

                gsap.to(card, {
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto"
                });

            });

        });
    }

});
