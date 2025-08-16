const SLIDESHOW_FOLDER = "Images/SlideShow/";
const FALLBACK_SECONDS = 5;   
const CROSSFADE_MS = 900;     

const SLIDESHOW_IMAGES = [
    "ss1.jpg",
    "ss2.jpg",
    "ss3.jpg",
    "ss4.jpg",
    "ss5.jpg",
    "ss6.jpg"
  ];

(function initSlideshow() {
  const root = document.querySelector(".slideshow");
  if (!root) return;

  const imgA = root.querySelector(".slide-a");
  const imgB = root.querySelector(".slide-b");
  const prevBtn = root.querySelector(".slide-ctrl.prev");
  const nextBtn = root.querySelector(".slide-ctrl.next");

  let files = [];
  let order = [];
  let idx = 0;
  let showingA = true;
  let timer = null;
  let seconds = FALLBACK_SECONDS;

  fetch(SLIDESHOW_FOLDER + "manifest.json", { cache: "no-store" })
    .then(r => (r.ok ? r.json() : SLIDESHOW_IMAGES))
    .catch(() => SLIDESHOW_IMAGES)
    .then(list => {
      files = (Array.isArray(list) && list.length ? list : SLIDESHOW_IMAGES).map(f => SLIDESHOW_FOLDER + f);
      if (!files.length) {
        console.warn("Slideshow: No images configured. Add files to SLIDESHOW_IMAGES or provide manifest.json.");
        return;
      }
     
      order = shuffle([...files]);
     
      preloadAll(order);
      showFirst();
      start();
    });

  function showFirst() {
    imgA.src = order[0];
    imgA.classList.add("is-visible");
    imgB.classList.remove("is-visible");
    idx = 1 % order.length;
  }

  function start() {
    stop();
    timer = setInterval(next, seconds * 1000);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function next() {
    fadeTo(order[idx]);
    idx = (idx + 1) % order.length;
  }

  function prev() {
    idx = (idx - 2 + order.length) % order.length; 
    next(); 
  }

  function fadeTo(url) {
    const incoming = showingA ? imgB : imgA;
    const outgoing = showingA ? imgA : imgB;

    incoming.src = url;
    void incoming.offsetWidth;

    incoming.classList.add("is-visible");
    outgoing.classList.remove("is-visible");

    showingA = !showingA;
  }

  
  prevBtn?.addEventListener("click", () => { stop(); prev(); start(); });
  nextBtn?.addEventListener("click", () => { stop(); next(); start(); });

 
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function preloadAll(urls) {
    urls.forEach(u => { const img = new Image(); img.src = u; });
  }
})();
