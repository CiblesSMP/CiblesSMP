// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Function to allow the setting of textboxes above an element when hovered over
document.addEventListener('DOMContentLoaded', () => {
    const hoverElements = document.querySelectorAll('.hover-element');

    hoverElements.forEach(hoverElement => {
        const tooltipText = hoverElement.querySelector('.tooltip-text');

        hoverElement.addEventListener('mouseover', () => {
            tooltipText.style.visibility = 'visible';
            tooltipText.style.opacity = '1';
        });

        hoverElement.addEventListener('mouseout', () => {
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.opacity = '0';
        });
    });
});