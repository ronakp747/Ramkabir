// =======================================
// NJ Bhagat Samaj — Daily Thoughts
// Hover the image to see English.
// Works with your existing HTML:
//   #quote, #author inside .daily-thought-text-overlay
// =======================================

// Curated Bhakti/Bhagat Samaj–aligned quotes
const DAILY_QUOTES = [
  // Kabir
  { quote: "जहाँ प्रेम, वहाँ भगवान।", author: "कबीर", lang: "hi", translation: "Where there is love, there is the Divine." },
  { quote: "माला फेरत जुग भया, मन न फिर्यो कोय; मन का मनका फेर दे, भजु हरि हरि हरि सोय।", author: "कबीर", lang: "hi", translation: "Turn the beads of the mind; only then does chanting transform you." },
  { quote: "बुरा जो देखन मैं चला, बुरा न मिलिया कोय; जो दिल खोजा आपना, मुझसे बुरा न कोय।", author: "कबीर", lang: "hi", translation: "I sought the bad in others, found none; in my own heart I found the worst." },
  { quote: "काल करे सो आज कर, आज करे सो अब।", author: "कबीर", lang: "hi", translation: "Do tomorrow’s work today; do today’s now." },
  { quote: "पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय; ढाई आखर ‘प्रेम’ का, पढ़े सो पंडित होय।", author: "कबीर", lang: "hi", translation: "Book-learning alone never made one wise; learn the two-and-a-half letters of love." },

  // Guru Ravidas
  { quote: "मन चंगा तो कठौती में गंगा।", author: "गुरु रविदास", lang: "hi", translation: "If the mind is pure, the Ganga flows even in a small bowl." },
  { quote: "जाति पाति पूछै नहिं कोई, हरि को भजै सो हरि का होई।", author: "गुरु रविदास", lang: "hi", translation: "Caste and rank don’t matter; one who loves the Lord belongs to the Lord." },

  // Narsinh Mehta (Gujarati)
  { quote: "વૈષ્ણવ જન તો તેને કહીએ, જે પીડ પરાઈ જાણે રે.", author: "નરસિંહ મહેતા", lang: "gu", translation: "A true devotee is one who understands the pain of others." },
  { quote: "જેને માનસે, વાણી ને ક્રીયા—તનમન રહેછે નિરમોહ.", author: "નરસિંહ મહેતા", lang: "gu", translation: "Steady is the one whose mind, speech and actions are free of attachment." },

  // Meera Bai
  { quote: "मेरे तो गिरधर गोपाल, दूसरो न कोई।", author: "मीरा", lang: "hi", translation: "For me there is only Giridhar Gopal; none other." },
  { quote: "मीरा के प्रभु गिरिधर नागर, सरल सुभाव सदा सहायक।", author: "मीरा", lang: "hi", translation: "Meera’s Lord, Giridhar, is simple and ever supportive." },

  // Tulsidas
  { quote: "परहित सरिस धरम नहीं भाई, पर पीड़ा सम नहिं अधमाई।", author: "तुलसीदास", lang: "hi", translation: "No duty is higher than serving others; no sin worse than causing their pain." },
  { quote: "धैर्य, धर्म, मित्र, अरु नारी—आपद काल परखिए चारी।", author: "तुलसीदास", lang: "hi", translation: "In adversity, test your patience, faith, friends, and family." },

  // Gandhi (Bhakti/Seva spirit)
  { quote: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi", lang: "en", translation: "The best way to find yourself is to lose yourself in the service of others." },
  { quote: "वह बदलाव बनिए जो आप दुनिया में देखना चाहते हैं।", author: "महात्मा गांधी", lang: "hi", translation: "Be the change you wish to see in the world." },

  // Surdas
  { quote: "जितने हरि रंग मेरे मन लागा, तितने जग से भाग।", author: "सूरदास", lang: "hi", translation: "The more my heart colors in Hari’s love, the less it runs after the world." },

  // Community sayings
  { quote: "भक्ति बिना न होइ शान्ति।", author: "भक्ति परंपरा", lang: "hi", translation: "Without devotion, there is no peace." },
  { quote: "करुणा का दीप जलाओ, सेवा से जग उजियारा।", author: "समाज वचन", lang: "hi", translation: "Light the lamp of compassion; let service brighten the world." },
  { quote: "Unity in devotion, strength in service.", author: "Community Saying", lang: "en", translation: "Unity in devotion, strength in service." }
];

// ------- Timezone + stable daily picker -------
function nowInTimeZone(tz) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).formatToParts(new Date());
  const get = (t) => parts.find(p => p.type === t)?.value;
  return new Date(`${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`);
}

function hashString(str) {
  let h = 2166136261; // FNV-1a base
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

function pickTodaysQuote(quotes, tz = 'America/New_York') {
  if (!Array.isArray(quotes) || quotes.length === 0) {
    return { quote: "Serve all beings with love.", author: "Community Saying", lang: "en", translation: "Serve all beings with love." };
  }
  const d = nowInTimeZone(tz);
  const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const idx = hashString(key) % quotes.length;
  return quotes[idx];
}

// ------- Rendering + hover swap (no HTML changes) -------
function setText({ nativeQuote, nativeAuthor, englishQuote }) {
  const quoteEl = document.getElementById('quote');
  const authorEl = document.getElementById('author');

  if (!quoteEl || !authorEl) return;

  // Soft fade-out, swap, fade-in
  quoteEl.classList.add('fading');
  authorEl.classList.add('fading');

  // After a tick, replace content and fade back in
  setTimeout(() => {
    quoteEl.textContent = nativeQuote ? `“${nativeQuote}”` : "";
    authorEl.textContent = nativeAuthor ? `– ${nativeAuthor}` : "";

    quoteEl.classList.remove('fading');
    authorEl.classList.remove('fading');

    // Save English text on the element dataset for quick swap on hover
    quoteEl.dataset.en = englishQuote || nativeQuote || "";
    authorEl.dataset.en = nativeAuthor || "";
  }, 160); // matches CSS fade timing
}

function renderDailyThought() {
  const t = pickTodaysQuote(DAILY_QUOTES);
  const englishText = t.translation || t.quote || "";

  setText({
    nativeQuote: t.quote,
    nativeAuthor: t.author,
    englishQuote: englishText
  });

  // Attach one-time hover listeners to swap text
  const box = document.querySelector('.daily-thought-box');
  const quoteEl = document.getElementById('quote');
  const authorEl = document.getElementById('author');
  if (box && quoteEl && authorEl && !box.__hoverBound) {
    box.__hoverBound = true;

    box.addEventListener('mouseenter', () => {
      quoteEl.classList.add('fading');
      authorEl.classList.add('fading');
      setTimeout(() => {
        quoteEl.textContent = `“${quoteEl.dataset.en || ""}”`;
        authorEl.textContent = authorEl.dataset.en ? `– ${authorEl.dataset.en}` : "";
        quoteEl.classList.remove('fading');
        authorEl.classList.remove('fading');
      }, 120);
    });

    box.addEventListener('mouseleave', () => {
      // revert to native
      renderDailyThought(); // re-runs setText with native; stable for the day
    }, { passive: true });
  }
}

// Update at local midnight so the quote changes automatically
function scheduleNextMidnightUpdate(tz = 'America/New_York') {
  const d = nowInTimeZone(tz);
  const next = new Date(d);
  next.setHours(24, 0, 0, 0);
  const ms = next - d;
  setTimeout(() => {
    renderDailyThought();
    scheduleNextMidnightUpdate(tz);
  }, ms);
}

document.addEventListener('DOMContentLoaded', () => {
  renderDailyThought();
  scheduleNextMidnightUpdate();
});
