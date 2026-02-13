// bubble-renderer.js
// -----------------------------
// Renders Telegram-style comment bubbles
// -----------------------------

const BubbleRenderer = (() => {

    function render(persona, text, container, options = {}) {
        if (!container) return;

        const commentEl = document.createElement("div");
        commentEl.className = "tg-comment";

        // Add bubble type for admin replies
        const bubbleClass = persona.isAdmin && options.reply ? 'tg-bubble admin reply' : persona.isAdmin ? 'tg-bubble admin' : 'tg-bubble';

        commentEl.innerHTML = `
            <img class="tg-comment-avatar" src="${persona.avatar}" alt="${persona.name}" />
            <div class="${bubbleClass}">
                <div class="tg-bubble-name">${persona.name}</div>
                <div class="tg-bubble-text">${escapeHTML(text)}</div>
            </div>
        `;

        container.appendChild(commentEl);

        // Scroll smoothly
        commentEl.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    // Basic XSS protection
    function escapeHTML(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    return { render };

})();
