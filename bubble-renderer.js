// bubble-renderer.js
// ============================================================
// BUBBLE RENDERER v1
// Renders Telegram-style comment bubbles
// Fully synced with identity-personas.js
// ============================================================

const commentsContainer = document.getElementById("tg-comments-container");

// Render a single comment bubble
function renderBubble(persona, text, timestamp = new Date(), isAdmin = false) {
    if (!persona || !text) return;

    // Bubble wrapper
    const commentElem = document.createElement("div");
    commentElem.className = "tg-comment";

    // Avatar
    const avatar = document.createElement("img");
    avatar.className = "tg-comment-avatar";
    avatar.src = persona.avatar || "assets/default-avatar.png";
    avatar.alt = persona.name;

    // Bubble
    const bubble = document.createElement("div");
    bubble.className = "tg-bubble" + (isAdmin ? " admin" : "");

    // Name
    const nameElem = document.createElement("div");
    nameElem.className = "tg-bubble-name";
    nameElem.textContent = persona.name;

    // Text
    const textElem = document.createElement("div");
    textElem.className = "tg-bubble-text";
    textElem.textContent = text;

    // Timestamp
    const timeElem = document.createElement("div");
    timeElem.className = "tg-bubble-time";
    timeElem.textContent = formatTime(timestamp);

    // Compose bubble
    bubble.appendChild(nameElem);
    bubble.appendChild(textElem);
    bubble.appendChild(timeElem);

    // Compose comment
    commentElem.appendChild(avatar);
    commentElem.appendChild(bubble);

    // Append to container
    commentsContainer.appendChild(commentElem);

    // Scroll to bottom smoothly
    commentsContainer.scrollTo({ top: commentsContainer.scrollHeight, behavior: "smooth" });
}

// Format timestamp nicely
function formatTime(date) {
    const now = new Date();
    const diff = now - new Date(date);

    if (diff < 60000) return "just now";
    if (diff < 3600000) return `${Math.floor(diff/60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff/3600000)} hr ago`;
    const d = new Date(date);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2,"0")} ${d.getDate()}/${d.getMonth()+1}`;
}

// Render multiple comments (used for crowd reactions)
function renderCommentsBatch(comments) {
    if (!Array.isArray(comments)) return;
    comments.forEach(c => {
        const persona = getPersona(); // synthetic persona
        renderBubble(persona, c, generateTimestamp(), false);
    });
}

// Expose functions globally for interactions.js
window.renderBubble = renderBubble;
window.renderCommentsBatch = renderCommentsBatch;
