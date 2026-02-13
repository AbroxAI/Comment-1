// personas.js
// ----------------------------------
// Defines synthetic and admin personas for realism
// ----------------------------------

const Personas = (() => {

    // Fixed Admin Persona
    const admin = {
        name: "Profit Hunter 🌐",
        avatar: "static/admin.jpg", // use your fixed admin image
        isAdmin: true
    };

    // Synthetic persona pool (diverse)
    const syntheticPool = [
        { name: "Alice 🌸", avatar: "static/avatars/avatar1.png", isAdmin: false },
        { name: "bob", avatar: "static/avatars/avatar2.png", isAdmin: false },
        { name: "Charlie 😎", avatar: "static/avatars/avatar3.png", isAdmin: false },
        { name: "Diana", avatar: "static/avatars/avatar4.png", isAdmin: false },
        { name: "Eve 💰", avatar: "static/avatars/avatar5.png", isAdmin: false },
        { name: "Frank", avatar: "static/avatars/avatar6.png", isAdmin: false },
        { name: "Gina 🐱", avatar: "static/avatars/avatar7.png", isAdmin: false },
        { name: "Harry", avatar: "static/avatars/avatar8.png", isAdmin: false },
        { name: "Ivy 🍀", avatar: "static/avatars/avatar9.png", isAdmin: false },
        { name: "Jack", avatar: "static/avatars/avatar10.png", isAdmin: false },
        // Expand as needed for realism (1000+ recommended)
    ];

    // Random persona generator
    function getRandom() {
        // 1% chance to pick admin
        if (Math.random() < 0.01) return admin;

        // Pick random synthetic persona
        const idx = Math.floor(Math.random() * syntheticPool.length);
        return syntheticPool[idx];
    }

    return {
        admin,
        getRandom,
        pool: syntheticPool
    };
})();
