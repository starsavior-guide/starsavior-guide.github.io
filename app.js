(() => {
  const core = document.createElement("script");
  const cacheKey = window.__SITE_CACHE_KEY__ || Date.now().toString(36);
  core.src = `./app-core.js?v=${encodeURIComponent(cacheKey)}`;
  core.async = false;

  core.addEventListener("load", () => {
    Object.assign(I18N_DATA.ui.en, {
      "궤도 수색대 루그 리워크 반영 및 세팅변경 (10.29)": "Orbit Recon Lugh rework applied and setup updated (10.29)",
      "샤프 앤 스위트 세레스 추가 및 추천 세팅 반영 (10.29)": "Sharp & Sweet Ceres added and recommended setup applied (10.29)",
      "일부 서포터 구원자 추천 세팅 변경 (10.29)": "Recommended setups updated for selected Supporters (10.29)",
      "음독의 각오/자칭 베테랑 탐정의 수사법 대체": "Alternative to Even If It's Poison / [A Self-Proclaimed Veteran Detective] Memory",
      "수마의 나들이 추가 및 세이라 추천 세팅 변경 (10.24)": "When Slumber Comes Calling added and Seira recommended setup updated (10.24)",
      "레디 메이드 퍼피 리디아 추가 및 추천 세팅 반영 (10.16)": "Ready-Made Puppy Lydia added and recommended setup updated (10.16)",
      "서부 탈환대 리디아 추천 아르카나 변경 (10.16)": "Western Liberators Lydia recommended Arcana updated (10.16)",
      "※ 왈츠 오브 스타라이트 아세라는 힘 1,000 / 체력 1,000을 목표로 세팅 권장": "※ Waltz of Starlight Asherah: Recommended target — Strength 1,000 / HP 1,000"
    });
    Object.assign(I18N_DATA.ui.ja, {
      "궤도 수색대 루그 리워크 반영 및 세팅변경 (10.29)": "軌道偵察隊ルーグ リワーク反映・セッティング変更 (10.29)",
      "샤프 앤 스위트 세레스 추가 및 추천 세팅 반영 (10.29)": "シャープ＆スイーツ セレス追加・おすすめセッティング反映 (10.29)",
      "일부 서포터 구원자 추천 세팅 변경 (10.29)": "一部サポーター救援者 おすすめセッティング変更 (10.29)",
      "음독의 각오/자칭 베테랑 탐정의 수사법 대체": "「毒でも覚悟のうえ／自称ベテラン探偵の捜査法」の代替",
      "수마의 나들이 추가 및 세이라 추천 세팅 변경 (10.24)": "「睡魔のお出かけ」追加・セイラおすすめセッティング変更 (10.24)",
      "레디 메이드 퍼피 리디아 추가 및 추천 세팅 반영 (10.16)": "レディーメイド・パピー リディア追加・おすすめセッティング反映 (10.16)",
      "서부 탈환대 리디아 추천 아르카나 변경 (10.16)": "西部奪還隊 リディア おすすめアルカナ変更 (10.16)",
      "※ 왈츠 오브 스타라이트 아세라는 힘 1,000 / 체력 1,000을 목표로 세팅 권장": "※ ワルツ・オブ・スターライト アセラは力1,000 / 体力1,000を目標にセッティング推奨"
    });
    Object.assign(I18N_DATA.arcana.en, {
      "이게 옷이라고요?": "You Call This an Outfit?!",
      "수마의 나들이": "When Slumber Comes Calling"
    });
    Object.assign(I18N_DATA.arcana.ja, {
      "이게 옷이라고요?": "これが…服？",
      "수마의 나들이": "睡魔のお出かけ"
    });

    GROWTH_PRIORITY.gwen = { tier: "1티어", level: "tier-1" };

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

    const readyMadeLydia = SAVIORS.find((savior) => savior.id === "lydia-moon-caster");
    if (readyMadeLydia) {
      readyMadeLydia.summary = "PVE 장비·아르카나 세팅을 반영했습니다.";
      readyMadeLydia.detail = {
        ...(readyMadeLydia.detail || {}),
        equipment: {
          ...(readyMadeLydia.detail?.equipment || {}),
          pve: {
            necklace: "속도",
            ring: "공격력%",
            sets: ["파괴(4) + 투지(2)"],
            potential: "AX",
            note: ""
          }
        },
        arcana: {
          ...(readyMadeLydia.detail?.arcana || {}),
          pve: [
            { name: "단점 보완 맞춤 훈련", note: "" },
            { name: "죽음이 둘을 갈라놓을 때까지", note: "" },
            { name: "이게 옷이라고요?", note: "" },
            { name: "불굴의 역작", note: "" },
            { name: "꽃들에게 죽음을", note: "" }
          ],
          alternatives: [
            { name: "하늘의 심판", note: "불굴의 역작 대체" },
            { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" },
            { name: "메이드 바이 페트라♡ or 별을 보며 꿈을", note: "꽃들에게 죽음을 대체" },
            { name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세", note: "부족한 자리 대체" },
            null
          ]
        }
      };
    }

    const westernLydia = SAVIORS.find((savior) => savior.id === "lydia");
    if (westernLydia?.detail?.arcana) {
      westernLydia.detail.arcana.pve = Array.from(
        { length: 5 },
        (_, index) => westernLydia.detail.arcana.pve?.[index] || null
      );
      westernLydia.detail.arcana.pve[4] = { name: "이게 옷이라고요?", note: "" };

      westernLydia.detail.arcana.alternatives = Array.from(
        { length: 5 },
        (_, index) => westernLydia.detail.arcana.alternatives?.[index] || null
      );
      westernLydia.detail.arcana.alternatives[0] = {
        name: "노 페인, 노 게인",
        note: "단점 보완 맞춤 훈련 대체"
      };
      westernLydia.detail.arcana.alternatives[1] = {
        name: "메이드 바이 페트라♡ or 별을 보며 꿈을 or 깊은 애도",
        note: "꽃들에게 죽음을 대체"
      };
      westernLydia.detail.arcana.alternatives[2] = {
        name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 영원 속박의 굴레",
        note: "부족한 자리 대체"
      };
      westernLydia.detail.arcana.alternatives[3] = null;
    }

    const baseBuildAlternativeArcana = buildAlternativeArcana;
    buildAlternativeArcana = function (savior, pveArcana, existingAlternatives) {
      if (savior?.id === "lydia" || savior?.id === "lydia-moon-caster") {
        return Array.from(
          { length: 5 },
          (_, index) => existingAlternatives?.[index] || null
        );
      }
      return baseBuildAlternativeArcana(savior, pveArcana, existingAlternatives);
    };

    const baseCreateJourneyStatPriorityMarkup = createJourneyStatPriorityMarkup;
    createJourneyStatPriorityMarkup = function (savior) {
      const markup = baseCreateJourneyStatPriorityMarkup(savior);
      if (savior?.id !== "waltz-asherah") return markup;

      const note = escapeHtml(translateString(
        "※ 왈츠 오브 스타라이트 아세라는 힘 1,000 / 체력 1,000을 목표로 세팅 권장"
      ));

      return markup.replace(
        /\s*<\/div>\s*$/,
        `\n      <div class="journey-stat-priority-note" style="margin-top:10px;">${note}</div>\n    </div>`
      );
    };

    const updateNotice = document.querySelector("#savior-update-notice");
    const updateList = updateNotice?.querySelector(".site-update-list");
    if (updateList) {
      updateList.innerHTML = `
        <li>궤도 수색대 루그 리워크 반영 및 세팅변경 (10.29)</li>
        <li>샤프 앤 스위트 세레스 추가 및 추천 세팅 반영 (10.29)</li>
        <li>일부 서포터 구원자 추천 세팅 변경 (10.29)</li>
        <li>수마의 나들이 추가 및 세이라 추천 세팅 변경 (10.24)</li>
        <li>레디 메이드 퍼피 리디아 추가 및 추천 세팅 반영 (10.16)</li>
        <li>서부 탈환대 리디아 추천 아르카나 변경 (10.16)</li>
      `;
      if (typeof applyLanguageToDOM === "function") applyLanguageToDOM(updateNotice);
    }

    if (typeof renderList === "function") renderList();

    const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    const activeSaviorId = hash.startsWith("savior/") ? hash.slice("savior/".length) : "";
    if (["roberta", "lydia", "lydia-moon-caster", "waltz-asherah", "gwen", "seira"].includes(activeSaviorId) && typeof openSavior === "function") {
      openSavior(activeSaviorId, { skipHash: true, keepScroll: true });
    }
  }, { once: true });

  core.addEventListener("error", () => {
    console.error("Failed to load app-core.js");
  }, { once: true });

  document.body.appendChild(core);
})();
