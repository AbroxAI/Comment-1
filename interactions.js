// interactions.js
// -----------------------------
// Handles real user input + media/send toggle
// Modular: works with BubbleRenderer and RealismEngine
// -----------------------------

const Interactions = (() => {

    let container;
    let input;
    let sendBtn;
    let rightButtons;
    let emojiBtn;
    let postId;

    function init(config) {
        container = config.container;
        input = config.input;
        sendBtn = config.sendBtn;
        rightButtons = config.rightButtons;
        emojiBtn = config.emojiBtn;
        postId = config.postId; // link to current post

        if (!container || !input || !sendBtn || !rightButtons) {
            console.warn("Interactions not initialized properly.");
            return;
        }

        bindInputToggle();
        bindSendBehavior();
        bindMediaButtons();
    }

    // Toggle between media buttons and send
    function bindInputToggle() {
        input.addEventListener("input", toggleButtons);
        toggleButtons(); // initial state
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

    // Handle sending messages
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

        // Real user persona
        const userPersona = {
            name: "You",
            avatar: "static/real-user.png",
            isAdmin: false
        };

        BubbleRenderer.render(userPersona, text, container);

        // Optionally, trigger admin reply if question detected
        if (/(\?|\bhow\b|\bwhat\b|\bwhen\b)/i.test(text)) {
            setTimeout(() => {
                const admin = IdentityEngine.getPersona(postId, "admin");
                BubbleRenderer.render(admin, "Thanks for your question! Let me clarify 👀", container, { reply: true });
            }, 1500 + Math.random() * 2000); // random delay 1.5–3.5s
        }

        resetInput();
    }

    function resetInput() {
        input.value = "";
        toggleButtons();
        input.focus();
    }

    // Media + emoji buttons (stubbed)
    function bindMediaButtons() {

        if (emojiBtn) {
            emojiBtn.addEventListener("click", () => {
                console.log("Emoji picker triggered");
            });
        }

        rightButtons.querySelectorAll(".tg-icon-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                console.log(`${btn.getAttribute("aria-label")} clicked`);
            });
        });
    }

    return { init };

})();
