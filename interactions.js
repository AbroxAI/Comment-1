// interactions.js
// -----------------------------
// Handles input, send, media buttons, and real member messages
// -----------------------------

const Interactions = (() => {

    let container, input, sendBtn, rightButtons, emojiBtn, postId;

    function init(config) {
        container = config.container;
        input = config.input;
        sendBtn = config.sendBtn;
        rightButtons = config.rightButtons;
        emojiBtn = config.emojiBtn;
        postId = config.postId || "default-post";

        if (!container || !input || !sendBtn || !rightButtons) {
            console.warn("Interactions not initialized properly.");
            return;
        }

        bindInputToggle();
        bindSendBehavior();
        bindMediaButtons();
    }

    function bindInputToggle() {
        input.addEventListener("input", toggleButtons);
        toggleButtons();
    }

    function toggleButtons() {
        if (input.value.trim().length > 0) {
            sendBtn.style.display = "flex";
            rightButtons.style.display = "none";
        } else {
            sendBtn.style.display = "none";
            rightButtons.style.display = "flex";
        }
    }

    function bindSendBehavior() {
        sendBtn.addEventListener("click", sendMessage);
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                if (input.value.trim()) {
                    e.preventDefault();
                    sendMessage();
                }
            }
        });
    }

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        const userPersona = {
            name: "You",
            avatar: "static/real-user.png",
            isAdmin: false
        };

        BubbleRenderer.render(userPersona, text, container);

        resetInput();

        // Chance for admin to reply to question
        if (text.includes("?") || Math.random() < 0.2) { 
            setTimeout(() => {
                const admin = IdentityEngine.getPersona(postId, "admin");
                const response = generateAdminReply(text);
                BubbleRenderer.render(admin, response, container, { reply: true });
            }, randomAdminDelay());
        }
    }

    function resetInput() {
        input.value = "";
        toggleButtons();
        input.focus();
    }

    function bindMediaButtons() {
        if (emojiBtn) {
            emojiBtn.addEventListener("click", () => console.log("Emoji picker triggered"));
        }
        rightButtons.querySelectorAll(".tg-icon-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                console.log(`${btn.getAttribute("aria-label")} clicked`);
            });
        });
    }

    function generateAdminReply(userText) {
        // Simple Q&A logic; can expand later
        if (userText.toLowerCase().includes("buy") || userText.toLowerCase().includes("purchase")) {
            return "You can get the Abrox Bot here: https://abroxai.github.io/abrox-bot/";
        }
        if (userText.toLowerCase().includes("how") || userText.toLowerCase().includes("?")) {
            return "Check the guide pinned in the channel 👌";
        }
        return "Thanks for your comment!";
    }

    function randomAdminDelay() {
        return Math.floor(Math.random() * 5000) + 2000; // 2–7 seconds
    }

    return { init };

})();
