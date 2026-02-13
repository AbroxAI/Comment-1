// interactions.js
// ============================================================
// USER INTERACTIONS v1
// Handles user input, send button, and emoji/media actions
// Integrated with identity-personas.js, bubble-renderer.js, and realism-engine.js
// ============================================================

const commentInput = document.getElementById("tg-comment-input");
const sendBtn = document.getElementById("tg-send-btn");
const commentsContainer = document.getElementById("tg-comments-container");
const commentCountElem = document.getElementById("tg-comment-count");

// Show/hide send button based on input
commentInput.addEventListener("input", () => {
    if (commentInput.value.trim().length > 0) {
        sendBtn.style.display = "flex";
    } else {
        sendBtn.style.display = "none";
    }
});

// Send user comment
sendBtn.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (!text) return;

    const userPersona = getPersona({type:"admin"}); // Admin posting
    const timestamp = generateTimestamp();

    renderBubble(userPersona, text, timestamp, true); // true = admin bubble
    commentInput.value = "";
    sendBtn.style.display = "none";
    updateCommentCount();

    // Trigger crowd reaction to this comment
    triggerTrendingReaction(text);
});

// Utility: Update comment count
function updateCommentCount() {
    const count = commentsContainer.querySelectorAll(".tg-comment").length;
    commentCountElem.innerHTML = `<strong>${count} comments</strong>`;
}

// Optional: handle Enter key
commentInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendBtn.click();
    }
});

// Optional: emoji/media buttons (can expand later)
document.querySelectorAll(".tg-icon-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-type");
        alert(`Feature '${type}' clicked! (expand later)`); // placeholder
    });
});

// Scroll container to bottom on load
commentsContainer.scrollTop = commentsContainer.scrollHeight;
