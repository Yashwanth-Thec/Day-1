// ====== PERSONALIZE HERE ======
const DATA = {
    herName: "My Sneha Baby",
    heroNote:
      "Bangaram I know this isn't much but I wanted our first rose day together to be remebered for the awesome human being your are. So here’s a page that’s yours.",
    longNote:
      "Bangaram today is Rose Day, I know I haven't given you any roses till now. But I wanted to give you something that doesn't fade to represent my ever lasting love for you. Because in my eyes there no one else that is as beautiful as you, No one else that is as sweet as you, No one else that brightens up my life like you. Infront of your beauty even an entire Island of roses stands no chance. Thank you bangaram, Thank you for existing, Thank you for being who you are. I am soooo sooo proud of you my baby you are genuienly the sweetest most amazing person to ever exist. And to be called yours brings me the most joy in this universe. For you I would spend a whole lifetime gathering roses to show your beauty but that would still not be enough.",
    revealText:
      "If I could, I’d hand you a real rose right now. Until then this page is my way of saying: <b>I love you more than anything words can carry.</b> 🌹❤️ <br/><br/> <b>Question:</b> I know I have asked you this in last webiste too but will you be my Valentine bangaramm?",
    reasons: [
      { title: "Your smile", sub: "It fixes my mood instantly, it brightens up my entire day. Even a small glimpse is enough to make the worst day possible feel soo heavely." },
      { title: "Your eyes", sub: "They have this special power to them. When ever you smile its not just your lips and teeth smiling it your eyes too. And they this ever so captivating sparkel to them. I could get lost looking at them for my entire life." },
      { title: "Your heart", sub: "It is the most beautiful this in this entrie universe. They way you care for me makes me feel soo special and soo loved like never before. You make me feel like I am the luckiest guy in this entire universe." },
      { title: "You feel like home", sub: "Even in chaos, you calm me. You are my suport system. You make me feel like just falling into your arms and spending my whole life there knowing that I am safe with you." },
    ],
    gallery: [
      { src: "Eyes.jpg", caption: "In this photo I remeber you making me put my hands behind my head so that I don't take a photo and We both leaned into the screen coming closer and closer to the camera. I just felt sooo close to you and just felt like if I lean in a bit more I could just give you a kiss. " },
      { src: "Hair.jpg", caption: "This moment you were trying to immitate and mock me for me always touching my hair. I love this photo soooo much cuz the way you look at me and the way your smile is painted onto your face and just everything about you is just soo sooo unimaginably beautiful bangarm." },
      { src: "shop.jpg", caption: "I remeber this day you were tired and got boba and were trying to study in the boba shop and I was doing all types of faces and you were trying to block my face from your side so that other don't see. And after that you started writing and displaying such cuteeeee messages on the screen and it just melted my heart to see you put soo much effort for me even though you were so tried baby." },
    ]
  };
  // ==============================
  
  const $ = (id) => document.getElementById(id);
  
  // Safe event binder (prevents crashes)
  function on(id, event, handler) {
    const el = $(id);
    if (!el) {
      console.warn(`Missing element: #${id}`);
      return;
    }
    el.addEventListener(event, handler);
  }
  
  // Safe setter
  function setText(id, text) {
    const el = $(id);
    if (!el) return console.warn(`Missing element: #${id}`);
    el.textContent = text;
  }
  function setHTML(id, html) {
    const el = $(id);
    if (!el) return console.warn(`Missing element: #${id}`);
    el.innerHTML = html;
  }
  
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  
  function renderReasons() {
    const wrap = $("reasonsList");
    if (!wrap) return console.warn(`Missing element: #reasonsList`);
  
    wrap.innerHTML = "";
    const reasons = Array.isArray(DATA.reasons) ? DATA.reasons : [];
  
    reasons.forEach(r => {
      const div = document.createElement("div");
      div.className = "reason";
      div.innerHTML = `
        <div class="reason-title">${escapeHtml(r.title)}</div>
        <div class="reason-sub">${escapeHtml(r.sub)}</div>
      `;
      wrap.appendChild(div);
    });
  }
  
  function renderGallery() {
    const grid = $("galleryGrid");
    if (!grid) return console.warn(`Missing element: #galleryGrid`);
  
    grid.innerHTML = "";
    DATA.gallery.forEach((g, i) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.innerHTML = `
        <img src="${g.src}" alt="Memory ${i+1}">
        <div class="cap"><span>Memory</span><b>#${i+1}</b></div>
      `;
      tile.addEventListener("click", () => openModal(g.src, g.caption));
      grid.appendChild(tile);
    });
  }
  
  function openModal(src, caption) {
    const modal = $("modal");
    const img = $("modalImg");
    const cap = $("modalCaption");
    if (!modal || !img || !cap) {
      console.warn("Missing modal elements (#modal, #modalImg, #modalCaption)");
      return;
    }
    img.src = src;
    cap.textContent = caption;
    modal.setAttribute("aria-hidden", "false");
  }
  
  function closeModal() {
    const modal = $("modal");
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
  }
  
  function revealLetter() {
    const box = $("revealBox");
    if (!box) return console.warn(`Missing element: #revealBox`);
  
    box.style.display = "block";
    box.setAttribute("aria-hidden", "false");
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  
  function scrollToId(id) {
    const el = $(id);
    if (!el) return console.warn(`Missing section: #${id}`);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  
  function init() {
    // Text
    setText("herName", DATA.herName);
    setText("heroNote", DATA.heroNote);
    setText("longNote", DATA.longNote);
    setHTML("revealText", DATA.revealText);
  
    renderReasons();
    renderGallery();
  
    // Scroll buttons
    on("scrollGallery", "click", () => scrollToId("gallerySection"));
    on("scrollReasons", "click", () => scrollToId("reasonsSection"));
  
    // Reveal
    on("openLetter", "click", () => {
      revealLetter();
      window.PETALS?.burst(20);
    });
  
    // Petals toggle
    on("togglePetals", "click", () => {
      window.PETALS?.set(!window.PETALS.on);
      const toggle = $("togglePetals");
      if (toggle) toggle.textContent = `Petals: ${window.PETALS?.on ? "On" : "Off"}`;
    });
  
    // Sync toggle text once
    const toggle = $("togglePetals");
    if (toggle) toggle.textContent = `Petals: ${window.PETALS?.on ? "On" : "Off"}`;
  
    // Yes / No
    on("yesBtn", "click", () => {
      window.PETALS?.burst(1000);
      alert("HEHEHEHEHEHEHEHEHE YAYYYYYYYYYYYYYY");
    });
  
    const noBtn = $("noBtn");
    if (!noBtn) {
      console.warn(`Missing element: #noBtn`);
    } else {
      noBtn.addEventListener("mouseover", () => (noBtn.textContent = "Nice try 😌"));
      noBtn.addEventListener("click", () => {
        noBtn.textContent = "Still not allowed 🙂";
        window.PETALS?.burst(14);
      });
    }
  
    // Modal close
    on("modalClose", "click", closeModal);
    on("modalBackdrop", "click", closeModal);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  
    // Print a quick checklist once (helps you fix HTML IDs)
    const mustHave = [
      "openLetter","togglePetals",
      "scrollGallery","scrollReasons",
      "gallerySection","reasonsSection",
      "reasonsList","galleryGrid",
      "revealBox","revealText",
      "yesBtn","noBtn",
      "modal","modalImg","modalCaption",
      "modalClose","modalBackdrop"
    ];
    console.log("ID check:");
    mustHave.forEach(id => console.log(id, !!$(id)));
  }
  
  document.addEventListener("DOMContentLoaded", init);
  