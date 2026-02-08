(() => {
    const state = {
      on: true,
      interval: null,
    };
  
    function spawnPetal() {
      if (!state.on) return;
  
      const p = document.createElement("div");
      p.className = "petal";
  
      const x = Math.random() * window.innerWidth;
      const dx = (Math.random() * 160 - 80) + "px";
      const dur = (Math.random() * 3.2 + 4.4) + "s";
      const size = (Math.random() * 10 + 10) + "px";
      const opacity = (Math.random() * 0.35 + 0.45).toFixed(2);
  
      p.style.left = x + "px";
      p.style.top = "-20px";
      p.style.setProperty("--dx", dx);
      p.style.animationDuration = dur;
      p.style.width = size;
      p.style.height = size;
      p.style.opacity = opacity;
  
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 8500);
    }
  
    const style = document.createElement("style");
    style.textContent = `
      .petal{
        position:fixed;
        width:14px; height:14px;
        background: radial-gradient(circle at 30% 30%, rgba(255,122,162,.95), rgba(255,59,106,.95));
        border-radius: 2px 12px 12px 12px;
        transform: rotate(25deg);
        pointer-events:none;
        filter: blur(.1px);
        animation: fall linear forwards;
        z-index: 3;
      }
      @keyframes fall{
        to{
          transform: translate3d(var(--dx), 110vh, 0) rotate(220deg);
        }
      }
    `;
    document.head.appendChild(style);
  
    state.interval = setInterval(spawnPetal, 210);
  
    window.PETALS = {
      get on() { return state.on; },
      set(on) { state.on = !!on; },
      burst(n = 18) {
        for (let i = 0; i < n; i++) setTimeout(spawnPetal, i * 28);
      }
    };
  })();
  