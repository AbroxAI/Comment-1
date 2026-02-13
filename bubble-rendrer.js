// bubble-renderer.js
// -----------------------------
// Renders Telegram-style comment bubbles
// Supports threaded replies for admin
// -----------------------------

const BubbleRenderer = (() => {

    /**
     * Render a comment bubble
     * @param {Object} persona - persona object
     * @param {String} text - comment content
     * @param {HTMLElement} container - where to append
     * @param {Object} options - optional { reply: true/false }
     */
    function render(persona, text, container, options = {}) {
        if (!container) return;

        const commentEl = document.createElement("div");
        commentEl.className = "tg-comment";

        let bubbleClass = persona.isAdmin ? "tg-bubble admin" : "tg-bubble";

        commentEl.innerHTML = `
            <img class="tg-comment-avatar" src="${persona.avatar}" alt="${persona.name}">
            <div class="${bubbleClass}">
                <div class="tg-bubble-name">${persona.name}</div>
                <div class="tg-bubble-text">${escapeHTML(text)}</div>
            </div>
        `;

        // If this is a reply, add a left border or small offset
        if (options.reply) {
            commentEl.style.marginLeft = "48px";
        }

        container.appendChild(commentEl);

        // Smooth scroll
        commentEl.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    /**
     * Escape HTML for safety
     */
    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    return { render };

})();
