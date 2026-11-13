(() => {
  const core = document.createElement("script");
  const cacheKey = window.__SITE_CACHE_KEY__ || Date.now().toString(36);
  core.src = `./app-core.js?v=${encodeURIComponent(cacheKey)}`;
  core.async = false;

  core.addEventListener("load", () => {
    Object.assign(I18N_DATA.ui.en, {
      "편애의 마녀, 길레 추가 및 추천 세팅 반영(11.12)": "Witch of Favoritism and Gille added with recommended builds (11.12)",
      "딜러 및 디버퍼 추천/대체 아르카나 대폭 변경(11.12)": "Major recommended/alternative Arcana changes for damage dealers and debuffers (11.12)",
      "자칭 베테랑 탐정의 수사법 대체": "Alternative to [A Self-Proclaimed Veteran Detective] Memory",
      "음독의 각오 대체": "Substitute for Even If It's Poison",
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
      "편애의 마녀, 길레 추가 및 추천 세팅 반영(11.12)": "偏愛の魔女・ギレ追加・おすすめセッティング反映 (11.12)",
      "딜러 및 디버퍼 추천/대체 아르카나 대폭 변경(11.12)": "アタッカー・デバッファーのおすすめ／代替アルカナを大幅変更 (11.12)",
      "자칭 베테랑 탐정의 수사법 대체": "「自称ベテラン探偵の捜査法」の代替",
      "음독의 각오 대체": "「毒でも覚悟のうえ」の代替",
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

    // 2026-11-12: 구원자별로 확인한 대체 슬롯에만 끝나지 않는 춤을 추가합니다.
    // append=true는 기존 '부족한 자리 대체' 선택지, false는 확인된 빈 슬롯입니다.
    const neverEndingDanceAlternativeSlots = new Map([
      ...[
        "gwen", "ceres", "tyria", "lyn", "claire", "asherah-voyager",
        "charlotte", "seira", "tanya", "bunny-scarlet", "lugh", "lydia"
      ].map((id) => [id, { index: 2, append: true }]),
      ...["roberta", "lydia-moon-caster"]
        .map((id) => [id, { index: 3, append: true }]),
      ...["bell", "omega"]
        .map((id) => [id, { index: 2, append: false }]),
      ...[
        "sunshine-cat-smile", "bunny-charlotte", "epindel", "kyra",
        "professor-m", "cristelle", "lacy", "luna"
      ].map((id) => [id, { index: 3, append: false }]),
      ...[
        "amora", "fei", "trish", "marcille", "bunny-claire",
        "rosaria", "yoo-mina", "petra", "scarlet", "smile", "naru",
        "clarissa", "carnelia", "wedding-epindel", "bunny-frey",
        "dana", "muriel", "lily"
      ].map((id) => [id, { index: 4, append: false }])
    ]);
    const missingStrikerAlternativeNoteIds = new Set([
      "gwen", "ceres", "tyria", "lyn", "claire", "asherah-voyager",
      "charlotte", "seira", "tanya", "bunny-scarlet"
    ]);
    const strikerAlternativeNoteRepairs = [
      { index: 0, name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" },
      {
        index: 1,
        name: "메이드 바이 페트라♡ or 별을 보며 꿈을",
        note: "꽃들에게 죽음을 대체"
      },
      { index: 3, name: "완벽한 바니걸", note: "음독의 각오 대체" }
    ];

    const clarissaArcana = SAVIORS.find((savior) => savior.id === "clarissa")?.detail?.arcana;
    if (clarissaArcana?.pve?.[3]) {
      clarissaArcana.pve[3] = { ...clarissaArcana.pve[3], name: "끝나지 않는 춤" };
    }

    const recommendedSlotOverrides = {
      lily: { 4: "불굴의 역작" },
      lacy: { 3: "끝나지 않는 춤" },
      muriel: { 4: "불굴의 역작" },
      dana: { 4: "불굴의 역작" },
      smile: { 1: "불굴의 역작" },
      "wedding-epindel": { 2: "불굴의 역작", 4: "하얀 달의 온기는 햇빛처럼" },
      carnelia: { 2: "불굴의 역작", 4: "하얀 달의 온기는 햇빛처럼" },
      "white-pearl-luna": { 2: "조용한 휴식 시간", 3: "영원 속박의 굴레" },
      cristelle: { 4: "끝나지 않는 춤" },
      "yoo-mina": { 4: "하얀 달의 온기는 햇빛처럼" },
      rosaria: { 4: "하얀 달의 온기는 햇빛처럼" },
      gwen: { 4: "자칭 베테랑 탐정의 수사법" }
    };
    Object.entries(recommendedSlotOverrides).forEach(([id, slots]) => {
      const recommended = SAVIORS.find((savior) => savior.id === id)?.detail?.arcana?.pve;
      Object.entries(slots).forEach(([index, name]) => {
        if (recommended?.[index]) recommended[index] = { ...recommended[index], name };
      });
    });

    // 사용자가 지정한 개별 구성은 최종 슬롯에서 적용하여 자동 추가로 빈칸이 채워지지 않게 합니다.
    const alternativeSlotOverrides = {
      clarissa: {
        3: { name: "영원 속박의 굴레 or 완벽한 바니걸", note: "부족한 자리 대체" },
        4: null
      },
      "bunny-scarlet": {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: null
      },
      "bunny-claire": {
        1: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 완벽한 바니걸 or 끝나지 않는 춤",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      naru: {
        2: {
          name: "어느 한 기사의 맹세 or 영원 속박의 굴레 or 끝나지 않는 춤",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      marcille: {
        1: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 완벽한 바니걸 or 끝나지 않는 춤",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      kyra: {
        1: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 완벽한 바니걸 or 끝나지 않는 춤",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      lily: {
        2: {
          name: "어느 한 기사의 맹세 or 하얀 달의 온기는 햇빛처럼 or 끝나지 않는 춤",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      tanya: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      lacy: { 3: null, 4: null },
      epindel: {
        1: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      muriel: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸 or 영원 속박의 굴레",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      dana: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      trish: {
        1: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      charlotte: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        }
      },
      luna: {
        1: {
          name: "하늘의 심판 or 불굴의 역작 or 끝나지 않는 춤 or 어느 한 기사의 맹세",
          note: "하얀 달의 온기는 햇빛처럼 대체"
        },
        3: null,
        4: null
      },
      smile: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸 or 허수의 개척자",
          note: "부족한 자리 대체"
        }
      },
      "asherah-voyager": {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        }
      },
      claire: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        }
      },
      scarlet: {
        3: { name: "끝나지 않는 춤", note: "부족한 자리 대체" },
        4: null
      },
      omega: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        }
      },
      "waltz-asherah": {
        1: {
          name: "스트라니스의 영애 or 본 투 비 와일드 or 언더커버 캅 or 끝나지 않는 춤",
          note: "완벽한 바니걸 대체"
        }
      },
      petra: {
        2: {
          name: "어느 한 기사의 맹세 or 끝나지 않는 춤 or 영원 속박의 굴레",
          note: "하얀 달의 온기는 햇빛처럼 대체"
        },
        3: null,
        4: null
      },
      "bunny-charlotte": {
        1: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      "bunny-frey": {
        3: { name: "끝나지 않는 춤", note: "하얀 달의 온기는 햇빛처럼 대체" },
        4: null
      },
      lyn: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      fei: {
        0: { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" },
        1: {
          name: "끝나지 않는 춤 or 불굴의 역작 or 허수의 개척자 or 메이드 바이 페트라♡ or 별을 보며 꿈을",
          note: "꽃들에게 죽음을 대체"
        },
        3: null,
        4: null
      },
      tyria: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        }
      },
      "wedding-epindel": {
        3: { name: "하늘의 심판", note: "불굴의 역작 대체" },
        4: { name: "영원 속박의 굴레 or 끝나지 않는 춤", note: "부족한 자리 대체" }
      },
      carnelia: {
        3: { name: "하늘의 심판", note: "불굴의 역작 대체" },
        4: { name: "영원 속박의 굴레 or 끝나지 않는 춤", note: "부족한 자리 대체" }
      },
      ceres: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        }
      },
      "white-pearl-luna": {
        1: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 누각 위, 유리달 맞이 or 불굴의 역작 or 끝나지 않는 춤",
          note: "부족한 자리 대체"
        }
      },
      "sunshine-cat-smile": {
        0: { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" },
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      cristelle: {
        0: {
          name: "어느 한 기사의 맹세 or 하얀 달의 온기는 햇빛처럼 or 누각 위, 유리달 맞이",
          note: "부족한 자리 대체"
        },
        2: null,
        3: null,
        4: null
      },
      amora: {
        1: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      "professor-m": {
        1: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: null,
        4: null
      },
      gwen: {
        2: {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 끝나지 않는 춤 or 완벽한 바니걸",
          note: "부족한 자리 대체"
        },
        3: { name: "허수의 개척자", note: "자칭 베테랑 탐정의 수사법 대체" },
        4: null
      },
      "yoo-mina": {
        3: {
          name: "끝나지 않는 춤 or 완벽한 바니걸 or 영원 속박의 굴레",
          note: "부족한 자리 대체"
        },
        4: null
      },
      rosaria: {
        3: {
          name: "끝나지 않는 춤 or 완벽한 바니걸 or 영원 속박의 굴레",
          note: "부족한 자리 대체"
        },
        4: null
      }
    };

    // 기존 자동 추가와 app.js의 개별 예외 처리가 끝난 최종 슬롯에 적용합니다.
    const baseResolvedAlternativeArcana = addEternalBondAlternativeForWhiteMoon;
    addEternalBondAlternativeForWhiteMoon = function (savior, pveArcana, alternatives) {
      const resolved = baseResolvedAlternativeArcana(savior, pveArcana, alternatives);
      const target = neverEndingDanceAlternativeSlots.get(savior?.id);
      const overrides = alternativeSlotOverrides[savior?.id];
      if (!target && !overrides) return resolved;

      const result = resolved.map((slot) => slot ? { ...slot } : null);
      if (missingStrikerAlternativeNoteIds.has(savior.id)) {
        strikerAlternativeNoteRepairs.forEach(({ index, name, note }) => {
          if (result[index]?.name === name && !String(result[index].note || "").trim()) {
            result[index].note = note;
          }
        });
      }

      if (target) {
        const name = "끝나지 않는 춤";
        const slot = result[target.index];
        if (target.append) {
          if (slot?.note === "부족한 자리 대체" &&
              !String(slot.name).split(/\s*or\s*/i).includes(name)) {
            result[target.index] = { ...slot, name: `${slot.name} or ${name}` };
          }
        } else if (!slot?.name) {
          result[target.index] = { name, note: "부족한 자리 대체" };
        }
      }

      if (overrides) {
        Object.entries(overrides).forEach(([index, slot]) => {
          result[Number(index)] = slot ? { ...slot } : null;
        });
      }
      return result;
    };

    // 2026-11-12: 사용자 지정 스트라이커/레인저 아르카나 일괄 변경
    // 기존 추천·대체 슬롯 중 지정되지 않은 항목은 그대로 둡니다.
    const strikerDanceIds = new Set([
      "bunny-scarlet", "tanya", "charlotte", "asherah-voyager", "lyn", "ceres"
    ]);
    const rangerDanceSlot4Ids = new Set(["scarlet", "naru", "petra", "bell"]);
    for (const savior of SAVIORS) {
      const recommended = savior?.detail?.arcana?.pve;
      if (!Array.isArray(recommended)) continue;
      if (strikerDanceIds.has(savior.id)) {
        recommended[4] = { ...(recommended[4] || {}), name: "끝나지 않는 춤" };
      }
      if (rangerDanceSlot4Ids.has(savior.id)) {
        recommended[3] = { ...(recommended[3] || {}), name: "끝나지 않는 춤" };
      }
      if (savior.id === "cristelle") {
        recommended[1] = { ...(recommended[1] || {}), name: "끝나지 않는 춤" };
      }
    }

    const previousArcanaResolver = addEternalBondAlternativeForWhiteMoon;
    addEternalBondAlternativeForWhiteMoon = function (savior, pveArcana, alternatives) {
      const original = previousArcanaResolver(savior, pveArcana, alternatives);
      if (!Array.isArray(original)) return original;
      const id = savior?.id;
      const isRanger = savior?.className === "레인저";
      const result = original.map((slot) => slot ? { ...slot } : null);
      if (isRanger) {
        result.forEach((slot, index) => {
          if (slot?.note === "꽃들에게 죽음을 대체" &&
              slot.name === "메이드 바이 페트라♡ or 별을 보며 꿈을") {
            result[index] = { ...slot, name: "메이드 바이 페트라♡ or 별을 보며 꿈을 or 깊은 애도" };
          }
        });
      }
      if (strikerDanceIds.has(id)) {
        result[2] = {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 완벽한 바니걸 or 자칭 베테랑 탐정의 수사법",
          note: "부족한 자리 대체"
        };
        result[3] = null;
        result[4] = null;
      }
      if (id === "claire" || id === "tyria") {
        result[3] = null;
        result[4] = null;
      }
      if (id === "scarlet" || id === "naru" || id === "petra") {
        result[2] = { name: "어느 한 기사의 맹세", note: "하얀 달의 온기는 햇빛처럼 대체" };
        result[3] = { name: "영원 속박의 굴레 or 완벽한 바니걸", note: "부족한 자리 대체" };
      }
      if (id === "smile") {
        result[3] = null;
        result[4] = null;
      }
      if (id === "bell") {
        result[2] = {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 완벽한 바니걸 or 영원 속박의 굴레",
          note: "부족한 자리 대체"
        };
      }
      if (id === "cristelle") {
        result[0] = { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" };
        result[1] = { name: "누각 위, 유리달 맞이", note: "영원 속박의 굴레 대체" };
        result[2] = {
          name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 불굴의 역작",
          note: "부족한 자리 대체"
        };
      }
      return result;
    };

    // 편애의 마녀 아세라: 사용자 지정 PVE 평가 및 세팅 (다른 아세라 변형 제외)
    const witchAsherah = SAVIORS.find((savior) => savior.id === "asherah-order-striker");
    if (witchAsherah) {
      GROWTH_PRIORITY[witchAsherah.id] = { tier: "0티어", level: "tier-0" };
      MAIN_CONTENTS[witchAsherah.id] = ["작전", "코스모 게이트", "회랑", "플래시 포인트"];
      witchAsherah.summary = "PVE 추천 장비 및 아르카나 세팅 반영";
      witchAsherah.detail = {
        ...(witchAsherah.detail || {}),
        equipment: {
          ...(witchAsherah.detail?.equipment || {}),
          pve: {
            ...(witchAsherah.detail?.equipment?.pve || {}),
            necklace: "속도 or 공격력%",
            necklaceNote: "※ 속도 권장",
            ring: "공격력%",
            sets: ["공격(4) + 투지(2)", "통찰(4) + 투지(2)", "파괴(4) + 투지(2)"],
            potential: "AX1 - 공격력% 효율이 높은 구원자",
            note: ""
          }
        },
        arcana: {
          ...(witchAsherah.detail?.arcana || {}),
          pve: [
            { name: "단점 보완 맞춤 훈련", note: "" },
            { name: "빛바랜 꿈", note: "" },
            { name: "끝나지 않는 춤", note: "" },
            { name: "영원 속박의 굴레 or 누각 위, 유리달 맞이", note: "" },
            { name: "꽃들에게 죽음을", note: "" }
          ],
          alternatives: [
            { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" },
            { name: "메이드 바이 페트라♡ or 별을 보며 꿈을", note: "꽃들에게 죽음을 대체" },
            { name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 완벽한 바니걸", note: "부족한 자리 대체" },
            { name: "불굴의 역작 or 음독의 각오 or 자칭 베테랑 탐정의 수사법", note: "부족한 자리 대체" },
            null
          ]
        }
      };
    }

    // 기존 자동 대체 아르카나 생성은 편애의 마녀의 명시적 5슬롯 구성을 변경하지 않습니다.
    const beforeWitchAsherahAlternativeBuild = buildAlternativeArcana;
    buildAlternativeArcana = function (savior, pveArcana, existingAlternatives) {
      if (savior?.id === "asherah-order-striker") {
        return Array.from({ length: 5 }, (_, index) => existingAlternatives?.[index] || null);
      }
      return beforeWitchAsherahAlternativeBuild(savior, pveArcana, existingAlternatives);
    };

    // 2026-11-12: 레디 메이드 퍼피 리디아, 샤프 앤 스위트 세레스, 길레 세팅
    const readyMadePuppy = SAVIORS.find((savior) => savior.id === "lydia-moon-caster");
    if (readyMadePuppy) {
      GROWTH_PRIORITY[readyMadePuppy.id] = { tier: "1.5티어", level: "tier-15" };
      MAIN_CONTENTS[readyMadePuppy.id] = ["작전", "코스모 게이트", "회랑", "플래시 포인트", "건틀렛"];
      readyMadePuppy.detail = {
        ...(readyMadePuppy.detail || {}),
        equipment: {
          ...(readyMadePuppy.detail?.equipment || {}),
          pve: {
            ...(readyMadePuppy.detail?.equipment?.pve || {}),
            potential: "AX1 - 치명타 확률을 올리기 쉬워서 공격력%\nAX6 - 치명타 확률이 95% 이상인 경우"
          }
        }
      };
    }

    const sweetCeres = SAVIORS.find((savior) => savior.id === "ceres-sun-supporter");
    if (sweetCeres) {
      GROWTH_PRIORITY[sweetCeres.id] = { tier: "1티어", level: "tier-1" };
      MAIN_CONTENTS[sweetCeres.id] = ["작전", "코스모 게이트", "회랑", "플래시 포인트"];
      sweetCeres.detail = {
        ...(sweetCeres.detail || {}),
        equipment: {
          ...(sweetCeres.detail?.equipment || {}),
          pve: {
            ...(sweetCeres.detail?.equipment?.pve || {}),
            potential: "BX2 - 생명력% 효율이 높음"
          }
        }
      };
    }

    const gilleBuild = SAVIORS.find((savior) => savior.id === "gille");
    if (gilleBuild) {
      gilleBuild.summary = "PVE 장비 및 아르카나 추천 세팅을 반영했습니다.";
      gilleBuild.detail = {
        ...(gilleBuild.detail || {}),
        equipment: {
          ...(gilleBuild.detail?.equipment || {}),
          pve: {
            ...(gilleBuild.detail?.equipment?.pve || {}),
            necklace: "속도",
            ring: "공격력%",
            sets: ["통찰(4) + 투지(2)", "파괴(4) + 투지(2)"],
            potential: "AX5 - 치명타 확률이 부족한 경우\nAX6 - 치명타 확률이 95% 이상인 경우",
            note: ""
          }
        },
        arcana: {
          ...(gilleBuild.detail?.arcana || {}),
          pve: [
            { name: "단점 보완 맞춤 훈련", note: "" },
            { name: "끝나지 않는 춤", note: "" },
            { name: "빛바랜 꿈", note: "" },
            { name: "하늘의 심판 or 불굴의 역작 or 죽음이 둘을 갈라놓을 때까지", note: "" },
            { name: "꽃들에게 죽음을", note: "" }
          ],
          alternatives: [
            { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" },
            { name: "메이드 바이 페트라♡ or 별을 보며 꿈을", note: "꽃들에게 죽음을 대체" },
            { name: "하얀 달의 온기는 햇빛처럼 or 어느 한 기사의 맹세 or 완벽한 바니걸", note: "부족한 자리 대체" },
            null,
            null
          ]
        }
      };
    }

    const previousGilleAlternatives = buildAlternativeArcana;
    buildAlternativeArcana = function (savior, pveArcana, existingAlternatives) {
      if (savior?.id === "gille") {
        return Array.from({ length: 5 }, (_, index) => existingAlternatives?.[index] || null);
      }
      return previousGilleAlternatives(savior, pveArcana, existingAlternatives);
    };

    // 세 레인저의 지정 슬롯을 최종 데이터와 표시 단계에서 동일하게 보장합니다.
    const correctedRangerIds = new Set(["scarlet", "naru", "petra"]);
    for (const savior of SAVIORS) {
      if (!correctedRangerIds.has(savior.id)) continue;
      const detail = savior.detail || (savior.detail = {});
      const arcana = detail.arcana || (detail.arcana = {});
      arcana.pve = Array.from({ length: 5 }, (_, index) => arcana.pve?.[index] || null);
      arcana.pve[3] = { name: "끝나지 않는 춤", note: "" };
    }
    const previousCorrectedRangerBuild = buildAlternativeArcana;
    buildAlternativeArcana = function (savior, pveArcana, existingAlternatives) {
      if (!correctedRangerIds.has(savior?.id)) {
        return previousCorrectedRangerBuild(savior, pveArcana, existingAlternatives);
      }
      const result = previousCorrectedRangerBuild(savior, pveArcana, existingAlternatives);
      const slots = Array.from({ length: 5 }, (_, index) => result?.[index] || null);
      slots[2] = { name: "어느 한 기사의 맹세", note: "하얀 달의 온기는 햇빛처럼 대체" };
      slots[3] = { name: "영원 속박의 굴레 or 완벽한 바니걸", note: "부족한 자리 대체" };
      return slots;
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
        <li>편애의 마녀, 길레 추가 및 추천 세팅 반영(11.12)</li>
        <li>딜러 및 디버퍼 추천/대체 아르카나 대폭 변경(11.12)</li>
        <li>궤도 수색대 루그 리워크 반영 및 세팅변경 (10.29)</li>
        <li>샤프 앤 스위트 세레스 추가 및 추천 세팅 반영 (10.29)</li>
        <li>일부 서포터 구원자 추천 세팅 변경 (10.29)</li>
      `;
      if (typeof applyLanguageToDOM === "function") applyLanguageToDOM(updateNotice);
    }

    if (typeof renderList === "function") renderList();

    const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    const activeSaviorId = hash.startsWith("savior/") ? hash.slice("savior/".length) : "";
    if ((["lydia-moon-caster", "ceres-sun-supporter", "gille", "scarlet", "naru", "petra"].includes(activeSaviorId) || neverEndingDanceAlternativeSlots.has(activeSaviorId) || Object.prototype.hasOwnProperty.call(alternativeSlotOverrides, activeSaviorId)) && typeof openSavior === "function") {
      openSavior(activeSaviorId, { skipHash: true, keepScroll: true });
    }
  }, { once: true });

  core.addEventListener("error", () => {
    console.error("Failed to load app-core.js");
  }, { once: true });

  document.body.appendChild(core);
})();
