// ================= BUBBLE RENDERER =================
// Handles rendering persona comments into the Telegram-style widget

const commentsContainer = document.getElementById("tg-comments-container");
const commentCountEl = document.getElementById("tg-comment-count");
const newCommentsNotification = document.getElementById("tg-new-comments");

let totalComments = 0;

// ------------------------------
// Create a single comment bubble
// ------------------------------
function renderCommentBubble(persona, text, isAdmin = false) {
    const commentEl = document.createElement("div");
    commentEl.classList.add("tg-comment");

    // Avatar
    const avatarEl = document.createElement("img");
    avatarEl.classList.add("tg-comment-avatar");
    avatarEl.src = persona.avatar;
    avatarEl.alt = persona.name;

    // Bubble
    const bubbleEl = document.createElement("div");
    bubbleEl.classList.add("tg-bubble");
    if(isAdmin) bubbleEl.classList.add("admin");

    // Name
    const nameEl = document.createElement("div");
    nameEl.classList.add("tg-bubble-name");
    nameEl.textContent = persona.name;

    // Message
    const msgEl = document.createElement("div");
    msgEl.classList.add("tg-bubble-msg");
    msgEl.textContent = text;

    bubbleEl.appendChild(nameEl);
    bubbleEl.appendChild(msgEl);
    commentEl.appendChild(avatarEl);
    commentEl.appendChild(bubbleEl);

    // Append to container
    commentsContainer.appendChild(commentEl);
    commentsContainer.scrollTop = commentsContainer.scrollHeight;

    // Update total count
    totalComments++;
    commentCountEl.innerHTML = `<strong>${totalComments} comments</strong>`;

    return commentEl;
}

// ------------------------------
// Render batch of comments
// ------------------------------
function renderCommentsBatch(comments) {
    comments.forEach(c => renderCommentBubble(c.persona, c.text, c.persona.isAdmin));
}

// ------------------------------
// Generate a synthetic comment from personas engine
// ------------------------------
function generateAndRenderComment(baseText="Nice setup!", targetName=null) {
    const persona = getRandomPersona();
    const text = generateHumanComment(persona, baseText, targetName);

    if(!isDuplicate("post-1", text)) {
        renderCommentBubble(persona, text, persona.isAdmin);
    }
}

// ------------------------------
// Admin message renderer
// ------------------------------
function renderAdminMessage(text) {
    renderCommentBubble(Admin, text, true);
}

// ------------------------------
// Simulate trending reactions
// ------------------------------
function simulateTrending(baseText="This is hot!") {
    const reactions = simulateCrowdReaction(baseText);
    reactions.forEach(text => {
        const persona = getRandomPersona();
        renderCommentBubble(persona, text, persona.isAdmin);
    });
}

// ------------------------------
// New comments notification
// ------------------------------
function showNewCommentsNotification() {
    newCommentsNotification.classList.remove("hidden");
    newCommentsNotification.onclick = () => {
        commentsContainer.scrollTop = commentsContainer.scrollHeight;
        newCommentsNotification.classList.add("hidden");
    };
}

// ------------------------------
// Auto-generate comments periodically
// ------------------------------
function startAutoComments(interval=6000) {
    setInterval(() => {
        generateAndRenderComment(random([
            "Looking good!", 
            "I'm bullish on this 🚀", 
            "Interesting move", 
            "Check volume here", 
            "Solid setup"
        ]));
    }, interval);
}

// ------------------------------
// Export functions
// ------------------------------
window.BubbleRenderer = {
    renderCommentBubble,
    renderCommentsBatch,
    generateAndRenderComment,
    renderAdminMessage,
    simulateTrending,
    startAutoComments,
    showNewCommentsNotification
};
