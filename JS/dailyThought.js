// const dailyQuotes = [
  //  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  //  { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  //  { quote: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
   // { quote: "Do not watch the clock. Do what it does. Keep going.", author: "Sam Levenson" },
   // { quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
   // { quote: "The greatest wealth is to live content with little.", author: "Plato" }
  // ];
const dailyQuotes = [
  { quote: "सद्गुरु संदेशों मोकले  कचा बचा सब आव नाम चिंतामणि जीवणा जो भावे सौ पाव", author: "जीवणजी महाराज" }

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
  