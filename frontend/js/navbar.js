document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("active");
        menuButton.classList.toggle("active", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
});
