(() => {
  const core = document.createElement("script");
  const cacheKey = window.__SITE_CACHE_KEY__ || Date.now().toString(36);
  core.src = `./app-core.js?v=${encodeURIComponent(cacheKey)}`;
  core.async = false;

  core.addEventListener("load", () => {
    Object.assign(I18N_DATA.ui.en, {
      "음독의 각오/자칭 베테랑 탐정의 수사법 대체": "Alternative to Even If It's Poison / [A Self-Proclaimed Veteran Detective] Memory"
    });
    Object.assign(I18N_DATA.ui.ja, {
      "음독의 각오/자칭 베테랑 탐정의 수사법 대체": "「毒でも覚悟のうえ／自称ベテラン探偵の捜査法」の代替"
    });

    const robertaBuild = SAVIORS.find((savior) => savior.id === "roberta");
    if (robertaBuild?.detail?.arcana) {
      robertaBuild.detail.arcana.pve = [
        { name: "단점 보완 맞춤 훈련", note: "" },
        { name: "허수의 개척자 or 불굴의 역작", note: "" },
        { name: "꽃들에게 죽음을", note: "" },
        { name: "서류 더미 위의 책임감", note: "" },
        { name: "음독의 각오 or 자칭 베테랑 탐정의 수사법", note: "" }
      ];
      robertaBuild.detail.arcana.alternatives = [
        { name: "본 투 비 와일드", note: "음독의 각오/자칭 베테랑 탐정의 수사법 대체" },
        { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" },
        { name: "메이드 바이 페트라♡ or 별을 보며 꿈을", note: "꽃들에게 죽음을 대체" },
        {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        null
      ];
    }

    const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (hash === "savior/roberta" && typeof openSavior === "function") {
      openSavior("roberta", { skipHash: true, keepScroll: true });
    }
  }, { once: true });

  core.addEventListener("error", () => {
    console.error("Failed to load app-core.js");
  }, { once: true });

  document.body.appendChild(core);
})();
