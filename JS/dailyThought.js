const dailyQuotes = [
  // Kabir
  { quote: "जहाँ प्रेम, वहाँ भगवान।", author: "कबीर", translation: "Where there is love, there is the Divine.", authorEn: "Kabir" },
  { quote: "माला फेरत जुग भया, मन न फिर्यो कोय; मन का मनका फेर दे, भजु हरि हरि हरि सोय।", author: "कबीर", translation: "Turn the beads of the mind; only then does chanting transform you.", authorEn: "Kabir" },
  { quote: "बुरा जो देखन मैं चला, बुरा न मिलिया कोय; जो दिल खोजा आपना, मुझसे बुरा न कोय।", author: "קबीर", translation: "I sought the bad in others, found none; in my own heart I found the worst.", authorEn: "Kabir" },
  { quote: "काल करे सो आज कर, आज करे सो अब।", author: "कबीर", translation: "Do tomorrow’s work today; do today’s now.", authorEn: "Kabir" },
  { quote: "पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय; ढाई आखर ‘प्रेम’ का, पढ़े सो पंडित होय।", author: "कबीर", translation: "Book-learning alone never made one wise; learn the two-and-a-half letters of love.", authorEn: "Kabir" },

  // Guru Ravidas
  { quote: "मन चंगा तो कठौती में गंगा।", author: "गुरु रविदास", translation: "If the mind is pure, the Ganga flows even in a small bowl.", authorEn: "Guru Ravidas" },
  { quote: "जाति पाति पूछै नहिं कोई, हरि को भजै सो हरि का होई।", author: "गुरु रविदास", translation: "Caste and rank don’t matter; one who loves the Lord belongs to the Lord.", authorEn: "Guru Ravidas" },

  
  // Meera Bai
  { quote: "मेरे तो गिरधर गोपाल, दूसरो न कोई।", author: "मीरा", translation: "For me there is only Giridhar Gopal; none other.", authorEn: "Meera Bai" },
  { quote: "मीरा के प्रभु गिरिधर नागर, सरल सुभाव सदा सहायक।", author: "मीरा", translation: "Meera’s Lord, Giridhar, is simple and ever supportive.", authorEn: "Meera Bai" },

  // Tulsidas
  { quote: "परहित सरिस धरम नहीं भाई, पर पीड़ा सम नहिं अधमाई।", author: "तुलसीदास", translation: "No duty is higher than serving others; no sin worse than causing their pain.", authorEn: "Tulsidas" },
  { quote: "धैर्य, धर्म, मित्र, अरु नारी—आपद काल परखिए चारी।", author: "तुलसीदास", translation: "In adversity, test your patience, faith, friends, and family.", authorEn: "Tulsidas" },

  // Mahatma Gandhi
  { quote: "वह बदलाव बनिए जो आप दुनिया में देखना चाहते हैं।", author: "महात्मा गांधी", translation: "Be the change you wish to see in the world.", authorEn: "Mahatma Gandhi" },

  // Surdas
  { quote: "सूरदास यह जग अंधियारा, दीपक देजु कोय।", author: "सूरदास", translation: "This world is dark—let someone offer a lamp.", authorEn: "Surdas" },
  { quote: "जितने हरि रंग मेरे मन लागा, तितने जग से भाग।", author: "सूरदास", translation: "The more my heart colors in Hari’s love, the less it runs after the world.", authorEn: "Surdas" },

  // Community/Bhakti sayings
  { quote: "भक्ति बिना न होइ शान्ति।", author: "भक्ति परंपरा", translation: "Without devotion, there is no peace.", authorEn: "Bhakti Tradition" },
  { quote: "राम नाम रस पीजै, मन में बसे सुजान।", author: "भक्ति परंपरा", translation: "Drink the nectar of the Divine Name; let wisdom dwell in your heart.", authorEn: "Bhakti Tradition" },
  { quote: "करुणा का दीप जलाओ, सेवा से जग उजियारा।", author: "समाज वचन", translation: "Light the lamp of compassion; let service brighten the world.", authorEn: "Community Saying" },
  { quote: "सद्भाव और सत्य—समाज की दो आँखें।", author: "समाज वचन", translation: "Goodwill and truth are the two eyes of a community.", authorEn: "Community Saying" },
  ];

function updateDailyThought() {
  // your existing day-index logic
  const now = new Date();
  const startDate = new Date(1970, 0, 1);
  const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  const index = diffDays % dailyQuotes.length;
  const dailyThought = dailyQuotes[index];

  const quoteEl = document.getElementById("quote");
  const authorEl = document.getElementById("author");

  if (!quoteEl || !authorEl) return;

  // Set native text initially
  quoteEl.textContent = `“${dailyThought.quote}”`;
  authorEl.textContent = `– ${dailyThought.author}`;

  // Stash both versions for quick swap
  quoteEl.dataset.native = `“${dailyThought.quote}”`;
  quoteEl.dataset.en = `“${dailyThought.translation || dailyThought.quote}”`;

  authorEl.dataset.native = `– ${dailyThought.author}`;
  authorEl.dataset.en = `– ${dailyThought.authorEn || dailyThought.author}`;

  // Helper to fade nicely (works with your CSS .fading class if present)
  const fadeSwap = (el, text) => {
    el.classList.add('fading');
    setTimeout(() => {
      el.textContent = text;
      el.classList.remove('fading');
    }, 120);
  };

  // Hover over the WORDS to translate
  const overlay = document.querySelector('.daily-thought-text-overlay') || quoteEl.parentElement;

  if (overlay && !overlay.__boundTranslateHover) {
    overlay.__boundTranslateHover = true;

    overlay.addEventListener('mouseenter', () => {
      fadeSwap(quoteEl, quoteEl.dataset.en);
      fadeSwap(authorEl, authorEl.dataset.en);
    });

    overlay.addEventListener('mouseleave', () => {
      fadeSwap(quoteEl, quoteEl.dataset.native);
      fadeSwap(authorEl, authorEl.dataset.native);
    });
  }
}

document.addEventListener("DOMContentLoaded", updateDailyThought);
