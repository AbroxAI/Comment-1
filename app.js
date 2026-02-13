// app.js
// -----------------------------
// Connects engines, observers, and post-specific logic
// -----------------------------

const App = (() => {

    let commentsContainer, commentCounterEl;
    const postId = "post-" + Date.now(); // unique per page load

    function init() {
        commentsContainer = document.getElementById("tg-comments-container");
        commentCounterEl = document.getElementById("tg-comment-count");

        if (!commentsContainer) return console.warn("Comments container not found.");

        initInteractions();
        initRealism();
        observeNewComments();
    }

    function initInteractions() {
        Interactions.init({
            container: commentsContainer,
            input: document.getElementById("tg-comment-input"),
            sendBtn: document.getElementById("tg-send-btn"),
            rightButtons: document.querySelector(".tg-right-buttons"),
            emojiBtn: document.querySelector('.tg-icon-btn[data-type="emoji"]'),
            postId
        });
    }

    function initRealism() {
        // Start synthetic comments with random initial count
        const initialCount = Math.floor(Math.random() * 20) + 15; // 15–35 comments
        RealismEngine.start(postId, commentsContainer, initialCount);
    }

    function observeNewComments() {
        const observer = new MutationObserver(() => updateCommentCount());
        observer.observe(commentsContainer, { childList: true });
        updateCommentCount();
    }

    function updateCommentCount() {
        const count = commentsContainer.children.length;
        if (commentCounterEl) commentCounterEl.textContent = count + " comments";
    }

    return { init };

})();

document.addEventListener("DOMContentLoaded", () => App.init());
