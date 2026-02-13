// app.js
// -----------------------------
// Global application controller
// Initializes all modules per post
// -----------------------------

const App = (() => {

    const posts = []; // in case multiple posts on page
    let postId = "post_" + Date.now(); // unique ID per page load

    function init() {

        const container = document.getElementById("tg-comments-container");
        const commentCounterEl = document.getElementById("tg-comment-count");

        if (!container) {
            console.warn("Comments container not found.");
            return;
        }

        const input = document.getElementById("tg-comment-input");
        const sendBtn = document.getElementById("tg-send-btn");
        const rightButtons = document.querySelector(".tg-right-buttons");
        const emojiBtn = document.querySelector('.tg-icon-btn[data-type="emoji"]');

        // Initialize user interactions
        Interactions.init({
            container,
            input,
            sendBtn,
            rightButtons,
            emojiBtn,
            postId
        });

        // Initialize synthetic realism engine
        RealismEngine.start(container, postId);

        // Observe new comments for counter
        const observer = new MutationObserver(() => {
            commentCounterEl.textContent = container.children.length;
        });

        observer.observe(container, { childList: true });
        commentCounterEl.textContent = container.children.length;

        // Set placeholder post title from Telegram post (can be dynamic)
        const postTitleEl = document.getElementById("tg-post-title");
        postTitleEl.textContent = "Abrox AI Bot Discussion"; // example
    }

    return { init };

})();

// Boot application
document.addEventListener("DOMContentLoaded", () => {
    App.init();
});
