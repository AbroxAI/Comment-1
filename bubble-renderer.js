// bubble-renderer.js
// ============================================================
// COMMENT BUBBLE RENDERER
// Works with identity-personas.js & interactions.js
// Renders Telegram-style bubbles for admin & synthetic personas
// ============================================================

const commentsContainer = document.getElementById("tg-comments-container");

// ================= RENDER SINGLE BUBBLE =================
function renderBubble(persona, text, timestamp = Date.now()) {
    if (!persona || !text) return;

    // Create comment container
    const commentEl = document.createElement("div");
    commentEl.classList.add("tg-comment");

    // Avatar
    const avatarEl = document.createElement("img");
    avatarEl.classList.add("tg-comment-avatar");
    avatarEl.src = persona.avatar;
    avatarEl.alt = persona.name;

    // Bubble container
    const bubbleEl = document.createElement("div");
    bubbleEl.classList.add("tg-bubble");
    if (persona.isAdmin) bubbleEl.classList.add("admin");

    // Bubble name
    const nameEl = document.createElement("div");
    nameEl.classList.add("tg-bubble-name");
    nameEl.textContent = persona.name;

    // Bubble text
    const textEl = document.createElement("div");
    textEl.classList.add("tg-bubble-text");
    textEl.textContent = text;

    // Append
    bubbleEl.appendChild(nameEl);
    bubbleEl.appendChild(textEl);
    commentEl.appendChild(avatarEl);
    commentEl.appendChild(bubbleEl);

    // Insert at bottom
    commentsContainer.appendChild(commentEl);

    // Animate in
    setTimeout(() => commentEl.style.opacity = 1, 10);

    // Notify new comment if user not at bottom
    if (typeof notifyNewComment === "function") notifyNewComment();
}

// ================= RENDER MULTIPLE BUBBLES =================
function renderMultipleBubbles(bubbleArray) {
    bubbleArray.forEach(b => {
        renderBubble(b.persona, b.text, b.timestamp);
    });
}

// ================= SIMULATE HUMAN COMMENT =================
function simulateHumanComment(baseText = null) {
    const persona = getRandomPersona();
    const text = baseText || generateHumanComment(persona, "This is lit!");
    const timestamp = generateTimestamp();

    renderBubble(persona, text, timestamp);
}

// ================= EXPORTS =================
window.renderBubble = renderBubble;
window.renderMultipleBubbles = renderMultipleBubbles;
window.simulateHumanComment = simulateHumanComment;
