document.addEventListener("DOMContentLoaded", () => {
    const posts = document.querySelectorAll(".news-container");

    const createAdDiv = () => {
        const adDiv = document.createElement("div");
        adDiv.className = "ad adArea";
        return adDiv;
    };

    posts.forEach((post, index) => {
        if ((index + 1) % 3 === 0) {
            const adDiv = createAdDiv();
            post.after(adDiv);
        }
    });

    if (posts.length > 0) {
        const lastPost = posts[posts.length - 1];
        const lastPostNextSibling = lastPost.nextElementSibling;

        if (!lastPostNextSibling.classList.contains("ad")) {
            const adDiv = createAdDiv();
            lastPost.after(adDiv);
        }
    }
});
