const dailyQuotes = [
  // Kabir
  { quote: `जहाँ प्रेम, वहाँ भगवान।`, author: `कबीर` },
  { quote: `माला फेरत जुग भया, मन न फिर्यो कोय; मन का मनका फेर दे, भजु हरि हरि हरि सोय।`, author: `कबीर` },
  { quote: `बुरा जो देखन मैं चला, बुरा न मिलिया कोय; जो दिल खोजा आपना, मुझसे बुरा न कोय।`, author: `कबीर` },
  { quote: `काल करे सो आज कर, आज करे सो अब।`, author: `कबीर` },
  { quote: `पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय; ढाई आखर ‘प्रेम’ का, पढ़े सो पंडित होय।`, author: `कबीर` },

  // Guru Ravidas
  { quote: `मन चंगा तो कठौती में गंगा।`, author: `गुरु रविदास` },
  { quote: `जाति पाति पूछै नहिं कोई, हरि को भजै सो हरि का होई।`, author: `गुरु रविदास` },

  // Narsinh Mehta (Gujarati)
  { quote: `વૈષ્ણવ જન તો તેને કહીએ, જે પીડ પરાઈ જાણે રે.`, author: `નરસિંહ મહેતા` },
  { quote: `જેને માનસે વાણી ને ક્રીયા, તનમન રહેછે નિરમોહ.`, author: `નરસિંહ મહેતા` },

  // Meera Bai
  { quote: `मेरे तो गिरधर गोपाल, दूसरो न कोई।`, author: `मीरा` },
  { quote: `मीरा के प्रभु गिरिधर नागर, सरल सुभाव सदा सहायक।`, author: `मीरा` },

  // Tulsidas
  { quote: `परहित सरिस धरम नहीं भाई, पर पीड़ा सम नहिं अधमाई।`, author: `तुलसीदास` },
  { quote: `धैर्य, धर्म, मित्र, अरु नारी—आपद काल परखिए चारी।`, author: `तुलसीदास` },

  // Mahatma Gandhi
  { quote: `The best way to find yourself is to lose yourself in the service of others.`, author: `Mahatma Gandhi` },
  { quote: `वह बदलाव बनिए जो आप दुनिया में देखना चाहते हैं।`, author: `महात्मा गांधी` },

  // Surdas
  { quote: `सूरदास यह जग अंधियारा, दीपक देजु कोय।`, author: `सूरदास` },
  { quote: `जितने हरि रंग मेरे मन लागा, तितने जग से भाग।`, author: `सूरदास` },

  // Bhakti / Community Sayings
  { quote: `भक्ति बिना न होइ शान्ति।`, author: `भक्ति परंपरा` },
  { quote: `राम नाम रस पीजै, मन में बसे सुजान।`, author: `भक्ति परंपरा` },
  { quote: `करुणा का दीप जलाओ, सेवा से जग उजियारा।`, author: `समाज वचन` },
  { quote: `सद्भाव और सत्य—समाज की दो आँखें।`, author: `समाज वचन` },
  { quote: `Serve, smile, and uplift.`, author: `Community Saying` },
  { quote: `Unity in devotion, strength in service.`, author: `Community Saying` },
  { quote: `Traditions live when we share them with love.`, author: `Community Saying` }
];

  
  function updateDailyThought() {
    const now = new Date();
    const startDate = new Date(1970, 0, 1);
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const index = diffDays % dailyQuotes.length;
    const dailyThought = dailyQuotes[index];
  
    document.getElementById("quote").textContent = `"${dailyThought.quote}"`;
    document.getElementById("author").textContent = `– ${dailyThought.author}`;
  }
  

  document.addEventListener("DOMContentLoaded", updateDailyThought);
  