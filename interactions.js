// interactions.js
// ============================================================
// INTERACTIONS MODULE
// Handles user input, sending comments, notifications
// Synced with identity-personas.js & realism-engine.js
// ============================================================

const tgInput = document.getElementById("tg-comment-input");
const tgSendBtn = document.getElementById("tg-send-btn");
const tgCommentsContainer = document.getElementById("tg-comments-container");
const tgCommentCount = document.getElementById("tg-comment-count");
const tgNewComments = document.getElementById("tg-new-comments");

let userHasScrolled = false;

// ================= INPUT FIELD EVENTS =================
tgInput.addEventListener("input", () => {
    tgSendBtn.style.display = tgInput.value.trim() ? "flex" : "none";
});

// Send comment on button click
tgSendBtn.addEventListener("click", () => sendUserComment());

// Send comment on Enter key
tgInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && tgInput.value.trim()) {
        e.preventDefault();
        sendUserComment();
    }
});

// ================= SEND USER COMMENT =================
function sendUserComment() {
    const text = tgInput.value.trim();
    if (!text) return;

    const userPersona = {
        name: "You",
        avatar: "assets/user-avatar.jpg",
        isAdmin: false,
        gender: "male",
        country: "GLOBAL",
        region: "western",
        tone: "normal",
        memory: []
    };

    const timestamp = new Date();
    renderBubble(userPersona, text, timestamp, true);

    // Clear input
    tgInput.value = "";
    tgSendBtn.style.display = "none";

    // Scroll to bottom
    scrollToBottom();

    // Optionally trigger realism replies
    generateLiveComment();
}

// ================= SCROLL HANDLING =================
tgCommentsContainer.addEventListener("scroll", () => {
    const atBottom = tgCommentsContainer.scrollHeight - tgCommentsContainer.scrollTop === tgCommentsContainer.clientHeight;
    if (atBottom) {
        userHasScrolled = false;
        tgNewComments.classList.add("hidden");
    } else {
        userHasScrolled = true;
    }
});

tgNewComments.addEventListener("click", () => scrollToBottom());

function scrollToBottom() {
    tgCommentsContainer.scrollTo({ top: tgCommentsContainer.scrollHeight, behavior: "smooth" });
    userHasScrolled = false;
    tgNewComments.classList.add("hidden");
}

// ================= COMMENT COUNT =================
function updateCommentCount() {
    const count = tgCommentsContainer.querySelectorAll(".tg-comment").length;
    tgCommentCount.innerHTML = `<strong>${count} comments</strong>`;
}

// ================= OVERRIDE renderBubble =================
// Wrap the original renderBubble to handle notifications & count
const originalRenderBubble = window.renderBubble;
window.renderBubble = function(persona, text, timestamp, isUser=false) {
    originalRenderBubble(persona, text, timestamp, isUser);
    updateCommentCount();

    if (userHasScrolled && !isUser) {
        tgNewComments.classList.remove("hidden");
    } else {
        scrollToBottom();
    }
};
