// bubble-renderer.js
// ============================================================
// BUBBLE RENDERER
// Renders comment bubbles for admin, user, and synthetic personas
// Syncs with identity-personas.js & interactions.js
// ============================================================

const tgCommentsContainer = document.getElementById("tg-comments-container");

/**
 * Renders a comment bubble
 * @param {Object} persona - persona object {name, avatar, isAdmin, ...}
 * @param {string} text - comment text
 * @param {Date} timestamp - comment timestamp
 * @param {boolean} isUser - true if from current user
 */
function renderBubble(persona, text, timestamp = new Date(), isUser = false) {
    const commentWrapper = document.createElement("div");
    commentWrapper.classList.add("tg-comment");

    // Avatar
    const avatarImg = document.createElement("img");
    avatarImg.src = persona.avatar || "assets/default-avatar.jpg";
    avatarImg.alt = persona.name;
    avatarImg.classList.add("tg-comment-avatar");

    // Bubble
    const bubble = document.createElement("div");
    bubble.classList.add("tg-bubble");
    if (persona.isAdmin) bubble.classList.add("admin");
    if (isUser) bubble.classList.add("admin"); // user bubble styled like admin

    // Name
    const nameSpan = document.createElement("div");
    nameSpan.classList.add("tg-bubble-name");
    nameSpan.textContent = persona.name;

    // Text
    const textSpan = document.createElement("div");
    textSpan.classList.add("tg-bubble-text");
    textSpan.textContent = text;

    // Timestamp
    const timeSpan = document.createElement("div");
    timeSpan.classList.add("tg-bubble-time");
    timeSpan.textContent = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    bubble.appendChild(nameSpan);
    bubble.appendChild(textSpan);
    bubble.appendChild(timeSpan);

    if (isUser) {
        commentWrapper.style.flexDirection = "row-reverse";
    }

    commentWrapper.appendChild(avatarImg);
    commentWrapper.appendChild(bubble);

    tgCommentsContainer.appendChild(commentWrapper);

    // Animate in
    setTimeout(() => {
        commentWrapper.style.opacity = 1;
        commentWrapper.style.transform = "translateY(0)";
    }, 50);
}

/**
 * Generates a synthetic persona comment
 * Optionally used by realism engine
 */
function generateLiveComment(baseText = "Interesting move") {
    const persona = getRandomPersona();
    const text = generateHumanComment(persona, baseText);
    const timestamp = generateTimestamp();
    renderBubble(persona, text, timestamp, false);
}
