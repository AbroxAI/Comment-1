// personas.js
// -----------------------------
// Synthetic personas pool with realism
// -----------------------------

const Personas = (() => {

    // Fixed admin persona
    const admin = {
        name: "Profit Hunter 🌐",
        avatar: "static/admin.jpg", // your fixed admin avatar
        isAdmin: true
    };

    // Avatar sources for variety
    const AVATAR_SOURCES = [
        "https://i.pravatar.cc/150?img=",
        "https://api.dicebear.com/6.x/avataaars/svg?seed=",
        "https://api.multiavatar.com/"
    ];

    // Name pool (mixed genders, global, emojis, typos)
    const NAME_POOL = [
        "Alice 🌸","Bob","Charlie 😎","Diana","Eve 💰","Frank","Gina 🐱",
        "Harry","Ivy 🍀","Jack","Liam","Mia","Noah","Olivia","Sophia","Lucas","Emma","Max","Zoe","Leo"
    ];

    // Generate synthetic persona with unique avatar per post
    function generateSyntheticPersona(postId, usedPersonas) {
        let name, avatar;

        do {
            name = NAME_POOL[Math.floor(Math.random() * NAME_POOL.length)];

            // Add random suffix for realism
            const suffixes = ["", " 💸", " 🌟", "🔥", "💯", "✨", "💀", "😎"];
            name += suffixes[Math.floor(Math.random() * suffixes.length)];

            // Random avatar source
            const src = AVATAR_SOURCES[Math.floor(Math.random() * AVATAR_SOURCES.length)];
            avatar = src + Math.floor(Math.random() * 1000);

        } while (usedPersonas.has(name + avatar)); // avoid duplicates

        usedPersonas.add(name + avatar);

        return { name, avatar, isAdmin: false };
    }

    return {
        admin,
        generateSyntheticPersona
    };

})();
