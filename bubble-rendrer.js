// bubble-renderer.js
// ----------------------------------
// Responsible for rendering Telegram-style comment bubbles
// ----------------------------------

const BubbleRenderer = (() => {

    /**
     * Render a comment bubble
     * @param {Object} persona - from identity-engine.js
     * @param {String} text - message content
     * @param {HTMLElement} container - comments container
     */
    function render(persona, text, container) {
        if (!container || !persona || !text) return;

        const commentEl = document.createElement("div");
        commentEl.className = "tg-comment";

        // Bubble HTML
        commentEl.innerHTML = `
            <img 
                class="tg-comment-avatar" 
                src="${persona.avatar}" 
                alt="${persona.name}" 
            />
            <div class="tg-bubble ${persona.isAdmin ? 'admin' : ''}">
                <div class="tg-bubble-name">${persona.name}</div>
                <div class="tg-bubble-text">${escapeHTML(text)}</div>
            </div>
        `;

        container.appendChild(commentEl);

        // Scroll smoothly to bottom
        commentEl.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHTML(str) {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    return {
        render
    };

})();
