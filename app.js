// app.js
// -------------------------------------------------
// Global application controller
// Connects all engines together
// -------------------------------------------------

const App = (() => {

    let commentsContainer;
    let commentCounterEl;
    let postId = null; // current post ID
    let commentCount = 0;

    function init(config = {}) {
        commentsContainer = document.getElementById("tg-comments-container");
        commentCounterEl = document.getElementById("tg-comment-count");
        postId = config.postId || "default-post";

        if (!commentsContainer) {
            console.warn("Comments container not found.");
            return;
        }

        initInteractions();
        initRealism();

        observeNewComments();
        renderPostHeader(config.postTitle || "Loading...");
    }

    // -----------------------------------------
    // Initialize user interactions
    // -----------------------------------------
    function initInteractions() {
        Interactions.init({
            container: commentsContainer,
            input: document.getElementById("tg-comment-input"),
            sendBtn: document.getElementById("tg-send-btn"),
            rightButtons: document.querySelector(".tg-right-buttons"),
            emojiBtn: document.querySelector('.tg-icon-btn[data-type="emoji"]')
        });
    }

    // -----------------------------------------
    // Initialize synthetic realism engine
    // -----------------------------------------
    function initRealism() {
        if (typeof RealismEngine !== "undefined") {
            RealismEngine.start(commentsContainer, postId);
        }
    }

    // -----------------------------------------
    // Auto comment counter observer
    // -----------------------------------------
    function observeNewComments() {
        const observer = new MutationObserver(() => updateCommentCount());
        observer.observe(commentsContainer, { childList: true });
        updateCommentCount();
    }

    function updateCommentCount() {
        commentCount = commentsContainer.children.length;
        if (commentCounterEl) commentCounterEl.textContent = commentCount + " comments";
    }

    // -----------------------------------------
    // Render Post Header / Discussion title
    // -----------------------------------------
    function renderPostHeader(title) {
        const titleEl = document.getElementById("tg-post-title");
        if (titleEl) titleEl.textContent = title;
    }

    return {
        init
    };

})();

// -----------------------------------------
// Boot Application
// -----------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    App.init({
        postId: "abrox-binary-001", // unique per post
        postTitle: "🔥 Abrox Bot Binary Signals – 95% Accuracy"
    });
});
