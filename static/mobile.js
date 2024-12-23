document.addEventListener("DOMContentLoaded", () => {
    const handleResponsiveChange = () => {
        const newsContainers = document.querySelectorAll(".news-container");

        newsContainers.forEach(container => {
            const pinPlaceholder = container.querySelector(".pin-placeholder");
            const timestampDiv = container.querySelector(".timestamp");

            if (window.matchMedia("(max-width: 768px)").matches) {
                if (pinPlaceholder && !pinPlaceholder.style.display) {
                    pinPlaceholder.style.display = "none"; // Hide the pin-placeholder
                    if (timestampDiv && !timestampDiv.textContent.startsWith("Pinned - ")) {
                        timestampDiv.textContent = `Pinned - ${timestampDiv.textContent}`;
                    }
                }
            } else {
                if (pinPlaceholder) {
                    pinPlaceholder.style.display = ""; // Reset to default display
                }
                if (timestampDiv && timestampDiv.textContent.startsWith("Pinned - ")) {
                    timestampDiv.textContent = timestampDiv.textContent.replace("Pinned - ", "");
                }
            }
        });
    };

    // Initial check
    handleResponsiveChange();

    // Add event listener for window resize
    window.addEventListener("resize", handleResponsiveChange);
});

