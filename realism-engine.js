// realism-engine-v11.js
// ============================================================
// ULTRA-REALISM ENGINE V11
// FULLY HUMAN-LIKE ABROX BINARY OPTIONS COMMUNITY
// TESTIMONIALS, RESULTS, CHAT, TYPOS, MIXED EMOJIS, ENDLESS
// ============================================================

const GENERATED_TEXTS_V11 = new Set();
const LONG_TERM_POOL_V11 = [];

const ASSETS = ["EUR/USD","USD/JPY","GBP/USD","AUD/USD","BTC/USD","ETH/USD","USD/CHF","EUR/JPY","NZD/USD","US30","NAS100"];
const BROKERS = ["IQ Option","Binomo","Pocket Option","Deriv","Olymp Trade"];
const TIMEFRAMES = ["M1","M5","M15","M30","H1","H4"];
const RESULT_WORDS = [
    "green","red","profit","loss","win","missed entry","recovered","swing trade success","scalped nicely",
    "small win","big win","moderate loss","loss recovered","double profit","consistent profit","partial win",
    "micro win","entry late but profitable","stopped loss","hedged correctly","full green streak","partial loss"
];
const TESTIMONIALS = [
    "Made $450 in 2 hours using Abrox",
    "Closed 3 trades, all green today ✅",
    "Recovered a losing trade thanks to Abrox",
    "7 days straight of consistent profit 💹",
    "Abrox saved me from a $200 loss",
    "50% ROI in a single trading session 🚀",
    "Signal timing was perfect today",
    "Never had such accurate entries before",
    "My manual losses turned into profits using Abrox",
    "Day trading USD/JPY with this bot has been a game-changer",
    "Abrox alerts helped me scalp nicely this morning ✨",
    "Recovered yesterday’s loss in one trade",
    "Made $120 in micro trades this session",
    "Entry was late but still profitable 💹",
    "Hedged correctly thanks to bot signals",
    "Altcoin signals were on point today",
    "This bot reduces stress, makes trading predictable 😌",
    "Small wins add up over time, Abrox is legit",
    "Profitable even on low volume days",
    "Consistency over randomness, love it! ❤️",
    "Scalped 5 trades successfully today 🚀",
    "Stopped losing streak thanks to Abrox 🙏",
    "Abrox helped me avoid a $150 loss",
    "Signals were accurate 4/5 trades today",
    "Big green on EUR/USD thanks to bot 💰",
    "My trading confidence increased a lot",
    "Made $300 in under 3 hours",
    "Bot suggested perfect exit on USD/JPY",
    "Recovered losses from yesterday in one trade",
    "Abrox alerts saved me from market volatility 🌊",
    "Entry timing for BTC/USD was perfect",
    "Day trading made predictable thanks to Abrox",
    "Partial loss turned into full profit",
    "Consistent signals for 7 days straight",
    "Small green wins every session 💸",
    "Never manually traded this effectively before",
    "Abrox simplified scalping for me",
    "Profit on NAS100 was surprisingly easy",
    "Hedging strategy recommended worked perfectly",
    "My portfolio stayed in green today",
    "Accuracy is insane, never missed an entry",
    "Recovering losses has never been easier",
    "Macro and micro trades balanced perfectly",
    "Scalping signals were super fast and accurate",
    "This bot makes trading almost automatic",
    "All my trades were profitable today",
    "Abrox reduced stress during volatile sessions"
];

// ======== Generate a single trading comment ========
function generateTradingCommentV11() {
    const persona = getRandomPersona();

    const templates = [
        () => `Guys, ${random(TESTIMONIALS)}`,
        () => `Anyone trading ${random(ASSETS)} on ${random(BROKERS)}?`,
        () => `Signal for ${random(ASSETS)} ${random(TIMEFRAMES)} is ${random(RESULT_WORDS)}`,
        () => `Abrox bot is insane, ${random(TESTIMONIALS)}`,
        () => `Waiting for ${random(ASSETS)} news impact`,
        () => `Did anyone catch ${random(ASSETS)} reversal?`,
        () => `${random(SLANG[getRandomPersona().region]||[])} ${random(TESTIMONIALS)}`,
        () => `FOMOing or waiting for pullback on ${random(ASSETS)}?`,
        () => `My last trade on ${random(ASSETS)} was ${random(RESULT_WORDS)}`,
        () => `Scalped ${random(ASSETS)} on ${random(BROKERS)}, result ${random(RESULT_WORDS)}`,
        () => `Testimonial: ${random(TESTIMONIALS)}`,
        () => `Entry timing ${random(RESULT_WORDS)}, bot performed well`
    ];

    let text = random(templates)();

    // Add 1–5 regional slang words
    if (maybe(0.75)) {
        const slangCount = rand(5)+1;
        const slangWords = [];
        for(let i=0;i<slangCount;i++) slangWords.push(random(SLANG[persona.region]||[]));
        text = slangWords.join(" ") + " " + text;
    }

    // Realistic typos
    if (maybe(0.65)) {
        text = text.replace(/\w{4,}/g, word => {
            if (maybe(0.5)) {
                const i = rand(word.length-1);
                return word.substring(0,i)+word[i+1]+word[i]+word.substring(i+2);
            } else if (maybe(0.3)) {
                const i = rand(word.length);
                return word.substring(0,i)+word.substring(i+1);
            }
            return word;
        });
    }

    // Optional emojis (mixed naturally)
    if (maybe(0.55)) {
        const emojiCount = rand(4);
        for(let i=0;i<emojiCount;i++) text += " " + random(EMOJIS);
    }

    // Avoid duplicates globally
    let attempts = 0;
    while(GENERATED_TEXTS_V11.has(text) && attempts < 30) {
        text += " " + rand(999);
        attempts++;
    }
    GENERATED_TEXTS_V11.add(text);

    return { persona, text, timestamp: generateTimestamp() };
}

// ======== Auto-refill pool dynamically ========
function ensurePoolV11(minSize=100) {
    while(LONG_TERM_POOL_V11.length < minSize) {
        const comment = generateTradingCommentV11();
        LONG_TERM_POOL_V11.push(comment);
    }
}

// ======== Post from pool ========
function postFromPoolV11(count=1) {
    ensurePoolV11(count);
    for(let i=0;i<count;i++) {
        const item = LONG_TERM_POOL_V11.shift();
        renderBubble(item.persona, item.text, item.timestamp, false);
    }
}

// ======== Trigger reactions ========
function triggerTrendingReactionV11(baseText) {
    if(!baseText) return;
    const repliesCount = rand(5)+1;
    for(let i=0;i<repliesCount;i++) {
        setTimeout(()=>{
            const comment = generateTradingCommentV11();
            const postId = baseText;
            if(!isDuplicate(postId, comment.text)) renderBubble(comment.persona, comment.text, comment.timestamp, false);
        }, 700*(i+1)+rand(500));
    }
}

// ======== Continuous random chatter ========
function simulateRandomCrowdV11(interval=8000) {
    setInterval(()=>{
        postFromPoolV11(1);
    }, interval + rand(20000));
}

// ======== Expose globally ========
window.postFromPoolV11 = postFromPoolV11;
window.triggerTrendingReactionV11 = triggerTrendingReactionV11;
window.simulateRandomCrowdV11 = simulateRandomCrowdV11;

// ======== Auto-fill on load ========
postFromPoolV11(50); // Post first 50 immediately
simulateRandomCrowdV11();
