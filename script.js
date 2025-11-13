/* Shared interactive behaviors for the 3-page surprise */

/* ====== INDEX PAGE (KitKat tap) ====== */
setTimeout(function() {
  document.querySelector(".kitkat-overlay").classList.add("show");
}, 3000); // delay before showing overlay

(function(){
  const kitkatOverlay = document.getElementById('kitkatOverlay');
  if(kitkatOverlay){
    // clicking anywhere will animate then navigate to cake.html
    function goToCake(){
      kitkatOverlay.classList.add('kitkat-fade');
      setTimeout(()=> location.href = 'cake.html', 650);
    }
    kitkatOverlay.addEventListener('click', goToCake);
    kitkatOverlay.addEventListener('keydown', (e)=>{ 
      if(e.key === 'Enter' || e.key === ' ') goToCake(); 
    });
  }
})();

/* ====== CAKE PAGE (candles & floating backgrounds) ====== */
(function(){
  const page = document.querySelector('.cake-page');
  if(!page) return;

  const numCandles = 20;
  const candleContainer = document.getElementById('candles');
  const openLetterBtn = document.getElementById('openLetterBtn');

  // Messages for each candle
  const candleMessages = [
    "for Your smile 💖",
    "Your laughter 🎶",
    "Your kindness 🌸",
    "Your strength 💪",
    "Your curiosity 🧐",
    "Your warmth ☀️",
    "Your  sweetness😍",
    "Your sincerity 💫",
    "Your courage 🦋",
    "Your adventures 🌍",
    "The way you listen 👂",
    "Your generosity 💝",
    "Your honesty 💬",
    "Your style ✨",
    "Your determination 🌟",
    "Your bright ideas 💡",
    "Your patience 🌼",
    "A future of joy 💞",
    "The light you bring 🔥",
    "lastly happiest 20th biryhday🎂💖"
  ];

  while(candleMessages.length < numCandles) candleMessages.push('A little joy');

  // Build candles dynamically
  function buildCandles(){
    candleContainer.innerHTML = '';
    for(let i=0;i<numCandles;i++){
      const c = document.createElement('div');
      c.className = 'candle';
      c.dataset.index = i;

      const top = document.createElement('div'); 
      top.className = 'candle-top';
      const flame = document.createElement('div'); 
      flame.className = 'flame';

      // message bubble above each candle
      const msg = document.createElement('div');
      msg.className = 'candle-msg';
      msg.textContent = candleMessages[i];

      c.appendChild(top);
      c.appendChild(flame);
      c.appendChild(msg);
      candleContainer.appendChild(c);
    }
  }

  buildCandles();

  let litCount = 0;
  function lightNext(){
    if(litCount >= numCandles) {
      // all candles lit
      openLetterBtn.hidden = false;
      return;
    }
    const candle = candleContainer.children[litCount];
    const flame = candle.querySelector('.flame');
    const msg = candle.querySelector('.candle-msg');

    // light with short delay
    setTimeout(()=>{
      flame.classList.add('on');
      msg.classList.add('show');
      litCount++;
      // remove message bubble after few seconds
      setTimeout(()=> msg.classList.remove('show'), 3500);
      // light next one
      setTimeout(lightNext, 500);
    }, 320);
  }

  const cakeWrap = document.getElementById('cakeWrap');
  cakeWrap.addEventListener('click', ()=>{
    if(litCount === 0){
      lightNext();
    } else if(litCount < numCandles){
      lightNext();
    } else {
      openLetterBtn.hidden = false;
    }
  });

  // Floating emojis
  const floatContainer = document.getElementById('floatContainer');
  const floatItems = ['❤️','🍫','🍦','🍩','🍭','💖'];
  function spawnFloat(){
    const el = document.createElement('div');
    el.className = 'float-item';
    el.innerText = floatItems[Math.floor(Math.random()*floatItems.length)];
    const left = Math.random()*100;
    el.style.left = left + 'vw';
    el.style.top = (90 + Math.random()*10) + 'vh';
    const duration = 6 + Math.random()*8;
    el.style.animationDuration = duration + 's';
    el.style.setProperty('--x', (Math.random()*80-40).toFixed(0) + 'px');
    el.style.fontSize = (18 + Math.random()*26) + 'px';
    floatContainer.appendChild(el);
    setTimeout(()=> el.remove(), duration*1000 + 200);
  }
  const floatInterval = setInterval(spawnFloat, 600);
  for(let i=0;i<8;i++) setTimeout(spawnFloat, i*150);

  openLetterBtn.addEventListener('click', ()=> location.href = 'letter.html');
  window.addEventListener('beforeunload', ()=> clearInterval(floatInterval));
})();

/* ====== Keyboard support ====== */
(function(){
  document.addEventListener('keypress', (e)=>{
    const cake = document.querySelector('.cake-wrap');
    if(!cake) return;
    if(e.key === 'Enter' || e.key === ' ') cake.click();
  });
})();
setTimeout(function () {
  document.getElementById("openLetterBtn").style.display = "block";
}, 7000);
