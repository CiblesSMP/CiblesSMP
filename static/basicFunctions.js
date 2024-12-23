// -- FETCH COOKIE --
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// -- SET COOKIE --
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// -- HOVER TOOLTIP --
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

// -- COOKIE POPUP --
document.addEventListener('DOMContentLoaded', () => {
    const cookiePopupHTML = `
        <div class="cookie-popup" id="cookiePopup">
            <div class="cookie-content">
                <p>We use cookies to improve your experience on our site. By using our site, you consent to cookies.</p>
                <button id="acceptCookies">Accept</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', cookiePopupHTML);

    const cookiePopup = document.getElementById('cookiePopup');
    const acceptCookiesButton = document.getElementById('acceptCookies');
    const isCookiesAccepted = getCookie('cookiesAccepted') === 'true';

    if(!isCookiesAccepted) {
        setTimeout(() => {
            cookiePopup.style.display = 'block';
        }, 1000);
    };

    acceptCookiesButton.addEventListener('click', () => {
        cookiePopup.style.display = 'none';
        setCookie('cookiesAccepted', 'true');
    });
});