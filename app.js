const SITE_BUILD_VERSION = "v25-tier-fix";
const ELEMENT_LABELS = {
  sun: "태양",
  moon: "달",
  star: "별",
  order: "질서",
  chaos: "혼돈"
};


const ARCANA_SOURCE_URL = "https://star-savior-arcana-db.pages.dev/arcana";
const ARCANA_IMAGE_ROOT = "https://starsavior-db.pages.dev/images/arcana";

// 아르카나 카드명은 사용자가 지정한 Star Savior Arcana DB의 한국어 표기를 사용합니다.
// 시트에서 사용하는 캐릭터/버전 약칭을 실제 카드명과 이미지로 연결합니다.
const ARCANA_LIBRARY = {
  "티리아": [
    { name: "단점 보완 맞춤 훈련", image: `${ARCANA_IMAGE_ROOT}/ARCANA_APOSTLE_TYRIA_SSR_01_S.webp` }
  ],
  "카넬리아": [
    { name: "꽃들에게 죽음을", image: `${ARCANA_IMAGE_ROOT}/ARCANA_MAID_LANTERN_SSR_01_S.webp` }
  ],
  "뮤리엘": [
    { name: "하늘의 심판", image: `${ARCANA_IMAGE_ROOT}/ARCANA_SAINTESS_DEMON_SSR_01_S.webp` }
  ],
  "웨딩 에핀델": [
    { name: "죽음이 둘을 갈라놓을 때까지", image: `${ARCANA_IMAGE_ROOT}/ARCANA_WEDDING_DUALSWORD_SSR_01_S.webp` }
  ],
  "바니걸 프레이": [
    { name: "불굴의 역작", image: `${ARCANA_IMAGE_ROOT}/ARCANA_BUNNY_PRAY_SSR_01_S.webp` }
  ],
  "린(인내)": [
    { name: "하얀 달의 온기는 햇빛처럼", image: `${ARCANA_IMAGE_ROOT}/ARCANA_EASTERN_SWORDMASTER_SSR_02_S.webp` }
  ],
  "린(힘)": [
    { name: "누각 위, 유리달 맞이", image: `${ARCANA_IMAGE_ROOT}/ARCANA_EASTERN_SWORDMASTER_SSR_01_S.webp` }
  ],
  "에밀리": [
    { name: "조용한 휴식 시간", image: `${ARCANA_IMAGE_ROOT}/ARCANA_MAID_TWOHANDER_SSR_01_S.webp` }
  ],
  "왈세라": [
    { name: "스트라니스의 영애", image: `${ARCANA_IMAGE_ROOT}/ARCANA_DRESS_STRANIS_SSR_01_S.webp` }
  ],
  "바니걸 클레어": [
    { name: "완벽한 바니걸", image: `${ARCANA_IMAGE_ROOT}/ARCANA_BUNNY_SPEAR_SSR_01_S.webp` }
  ],
  "키라": [
    { name: "키라만큼 귀여워!", image: `${ARCANA_IMAGE_ROOT}/ARCANA_MUTANT_MASK_SSR_01_S.webp` }
  ],
  "페이": [
    { name: "오늘의 한 걸음", image: `${ARCANA_IMAGE_ROOT}/ARCANA_INDEPENDENT_VAGABOND_SSR_01_S.webp` }
  ],
  "웨딩 카르멘": [
    { name: "나른한 오후의 틈새", image: `${ARCANA_IMAGE_ROOT}/ARCANA_WEDDING_SHIELDER_SSR_01_S.webp` }
  ],
  "프레이": [
    { name: "공녀, 왕좌에 오르다", image: `${ARCANA_IMAGE_ROOT}/ARCANA_KINGDOM_PRAY_SSR_01_S.webp` }
  ],
  "할리": [
    { name: "본 투 비 와일드", image: `${ARCANA_IMAGE_ROOT}/ARCANA_WILD_HOG_SSR_01_S.webp` }
  ],
  "오메가": [
    { name: "허수의 개척자", image: `${ARCANA_IMAGE_ROOT}/ARCANA_STARPIERCER_OMEGA_SSR_01_S.webp` }
  ],
  "로자리아": [
    { name: "종말은 소녀의 얼굴을 하고 있다.", image: `${ARCANA_IMAGE_ROOT}/ARCANA_COUNTERSIDE_ROSARIA_SSR_01_S.webp` }
  ],
  "벨리스": [
    { name: "깊은 애도", image: `${ARCANA_IMAGE_ROOT}/ARCANA_MAID_BELL_SSR_01_S.webp` }
  ],
  "힐데": [
    { name: "노스텔지어의 역습", image: `${ARCANA_IMAGE_ROOT}/ARCANA_COUNTERSIDE_HILDE_SSR_01_S.webp` }
  ],
  "엘리사": [
    { name: "하늘의 시련", image: `${ARCANA_IMAGE_ROOT}/ARCANA_SAINTESS_ELF_SSR_01_S.webp` }
  ],
  "베스타": [
    { name: "금단의 기록물 Vol. 1", image: `${ARCANA_IMAGE_ROOT}/ARCANA_APRIL_FOOL_SSR_01_S.webp` },
    { name: "만족스러운 식사", image: `${ARCANA_IMAGE_ROOT}/ARCANA_WEST_LANCER_SSR_01_S.webp` }
  ],
  "샤를": [
    { name: "어느 한 기사의 맹세", image: `${ARCANA_IMAGE_ROOT}/ARCANA_KINGDOM_KNIGHT_SSR_01_S.webp` }
  ],
  "바니걸 샤를": [
    { name: "서투른 욕망 해소법", image: `${ARCANA_IMAGE_ROOT}/ARCANA_BUNNY_KNIGHT_SSR_01_S.webp` }
  ],
  "단점 보완 맞춤 훈련": [
    { name: "단점 보완 맞춤 훈련", image: `${ARCANA_IMAGE_ROOT}/ARCANA_APOSTLE_TYRIA_SSR_01_S.webp` }
  ],
  "불굴의 역작": [
    { name: "불굴의 역작", image: `${ARCANA_IMAGE_ROOT}/ARCANA_BUNNY_PRAY_SSR_01_S.webp` }
  ],
  "꽃들에게 죽음을": [
    { name: "꽃들에게 죽음을", image: `${ARCANA_IMAGE_ROOT}/ARCANA_MAID_LANTERN_SSR_01_S.webp` }
  ],
  "완벽한 바니걸": [
    { name: "완벽한 바니걸", image: `${ARCANA_IMAGE_ROOT}/ARCANA_BUNNY_SPEAR_SSR_01_S.webp` }
  ],
  "하얀 달의 온기는 햇빛처럼": [
    { name: "하얀 달의 온기는 햇빛처럼", image: `${ARCANA_IMAGE_ROOT}/ARCANA_EASTERN_SWORDMASTER_SSR_02_S.webp` }
  ],
  "노 페인, 노 게인": [
    { name: "노 페인, 노 게인", image: `${ARCANA_IMAGE_ROOT}/ARCANA_INDEPENDENT_DRAGON_SSR_01_S.webp` }
  ],
  "메이드 바이 페트라♡": [
    { name: "메이드 바이 페트라♡", image: `${ARCANA_IMAGE_ROOT}/ARCANA_CONSTRUCT_BOMB_SSR_01_S.webp` }
  ],
  "별을 보며 꿈을": [
    { name: "별을 보며 꿈을", image: `${ARCANA_IMAGE_ROOT}/ARCANA_NOA_OBSERVER_SSR_01_S.webp` }
  ],
  "어느 한 기사의 맹세": [
    { name: "어느 한 기사의 맹세", image: `${ARCANA_IMAGE_ROOT}/ARCANA_KINGDOM_KNIGHT_SSR_01_S.webp` }
  ],
  "음독의 각오": [
    { name: "음독의 각오", image: `${ARCANA_IMAGE_ROOT}/ARCANA_WEST_BEAMSWORD_SSR_02_S.webp` }
  ],
  "누구보다 프로페셔널": [
    { name: "누구보다 프로페셔널", image: `${ARCANA_IMAGE_ROOT}/ARCANA_LPU_POST_SSR_01_S.webp` }
  ],
  "서류 더미 위의 책임감": [
    { name: "서류 더미 위의 책임감", image: `${ARCANA_IMAGE_ROOT}/ARCANA_RECON_KNUCKLE_SSR_01_S.webp` }
  ],
  "언더커버 캅": [
    { name: "언더커버 캅", image: `${ARCANA_IMAGE_ROOT}/ARCANA_OFFICER_POLICE_SSR_01_S.webp` }
  ],
  "빛을 쫓아라!": [
    { name: "빛을 쫓아라!", image: `${ARCANA_IMAGE_ROOT}/ARCANA_VOYAGER_ORACLE_SSR_01_S.webp` }
  ],
  "종말은 소녀의 얼굴을 하고 있다.": [
    { name: "종말은 소녀의 얼굴을 하고 있다.", image: `${ARCANA_IMAGE_ROOT}/ARCANA_COUNTERSIDE_ROSARIA_SSR_01_S.webp` }
  ],
  "허수의 개척자": [
    { name: "허수의 개척자", image: `${ARCANA_IMAGE_ROOT}/ARCANA_STARPIERCER_OMEGA_SSR_01_S.webp` }
  ]
};

ARCANA_LIBRARY["웨핀델"] = ARCANA_LIBRARY["웨딩 에핀델"];

// 약칭뿐 아니라 실제 카드명을 그대로 입력해도 이미지가 연결되도록 자동 별칭을 생성합니다.
Object.values(ARCANA_LIBRARY).flat().forEach((card) => {
  if (!ARCANA_LIBRARY[card.name]) {
    ARCANA_LIBRARY[card.name] = [card];
  }
});

const COMMON_ARCANA_SLOTS = [
  { name: "단점 보완 맞춤 훈련", note: "" },
  { name: "불굴의 역작", note: "" },
  { name: "꽃들에게 죽음을", note: "" },
  { name: "완벽한 바니걸", note: "" },
  { name: "하얀 달의 온기는 햇빛처럼", note: "" }
];

const COMMON_ALTERNATIVE_ARCANA_SLOTS = [
  { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" },
  { name: "메이드 바이 페트라♡", note: "꽃들에게 죽음을 대체" },
  { name: "별을 보며 꿈을", note: "꽃들에게 죽음을 대체" },
  { name: "어느 한 기사의 맹세", note: "하얀 달의 온기는 햇빛처럼 대체" },
  null
];

const EMPTY_ARCANA = () => Array.from({ length: 5 }, () => null);

const DEFAULT_BUILD = {
  skills: [
    { label: "기본기", value: "원본 자료 미등록" },
    { label: "특수기", value: "원본 자료 미등록" },
    { label: "궁극기", value: "원본 자료 미등록" }
  ],
  equipment: {
    pve: {
      necklace: "원본 자료 미등록",
      ring: "원본 자료 미등록",
      sets: ["원본 자료 미등록"],
      potential: "원본 자료 미등록",
      note: "원본 PVE 시트에 해당 구원자 세팅이 없습니다."
    },
    pvp: {
      necklace: "원본 자료 미등록",
      ring: "원본 자료 미등록",
      sets: ["원본 자료 미등록"],
      potential: "원본 자료 미등록",
      note: "제공된 원본은 PVE 전용 시트입니다."
    }
  },
  arcana: {
    pve: EMPTY_ARCANA(),
    pvp: EMPTY_ARCANA(),
    alternatives: EMPTY_ARCANA()
  },
  stats: [
    { name: "핵심 능력치", target: "원본 자료 미등록", reason: "구원자 역할에 맞춰 입력", priority: "required", label: "필수" },
    { name: "보조 능력치", target: "원본 자료 미등록", reason: "장비 세팅과 함께 조정", priority: "recommended", label: "권장" },
    { name: "고점 능력치", target: "원본 자료 미등록", reason: "필수 수치 달성 후 투자", priority: "high", label: "고점" }
  ]
};


const GROWTH_PRIORITY = {
  "asherah-voyager": { tier: "3티어", level: "tier-3" },
  "smile": { tier: "1티어", level: "tier-1" },
  "luna": { tier: "1티어", level: "tier-1" },
  "carnelia": { tier: "2티어", level: "tier-2" },
  "bell": { tier: "1티어", level: "tier-1" },
  "emily": { tier: "0.5티어", level: "tier-05" },
  "charlotte": { tier: "3티어", level: "tier-3" },
  "carmen": { tier: "4티어", level: "tier-4" },
  "frey": { tier: "2티어", level: "tier-2" },
  "seira": { tier: "2티어", level: "tier-2" },
  "trish": { tier: "3티어", level: "tier-3" },
  "lyn": { tier: "2티어", level: "tier-2" },
  "haydee": { tier: "0.5티어", level: "tier-05", note: "1돌파 이상 필수" },
  "serpang": { tier: "2티어", level: "tier-2" },
  "dana": { tier: "2티어", level: "tier-2" },
  "muriel": { tier: "2티어", level: "tier-2" },
  "elisa": { tier: "2티어", level: "tier-2", note: "1돌파 이상 권장" },
  "tyria": { tier: "1티어", level: "tier-1" },
  "roberta": { tier: "1티어", level: "tier-1" },
  "lugh": { tier: "3티어", level: "tier-3" },
  "fei": { tier: "0.5티어", level: "tier-05" },
  "epindel": { tier: "3티어", level: "tier-3" },
  "omega": { tier: "2티어", level: "tier-2" },
  "bunny-charlotte": { tier: "0.5티어", level: "tier-05" },
  "ceres": { tier: "1티어", level: "tier-1", note: "1돌파 이상 권장" },
  "lydia": { tier: "2티어", level: "tier-2" },
  "harley": { tier: "2티어", level: "tier-2" },
  "petra": { tier: "3티어", level: "tier-3" },
  "scarlet": { tier: "3티어", level: "tier-3" },
  "claire": { tier: "1티어", level: "tier-1" },
  "lacy": { tier: "2티어", level: "tier-2" },
  "tanya": { tier: "3티어", level: "tier-3" },
  "lily": { tier: "3티어", level: "tier-3" },
  "kyra": { tier: "1티어", level: "tier-1" },
  "waltz-asherah": { tier: "0티어", level: "tier-0", note: "1돌파 이상 필수" },
  "wedding-carmen": { tier: "0티어", level: "tier-0", note: "한정" },
  "wedding-epindel": { tier: "1티어", level: "tier-1" },
  "bunny-frey": { tier: "1티어", level: "tier-1", note: "1돌파 이상 권장" },
  "besta": { tier: "2티어", level: "tier-2", note: "개화 필수" },
  "annah": { tier: "1티어", level: "tier-1", note: "개화 필수" },
  "marcille": { tier: "2티어", level: "tier-2", note: "개화 필수" },
  "vera": { tier: "2티어", level: "tier-2", note: "개화 필수" },
  "naru": { tier: "2티어", level: "tier-2", note: "개화 필수" },
  "bunny-claire": { tier: "2티어", level: "tier-2", note: "개화 필수" },
  "bunny-scarlet": { tier: "3티어", level: "tier-3" },
  "clarissa": { tier: "0.5티어", level: "tier-05", note: "개화 필수" },
  "hilde": { tier: "3티어", level: "tier-3" },
  "yoo-mina": { tier: "3티어", level: "tier-3" },
  "rosaria": { tier: "1티어", level: "tier-1" }
};


const MAIN_CONTENTS = {
  "asherah-voyager": ["인자작"],
  "charlotte": ["PVP"],
  "seira": ["PVP", "코스모 게이트"],
  "lyn": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "claire": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "tyria": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "roberta": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "ceres": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "tanya": ["없음"],
  "bunny-scarlet": ["없음"],

  "trish": ["PVP"],
  "fei": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "epindel": ["없음"],
  "marcille": ["없음"],
  "kyra": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "bunny-claire": ["PVP"],
  "bunny-charlotte": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],

  "smile": ["인자작", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "bell": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "lugh": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "petra": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "clarissa": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "naru": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "lydia": ["인자작"],
  "scarlet": ["없음"],
  "yoo-mina": ["없음"],
  "lacy": ["작전", "코스모 게이트", "플래시 포인트"],
  "rosaria": ["작전", "코스모 게이트", "플래시 포인트"],

  "luna": ["PVP", "작전", "코스모 게이트", "플래시 포인트"],
  "carnelia": ["PVP", "작전", "코스모 게이트", "플래시 포인트"],
  "dana": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "wedding-epindel": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "muriel": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "bunny-frey": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "omega": ["코스모 게이트"],
  "lily": ["없음"],

  "emily": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "haydee": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "harley": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "hilde": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "besta": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "annah": ["작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "carmen": ["PVP"],

  "frey": ["작전", "회랑", "플래시 포인트"],
  "serpang": ["작전", "회랑", "플래시 포인트"],
  "vera": ["작전", "회랑", "플래시 포인트"],
  "elisa": ["PVP"],
  "waltz-asherah": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "wedding-carmen": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"]
};

const SAVIORS = [
  {
    "id": "asherah-voyager",
    "name": "아세라",
    "subtitle": "보이저 구원단",
    "affiliation": "보이저 구원단",
    "grade": "SSR",
    "element": "moon",
    "className": "스트라이커",
    "role": "스트라이커",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_VOYAGER_STRANIS.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "자체 치확증 30%"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "공용 아르카나",
            "note": ""
          },
          null,
          null,
          null,
          null
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "smile",
    "name": "스마일",
    "subtitle": "보이저 구원단",
    "affiliation": "보이저 구원단",
    "grade": "SSR",
    "element": "star",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_VOYAGER_SMILE.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "정밀(4) 사용시 적중(2) 대신 투지(2) 사용 가능"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "단점 보완 맞춤 훈련",
            "note": ""
          },
          {
            "name": "불굴의 역작",
            "note": ""
          },
          {
            "name": "꽃들에게 죽음을",
            "note": ""
          },
          {
            "name": "종말은 소녀의 얼굴을 하고 있다.",
            "note": ""
          },
          {
            "name": "하얀 달의 온기는 햇빛처럼",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          {
            "name": "허수의 개척자 or 완벽한 바니걸",
            "note": "종말은 소녀의 얼굴을 하고 있다. 대체"
          },
          null
        ]
      }
    }
  },
  {
    "id": "luna",
    "name": "루나",
    "subtitle": "보이저 구원단",
    "affiliation": "보이저 구원단",
    "grade": "SSR",
    "element": "order",
    "className": "캐스터",
    "role": "캐스터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_VOYAGER_ORACLE.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "자체 치확증 30%"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "뮤리엘",
            "note": ""
          },
          {
            "name": "웨핀델",
            "note": ""
          },
          {
            "name": "빛을 쫓아라!",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          {
            "name": "불굴의 역작 or 하얀 달의 온기는 햇빛처럼",
            "note": "빛을 쫓아라! 대체"
          },
          null
        ]
      }
    }
  },
  {
    "id": "carnelia",
    "name": "카넬리아",
    "subtitle": "방랑자",
    "affiliation": "방랑자",
    "grade": "SSR",
    "element": "chaos",
    "className": "캐스터",
    "role": "캐스터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_MAID_LANTERN.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 적중(2)"
          ],
          "potential": "AX",
          "note": "별도 비고 없음"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "뮤리엘",
            "note": ""
          },
          {
            "name": "웨핀델",
            "note": ""
          },
          {
            "name": "바니걸 프레이 or 린(인내)",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "bell",
    "name": "벨 리스",
    "subtitle": "캔들 스퀘어",
    "affiliation": "캔들 스퀘어",
    "grade": "SSR",
    "element": "star",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_MAID_BELL.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 적중(2)",
            "파괴(4) + 적중(2)"
          ],
          "potential": "AX",
          "note": "별도 비고 없음"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "로자리아",
            "note": ""
          },
          {
            "name": "벨리스",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "emily",
    "name": "에밀리",
    "subtitle": "캔들 스퀘어",
    "affiliation": "캔들 스퀘어",
    "grade": "SSR",
    "element": "moon",
    "className": "디펜더",
    "role": "디펜더",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_MAID_TWOHANDER.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력%",
          "sets": [
            "생명(4) + 장벽(2)"
          ],
          "potential": "BX / AX",
          "note": "반지 주옵 생퍼"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아 or 왈세라",
            "note": "둘 중 하나 선택"
          },
          {
            "name": "에밀리",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "바니걸 클레어",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "charlotte",
    "name": "샤를",
    "subtitle": "모나스티르 기사단",
    "affiliation": "모나스티르 기사단",
    "grade": "SSR",
    "element": "sun",
    "className": "스트라이커",
    "role": "스트라이커",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_KINGDOM_KNIGHT.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "자체 치확증 30% 적중 2셋 사용 가능"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "공용 아르카나",
            "note": ""
          },
          null,
          null,
          null,
          null
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "carmen",
    "name": "카르멘",
    "subtitle": "모나스티르 기사단",
    "affiliation": "모나스티르 기사단",
    "grade": "SSR",
    "element": "moon",
    "className": "디펜더",
    "role": "디펜더",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_KINGDOM_SHIELDER.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력%",
          "sets": [
            "생명(4) + 장벽(2)"
          ],
          "potential": "BX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "에밀리",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "왈세라",
            "note": ""
          },
          {
            "name": "할리 or 베스타",
            "note": "할리 추천 또는 베스타"
          },
          {
            "name": "엘리사 or 힐데 or 바니걸 클레어",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "frey",
    "name": "프레이",
    "subtitle": "모나스티르 기사단",
    "affiliation": "모나스티르 기사단",
    "grade": "SSR",
    "element": "star",
    "className": "서포터",
    "role": "서포터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_KINGDOM_PRAY.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력%",
          "sets": [
            "생명(4) + 장벽(2)"
          ],
          "potential": "BX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "스트라니스의 영애",
            "note": ""
          },
          {
            "name": "하얀 달의 온기는 햇빛처럼",
            "note": ""
          },
          {
            "name": "공녀, 왕좌에 오르다",
            "note": ""
          },
          {
            "name": "완벽한 바니걸",
            "note": ""
          },
          {
            "name": "본 투 비 와일드 or 하늘의 시련 or 금단의 기록물 Vol. 1",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "seira",
    "name": "세이라",
    "subtitle": "나이트메어",
    "affiliation": "나이트메어",
    "grade": "SSR",
    "element": "order",
    "className": "스트라이커",
    "role": "스트라이커",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_NIGHTMARE_REAPER.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "공용 아르카나",
            "note": ""
          },
          null,
          null,
          null,
          null
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "trish",
    "name": "트리쉬",
    "subtitle": "아셀루스 협회",
    "affiliation": "아셀루스 협회",
    "grade": "SSR",
    "element": "star",
    "className": "어쌔신",
    "role": "어쌔신",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_STELLAR_THIEF.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "키라",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": "통찰(4) 사용 시"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          {
            "name": "바니걸 클레어 or 린(힘)",
            "note": "파괴(4) 사용 시"
          },
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "lyn",
    "name": "린",
    "subtitle": "풍월문",
    "affiliation": "풍월문",
    "grade": "SSR",
    "element": "star",
    "className": "스트라이커",
    "role": "스트라이커",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_EASTERN_SWORDMASTER.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "별도 비고 없음"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "공용 아르카나",
            "note": ""
          },
          null,
          null,
          null,
          null
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "haydee",
    "name": "에데",
    "subtitle": "모렐 해양상단",
    "affiliation": "모렐 해양상단",
    "grade": "SSR",
    "element": "star",
    "className": "디펜더",
    "role": "디펜더",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_INCOGNITA_FLOWER.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "효과적중",
          "sets": [
            "방어(2) x 3"
          ],
          "potential": "CX",
          "note": "반지 주옵 방퍼 생명(4) 사용 가능"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "에밀리",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "왈세라",
            "note": ""
          },
          {
            "name": "할리 or 베스타",
            "note": "할리 추천 또는 베스타"
          },
          {
            "name": "엘리사 or 힐데 or 바니걸 클레어",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "serpang",
    "name": "세르팡",
    "subtitle": "풍월문",
    "affiliation": "풍월문",
    "grade": "SSR",
    "element": "sun",
    "className": "서포터",
    "role": "서포터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_EASTERN_OWL.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력%",
          "sets": [
            "생명(4) + 장벽(2)"
          ],
          "potential": "BX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "스트라니스의 영애",
            "note": ""
          },
          {
            "name": "하얀 달의 온기는 햇빛처럼",
            "note": ""
          },
          {
            "name": "공녀, 왕좌에 오르다",
            "note": ""
          },
          {
            "name": "완벽한 바니걸",
            "note": ""
          },
          {
            "name": "본 투 비 와일드 or 하늘의 시련 or 금단의 기록물 Vol. 1",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "dana",
    "name": "다나",
    "subtitle": "카노푸스 레인저",
    "affiliation": "카노푸스 레인저",
    "grade": "SSR",
    "element": "star",
    "className": "캐스터",
    "role": "캐스터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_MAGICIAN_DRUID.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "별도 비고 없음"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "뮤리엘",
            "note": ""
          },
          {
            "name": "웨핀델",
            "note": ""
          },
          {
            "name": "바니걸 프레이 or 린(인내)",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "muriel",
    "name": "뮤리엘",
    "subtitle": "모노리스 교단",
    "affiliation": "모노리스 교단",
    "grade": "SSR",
    "element": "sun",
    "className": "캐스터",
    "role": "캐스터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_SAINTESS_DEMON.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "파괴(4) + 적중(2)",
            "통찰(4) + 적중(2)"
          ],
          "potential": "AX",
          "note": "자체 치피증 (15~25%) 적중(2) 사용 가능"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "뮤리엘",
            "note": ""
          },
          {
            "name": "웨핀델",
            "note": ""
          },
          {
            "name": "바니걸 프레이 or 린(인내)",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "elisa",
    "name": "엘리사",
    "subtitle": "모노리스 교단",
    "affiliation": "모노리스 교단",
    "grade": "SSR",
    "element": "chaos",
    "className": "서포터",
    "role": "서포터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_SAINTESS_ELF.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력%",
          "sets": [
            "생명(4) + 장벽(2)"
          ],
          "potential": "BX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "스트라니스의 영애",
            "note": ""
          },
          {
            "name": "하얀 달의 온기는 햇빛처럼",
            "note": ""
          },
          {
            "name": "공녀, 왕좌에 오르다",
            "note": ""
          },
          {
            "name": "완벽한 바니걸",
            "note": ""
          },
          {
            "name": "본 투 비 와일드 or 하늘의 시련 or 금단의 기록물 Vol. 1",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "tyria",
    "name": "티리아",
    "subtitle": "집행자",
    "affiliation": "집행자",
    "grade": "SSR",
    "element": "sun",
    "className": "스트라이커",
    "role": "스트라이커",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_APOSTLE_TYRIA.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "별도 비고 없음"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "바니걸 클레어 or 오메가",
            "note": "첫 슬롯 선택"
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "roberta",
    "name": "로베르타",
    "subtitle": "궤도 수색대",
    "affiliation": "궤도 수색대",
    "grade": "SSR",
    "element": "star",
    "className": "스트라이커",
    "role": "스트라이커",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_RECON_KNUCKLE.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "파괴(4) + 투지(2)",
            "파괴(4) + 장벽(2)"
          ],
          "potential": "AX",
          "note": "자체 치확증 50% 투지(2) 사용 가능"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "단점 보완 맞춤 훈련",
            "note": ""
          },
          {
            "name": "불굴의 역작",
            "note": ""
          },
          {
            "name": "꽃들에게 죽음을",
            "note": ""
          },
          {
            "name": "서류 더미 위의 책임감",
            "note": ""
          },
          {
            "name": "하얀 달의 온기는 햇빛처럼",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          {
            "name": "완벽한 바니걸 or 본 투 비 와일드 or 음독의 각오",
            "note": "하얀 달의 온기는 햇빛처럼 대체"
          },
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "lugh",
    "name": "루그",
    "subtitle": "궤도 수색대",
    "affiliation": "궤도 수색대",
    "grade": "SSR",
    "element": "moon",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_RECON_AMULET.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "파괴(4) + 적중(2)",
            "통찰(4) + 적중(2)"
          ],
          "potential": "AX",
          "note": "정밀(4) 사용시 적중(2) 대신 투지(2) 사용 가능"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "공용 아르카나",
            "note": ""
          },
          null,
          null,
          null,
          null
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "fei",
    "name": "페이",
    "subtitle": "방랑자",
    "affiliation": "방랑자",
    "grade": "SSR",
    "element": "moon",
    "className": "어쌔신",
    "role": "어쌔신",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_INDEPENDENT_VAGABOND.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "파괴(4) + 투지(2)",
            "파괴(4) + 장벽(2)",
            "파괴(4) + 적중(2)"
          ],
          "potential": "AX / XX2 (피흡)",
          "note": "*전용 알카 사용시 특수기 치확 100%"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": ""
          },
          {
            "name": "키라",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "페이",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "epindel",
    "name": "에핀델",
    "subtitle": "오를랑 가문",
    "affiliation": "오를랑 가문",
    "grade": "SSR",
    "element": "moon",
    "className": "어쌔신",
    "role": "어쌔신",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_GRACE_DUALSWORD.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "키라",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": "통찰(4) 사용 시"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          {
            "name": "바니걸 클레어 or 린(힘)",
            "note": "파괴(4) 사용 시"
          },
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "omega",
    "name": "오메가",
    "subtitle": "보이저 구원단",
    "affiliation": "보이저 구원단",
    "grade": "SSR",
    "element": "star",
    "className": "캐스터",
    "role": "캐스터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_STARPIERCER_OMEGA.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "별도 비고 없음"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "뮤리엘",
            "note": ""
          },
          {
            "name": "웨핀델",
            "note": ""
          },
          {
            "name": "오메가 or 바니걸 프레이",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "bunny-charlotte",
    "name": "샤를",
    "subtitle": "하트 오브 모나스티르",
    "affiliation": "하트 오브 모나스티르",
    "grade": "SSR",
    "element": "sun",
    "className": "어쌔신",
    "role": "어쌔신",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_BUNNY_KNIGHT.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX / EX",
          "note": "*린(힘) 사용시 린(인내)를 샤를로 변경"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "키라",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": "통찰(4) 사용 시"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          {
            "name": "바니걸 클레어 or 린(힘)",
            "note": "파괴(4) 사용 시"
          },
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "ceres",
    "name": "세레스",
    "subtitle": "서부 해방군",
    "affiliation": "서부 해방군",
    "grade": "SSR",
    "element": "moon",
    "className": "스트라이커",
    "role": "스트라이커",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_WEST_BEAMSWORD.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "바니걸 클레어 or 오메가",
            "note": "첫 슬롯 선택"
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "lydia",
    "name": "리디아",
    "subtitle": "서부 해방군",
    "affiliation": "서부 해방군",
    "grade": "SSR",
    "element": "chaos",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_WEST_ROD.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "파괴(4) + 적중(2)",
            "통찰(4) + 적중(2)"
          ],
          "potential": "AX",
          "note": "정밀(4) 사용시 적중(2) 대신 투지(2) 사용 가능"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": ""
          },
          {
            "name": "로자리아",
            "note": ""
          },
          {
            "name": "벨리스 or 린(인내)",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "harley",
    "name": "할리",
    "subtitle": "헬 세이비어",
    "affiliation": "헬 세이비어",
    "grade": "SSR",
    "element": "sun",
    "className": "디펜더",
    "role": "디펜더",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_WILD_HOG.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력%",
          "sets": [
            "생명(4) + 장벽(2)"
          ],
          "potential": "BX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "에밀리",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "왈세라",
            "note": ""
          },
          {
            "name": "할리 or 베스타",
            "note": "할리 추천 또는 베스타"
          },
          {
            "name": "엘리사 or 힐데 or 바니걸 클레어",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "petra",
    "name": "페트라",
    "subtitle": "페트라 조합",
    "affiliation": "페트라 조합",
    "grade": "SSR",
    "element": "sun",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_CONSTRUCT_BOMB.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "파괴(4) + 적중(2)",
            "통찰(4) + 적중(2)"
          ],
          "potential": "AX",
          "note": "정밀(4) 사용시 적중(2) 대신 투지(2) 사용 가능"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "공용 아르카나",
            "note": ""
          },
          null,
          null,
          null,
          null
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "scarlet",
    "name": "스칼렛",
    "subtitle": "리틀 타이런트",
    "affiliation": "리틀 타이런트",
    "grade": "SSR",
    "element": "sun",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_BUNNY_SCISSORS.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "바니걸 클레어 or 오메가",
            "note": "첫 슬롯 선택"
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "claire",
    "name": "클레어",
    "subtitle": "플로리스 블루 로즈",
    "affiliation": "플로리스 블루 로즈",
    "grade": "SSR",
    "element": "moon",
    "className": "스트라이커",
    "role": "스트라이커",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_BUNNY_SPEAR.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "setNote": "※ 파괴(4) 권장",
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "바니걸 클레어 or 오메가",
            "note": "첫 슬롯 선택"
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "lacy",
    "name": "레이시",
    "subtitle": "방랑자",
    "affiliation": "방랑자",
    "grade": "SSR",
    "element": "chaos",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_INDEPENDENT_DRAGON.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 적중(2)",
            "공격(4) + 적중(2)"
          ],
          "potential": "AX",
          "note": "*웨르멘과 함께 운용시 힘(린), 잠재등을 사용하여 파티 최고 공격력 달성 필요"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "로자리아",
            "note": ""
          },
          {
            "name": "벨리스",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": "통찰(4) 사용 시"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          {
            "name": "린(인내) or 린(힘)",
            "note": "공격(4) 사용 시"
          },
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "tanya",
    "name": "타냐",
    "subtitle": "페트라 조합",
    "affiliation": "페트라 조합",
    "grade": "SSR",
    "element": "star",
    "className": "스트라이커",
    "role": "스트라이커",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_CONSTRUCT_GADGET.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "파티 치확증 30%"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "공용 아르카나",
            "note": ""
          },
          null,
          null,
          null,
          null
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "lily",
    "name": "릴리",
    "subtitle": "람파디스",
    "affiliation": "람파디스",
    "grade": "SSR",
    "element": "moon",
    "className": "캐스터",
    "role": "캐스터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_DETECTIVE_WATSON.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "뮤리엘",
            "note": ""
          },
          {
            "name": "웨핀델",
            "note": ""
          },
          {
            "name": "바니걸 프레이 or 린(인내)",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "kyra",
    "name": "키라",
    "subtitle": "키라는 친구 같은 거 없어",
    "affiliation": "키라는 친구 같은 거 없어",
    "grade": "SSR",
    "element": "sun",
    "className": "어쌔신",
    "role": "어쌔신",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_MUTANT_MASK.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 적중(2)",
            "파괴(4) + 적중(2)"
          ],
          "potential": "AX",
          "note": "공명에서 치확 9% 치피 12%"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "키라",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "waltz-asherah",
    "name": "아세라",
    "subtitle": "왈츠 오브 스타라이트",
    "affiliation": "왈츠 오브 스타라이트",
    "grade": "SSR",
    "element": "order",
    "className": "서포터",
    "role": "서포터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_DRESS_STRANIS.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력% 또는 공격력%",
          "sets": [
            "생명(4) + 장벽(2)",
            "통찰(4) + 장벽(2) (서브 딜 운용시)"
          ],
          "potential": "BX / AX",
          "note": "반지 주옵 생퍼 / 반지 주옵 생퍼 or 공퍼"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "왈세라",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": ""
          },
          {
            "name": "티리아 or 바니걸 클레어",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          {
            "name": "공용 아르카나",
            "note": "서브 딜 운용 시"
          },
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "wedding-carmen",
    "name": "카르멘",
    "subtitle": "이터널 프로미스",
    "affiliation": "이터널 프로미스",
    "grade": "SSR",
    "element": "moon",
    "className": "서포터",
    "role": "서포터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_WEDDING_SHIELDER.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력%",
          "sets": [
            "생명(4)+ 장벽(2)"
          ],
          "potential": "BX",
          "note": "반지 주옵 생퍼"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "왈세라",
            "note": ""
          },
          {
            "name": "웨딩 카르멘",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "바니걸 클레어",
            "note": ""
          },
          {
            "name": "프레이 or 할리",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "wedding-epindel",
    "name": "에핀델",
    "subtitle": "블레싱 인 블룸",
    "affiliation": "블레싱 인 블룸",
    "grade": "SSR",
    "element": "sun",
    "className": "캐스터",
    "role": "캐스터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_WEDDING_DUALSWORD.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 적중(2)",
            "파괴(4) + 적중(2)"
          ],
          "potential": "AX",
          "note": "투지(2) 사용 가능"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "뮤리엘",
            "note": ""
          },
          {
            "name": "웨핀델",
            "note": ""
          },
          {
            "name": "바니걸 프레이 or 린(인내)",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "bunny-frey",
    "name": "프레이",
    "subtitle": "노블 프린세스",
    "affiliation": "노블 프린세스",
    "grade": "SSR",
    "element": "moon",
    "className": "캐스터",
    "role": "캐스터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_BUNNY_PRAY.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "setNote": "※ 파괴(4) 권장",
          "potential": "AX",
          "note": "파티 치확증 30%"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "뮤리엘",
            "note": ""
          },
          {
            "name": "웨핀델",
            "note": ""
          },
          {
            "name": "바니걸 프레이 or 린(인내)",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "besta",
    "name": "베스타",
    "subtitle": "서부 해방군",
    "affiliation": "서부 해방군",
    "grade": "SSR",
    "element": "star",
    "className": "디펜더",
    "role": "디펜더",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_WEST_LANCER.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력%",
          "sets": [
            "생명(4) + 장벽(2)"
          ],
          "potential": "BX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "에밀리",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "왈세라",
            "note": ""
          },
          {
            "name": "할리 or 베스타",
            "note": "할리 추천 또는 베스타"
          },
          {
            "name": "엘리사 or 힐데 or 바니걸 클레어",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "annah",
    "name": "안나",
    "subtitle": "노아 마을 경비대",
    "affiliation": "노아 마을 경비대",
    "grade": "SSR",
    "element": "sun",
    "className": "디펜더",
    "role": "디펜더",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_OFFICER_POLICE.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "공격(4) + 투지(2)",
            "생명(4) + 장벽(2)"
          ],
          "potential": "AX / BX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "단점 보완 맞춤 훈련",
            "note": ""
          },
          {
            "name": "누각 위, 유리달 맞이",
            "note": ""
          },
          {
            "name": "조용한 휴식 시간",
            "note": ""
          },
          {
            "name": "꽃들에게 죽음을",
            "note": ""
          },
          {
            "name": "완벽한 바니걸",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "marcille",
    "name": "마르실",
    "subtitle": "페트라 조합",
    "affiliation": "페트라 조합",
    "grade": "SSR",
    "element": "sun",
    "className": "어쌔신",
    "role": "어쌔신",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_CONSTRUCT_WRENCH.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "키라",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": "통찰(4) 사용 시"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          {
            "name": "바니걸 클레어 or 린(힘)",
            "note": "파괴(4) 사용 시"
          },
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "vera",
    "name": "베라",
    "subtitle": "운송 길드",
    "affiliation": "운송 길드",
    "grade": "SSR",
    "element": "moon",
    "className": "서포터",
    "role": "서포터",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_LPU_POST.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력%",
          "sets": [
            "생명(4) + 장벽(2)"
          ],
          "potential": "BX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "스트라니스의 영애",
            "note": ""
          },
          {
            "name": "하얀 달의 온기는 햇빛처럼",
            "note": ""
          },
          {
            "name": "공녀, 왕좌에 오르다",
            "note": ""
          },
          {
            "name": "완벽한 바니걸",
            "note": ""
          },
          {
            "name": "본 투 비 와일드 or 하늘의 시련 or 금단의 기록물 Vol. 1",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "naru",
    "name": "나루",
    "subtitle": "궤도 수색대",
    "affiliation": "궤도 수색대",
    "grade": "SSR",
    "element": "star",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_NOA_OBSERVER.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "바니걸 클레어 or 오메가",
            "note": "첫 슬롯 선택"
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "bunny-claire",
    "name": "클레어",
    "subtitle": "캔들 스퀘어",
    "affiliation": "캔들 스퀘어",
    "grade": "SSR",
    "element": "moon",
    "className": "어쌔신",
    "role": "어쌔신",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_MAID_SPEAR.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "자체 치확증 (6~10%)x3턴 *바클 사용시 샤를을 린(인내)로 변경"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "샤를",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": ""
          },
          {
            "name": "바니걸 클레어 or 린(힘)",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          {
            "name": "린(인내)",
            "note": "바니걸 클레어 사용 시 샤를 대신 채용"
          },
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "bunny-scarlet",
    "name": "스칼렛",
    "subtitle": "캔들 스퀘어",
    "affiliation": "캔들 스퀘어",
    "grade": "SSR",
    "element": "sun",
    "className": "스트라이커",
    "role": "스트라이커",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_MAID_SCISSORS.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "바니걸 클레어 or 오메가",
            "note": "첫 슬롯 선택"
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "clarissa",
    "name": "클라리사",
    "subtitle": "카노푸스 레인저",
    "affiliation": "카노푸스 레인저",
    "grade": "SSR",
    "element": "star",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_MAGICIAN_SNIPER.webp",
    "summary": "PVE 장비 및 아르카나 세팅 반영.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "파괴(4) + 적중(2)",
            "통찰(4) + 적중(2)"
          ],
          "setNote": "※ 파괴(4) 권장",
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "해당 자료에 없음",
          "ring": "해당 자료에 없음",
          "sets": [
            "PVE 세팅표 기준"
          ],
          "potential": "해당 자료에 없음",
          "note": ""
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "바니걸 클레어 or 오메가",
            "note": "첫 슬롯 선택"
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          },
          {
            "name": "공용 아르카나",
            "note": ""
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "hilde",
    "name": "힐데",
    "subtitle": "펜릴 소대",
    "affiliation": "펜릴 소대",
    "grade": "SSR",
    "element": "sun",
    "className": "디펜더",
    "role": "디펜더",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_COUNTERSIDE_HILDE.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "생명력%",
          "sets": [
            "생명(4) + 장벽(2)"
          ],
          "potential": "BX",
          "note": "반지 주옵 생퍼"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "에밀리",
            "note": ""
          },
          {
            "name": "린(인내)",
            "note": ""
          },
          {
            "name": "왈세라",
            "note": ""
          },
          {
            "name": "할리 or 베스타",
            "note": "할리 추천 또는 베스타"
          },
          {
            "name": "힐데 or 엘리사 or 바니걸 클레어",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "yoo-mina",
    "name": "유미나",
    "subtitle": "펜릴 소대",
    "affiliation": "펜릴 소대",
    "grade": "SSR",
    "element": "star",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_COUNTERSIDE_MINA.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 투지(2)",
            "파괴(4) + 투지(2)"
          ],
          "potential": "AX",
          "note": "별도 비고 없음"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": ""
          },
          {
            "name": "로자리아",
            "note": ""
          },
          {
            "name": "벨리스 or 린(인내)",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  },
  {
    "id": "rosaria",
    "name": "로자리아",
    "subtitle": "폴른 호크",
    "affiliation": "폴른 호크",
    "grade": "SSR",
    "element": "chaos",
    "className": "레인저",
    "role": "레인저",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_COUNTERSIDE_ROSARIA.webp",
    "summary": "업로드한 엑셀의 PVE 장비·여정 아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "파괴(4) + 적중(2)",
            "통찰(4) + 적중(2)"
          ],
          "setNote": "※ 파괴(4) 권장",
          "potential": "AX",
          "note": "투지(2) 사용 가능"
        },
        "pvp": {
          "necklace": "해당 엑셀에 없음",
          "ring": "해당 엑셀에 없음",
          "sets": [
            "해당 엑셀은 PVE 세팅표입니다."
          ],
          "potential": "해당 엑셀에 없음",
          "note": "PVP 데이터는 표시하지 않습니다."
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "티리아",
            "note": ""
          },
          {
            "name": "카넬리아",
            "note": ""
          },
          {
            "name": "바니걸 프레이",
            "note": ""
          },
          {
            "name": "로자리아",
            "note": ""
          },
          {
            "name": "벨리스 or 린(인내)",
            "note": "엑셀 선택 추천"
          }
        ],
        "pvp": [
          null,
          null,
          null,
          null,
          null
        ],
        "alternatives": [
          null,
          null,
          null,
          null,
          null
        ]
      }
    }
  }
];

const ARCANA_CATEGORIES = ["공격", "생명", "방어", "집중", "보호", "속도", "파괴", "통찰"];

const COSMO_GUIDES = [
  ["데모라이기스 : 베타", "https://arca.live/b/starsavior/169383151"],
  ["데모라이기스 : 알파", "https://arca.live/b/starsavior/170276253"],
  ["오르트로스", "https://arca.live/b/starsavior/170566053"],
  ["로자리아", "https://arca.live/b/starsavior/170758057"],
  ["힐데", "https://arca.live/b/starsavior/171215656"],
  ["길레", "https://arca.live/b/starsavior/172436327"],
  ["티리아", "https://arca.live/b/starsavior/172534192"],
  ["불사왕 모굴루스", "https://arca.live/b/starsavior/173207120"],
  ["괴리의 표상", "https://arca.live/b/starsavior/175840063"]
];


const EQUIPMENT_SIMULATOR_URL = "https://mingijuk-lab.github.io/star-savior-sim/";

const EQUIPMENT_MAIN_OPTIONS = [
  ["무기", "공격력", "150", "375"],
  ["장갑", "생명력", "600", "2400"],
  ["갑옷", "방어력", "60", "210"],
  ["목걸이 / 반지", "공격력 증가율(%)", "2.50%", "17.50%"],
  ["목걸이 / 반지", "생명력 증가율(%)", "2.50%", "17.50%"],
  ["목걸이 / 반지", "방어력 증가율(%)", "2.50%", "17.50%"],
  ["신발 / 목걸이", "속도", "18", "33"],
  ["목걸이", "치명타 확률", "3.00%", "18.00%"],
  ["목걸이", "치명타 피해", "4.00%", "22.00%"],
  ["반지", "효과 적중", "5.00%", "27.50%"],
  ["반지", "효과 저항", "5.00%", "27.50%"]
];

const EQUIPMENT_SUB_OPTIONS = [
  {
    group: "동일",
    rows: [
      ["공격력", "16", "21", "26", "30", "35", "40"],
      ["생명력", "86", "112", "138", "163", "189", "215"],
      ["방어력", "8", "10", "13", "15", "18", "20"],
      ["속도", "1", "-", "-", "-", "-", "2"]
    ]
  },
  {
    group: "변경",
    rows: [
      ["공생방%", "0.60%", "0.80%", "1.00%", "1.20%", "1.40%", "1.60%"],
      ["치확", "1.00%", "1.20%", "1.40%", "1.60%", "1.80%", "2.00%"],
      ["치피", "1.50%", "1.80%", "2.10%", "2.40%", "2.70%", "3.00%"],
      ["적중&저항", "1.00%", "1.40%", "1.80%", "2.20%", "2.60%", "3.00%"]
    ]
  }
];

const state = {
  query: "",
  element: "all",
  className: "all"
};

const listView = document.querySelector("#list-view");
const detailView = document.querySelector("#detail-view");
const simpleView = document.querySelector("#simple-view");
const saviorGrid = document.querySelector("#savior-grid");
const detailContent = document.querySelector("#detail-content");
const simpleContent = document.querySelector("#simple-content");
const simpleBackButton = simpleView.querySelector(".back-button");
const searchInput = document.querySelector("#search-input");
const visibleCount = document.querySelector("#visible-count");
const totalCount = document.querySelector("#total-count");
const emptyState = document.querySelector("#empty-state");
const resetFilter = document.querySelector("#reset-filter");
const navItems = [...document.querySelectorAll("[data-section]")];
const themeToggle = document.querySelector("#theme-toggle");

function cloneDefaultBuild() {
  return JSON.parse(JSON.stringify(DEFAULT_BUILD));
}

function getBuild(savior) {
  const base = cloneDefaultBuild();
  const detail = savior.detail || {};

  return {
    skills: detail.skills || base.skills,
    equipment: {
      pve: { ...base.equipment.pve, ...(detail.equipment?.pve || {}) },
      pvp: { ...base.equipment.pvp, ...(detail.equipment?.pvp || {}) }
    },
    arcana: {
      pve: detail.arcana?.pve || base.arcana.pve,
      pvp: detail.arcana?.pvp || base.arcana.pvp,
      alternatives: detail.arcana?.alternatives || base.arcana.alternatives
    },
    stats: detail.stats || base.stats
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getInitial(name) {
  return [...String(name || "✦")][0] || "✦";
}

function imageMarkup(savior, large = false) {
  const fallback = `<span class="character-fallback">${escapeHtml(getInitial(savior.name))}</span>`;
  if (!savior.image) return fallback;

  return `
    <img class="character-image" src="${escapeHtml(savior.image)}" alt="${escapeHtml(savior.name)}"
      onerror="this.remove(); this.parentElement.insertAdjacentHTML('beforeend', '${fallback.replaceAll("'", "&#039;")}')">
  `;
}

function renderList() {
  const q = state.query.trim().toLocaleLowerCase("ko-KR");

  const filtered = SAVIORS.filter((savior) => {
    const haystack = [
      savior.name,
      savior.subtitle,
      savior.affiliation,
      savior.className,
      savior.role,
      savior.attackType,
      ELEMENT_LABELS[savior.element]
    ].join(" ").toLocaleLowerCase("ko-KR");

    const queryMatch = !q || haystack.includes(q);
    const elementMatch = state.element === "all" || savior.element === state.element;
    const classMatch = state.className === "all" || savior.className === state.className;

    return queryMatch && elementMatch && classMatch;
  });

  saviorGrid.replaceChildren(...filtered.map(createSaviorCard));
  visibleCount.textContent = String(filtered.length);
  totalCount.textContent = String(SAVIORS.length);
  emptyState.hidden = filtered.length > 0;
}

function createSaviorCard(savior) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "savior-card";
  card.dataset.element = savior.element;
  card.setAttribute("aria-label", `${savior.name} ${savior.subtitle} 상세 세팅 보기`);

  card.innerHTML = `
    <div class="card-image">
      ${imageMarkup(savior)}
      <span class="attribute-corner">${escapeHtml(ELEMENT_LABELS[savior.element])}</span>
    </div>
    <div class="card-body">
      <span class="card-grade">${escapeHtml(savior.grade)}</span>
      <strong class="card-name">${escapeHtml(savior.name)}</strong>
      <span class="card-subtitle">${escapeHtml(savior.subtitle)}</span>
      <div class="card-tags">
        <span class="mini-tag">${escapeHtml(savior.className)}</span>
      </div>
    </div>
  `;

  card.addEventListener("click", () => openSavior(savior.id));
  return card;
}

function setActiveNav(section) {
  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.section === section);
  });
}

function showOnly(view) {
  listView.hidden = view !== "list";
  detailView.hidden = view !== "detail";
  simpleView.hidden = view !== "simple";
}

function openList(options = {}) {
  showOnly("list");
  setActiveNav("savior");

  if (!options.skipHash) {
    history.pushState({ view: "list" }, "", "#savior");
  }

  if (!options.keepScroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function openSavior(id, options = {}) {
  const savior = SAVIORS.find((item) => item.id === id);
  if (!savior) {
    openList(options);
    return;
  }

  detailContent.innerHTML = createDetailMarkup(savior);
  showOnly("detail");
  setActiveNav("savior");

  if (!options.skipHash) {
    history.pushState({ view: "detail", id }, "", `#savior/${encodeURIComponent(id)}`);
  }

  if (!options.keepScroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function getResolvedArcanaNames(slots) {
  return (slots || []).flatMap((slot) =>
    slot ? resolveArcanaChoices(slot.name).map((choice) => choice.name) : []
  );
}

function buildAlternativeArcana(savior, pveArcana, existingAlternatives) {
  const result = [];
  const seen = new Set();

  const add = (name, note = "") => {
    const key = `${name}::${note}`;
    if (!name || seen.has(key)) return;
    seen.add(key);
    result.push({ name, note });
  };

  (existingAlternatives || []).forEach((slot) => {
    if (slot?.name) add(slot.name, slot.note || "");
  });

  const names = new Set(getResolvedArcanaNames(pveArcana));

  if (savior.id === "smile") {
    return [
      names.has("단점 보완 맞춤 훈련")
        ? { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" }
        : null,
      names.has("꽃들에게 죽음을")
        ? { name: "메이드 바이 페트라♡ or 별을 보며 꿈을", note: "꽃들에게 죽음을 대체" }
        : null,
      names.has("하얀 달의 온기는 햇빛처럼")
        ? { name: "어느 한 기사의 맹세", note: "하얀 달의 온기는 햇빛처럼 대체" }
        : null,
      {
        name: "허수의 개척자 or 완벽한 바니걸",
        note: "종말은 소녀의 얼굴을 하고 있다. 대체"
      },
      null
    ];
  }

  if (savior.id === "luna") {
    return [
      names.has("단점 보완 맞춤 훈련")
        ? { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" }
        : null,
      names.has("꽃들에게 죽음을")
        ? { name: "메이드 바이 페트라♡ or 별을 보며 꿈을", note: "꽃들에게 죽음을 대체" }
        : null,
      null,
      {
        name: "불굴의 역작 or 하얀 달의 온기는 햇빛처럼",
        note: "빛을 쫓아라! 대체"
      },
      null
    ];
  }

  if (savior.id === "roberta") {
    if (names.has("단점 보완 맞춤 훈련")) {
      add("노 페인, 노 게인", "단점 보완 맞춤 훈련 대체");
    }
    if (names.has("꽃들에게 죽음을")) {
      add("메이드 바이 페트라♡ or 별을 보며 꿈을", "꽃들에게 죽음을 대체");
    }
    return result;
  }

  if (names.has("단점 보완 맞춤 훈련")) {
    add("노 페인, 노 게인", "단점 보완 맞춤 훈련 대체");
  }
  if (names.has("꽃들에게 죽음을")) {
    add("메이드 바이 페트라♡ or 별을 보며 꿈을", "꽃들에게 죽음을 대체");
  }
  if (names.has("하얀 달의 온기는 햇빛처럼")) {
    add("어느 한 기사의 맹세", "하얀 달의 온기는 햇빛처럼 대체");
  }
  if (savior.className === "스트라이커") {
    add("음독의 각오", "완벽한 바니걸 대체");
  }
  if (savior.className === "서포터") {
    add("누구보다 프로페셔널", "공녀, 왕좌에 오르다 대체");
  }
  if (names.has("본 투 비 와일드")) {
    add("언더커버 캅", "본 투 비 와일드 대체");
  }

  return result;
}

function createDetailMarkup(savior) {
  const build = getBuild(savior);
  const hasCommonArcana = (build.arcana.pve || []).some((arcana) =>
    String(arcana?.name || "").includes("공용 아르카나")
  );
  const pveArcana = hasCommonArcana ? COMMON_ARCANA_SLOTS : build.arcana.pve;
  const alternativeArcana = buildAlternativeArcana(
    savior,
    pveArcana,
    build.arcana.alternatives
  );

  const guideButton = savior.guideUrl
    ? `<a class="external-guide" href="${escapeHtml(savior.guideUrl)}" target="_blank" rel="noopener noreferrer">스킬설명 및 상세정보</a>`
    : "";

  const growthPriority = GROWTH_PRIORITY[savior.id] || {
    tier: "미등록",
    level: "tier-unrated"
  };
  const mainContents = MAIN_CONTENTS[savior.id] || ["없음"];

  const roleBadge =
    savior.role && savior.role !== savior.className
      ? `<span class="detail-badge">${escapeHtml(savior.role)}</span>`
      : "";

  const attackTypeBadge = savior.attackType
    ? `<span class="detail-badge">${escapeHtml(savior.attackType)}</span>`
    : "";

  return `
    <header class="detail-hero" data-element="${escapeHtml(savior.element)}">
      <div class="detail-portrait">
        ${imageMarkup(savior, true)}
      </div>
      <div class="detail-info">
        <div class="detail-badges">
          <span class="detail-badge attribute">${escapeHtml(ELEMENT_LABELS[savior.element])}</span>
          <span class="detail-badge">${escapeHtml(savior.grade)}</span>
          <span class="detail-badge">${escapeHtml(savior.className)}</span>
          ${roleBadge}
          ${attackTypeBadge}
        </div>

        <h1 class="detail-title">${escapeHtml(savior.name)}</h1>
        <p class="detail-subtitle">${escapeHtml(savior.subtitle)}</p>
        <p class="detail-summary">구원자 정보는 <a href="https://star-savior-arcana-db.pages.dev/" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;text-underline-offset:3px;">스타세이비어 DB</a> 기준입니다.</p>

        <div class="detail-quick-links">
          ${guideButton}
        </div>
      </div>
    </header>

    <section class="content-section growth-priority-section" id="growth-priority">
      <div class="section-titlebar">
        <div>
          <p>GROWTH PRIORITY</p>
          <h2>육성 우선순위</h2>
        </div>
      </div>
      <div class="section-body">
        <div class="growth-priority-card ${escapeHtml(growthPriority.level)}">
          <div class="growth-priority-main">
            <span class="growth-priority-label">PVE 기준</span>
            <strong>${escapeHtml(growthPriority.tier)}</strong>
          </div>
          ${growthPriority.note
            ? `<span class="growth-priority-note">${escapeHtml(growthPriority.note)}</span>`
            : ""}
        </div>

        <div class="main-content-area">
          <h3>주 사용 콘텐츠</h3>
          <div class="main-content-chips">
            ${mainContents.map((content) => `
              <span class="main-content-chip ${content === "없음" ? "is-empty" : ""}">
                ${escapeHtml(content)}
              </span>
            `).join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="content-section" id="equipment">
      <div class="section-titlebar">
        <div>
          <p>EQUIPMENT SETTING</p>
          <h2>장비 세팅</h2>
        </div>
      </div>
      <div class="section-body">
        <div class="build-grid">
          ${createEquipmentCard("PVE", build.equipment.pve, "pve", "작전 · 회랑 · 코스모 게이트")}
        </div>
      </div>
    </section>

    <section class="content-section" id="arcana">
      <div class="section-titlebar">
        <div>
          <p>ARCANA SETTING</p>
          <h2>아르카나 세팅</h2>
        </div>
      </div>
      <div class="section-body">
        ${createArcanaMode("PVE 추천 아르카나", "주요 PVE 콘텐츠", pveArcana, "var(--pve)")}
        ${createArcanaMode("대체 아르카나", "보유 상황에 따라 교체", alternativeArcana, "var(--accent)")}
      </div>
    </section>
  `;
}

function createEquipmentCard(mode, data, className, subtitle) {
  const sets = Array.isArray(data.sets) ? data.sets : [data.sets];

  return `
    <article class="build-card ${className}">
      <div class="build-heading">
        <span class="mode-badge">${mode}</span>
        <div>
          <small>${escapeHtml(subtitle)}</small>
          <strong>${mode} 추천 세팅</strong>
        </div>
      </div>
      <dl class="build-rows">
        <div class="build-row">
          <dt>목걸이</dt>
          <dd>${escapeHtml(data.necklace)}</dd>
        </div>
        <div class="build-row">
          <dt>반지</dt>
          <dd>${escapeHtml(data.ring)}</dd>
        </div>
        <div class="build-row">
          <dt>추천 세트</dt>
          <dd>
            ${sets.map((set) => `<span>${escapeHtml(set)}</span>`).join("")}
            ${data.setNote
              ? `<small class="build-set-note">${escapeHtml(data.setNote)}</small>`
              : ""}
          </dd>
        </div>
        <div class="build-row">
          <dt>잠재력</dt>
          <dd>${escapeHtml(data.potential)}</dd>
        </div>
      </dl>
    </article>
  `;
}


function normalizeArcanaAlias(value) {
  return String(value || "")
    .replace(/^\*+/, "")
    .replace(/^통찰\(4\)\s*:\s*/, "")
    .replace(/\s*택\s*1\s*/g, "")
    .replace(/\(추천\)/g, "")
    .replace(/\s*\(\s*/g, "(")
    .replace(/\s*\)\s*/g, ")")
    .trim();
}

function resolveArcanaChoices(rawName) {
  const normalized = normalizeArcanaAlias(rawName);

  if (!normalized) {
    return [];
  }

  if (normalized.includes("공용 아르카나")) {
    return COMMON_ARCANA_SLOTS.flatMap((slot) => ARCANA_LIBRARY[slot.name] || []);
  }

  const aliases = normalized
    .split(/\s+or\s+/i)
    .map((value) => normalizeArcanaAlias(value))
    .filter(Boolean);

  return aliases.flatMap((alias) => ARCANA_LIBRARY[alias] || []);
}

function createArcanaImages(choices) {
  if (!choices.length) return "";

  return `
    <div class="arcana-card-images" style="--arcana-count:${Math.min(choices.length, 3)}">
      ${choices.slice(0, 3).map((choice) => `
        <img src="${escapeHtml(choice.image)}" alt="${escapeHtml(choice.name)}"
          loading="lazy" referrerpolicy="no-referrer"
          onerror="this.style.display='none'">
      `).join("")}
    </div>
  `;
}

function createArcanaMode(title, description, slots, color) {
  const normalized = Array.from({ length: Math.max(5, slots?.length || 0) }, (_, index) => slots?.[index] || null);

  return `
    <div class="arcana-mode">
      <div class="arcana-mode-title">
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(description)}</span>
      </div>
      <div class="arcana-slots">
        ${normalized.map((arcana, index) => {
          if (!arcana) {
            return `
              <div class="arcana-slot empty" style="--slot-color:${color}">
                <small>SLOT ${index + 1}</small>
                <strong>미등록</strong>
                <em>대체 아르카나가 등록되지 않았습니다.</em>
              </div>
            `;
          }

          const choices = resolveArcanaChoices(arcana.name);

          if (!choices.length) {
            return `
              <div class="arcana-slot empty" style="--slot-color:${color}">
                <small>SLOT ${index + 1}</small>
                <strong>${escapeHtml(arcana.name)}</strong>
                <em>${escapeHtml(arcana.note || "원본 시트 표기")}</em>
              </div>
            `;
          }

          const cardNames = choices.map((choice) => choice.name).join(" / ");
          const rawNoteText = String(arcana.note || "").trim();
          const noteText = /엑셀.*추천/.test(rawNoteText) ? "" : rawNoteText;

          return `
            <a class="arcana-slot has-arcana-card" href="${ARCANA_SOURCE_URL}"
              target="_blank" rel="noopener noreferrer" style="--slot-color:${color}"
              aria-label="${escapeHtml(cardNames)} 아르카나 DB에서 보기">
              ${createArcanaImages(choices)}
              <div class="arcana-card-copy">
                <small>SLOT ${index + 1}${choices.length > 1 ? " · 선택" : ""}</small>
                <strong>${escapeHtml(cardNames)}</strong>
                ${noteText ? `<em>${escapeHtml(noteText)}</em>` : ""}
              </div>
            </a>
          `;
        }).join("")}
      </div>
    </div>
  `;
}


function createEquipmentDatabaseMarkup() {
  const mainRows = EQUIPMENT_MAIN_OPTIONS.map(([part, stat, base, enhanced]) => `
    <tr>
      <td>${escapeHtml(part)}</td>
      <td>${escapeHtml(stat)}</td>
      <td>${escapeHtml(base)}</td>
      <td>${escapeHtml(enhanced)}</td>
    </tr>
  `).join("");

  const subRows = EQUIPMENT_SUB_OPTIONS.map((section) =>
    section.rows.map((row, rowIndex) => `
      <tr>
        ${rowIndex === 0
          ? `<th class="equipment-group-cell" rowspan="${section.rows.length}" scope="rowgroup">${escapeHtml(section.group)}</th>`
          : ""}
        <th scope="row">${escapeHtml(row[0])}</th>
        ${row.slice(1).map((value) => `<td>${escapeHtml(value)}</td>`).join("")}
      </tr>
    `).join("")
  ).join("");

  return `
    <div class="equipment-page">
      <header class="equipment-hero">
        <p class="eyebrow">EQUIPMENT DATABASE</p>
        <h1>장비</h1>
        <p>구원자 장비 주옵션 및 부옵션 정보입니다.</p>
      </header>

      <section class="equipment-panel">
        <div class="equipment-panel-inner">
          <h2 class="equipment-section-title">장비 개요</h2>
          <ul class="equipment-overview-list">
            <li>딜러 서브딜러 딜탱은 공격력, 공격력% 또는 생명력, 생명력%, 치명타 확률, 치명타 피해, 속도를 유효 옵션으로 사용합니다.</li>
            <li>일부 구원자는 효과 적중, 방어력, 방어력% 도 유효 옵션으로 활용합니다.</li>
            <li>장비 부족 시 치명타 확률 + 추가 유효 옵션 1줄 조합도 사용할 수 있습니다.</li>
            <li>장비 세팅이 충분히 갖춰진 이후에는 유효 옵션 3 이상 장비 사용을 권장합니다.</li>
          </ul>

          <a class="equipment-simulator" href="${EQUIPMENT_SIMULATOR_URL}"
            target="_blank" rel="noopener noreferrer">
            장비 시뮬레이터
          </a>
        </div>
      </section>

      <section class="equipment-panel">
        <div class="equipment-panel-inner">
          <h2 class="equipment-section-title">주옵션 (Tier 2)</h2>
          <div class="equipment-table-wrap">
            <table class="equipment-table main-options">
              <colgroup>
                <col class="main-col-part">
                <col class="main-col-stat">
                <col class="main-col-base">
                <col class="main-col-enhanced">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">부위</th>
                  <th scope="col">주 능력치</th>
                  <th scope="col">기본 주능력치 (+0)</th>
                  <th scope="col">기본 주능력치 (+15)</th>
                </tr>
              </thead>
              <tbody>${mainRows}</tbody>
            </table>
          </div>

          <div class="equipment-guidance" aria-label="세트별 권장 능력치">
            <p><strong>통찰 4세트</strong> 착용 시 권장 치확 90% 이상, 치피 90% 이상</p>
            <p><strong>파괴 4세트</strong> 착용 시 권장 치확 80% 이상, 치피 140% 이상</p>
            <p><strong>적중 2세트</strong> 착용 시 권장 효적 140% 이상</p>
          </div>
        </div>
      </section>

      <section class="equipment-panel">
        <div class="equipment-panel-inner">
          <h2 class="equipment-section-title">부옵션 (Tier 2)</h2>
          <div class="equipment-table-wrap">
            <table class="equipment-table sub-options">
              <colgroup>
                <col class="sub-col-group">
                <col class="sub-col-option">
                ${Array.from({ length: 6 }, () => '<col class="sub-col-stage">').join("")}
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" colspan="2">옵션</th>
                  ${Array.from({ length: 6 }, (_, index) =>
                    `<th scope="col">${index + 1}단계</th>`
                  ).join("")}
                </tr>
              </thead>
              <tbody>${subRows}</tbody>
            </table>
          </div>

          <div class="equipment-guidance" aria-label="장비 티어 판정 기준">
            <p>치확 + 치피의 합이 <strong>13% 이상</strong>일 경우 0티어 장비.</p>
            <p>치확 + 치피의 합이 <strong>10% 이상 ~ 12% 미만</strong>일 경우 1티어 장비.</p>
            <p>치확 + 치피의 합이 <strong>7% 이상 ~ 9% 미만</strong>일 경우 2티어 장비.</p>
            <p>치확 + 치피의 합이 <strong>4% 이상 ~ 6% 미만</strong>일 경우 3티어 장비.</p>
            <p class="equipment-guidance-note">※ 딜러 기준으로 공격력% 수치가 높을 시 0.5티어 상승.</p>
          </div>
        </div>
      </section>
    </div>
  `;
}

function openSimple(section, options = {}) {
  if (section === "equipment") {
    simpleContent.innerHTML = createEquipmentDatabaseMarkup();
    simpleBackButton.hidden = true;
  } else {
    const data = getSimpleSection(section);
    if (!data) {
      openList(options);
      return;
    }

    simpleBackButton.hidden = false;
    simpleContent.innerHTML = `
      <section class="simple-panel">
        <header class="simple-panel-header">
          <p>${escapeHtml(data.eyebrow)}</p>
          <h1>${escapeHtml(data.title)}</h1>
        </header>
        <div class="simple-panel-body">
          <div class="simple-link-grid">
            ${data.items.map((item) => `
              <${item.link ? "a" : "div"} class="simple-link"
                ${item.link ? `href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer"` : ""}>
                <small>${escapeHtml(item.label)}</small>
                <strong>${escapeHtml(item.name)}</strong>
              </${item.link ? "a" : "div"}>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  showOnly("simple");
  setActiveNav(section);

  if (!options.skipHash) {
    history.pushState({ view: "simple", section }, "", `#${section}`);
  }

  if (!options.keepScroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function getSimpleSection(section) {
  if (section === "arcana") {
    return {
      eyebrow: "ARCANA INDEX",
      title: "아르카나",
      items: ARCANA_CATEGORIES.map((name) => ({ label: "STAT CATEGORY", name }))
    };
  }

  if (section === "equipment") {
    return {
      eyebrow: "EQUIPMENT GUIDE",
      title: "장비",
      items: [
        { label: "ARCA.LIVE GUIDE", name: "장비 가이드 바로가기", link: "https://arca.live/b/starsavior/165397313" },
        { label: "SETTING", name: "PVE 추천 세팅" },
        { label: "SETTING", name: "PVP 추천 세팅" }
      ]
    };
  }

  if (section === "cosmo") {
    return {
      eyebrow: "COSMO GATE",
      title: "코스모 게이트",
      items: COSMO_GUIDES.map(([name, link]) => ({ label: "BOSS GUIDE", name, link }))
    };
  }

  return null;
}

function syncFromHash() {
  const hash = decodeURIComponent(location.hash.replace(/^#/, ""));

  if (!hash || hash === "savior") {
    openList({ skipHash: true, keepScroll: true });
    return;
  }

  if (hash.startsWith("savior/")) {
    openSavior(hash.slice("savior/".length), { skipHash: true, keepScroll: true });
    return;
  }

  if (["equipment", "cosmo"].includes(hash)) {
    openSimple(hash, { skipHash: true, keepScroll: true });
    return;
  }

  openList({ skipHash: true, keepScroll: true });
}

function setFilterButtons(containerSelector, attribute, currentValue) {
  document.querySelectorAll(`${containerSelector} [${attribute}]`).forEach((button) => {
    button.classList.toggle("is-active", button.getAttribute(attribute) === currentValue);
  });
}

searchInput.addEventListener("input", (event) => {
  state.query = event.currentTarget.value;
  renderList();
});

document.querySelector("#element-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-element]");
  if (!button) return;

  state.element = button.dataset.element;
  setFilterButtons("#element-filters", "data-element", state.element);
  renderList();
});

document.querySelector("#class-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-class]");
  if (!button) return;

  state.className = button.dataset.class;
  setFilterButtons("#class-filters", "data-class", state.className);
  renderList();
});

resetFilter.addEventListener("click", () => {
  state.query = "";
  state.element = "all";
  state.className = "all";
  searchInput.value = "";
  setFilterButtons("#element-filters", "data-element", "all");
  setFilterButtons("#class-filters", "data-class", "all");
  renderList();
});

document.querySelectorAll("[data-open-list]").forEach((button) => {
  button.addEventListener("click", () => openList());
});

navItems.forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.dataset.section;
    if (section === "savior") {
      openList();
    } else {
      openSimple(section);
    }
  });
});

function applyRequestedLayoutFixes() {
  document
    .querySelectorAll('[data-section="arcana"]')
    .forEach((item) => item.remove());

  const style = document.createElement("style");
  style.id = "requested-layout-fixes";
  style.textContent = `
    .card-image::before,
    .card-image::after,
    .detail-portrait::before,
    .detail-portrait::after {
      display: none !important;
      content: none !important;
    }

    .character-image {
      z-index: 1 !important;
    }

    .build-grid {
      grid-template-columns: minmax(0, 1fr) !important;
    }
  `;
  document.head.appendChild(style);
}


function installArcanaCardStyles() {
  if (document.querySelector("#arcana-card-image-styles")) return;

  const style = document.createElement("style");
  style.id = "arcana-card-image-styles";
  style.textContent = `
    .arcana-slot.has-arcana-card {
      display: flex;
      min-height: 230px;
      padding: 0;
      justify-content: flex-end;
      border-style: solid;
      color: var(--text);
      text-decoration: none;
      background: var(--surface-2);
    }

    .arcana-slot.has-arcana-card::before {
      display: none;
    }

    .arcana-card-images {
      position: absolute;
      inset: 0 0 76px;
      display: grid;
      grid-template-columns: repeat(var(--arcana-count), minmax(0, 1fr));
      overflow: hidden;
      background: var(--surface-3);
    }

    .arcana-card-images::after {
      position: absolute;
      inset: 0;
      content: "";
      background: linear-gradient(to bottom, transparent 55%, rgba(9, 12, 19, 0.6));
      pointer-events: none;
    }

    .arcana-card-images img {
      width: 100%;
      height: 100%;
      min-width: 0;
      object-fit: cover;
    }

    .arcana-card-copy {
      position: relative;
      z-index: 2;
      width: 100%;
      min-height: 76px;
      padding: 10px 11px 11px;
      border-top: 1px solid color-mix(in srgb, var(--slot-color) 50%, var(--line));
      background: color-mix(in srgb, var(--surface) 93%, transparent);
      backdrop-filter: blur(10px);
    }

    .arcana-card-copy small,
    .arcana-card-copy strong,
    .arcana-card-copy em {
      display: block;
    }

    .arcana-card-copy small {
      color: var(--faint);
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 0.08em;
    }

    .arcana-card-copy strong {
      margin-top: 3px;
      font-size: 12px;
      font-weight: 950;
      line-height: 1.34;
    }

    .arcana-card-copy em {
      margin-top: 3px;
      color: var(--muted);
      font-size: 9px;
      font-style: normal;
      font-weight: 700;
    }

    .arcana-slot.has-arcana-card:hover {
      border-color: var(--slot-color);
      transform: translateY(-2px);
    }

    @media (max-width: 620px) {
      .arcana-slot.has-arcana-card {
        min-height: 210px;
      }

      .arcana-card-images {
        bottom: 82px;
      }

      .arcana-card-copy {
        min-height: 82px;
      }
    }
  `;

  document.head.appendChild(style);
}

function readSavedTheme() {
  try {
    return localStorage.getItem("starsavior-guide-theme");
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("starsavior-guide-theme", theme);
  } catch {
    // 로컬 파일 또는 제한된 브라우저 환경에서는 저장하지 않고 현재 화면에만 적용합니다.
  }
}

function applyTheme(theme) {
  const selected = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = selected;
  saveTheme(selected);

  const light = selected === "light";
  themeToggle.querySelector("span").textContent = light ? "☾" : "☀";
  themeToggle.setAttribute("aria-label", light ? "어두운 테마로 변경" : "밝은 테마로 변경");
}

themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
});

window.addEventListener("popstate", syncFromHash);
window.addEventListener("hashchange", syncFromHash);

applyRequestedLayoutFixes();
installArcanaCardStyles();
renderList();
applyTheme(readSavedTheme() || "dark");
syncFromHash();
