const SITE_BUILD_VERSION = "v40-multilingual";
const LANGUAGE_STORAGE_KEY = "starsavior-guide-language";
const SUPPORTED_LANGUAGES = ["ko", "en", "ja", "zh-TW", "zh-CN"];
const LANGUAGE_HTML_CODES = {
  ko: "ko-KR",
  en: "en",
  ja: "ja",
  "zh-TW": "zh-Hant",
  "zh-CN": "zh-Hans"
};
const I18N_DATA = {"saviorNames":{"en":{"아세라":"Asherah","스마일":"Smile","루나":"Luna","카넬리아":"Carnelia","벨 리스":"Bell","에밀리":"Emily","샤를":"Charlotte","카르멘":"Carmen","프레이":"Frey","세이라":"Seira","트리쉬":"Trish","린":"Lyn","에데":"Haydee","세르팡":"Serpang","다나":"Dana","뮤리엘":"Muriel","엘리사":"Elisa","티리아":"Tyria","로베르타":"Roberta","루그":"Lugh","페이":"Fei","에핀델":"Epindel","오메가":"Omega","세레스":"Ceres","리디아":"Lydia","할리":"Harley","페트라":"Petra","스칼렛":"Scarlet","클레어":"Claire","레이시":"Lacy","타냐":"Tanya","릴리":"Lily","키라":"Kyra","베스타":"Besta","안나":"Annah","마르실":"Marcille","베라":"Vera","나루":"Naru","클라리사":"Clarissa","힐데":"Hilde","유미나":"Yoo Mina","로자리아":"Rosaria"},"ja":{"아세라":"アセラ","스마일":"スマイル","루나":"ルナ","카넬리아":"カーネリア","벨 리스":"ベル・リース","에밀리":"エミリー","샤를":"シャル","카르멘":"カルメン","프레이":"フレイ","세이라":"セイラ","트리쉬":"トリッシュ","린":"リン","에데":"エデ","세르팡":"セルパン","다나":"ダナ","뮤리엘":"ミュリエル","엘리사":"エリサ","티리아":"ティリア","로베르타":"ロベルタ","루그":"ルグ","페이":"フェイ","에핀델":"エピンデル","오메가":"オメガ","세레스":"セレス","리디아":"リディア","할리":"ハーレー","페트라":"ペトラ","스칼렛":"スカーレット","클레어":"クレア","레이시":"レイシー","타냐":"ターニャ","릴리":"リリー","키라":"キラ","베스타":"ベスタ","안나":"アンナ","마르실":"マルシル","베라":"ベラ","나루":"ナル","클라리사":"クラリッサ","힐데":"ヒルデ","유미나":"ユ・ミナ","로자리아":"ロザリア"},"zh-TW":{"아세라":"Asherah","스마일":"Smile","루나":"Luna","카넬리아":"Carnelia","벨 리스":"Bell","에밀리":"Emily","샤를":"Charlotte","카르멘":"Carmen","프레이":"Frey","세이라":"Seira","트리쉬":"Trish","린":"Lyn","에데":"Haydee","세르팡":"Serpang","다나":"Dana","뮤리엘":"Muriel","엘리사":"Elisa","티리아":"Tyria","로베르타":"Roberta","루그":"Lugh","페이":"Fei","에핀델":"Epindel","오메가":"Omega","세레스":"Ceres","리디아":"Lydia","할리":"Harley","페트라":"Petra","스칼렛":"Scarlet","클레어":"Claire","레이시":"Lacy","타냐":"Tanya","릴리":"Lily","키라":"Kyra","베스타":"Besta","안나":"Annah","마르실":"Marcille","베라":"Vera","나루":"Naru","클라리사":"Clarissa","힐데":"Hilde","유미나":"Yoo Mina","로자리아":"Rosaria"},"zh-CN":{"아세라":"Asherah","스마일":"Smile","루나":"Luna","카넬리아":"Carnelia","벨 리스":"Bell","에밀리":"Emily","샤를":"Charlotte","카르멘":"Carmen","프레이":"Frey","세이라":"Seira","트리쉬":"Trish","린":"Lyn","에데":"Haydee","세르팡":"Serpang","다나":"Dana","뮤리엘":"Muriel","엘리사":"Elisa","티리아":"Tyria","로베르타":"Roberta","루그":"Lugh","페이":"Fei","에핀델":"Epindel","오메가":"Omega","세레스":"Ceres","리디아":"Lydia","할리":"Harley","페트라":"Petra","스칼렛":"Scarlet","클레어":"Claire","레이시":"Lacy","타냐":"Tanya","릴리":"Lily","키라":"Kyra","베스타":"Besta","안나":"Annah","마르실":"Marcille","베라":"Vera","나루":"Naru","클라리사":"Clarissa","힐데":"Hilde","유미나":"Yoo Mina","로자리아":"Rosaria"}},"subtitles":{"en":{"보이저 구원단":"Voyager Savior Party","방랑자":"Wanderer","캔들 스퀘어":"Candle Square","모나스티르 기사단":"Monastir Knights","나이트메어":"Nightmare","아셀루스 협회":"Aselus Association","풍월문":"Wind Moon Sect","모렐 해양상단":"Morrel Ocean Traders","카노푸스 레인저":"Canopus Rangers","모노리스 교단":"Monolith Order","집행자":"Executor","궤도 수색대":"Orbital Search Team","오를랑 가문":"House Orlang","하트 오브 모나스티르":"Heart of Monastir","서부 해방군":"Western Liberators","헬 세이비어":"Hell Savior","페트라 조합":"Petra Construction","리틀 타이런트":"Little Tyrant","플로리스 블루 로즈":"Flawless Blue Rose","람파디스":"Lampadis","키라는 친구 같은 거 없어":"Kyra Doesn't Have Friends","왈츠 오브 스타라이트":"Waltz of Starlight","이터널 프로미스":"Eternal Promise","블레싱 인 블룸":"Blessing in Bloom","노블 프린세스":"Noble Princess","노아 마을 경비대":"NOA Town Guard","운송 길드":"Courier Guild","펜릴 소대":"Fenrir Squad","폴른 호크":"Fallen Hawk","화이트 펄 트랩":"White Pearl Trap","선샤인 캣":"Sunshine Cat"},"ja":{"보이저 구원단":"ボイジャー救援団","방랑자":"放浪者","캔들 스퀘어":"キャンドルスクエア","모나스티르 기사단":"モナスティール騎士団","나이트메어":"ナイトメア","아셀루스 협회":"アセルス協会","풍월문":"風月門","모렐 해양상단":"モレル海洋商団","카노푸스 레인저":"カノープス・レンジャー","모노리스 교단":"モノリス教団","집행자":"執行者","궤도 수색대":"軌道捜索隊","오를랑 가문":"オルラン家","하트 오브 모나스티르":"ハート・オブ・モナスティール","서부 해방군":"西部解放軍","헬 세이비어":"ヘル・セイバー","페트라 조합":"ペトラ組合","리틀 타이런트":"リトル・タイラント","플로리스 블루 로즈":"フローレス・ブルーローズ","람파디스":"ランパディス","키라는 친구 같은 거 없어":"キラに友達なんていない","왈츠 오브 스타라이트":"ワルツ・オブ・スターライト","이터널 프로미스":"エターナル・プロミス","블레싱 인 블룸":"ブレッシング・イン・ブルーム","노블 프린세스":"ノーブル・プリンセス","노아 마을 경비대":"NOA村警備隊","운송 길드":"運送ギルド","펜릴 소대":"フェンリル小隊","폴른 호크":"フォールン・ホーク","화이트 펄 트랩":"ホワイト・パール・トラップ","선샤인 캣":"サンシャイン・キャット"},"zh-TW":{"보이저 구원단":"旅者救援團","방랑자":"流浪者","캔들 스퀘어":"燭光廣場","모나스티르 기사단":"莫納斯提爾騎士團","나이트메어":"夢魘","아셀루스 협회":"阿塞魯斯協會","풍월문":"風月門","모렐 해양상단":"莫雷爾海洋商團","카노푸스 레인저":"卡諾普斯遊騎隊","모노리스 교단":"莫諾利斯教團","집행자":"執行者","궤도 수색대":"軌道搜索隊","오를랑 가문":"奧爾朗家族","하트 오브 모나스티르":"莫納斯提爾之心","서부 해방군":"西部解放軍","헬 세이비어":"地獄救援者","페트라 조합":"佩特拉工會","리틀 타이런트":"小小暴君","플로리스 블루 로즈":"無瑕藍玫瑰","람파디스":"蘭帕迪斯","키라는 친구 같은 거 없어":"琪拉才沒有朋友","왈츠 오브 스타라이트":"星光華爾滋","이터널 프로미스":"永恆誓約","블레싱 인 블룸":"綻放的祝福","노블 프린세스":"高貴公主","노아 마을 경비대":"NOA村警備隊","운송 길드":"運輸公會","펜릴 소대":"芬里爾小隊","폴른 호크":"墮落之鷹","화이트 펄 트랩":"白珍珠陷阱","선샤인 캣":"陽光貓"},"zh-CN":{"보이저 구원단":"旅者救援团","방랑자":"流浪者","캔들 스퀘어":"烛光广场","모나스티르 기사단":"莫納斯提尔騎士团","나이트메어":"梦魇","아셀루스 협회":"阿塞魯斯协会","풍월문":"風月门","모렐 해양상단":"莫雷尔海洋商团","카노푸스 레인저":"卡諾普斯游骑队","모노리스 교단":"莫諾利斯教团","집행자":"執行者","궤도 수색대":"轨道搜索队","오를랑 가문":"奥尔朗家族","하트 오브 모나스티르":"莫納斯提尔之心","서부 해방군":"西部解放军","헬 세이비어":"地獄救援者","페트라 조합":"佩特拉工会","리틀 타이런트":"小小暴君","플로리스 블루 로즈":"无瑕蓝玫瑰","람파디스":"蘭帕迪斯","키라는 친구 같은 거 없어":"琪拉才沒有朋友","왈츠 오브 스타라이트":"星光华尔兹","이터널 프로미스":"永恒誓约","블레싱 인 블룸":"绽放的祝福","노블 프린세스":"高貴公主","노아 마을 경비대":"NOA村警备队","운송 길드":"运输公会","펜릴 소대":"芬里尔小队","폴른 호크":"堕落之鷹","화이트 펄 트랩":"白珍珠陷阱","선샤인 캣":"阳光猫"}},"arcana":{"en":{"단점 보완 맞춤 훈련":"Customized Training to Cover Weaknesses","꽃들에게 죽음을":"Death for the Flowers","하늘의 심판":"Divine Judgement","죽음이 둘을 갈라놓을 때까지":"Till Death Do Us Part","불굴의 역작":"The Indomitable Masterpiece","하얀 달의 온기는 햇빛처럼":"A White Moon Shines With the Sun's Warmth","누각 위, 유리달 맞이":"Under the Glass Moon, Over the Pavilion","조용한 휴식 시간":"A Quiet Moment of Rest","스트라니스의 영애":"Young Lady of Stranis","완벽한 바니걸":"The Perfect Bunny Girl","키라만큼 귀여워!":"As Cute as Kyra!","오늘의 한 걸음":"Today's Step Forward","나른한 오후의 틈새":"A Drowsy Afternoon Interlude","공녀, 왕좌에 오르다":"The Princess Ascends the Throne","본 투 비 와일드":"Born to Be Wild","허수의 개척자":"The Imaginary Pioneer","종말은 소녀의 얼굴을 하고 있다.":"The End Wears the Face of a Girl","깊은 애도":"Deep Mourning","노스텔지어의 역습":"Nostalgia Strikes Back","하늘의 시련":"Divine Trial","금단의 기록물 Vol. 1":"Forbidden Archive Vol. 1","금단의 기록물":"Forbidden Archive Vol. 1","만족스러운 식사":"A Satisfying Meal","어느 한 기사의 맹세":"A Knight's Oath","서투른 욕망 해소법":"A Clumsy Way to Relieve Desire","노 페인, 노 게인":"No Pain, No Gain","메이드 바이 페트라♡":"Made by Petra♡","별을 보며 꿈을":"Dreams Under the Stars","음독의 각오":"Even If It's Poison","누구보다 프로페셔널":"More Than Professional","서류 더미 위의 책임감":"Responsibility Atop a Pile of Paperwork","언더커버 캅":"Undercover Cop","빛을 쫓아라!":"Follow the Light!","빛을 쫓아라":"Follow the Light!"},"ja":{"단점 보완 맞춤 훈련":"弱点補完カスタムトレーニング","꽃들에게 죽음을":"花々に死を","하늘의 심판":"天の審判","죽음이 둘을 갈라놓을 때까지":"死が二人を分かつまで","불굴의 역작":"不屈の傑作","하얀 달의 온기는 햇빛처럼":"白い月のぬくもりは陽光のように","누각 위, 유리달 맞이":"楼閣の上、硝子の月を迎えて","조용한 휴식 시간":"静かな休息のひととき","스트라니스의 영애":"ストラニスの令嬢","완벽한 바니걸":"完璧なバニーガール","키라만큼 귀여워!":"キラくらいかわいい！","오늘의 한 걸음":"今日の一歩","나른한 오후의 틈새":"けだるい午後のひととき","공녀, 왕좌에 오르다":"公女、王座に就く","본 투 비 와일드":"ボーン・トゥ・ビー・ワイルド","허수의 개척자":"虚数の開拓者","종말은 소녀의 얼굴을 하고 있다.":"終末は少女の顔をしている","깊은 애도":"深い哀悼","노스텔지어의 역습":"ノスタルジアの逆襲","하늘의 시련":"天の試練","금단의 기록물 Vol. 1":"禁断の記録物 Vol. 1","금단의 기록물":"禁断の記録物 Vol. 1","만족스러운 식사":"満足な食事","어느 한 기사의 맹세":"ある騎士の誓い","서투른 욕망 해소법":"不器用な欲望解消法","노 페인, 노 게인":"ノーペイン・ノーゲイン","메이드 바이 페트라♡":"メイド・バイ・ペトラ♡","별을 보며 꿈을":"星を見ながら夢を","음독의 각오":"毒でも覚悟のうえ","누구보다 프로페셔널":"誰よりもプロフェッショナル","서류 더미 위의 책임감":"書類の山の上の責任感","언더커버 캅":"アンダーカバー・コップ","빛을 쫓아라!":"光を追え！","빛을 쫓아라":"光を追え！"},"zh-TW":{"단점 보완 맞춤 훈련":"弱點補強專屬訓練","꽃들에게 죽음을":"賜予花朵死亡","하늘의 심판":"天空的審判","죽음이 둘을 갈라놓을 때까지":"直到死亡將兩人分開","불굴의 역작":"不屈的傑作","하얀 달의 온기는 햇빛처럼":"白月的溫暖如同陽光","누각 위, 유리달 맞이":"樓閣之上，迎接琉璃月","조용한 휴식 시간":"寧靜的休息時光","스트라니스의 영애":"斯特拉尼斯的千金","완벽한 바니걸":"完美兔女郎","키라만큼 귀여워!":"和琪拉一樣可愛！","오늘의 한 걸음":"今天的一步","나른한 오후의 틈새":"慵懶午後的片刻","공녀, 왕좌에 오르다":"公女登上王座","본 투 비 와일드":"生而狂野","허수의 개척자":"虛數的開拓者","종말은 소녀의 얼굴을 하고 있다.":"末日有著少女的面容","깊은 애도":"深切哀悼","노스텔지어의 역습":"鄉愁反擊","하늘의 시련":"天空的試煉","금단의 기록물 Vol. 1":"禁忌記錄物 Vol. 1","금단의 기록물":"禁忌記錄物 Vol. 1","만족스러운 식사":"令人滿足的一餐","어느 한 기사의 맹세":"某位騎士的誓言","서투른 욕망 해소법":"笨拙的欲望排解法","노 페인, 노 게인":"No Pain, No Gain","메이드 바이 페트라♡":"Made by Petra♡","별을 보며 꿈을":"望著星星做夢","음독의 각오":"即使是毒也在所不惜","누구보다 프로페셔널":"比任何人都專業","서류 더미 위의 책임감":"文件堆上的責任感","언더커버 캅":"臥底警察","빛을 쫓아라!":"追逐光芒！","빛을 쫓아라":"追逐光芒！"},"zh-CN":{"단점 보완 맞춤 훈련":"弱点補強专属训练","꽃들에게 죽음을":"赐予花朵死亡","하늘의 심판":"天空的审判","죽음이 둘을 갈라놓을 때까지":"直到死亡将兩人分開","불굴의 역작":"不屈的杰作","하얀 달의 온기는 햇빛처럼":"白月的温暖如同阳光","누각 위, 유리달 맞이":"楼阁之上，迎接琉璃月","조용한 휴식 시간":"宁静的休息时光","스트라니스의 영애":"斯特拉尼斯的千金","완벽한 바니걸":"完美兔女郎","키라만큼 귀여워!":"和琪拉一样可爱！","오늘의 한 걸음":"今天的一步","나른한 오후의 틈새":"慵懒午後的片刻","공녀, 왕좌에 오르다":"公女登上王座","본 투 비 와일드":"生而狂野","허수의 개척자":"虚数的開拓者","종말은 소녀의 얼굴을 하고 있다.":"末日有着少女的面容","깊은 애도":"深切哀悼","노스텔지어의 역습":"乡愁反擊","하늘의 시련":"天空的试炼","금단의 기록물 Vol. 1":"禁忌记录物 Vol. 1","금단의 기록물":"禁忌记录物 Vol. 1","만족스러운 식사":"令人满足的一餐","어느 한 기사의 맹세":"某位骑士的誓言","서투른 욕망 해소법":"笨拙的欲望排解法","노 페인, 노 게인":"No Pain, No Gain","메이드 바이 페트라♡":"Made by Petra♡","별을 보며 꿈을":"望着星星做夢","음독의 각오":"即使是毒也在所不惜","누구보다 프로페셔널":"比任何人都专业","서류 더미 위의 책임감":"文件堆上的责任感","언더커버 캅":"卧底警察","빛을 쫓아라!":"追逐光芒！","빛을 쫓아라":"追逐光芒！"}},"ui":{"en":{"본문으로 바로가기":"Skip to content","구원자 목록으로 이동":"Go to Savior list","주요 메뉴":"Main navigation","구원자":"Saviors","장비":"Equipment","코스모 게이트":"Cosmo Gate","밝은 테마로 변경":"Switch to light theme","어두운 테마로 변경":"Switch to dark theme","등록된 구원자":"Registered Saviors","구원자 검색 및 필터":"Savior search and filters","구원자 검색":"Search Saviors","이름, 소속, 역할 검색":"Search name, affiliation, or role","속성":"Element","전체":"All","클래스":"Class","명의 구원자":" Saviors","필터 초기화":"Reset filters","조건에 맞는 구원자가 없습니다.":"No Saviors match the current filters.","검색어나 필터를 변경해 주세요.":"Try changing the search term or filters.","구원자 목록":"Savior List","스킬설명 및 상세정보":"Skills & Details","육성 우선순위":"Growth Priority","PVE 기준":"PVE Standard","주 사용 콘텐츠":"Main Content","장비 세팅":"Equipment Setup","아르카나 세팅":"Arcana Setup","PVE 추천 아르카나":"Recommended PVE Arcana","대체 아르카나":"Alternative Arcana","주요 PVE 콘텐츠":"Main PVE Content","보유 상황에 따라 교체":"Swap based on availability","목걸이":"Necklace","반지":"Ring","추천 세트":"Recommended Sets","잠재력":"Potential","미정":"TBD","미등록":"Not Registered","대체 아르카나가 등록되지 않았습니다.":"No alternative Arcana registered.","원본 시트 표기":"Source sheet notation","선택":"Choose","주옵션 (Tier 2)":"Main Stats (Tier 2)","부옵션 (Tier 2)":"Substats (Tier 2)","장비 개요":"Equipment Overview","구원자 장비 주옵션 및 부옵션 정보입니다.":"Main-stat and substat information for Savior equipment.","부위":"Slot","주 능력치":"Main Stat","기본 주능력치 (+0)":"Base Main Stat (+0)","기본 주능력치 (+15)":"Base Main Stat (+15)","옵션":"Option","세트별 권장 능력치":"Recommended stats by set","장비 티어 판정 기준":"Equipment tier criteria","작전":"Operations","회랑":"Cloister","플래시 포인트":"Flash Point","인자작":"Trait Farming","없음":"None","기본기":"Basic Skill","특수기":"Special Skill","궁극기":"Ultimate","한정":"Limited","개화 필수":"Bloom required","1돌파 이상 필수":"Resonance 1+ required","1돌파 이상 권장":"Resonance 1+ recommended","PVE 추천 세팅":"Recommended PVE Setup","장비 가이드 바로가기":"Open Equipment Guide","필터":"Filter","구원자 정보는 ":"Savior information follows "," 기준입니다.":" as the source.","스타세이비어 DB":"Star Savior DB","아카라이브 스타세이비어 채널 원샷 세팅표":"Arca.live Star Savior one-shot setup sheet","PVE장비 및 아르카나는 ":"PVE equipment and Arcana follow ","를 기준으로 합니다.":" as the source.","작전 · 회랑 · 코스모 게이트":"Operations · Cloister · Cosmo Gate","적중(2)는 투지(2)로 대체가능.":"Accuracy(2) can be replaced with Fighting Spirit(2).","* 적중(2)는 투지(2)로 대체가능.":"* Accuracy(2) can be replaced with Fighting Spirit(2).","※ 딜러 기준으로 공격력% 수치가 높을 시 0.5티어 상승.":"※ For DPS units, high ATK% can raise the equipment rating by 0.5 tier.","* 속도 수치가 높을 시 0.5티어 상승.":"* High SPD can raise the equipment rating by 0.5 tier.","딜러 서브딜러 딜탱은 공격력, 공격력% 또는 생명력, 생명력%, 치명타 확률, 치명타 피해, 속도를 유효 옵션으로 사용합니다.":"DPS, sub-DPS, and bruisers use ATK/ATK%, HP/HP%, CRIT Rate, CRIT DMG, and SPD as useful stats.","일부 구원자는 효과 적중, 방어력, 방어력% 도 유효 옵션으로 활용합니다.":"Some Saviors also make effective use of Effect Hit, DEF, and DEF%.","장비 부족 시 치명타 확률 + 추가 유효 옵션 1줄 조합도 사용할 수 있습니다.":"When gear is limited, CRIT Rate plus one additional useful substat is acceptable.","장비 세팅이 충분히 갖춰진 이후에는 유효 옵션 3 이상 장비 사용을 권장합니다.":"Once your gear pool is established, equipment with at least three useful substats is recommended.","착용 시 권장 치확 90% 이상, 치피 90% 이상":"Recommended: CRIT Rate 90%+ and CRIT DMG 90%+.","착용 시 권장 치확 80% 이상, 치피 140% 이상":"Recommended: CRIT Rate 80%+ and CRIT DMG 140%+.","착용 시 권장 효적 140% 이상":"Recommended: Effect Hit 140%+.","치확 + 치피의 합이 ":"If CRIT Rate + CRIT DMG totals ","일 경우 0티어 장비.":", the item is Tier 0.","일 경우 1티어 장비.":", the item is Tier 1.","일 경우 2티어 장비.":", the item is Tier 2.","일 경우 3티어 장비.":", the item is Tier 3.","이 페이지는 게임 '스타 세이비어'의 비영리 팬 프로젝트입니다.":"This page is a non-profit fan project for Star Savior.","프로젝트에 사용된 모든 자산, 데이터, 이미지 및 텍스트의 소유권은 STUDIOBSIDE 에 있습니다.":"All assets, data, images, and text used in this project belong to STUDIOBSIDE.","검색과 상세 화면을 사용하려면 JavaScript를 활성화해 주세요.":"Please enable JavaScript to use search and detail views.","상세 세팅 보기":"View detailed setup"},"ja":{"본문으로 바로가기":"本文へスキップ","구원자 목록으로 이동":"救援者一覧へ","주요 메뉴":"メインメニュー","구원자":"救援者","장비":"装備","코스모 게이트":"コスモゲート","밝은 테마로 변경":"ライトテーマに変更","어두운 테마로 변경":"ダークテーマに変更","등록된 구원자":"登録済み救援者","구원자 검색 및 필터":"救援者の検索とフィルター","구원자 검색":"救援者を検索","이름, 소속, 역할 검색":"名前・所属・役割で検索","속성":"属性","전체":"すべて","클래스":"クラス","명의 구원자":"人の救援者","필터 초기화":"フィルターをリセット","조건에 맞는 구원자가 없습니다.":"条件に一致する救援者はいません。","검색어나 필터를 변경해 주세요.":"検索語やフィルターを変更してください。","구원자 목록":"救援者一覧","스킬설명 및 상세정보":"スキル説明・詳細情報","육성 우선순위":"育成優先度","PVE 기준":"PVE基準","주 사용 콘텐츠":"主な使用コンテンツ","장비 세팅":"装備セッティング","아르카나 세팅":"アルカナセッティング","PVE 추천 아르카나":"PVEおすすめアルカナ","대체 아르카나":"代替アルカナ","주요 PVE 콘텐츠":"主要PVEコンテンツ","보유 상황에 따라 교체":"所持状況に応じて交換","목걸이":"ネックレス","반지":"リング","추천 세트":"おすすめセット","잠재력":"潜在力","미정":"未定","미등록":"未登録","대체 아르카나가 등록되지 않았습니다.":"代替アルカナは登録されていません。","원본 시트 표기":"元シート表記","선택":"選択","주옵션 (Tier 2)":"メインオプション (Tier 2)","부옵션 (Tier 2)":"サブオプション (Tier 2)","장비 개요":"装備概要","구원자 장비 주옵션 및 부옵션 정보입니다.":"救援者装備のメイン・サブオプション情報です。","부위":"部位","주 능력치":"メイン能力値","기본 주능력치 (+0)":"基本メイン能力値 (+0)","기본 주능력치 (+15)":"基本メイン能力値 (+15)","옵션":"オプション","세트별 권장 능력치":"セット別推奨能力値","장비 티어 판정 기준":"装備Tier判定基準","작전":"作戦","회랑":"回廊","플래시 포인트":"フラッシュポイント","인자작":"因子厳選","없음":"なし","기본기":"基本技","특수기":"特殊技","궁극기":"究極技","한정":"限定","개화 필수":"開花必須","1돌파 이상 필수":"1凸以上必須","1돌파 이상 권장":"1凸以上推奨","PVE 추천 세팅":"PVEおすすめセッティング","장비 가이드 바로가기":"装備ガイドを開く","구원자 정보는 ":"救援者情報は "," 기준입니다.":" を基準としています。","스타세이비어 DB":"Star Savior DB","아카라이브 스타세이비어 채널 원샷 세팅표":"Arca.live Star Savior ワンショットセッティング表","PVE장비 및 아르카나는 ":"PVE装備・アルカナは ","를 기준으로 합니다.":" を基準としています。","작전 · 회랑 · 코스모 게이트":"作戦 · 回廊 · コスモゲート","적중(2)는 투지(2)로 대체가능.":"命中(2)は闘志(2)で代用可能です。","* 적중(2)는 투지(2)로 대체가능.":"* 命中(2)は闘志(2)で代用可能です。","※ 딜러 기준으로 공격력% 수치가 높을 시 0.5티어 상승.":"※ アタッカー基準で攻撃力%が高い場合、0.5 Tier上昇。","* 속도 수치가 높을 시 0.5티어 상승.":"* 速度が高い場合、0.5 Tier上昇。","딜러 서브딜러 딜탱은 공격력, 공격력% 또는 생명력, 생명력%, 치명타 확률, 치명타 피해, 속도를 유효 옵션으로 사용합니다.":"アタッカー、サブアタッカー、ブルーザーは攻撃力/攻撃力%、生命力/生命力%、クリ率、クリダメ、速度を有効オプションとして使用します。","일부 구원자는 효과 적중, 방어력, 방어력% 도 유효 옵션으로 활용합니다.":"一部の救援者は効果命中、防御力、防御力%も有効です。","장비 부족 시 치명타 확률 + 추가 유효 옵션 1줄 조합도 사용할 수 있습니다.":"装備が不足している場合、クリ率＋有効オプション1行の組み合わせも使用できます。","장비 세팅이 충분히 갖춰진 이후에는 유효 옵션 3 이상 장비 사용을 권장합니다.":"装備が揃った後は、有効オプション3つ以上の装備を推奨します。","이 페이지는 게임 '스타 세이비어'의 비영리 팬 프로젝트입니다.":"このページはゲーム『Star Savior』の非営利ファンプロジェクトです。","프로젝트에 사용된 모든 자산, 데이터, 이미지 및 텍스트의 소유권은 STUDIOBSIDE 에 있습니다.":"本プロジェクトで使用するすべてのアセット、データ、画像、テキストの権利はSTUDIOBSIDEに帰属します。","검색과 상세 화면을 사용하려면 JavaScript를 활성화해 주세요.":"検索と詳細画面を利用するにはJavaScriptを有効にしてください。","상세 세팅 보기":"詳細セッティングを見る"},"zh-TW":{"본문으로 바로가기":"跳至正文","구원자 목록으로 이동":"前往救援者列表","주요 메뉴":"主選單","구원자":"救援者","장비":"裝備","코스모 게이트":"宇宙之門","밝은 테마로 변경":"切換至淺色主題","어두운 테마로 변경":"切換至深色主題","등록된 구원자":"已登錄救援者","구원자 검색 및 필터":"救援者搜尋與篩選","구원자 검색":"搜尋救援者","이름, 소속, 역할 검색":"搜尋名稱、所屬或定位","속성":"屬性","전체":"全部","클래스":"職業","명의 구원자":" 名救援者","필터 초기화":"重設篩選","조건에 맞는 구원자가 없습니다.":"沒有符合條件的救援者。","검색어나 필터를 변경해 주세요.":"請調整搜尋詞或篩選條件。","구원자 목록":"救援者列表","스킬설명 및 상세정보":"技能說明與詳細資訊","육성 우선순위":"培養優先度","PVE 기준":"PVE基準","주 사용 콘텐츠":"主要使用內容","장비 세팅":"裝備配置","아르카나 세팅":"阿爾卡納配置","PVE 추천 아르카나":"PVE推薦阿爾卡納","대체 아르카나":"替代阿爾卡納","주요 PVE 콘텐츠":"主要PVE內容","보유 상황에 따라 교체":"依持有情況替換","목걸이":"項鍊","반지":"戒指","추천 세트":"推薦套裝","잠재력":"潛能","미정":"未定","미등록":"未登錄","대체 아르카나가 등록되지 않았습니다.":"尚未登錄替代阿爾卡納。","원본 시트 표기":"原始表格標記","선택":"選擇","주옵션 (Tier 2)":"主屬性 (Tier 2)","부옵션 (Tier 2)":"副屬性 (Tier 2)","장비 개요":"裝備概要","구원자 장비 주옵션 및 부옵션 정보입니다.":"救援者裝備的主屬性與副屬性資訊。","부위":"部位","주 능력치":"主能力值","기본 주능력치 (+0)":"基礎主能力值 (+0)","기본 주능력치 (+15)":"基礎主能力值 (+15)","옵션":"選項","세트별 권장 능력치":"各套裝推薦能力值","장비 티어 판정 기준":"裝備Tier判定基準","작전":"作戰","회랑":"迴廊","플래시 포인트":"閃點","인자작":"因子培養","없음":"無","기본기":"基本技","특수기":"特殊技","궁극기":"終極技","한정":"限定","개화 필수":"開花必須","1돌파 이상 필수":"1突破以上必須","1돌파 이상 권장":"建議1突破以上","PVE 추천 세팅":"PVE推薦配置","장비 가이드 바로가기":"前往裝備指南","구원자 정보는 ":"救援者資訊以 "," 기준입니다.":" 為基準。","스타세이비어 DB":"Star Savior DB","아카라이브 스타세이비어 채널 원샷 세팅표":"Arca.live Star Savior 一站式配置表","PVE장비 및 아르카나는 ":"PVE裝備與阿爾卡納以 ","를 기준으로 합니다.":" 為基準。","작전 · 회랑 · 코스모 게이트":"作戰 · 迴廊 · 宇宙之門","적중(2)는 투지(2)로 대체가능.":"命中(2)可由鬥志(2)替代。","* 적중(2)는 투지(2)로 대체가능.":"* 命中(2)可由鬥志(2)替代。","※ 딜러 기준으로 공격력% 수치가 높을 시 0.5티어 상승.":"※ 以輸出角色為基準，攻擊力%較高時提升0.5 Tier。","* 속도 수치가 높을 시 0.5티어 상승.":"* 速度數值較高時提升0.5 Tier。","딜러 서브딜러 딜탱은 공격력, 공격력% 또는 생명력, 생명력%, 치명타 확률, 치명타 피해, 속도를 유효 옵션으로 사용합니다.":"輸出、副輸出與半坦輸出角色可將攻擊力/攻擊力%、生命值/生命值%、暴擊率、暴擊傷害、速度視為有效屬性。","일부 구원자는 효과 적중, 방어력, 방어력% 도 유효 옵션으로 활용합니다.":"部分救援者也可有效利用效果命中、防禦力與防禦力%。","장비 부족 시 치명타 확률 + 추가 유효 옵션 1줄 조합도 사용할 수 있습니다.":"裝備不足時，也可使用暴擊率＋1條額外有效屬性的組合。","장비 세팅이 충분히 갖춰진 이후에는 유효 옵션 3 이상 장비 사용을 권장합니다.":"裝備成形後，建議使用至少3條有效屬性的裝備。","이 페이지는 게임 '스타 세이비어'의 비영리 팬 프로젝트입니다.":"本頁面是遊戲《Star Savior》的非營利粉絲專案。","프로젝트에 사용된 모든 자산, 데이터, 이미지 및 텍스트의 소유권은 STUDIOBSIDE 에 있습니다.":"本專案使用的所有資產、資料、圖片與文字之權利皆屬於STUDIOBSIDE。","검색과 상세 화면을 사용하려면 JavaScript를 활성화해 주세요.":"請啟用JavaScript以使用搜尋與詳細頁面。","상세 세팅 보기":"查看詳細配置"},"zh-CN":{"본문으로 바로가기":"跳至正文","구원자 목록으로 이동":"前往救援者列表","주요 메뉴":"主選單","구원자":"救援者","장비":"装备","코스모 게이트":"宇宙之门","밝은 테마로 변경":"切換至浅色主题","어두운 테마로 변경":"切換至深色主题","등록된 구원자":"已登录救援者","구원자 검색 및 필터":"救援者搜索與筛选","구원자 검색":"搜索救援者","이름, 소속, 역할 검색":"搜索名称、所属或定位","속성":"属性","전체":"全部","클래스":"职业","명의 구원자":" 名救援者","필터 초기화":"重設筛选","조건에 맞는 구원자가 없습니다.":"沒有符合条件的救援者。","검색어나 필터를 변경해 주세요.":"请调整搜索詞或筛选条件。","구원자 목록":"救援者列表","스킬설명 및 상세정보":"技能说明與详细信息","육성 우선순위":"培养優先度","PVE 기준":"PVE基準","주 사용 콘텐츠":"主要使用内容","장비 세팅":"装备配置","아르카나 세팅":"阿尔卡纳配置","PVE 추천 아르카나":"PVE推荐阿尔卡纳","대체 아르카나":"替代阿尔卡纳","주요 PVE 콘텐츠":"主要PVE内容","보유 상황에 따라 교체":"根据持有情况替换","목걸이":"项链","반지":"戒指","추천 세트":"推荐套装","잠재력":"潜能","미정":"未定","미등록":"未登录","대체 아르카나가 등록되지 않았습니다.":"尚未登录替代阿尔卡纳。","원본 시트 표기":"原始表格标记","선택":"选择","주옵션 (Tier 2)":"主属性 (Tier 2)","부옵션 (Tier 2)":"副属性 (Tier 2)","장비 개요":"装备概要","구원자 장비 주옵션 및 부옵션 정보입니다.":"救援者装备的主属性與副属性信息。","부위":"部位","주 능력치":"主能力值","기본 주능력치 (+0)":"基础主能力值 (+0)","기본 주능력치 (+15)":"基础主能力值 (+15)","옵션":"选项","세트별 권장 능력치":"各套装推荐能力值","장비 티어 판정 기준":"装备Tier判定标准","작전":"作战","회랑":"回廊","플래시 포인트":"闪点","인자작":"因子培养","없음":"无","기본기":"基本技","특수기":"特殊技","궁극기":"终极技","한정":"限定","개화 필수":"开花必须","1돌파 이상 필수":"1突破以上必须","1돌파 이상 권장":"建议1突破以上","PVE 추천 세팅":"PVE推荐配置","장비 가이드 바로가기":"前往装备指南","구원자 정보는 ":"救援者信息以 "," 기준입니다.":" 为基准。","스타세이비어 DB":"Star Savior DB","아카라이브 스타세이비어 채널 원샷 세팅표":"Arca.live Star Savior 一站式配置表","PVE장비 및 아르카나는 ":"PVE装备与阿尔卡纳以 ","를 기준으로 합니다.":" 为基准。","작전 · 회랑 · 코스모 게이트":"作战 · 回廊 · 宇宙之门","적중(2)는 투지(2)로 대체가능.":"命中(2)可由斗志(2)替代。","* 적중(2)는 투지(2)로 대체가능.":"* 命中(2)可由斗志(2)替代。","※ 딜러 기준으로 공격력% 수치가 높을 시 0.5티어 상승.":"※ 以输出角色为基准，攻击力%较高时提升0.5 Tier。","* 속도 수치가 높을 시 0.5티어 상승.":"* 速度数值较高时提升0.5 Tier。","딜러 서브딜러 딜탱은 공격력, 공격력% 또는 생명력, 생명력%, 치명타 확률, 치명타 피해, 속도를 유효 옵션으로 사용합니다.":"输出、副输出与半坦输出角色可将攻击力/攻击力%、生命值/生命值%、暴击率、暴击伤害、速度视为有效属性。","일부 구원자는 효과 적중, 방어력, 방어력% 도 유효 옵션으로 활용합니다.":"部分救援者也可有效利用效果命中、防御力与防御力%。","장비 부족 시 치명타 확률 + 추가 유효 옵션 1줄 조합도 사용할 수 있습니다.":"装备不足时，也可使用暴击率＋1条额外有效属性的组合。","장비 세팅이 충분히 갖춰진 이후에는 유효 옵션 3 이상 장비 사용을 권장합니다.":"装备成形后，建议使用至少3条有效属性的装备。","이 페이지는 게임 '스타 세이비어'의 비영리 팬 프로젝트입니다.":"本页面是游戏《Star Savior》的非营利粉丝项目。","프로젝트에 사용된 모든 자산, 데이터, 이미지 및 텍스트의 소유권은 STUDIOBSIDE 에 있습니다.":"本项目使用的所有资产、数据、图片与文字之权利均属于STUDIOBSIDE。","검색과 상세 화면을 사용하려면 JavaScript를 활성화해 주세요.":"请启用JavaScript以使用搜索与详细页面。","상세 세팅 보기":"查看详细配置"}},"terms":{"en":{"태양":"Sun","달":"Moon","별":"Star","질서":"Order","혼돈":"Chaos","스트라이커":"Striker","어쌔신":"Assassin","레인저":"Ranger","캐스터":"Caster","디펜더":"Defender","서포터":"Supporter","딜러":"DPS","서브딜러":"Sub-DPS","딜탱":"Bruiser","참격":"Slash","타격":"Impact","마법":"Element","정신":"Spirit","속도":"SPD","공격력%":"ATK%","공격력":"ATK","생명력%":"HP%","생명력":"HP","방어력%":"DEF%","방어력":"DEF","치명타 확률":"CRIT Rate","치명타 피해":"CRIT DMG","효과 적중":"Effect Hit","효과 저항":"Effect RES","치확":"CRIT Rate","치피":"CRIT DMG","효적":"Effect Hit","통찰(4)":"Insight(4)","파괴(4)":"Destruction(4)","적중(2)":"Accuracy(2)","투지(2)":"Fighting Spirit(2)","정밀(4)":"Precision(4)","대체":" substitute","공용 아르카나":"Universal Arcana","원본 자료 미등록":"TBD","해당 엑셀에 없음":"Not listed in source sheet","1티어":"Tier 1","2티어":"Tier 2","3티어":"Tier 3","4티어":"Tier 4","0티어":"Tier 0","0.5티어":"Tier 0.5"},"ja":{"태양":"太陽","달":"月","별":"星","질서":"秩序","혼돈":"混沌","스트라이커":"ストライカー","어쌔신":"アサシン","레인저":"レンジャー","캐스터":"キャスター","디펜더":"ディフェンダー","서포터":"サポーター","딜러":"アタッカー","서브딜러":"サブアタッカー","딜탱":"ブルーザー","참격":"斬撃","타격":"打撃","마법":"元素","정신":"精神","속도":"速度","공격력%":"攻撃力%","공격력":"攻撃力","생명력%":"生命力%","생명력":"生命力","방어력%":"防御力%","방어력":"防御力","치명타 확률":"クリティカル率","치명타 피해":"クリティカルダメージ","효과 적중":"効果命中","효과 저항":"効果抵抗","치확":"クリ率","치피":"クリダメ","효적":"効果命中","통찰(4)":"洞察(4)","파괴(4)":"破壊(4)","적중(2)":"命中(2)","투지(2)":"闘志(2)","정밀(4)":"精密(4)","대체":" の代替","공용 아르카나":"共通アルカナ","원본 자료 미등록":"未定","해당 엑셀에 없음":"元シートに記載なし","1티어":"Tier 1","2티어":"Tier 2","3티어":"Tier 3","4티어":"Tier 4","0티어":"Tier 0","0.5티어":"Tier 0.5"},"zh-TW":{"태양":"太陽","달":"月","별":"星","질서":"秩序","혼돈":"混沌","스트라이커":"強襲","어쌔신":"刺客","레인저":"遊俠","캐스터":"術士","디펜더":"防衛者","서포터":"支援者","딜러":"輸出","서브딜러":"副輸出","딜탱":"半坦輸出","참격":"斬擊","타격":"打擊","마법":"元素","정신":"精神","속도":"速度","공격력%":"攻擊力%","공격력":"攻擊力","생명력%":"生命值%","생명력":"生命值","방어력%":"防禦力%","방어력":"防禦力","치명타 확률":"暴擊率","치명타 피해":"暴擊傷害","효과 적중":"效果命中","효과 저항":"效果抵抗","치확":"暴擊率","치피":"暴傷","효적":"效果命中","통찰(4)":"洞察(4)","파괴(4)":"破壞(4)","적중(2)":"命中(2)","투지(2)":"鬥志(2)","정밀(4)":"精密(4)","대체":" 的替代","공용 아르카나":"通用阿爾卡納","원본 자료 미등록":"未定","해당 엑셀에 없음":"原始表格未收錄","1티어":"Tier 1","2티어":"Tier 2","3티어":"Tier 3","4티어":"Tier 4","0티어":"Tier 0","0.5티어":"Tier 0.5"},"zh-CN":{"태양":"太阳","달":"月","별":"星","질서":"秩序","혼돈":"混沌","스트라이커":"强袭","어쌔신":"刺客","레인저":"游侠","캐스터":"术士","디펜더":"防卫者","서포터":"支援者","딜러":"输出","서브딜러":"副输出","딜탱":"半坦输出","참격":"斩击","타격":"打击","마법":"元素","정신":"精神","속도":"速度","공격력%":"攻击力%","공격력":"攻击力","생명력%":"生命值%","생명력":"生命值","방어력%":"防御力%","방어력":"防御力","치명타 확률":"暴击率","치명타 피해":"暴击伤害","효과 적중":"效果命中","효과 저항":"效果抵抗","치확":"暴击率","치피":"暴伤","효적":"效果命中","통찰(4)":"洞察(4)","파괴(4)":"破坏(4)","적중(2)":"命中(2)","투지(2)":"斗志(2)","정밀(4)":"精密(4)","대체":" 的替代","공용 아르카나":"通用阿尔卡纳","원본 자료 미등록":"未定","해당 엑셀에 없음":"原始表格未收录","1티어":"Tier 1","2티어":"Tier 2","3티어":"Tier 3","4티어":"Tier 4","0티어":"Tier 0","0.5티어":"Tier 0.5"}}};
const ORIGINAL_TEXT_NODES = new WeakMap();
const ORIGINAL_ATTRIBUTES = new WeakMap();

function readSavedLanguage() {
  try {
    const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(value) ? value : null;
  } catch {
    return null;
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // 저장이 제한된 환경에서는 현재 세션에만 적용합니다.
  }
}

let currentLanguage = readSavedLanguage() || "ko";

function getLocalizedSaviorName(name, language = currentLanguage) {
  if (language === "ko") return name;
  return I18N_DATA.saviorNames[language]?.[name]
    || I18N_DATA.saviorNames.en?.[name]
    || name;
}

function getLocalizedSubtitle(value, language = currentLanguage) {
  if (language === "ko") return value;
  return I18N_DATA.subtitles[language]?.[value]
    || I18N_DATA.subtitles.en?.[value]
    || value;
}

function getLocalizedArcanaName(name, language = currentLanguage) {
  if (language === "ko") return name;
  return I18N_DATA.arcana[language]?.[name]
    || I18N_DATA.arcana.en?.[name]
    || name;
}

function translateString(value, language = currentLanguage) {
  const source = String(value ?? "");
  if (language === "ko" || !source) return source;

  const leading = source.match(/^\s*/)?.[0] || "";
  const trailing = source.match(/\s*$/)?.[0] || "";
  const core = source.slice(leading.length, source.length - trailing.length || source.length);
  if (!core) return source;

  const uiMap = I18N_DATA.ui[language] || {};
  if (Object.prototype.hasOwnProperty.call(uiMap, core)) {
    return leading + uiMap[core] + trailing;
  }

  const exactSavior = I18N_DATA.saviorNames[language]?.[core];
  if (exactSavior) return leading + exactSavior + trailing;

  const exactSubtitle = I18N_DATA.subtitles[language]?.[core];
  if (exactSubtitle) return leading + exactSubtitle + trailing;

  const exactArcana = I18N_DATA.arcana[language]?.[core];
  if (exactArcana) return leading + exactArcana + trailing;

  const replaceFromMaps = [
    I18N_DATA.arcana[language],
    I18N_DATA.subtitles[language],
    I18N_DATA.saviorNames[language],
    I18N_DATA.ui[language],
    I18N_DATA.terms[language]
  ].filter(Boolean);

  let translated = core;
  replaceFromMaps.forEach((map) => {
    Object.entries(map)
      .sort((a, b) => b[0].length - a[0].length)
      .forEach(([from, to]) => {
        if (from && translated.includes(from)) translated = translated.split(from).join(to);
      });
  });

  return leading + translated + trailing;
}

function translateTextNode(node) {
  if (!ORIGINAL_TEXT_NODES.has(node)) {
    ORIGINAL_TEXT_NODES.set(node, node.nodeValue);
  }
  node.nodeValue = translateString(ORIGINAL_TEXT_NODES.get(node));
}

function translateElementAttributes(element) {
  if (element.matches?.("#language-select, #language-select option")) return;

  const watched = ["aria-label", "placeholder", "title"];
  let saved = ORIGINAL_ATTRIBUTES.get(element);
  if (!saved) {
    saved = {};
    watched.forEach((name) => {
      if (element.hasAttribute?.(name)) saved[name] = element.getAttribute(name);
    });
    ORIGINAL_ATTRIBUTES.set(element, saved);
  }

  Object.entries(saved).forEach(([name, original]) => {
    element.setAttribute(name, translateString(original));
  });
}

function applyLanguageToDOM(root = document.body) {
  if (!root) return;

  if (root.nodeType === Node.ELEMENT_NODE) translateElementAttributes(root);

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches?.("script, style, #language-select, #language-select *")) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
        if (node.nodeType === Node.TEXT_NODE) {
          const parent = node.parentElement;
          if (!parent || parent.closest("script, style, #language-select")) return NodeFilter.FILTER_REJECT;
          return /[가-힣]/.test(node.nodeValue || "") || ORIGINAL_TEXT_NODES.has(node)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_SKIP;
      }
    }
  );

  let node = walker.currentNode;
  while (node) {
    if (node.nodeType === Node.ELEMENT_NODE) translateElementAttributes(node);
    if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
    node = walker.nextNode();
  }
}

function refreshLanguageChrome() {
  document.documentElement.lang = LANGUAGE_HTML_CODES[currentLanguage] || "ko-KR";
  const languageSelect = document.querySelector("#language-select");
  if (languageSelect) {
    languageSelect.value = currentLanguage;
    languageSelect.setAttribute("aria-label", currentLanguage === "ko" ? "언어 변경" :
      currentLanguage === "ja" ? "言語を変更" :
      currentLanguage === "zh-TW" ? "切換語言" :
      currentLanguage === "zh-CN" ? "切换语言" : "Change language");
  }

  const titles = {
    ko: "스타세이비어 구원자 가이드 DB",
    en: "Star Savior Guide DB",
    ja: "Star Savior 救援者ガイドDB",
    "zh-TW": "Star Savior 救援者指南 DB",
    "zh-CN": "Star Savior 救援者指南 DB"
  };
  document.title = titles[currentLanguage] || titles.ko;

  const descriptions = {
    ko: "스타세이비어 구원자별 PVE 장비와 아르카나 조합을 확인하는 비공식 가이드 데이터베이스",
    en: "Unofficial Star Savior guide database for PVE equipment and Arcana setups by Savior.",
    ja: "Star Saviorの救援者別PVE装備・アルカナ構成を確認できる非公式ガイドDB。",
    "zh-TW": "依救援者整理 Star Savior PVE 裝備與阿爾卡納配置的非官方指南資料庫。",
    "zh-CN": "按救援者整理 Star Savior PVE 装备与阿尔卡纳配置的非官方指南数据库。"
  };
  document.querySelector('meta[name="description"]')?.setAttribute("content", descriptions[currentLanguage] || descriptions.ko);
}

function setLanguage(language, options = {}) {
  const selected = SUPPORTED_LANGUAGES.includes(language) ? language : "ko";
  currentLanguage = selected;
  if (!options.skipSave) saveLanguage(selected);
  refreshLanguageChrome();
  renderList();
  applyLanguageToDOM(document.body);
  // 테마 버튼의 현재 상태에 맞는 접근성 라벨을 선택 언어로 갱신합니다.
  if (typeof applyTheme === "function") {
    applyTheme(document.documentElement.dataset.theme || "dark", { skipSave: true });
  }
}

const ELEMENT_LABELS = {
  sun: "태양",
  moon: "달",
  star: "별",
  order: "질서",
  chaos: "혼돈"
};


const SAVIOR_DETAIL_ROOT = "https://star-savior-arcana-db.pages.dev/savior";
const ARCANA_DETAIL_ROOT = "https://star-savior-arcana-db.pages.dev/arcana";
const ARCANA_IMAGE_ROOT = "https://starsavior-db.pages.dev/images/arcana";

const SAVIOR_DETAIL_IDS = {
  "asherah-voyager": 1001,
  "smile": 1002,
  "luna": 1003,
  "carnelia": 1005,
  "bell": 1008,
  "emily": 1009,
  "charlotte": 1010,
  "carmen": 1011,
  "frey": 1013,
  "seira": 1014,
  "trish": 1015,
  "lyn": 1016,
  "haydee": 1018,
  "serpang": 1019,
  "dana": 1021,
  "muriel": 1023,
  "elisa": 1024,
  "tyria": 1025,
  "roberta": 1026,
  "lugh": 1027,
  "fei": 1029,
  "epindel": 1030,
  "omega": 1031,
  "bunny-charlotte": 1032,
  "ceres": 1033,
  "lydia": 1034,
  "harley": 1041,
  "petra": 1042,
  "scarlet": 1043,
  "claire": 1044,
  "lacy": 1049,
  "tanya": 1051,
  "lily": 1052,
  "kyra": 1053,
  "waltz-asherah": 1054,
  "wedding-carmen": 1055,
  "wedding-epindel": 1056,
  "bunny-frey": 1057,
  "white-pearl-luna": 1045,
  "sunshine-cat-smile": 1046,
  "besta": 1501,
  "annah": 1502,
  "marcille": 1506,
  "naru": 1508,
  "bunny-claire": 1509,
  "vera": 1507,
  "bunny-scarlet": 1510,
  "clarissa": 1511,
  "hilde": 3001,
  "yoo-mina": 3002,
  "rosaria": 3003
};

const ARCANA_DETAIL_IDS = {
  "단점 보완 맞춤 훈련": 7102501,
  "꽃들에게 죽음을": 7100501,
  "하늘의 심판": 7102301,
  "죽음이 둘을 갈라놓을 때까지": 7105601,
  "불굴의 역작": 7105701,
  "하얀 달의 온기는 햇빛처럼": 7101602,
  "누각 위, 유리달 맞이": 7101601,
  "조용한 휴식 시간": 7100901,
  "스트라니스의 영애": 7105401,
  "완벽한 바니걸": 7104401,
  "키라만큼 귀여워!": 7105301,
  "오늘의 한 걸음": 7102901,
  "나른한 오후의 틈새": 7105501,
  "공녀, 왕좌에 오르다": 7101301,
  "본 투 비 와일드": 7104101,
  "허수의 개척자": 7103101,
  "종말은 소녀의 얼굴을 하고 있다.": 7300301,
  "깊은 애도": 7100801,
  "노스텔지어의 역습": 7300101,
  "하늘의 시련": 7102401,
  "금단의 기록물 Vol. 1": 7040101,
  "금단의 기록물": 7040101,
  "만족스러운 식사": 7150101,
  "어느 한 기사의 맹세": 7101001,
  "서투른 욕망 해소법": 7103201,
  "노 페인, 노 게인": 7104901,
  "메이드 바이 페트라♡": 7104201,
  "별을 보며 꿈을": 7150801,
  "음독의 각오": 7103302,
  "누구보다 프로페셔널": 7150701,
  "서류 더미 위의 책임감": 7102601,
  "언더커버 캅": 7150201,
  "빛을 쫓아라!": 7100301,
  "빛을 쫓아라": 7100301
};


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

// 표기 차이로 카드가 누락되지 않도록 상세 페이지와 동일한 별칭을 유지합니다.
ARCANA_LIBRARY["금단의 기록물"] = ARCANA_LIBRARY["금단의 기록물 Vol. 1"];
ARCANA_LIBRARY["빛을 쫓아라"] = ARCANA_LIBRARY["빛을 쫓아라!"];

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

// 로베르타를 제외하고, 승인된 스트라이커 9명에게만 아르카나 교체 규칙을 적용합니다.
const STRIKER_ARCANA_SWAP_IDS = new Set([
  "asherah-voyager",
  "charlotte",
  "seira",
  "lyn",
  "tyria",
  "ceres",
  "claire",
  "tanya",
  "bunny-scarlet"
]);

const EMPTY_ARCANA = () => Array.from({ length: 5 }, () => null);
const PENDING_ARCANA = () => Array.from({ length: 5 }, () => ({ name: "미정", note: "미정" }));

const DEFAULT_BUILD = {
  skills: [
    { label: "기본기", value: "미정" },
    { label: "특수기", value: "미정" },
    { label: "궁극기", value: "미정" }
  ],
  equipment: {
    pve: {
      necklace: "미정",
      ring: "미정",
      sets: ["미정"],
      potential: "미정",
      note: "미정"
    },
    pvp: {
      necklace: "미정",
      ring: "미정",
      sets: ["미정"],
      potential: "미정",
      note: "미정"
    }
  },
  arcana: {
    pve: PENDING_ARCANA(),
    pvp: PENDING_ARCANA(),
    alternatives: PENDING_ARCANA()
  },
  stats: [
    { name: "미정", target: "미정", reason: "미정", priority: "required", label: "미정" },
    { name: "미정", target: "미정", reason: "미정", priority: "recommended", label: "미정" },
    { name: "미정", target: "미정", reason: "미정", priority: "high", label: "미정" }
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
  "rosaria": { tier: "1티어", level: "tier-1" },
  "white-pearl-luna": { tier: "1티어", level: "tier-1" }
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
  "wedding-carmen": ["PVP", "작전", "코스모 게이트", "회랑", "플래시 포인트"],
  "white-pearl-luna": ["작전", "코스모 게이트", "회랑", "PVP"]
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
          {
            "name": "불굴의 역작 or 하얀 달의 온기는 햇빛처럼",
            "note": "빛을 쫓아라! 대체"
          },
          null,
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
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior/1005",
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
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior/1506",
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
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior/1508",
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
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior/1509",
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
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior/1510",
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
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior/1511",
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
  },
  {
    "id": "white-pearl-luna",
    "name": "루나",
    "subtitle": "화이트 펄 트랩",
    "affiliation": "화이트 펄 트랩",
    "grade": "SSR",
    "element": "sun",
    "className": "디펜더",
    "role": "디펜더",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_SUMMER_ORACLE.webp",
    "summary": "원본 자료 기준 PVE 장비·아르카나 세팅을 반영했습니다.",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior/1045",
    "detail": {
      "equipment": {
        "pve": {
          "necklace": "속도",
          "ring": "공격력%",
          "sets": [
            "통찰(4) + 적중(2) (후열사용)",
            "공격(4) + 적중(2) (후열사용)",
            "정밀(4) + 적중(2)"
          ],
          "setNote": "* 적중(2)는 투지(2)로 대체가능.",
          "potential": "AX",
          "note": ""
        },
        "pvp": {
          "necklace": "미정",
          "ring": "미정",
          "sets": [
            "미정"
          ],
          "potential": "미정",
          "note": "장비 세팅 미정"
        }
      },
      "arcana": {
        "pve": [
          {
            "name": "단점 보완 맞춤 훈련",
            "note": ""
          },
          {
            "name": "빛을 쫓아라!",
            "note": ""
          },
          {
            "name": "꽃들에게 죽음을",
            "note": ""
          },
          {
            "name": "조용한 휴식 시간 or 본 투 비 와일드 or 만족스러운 식사",
            "note": ""
          },
          {
            "name": "하얀 달의 온기는 햇빛처럼 or 불굴의 역작",
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
            "name": "노 페인, 노 게인",
            "note": "단점 보완 맞춤 훈련 대체"
          },
          {
            "name": "메이드 바이 페트라♡ or 별을 보며 꿈을",
            "note": "꽃들에게 죽음을 대체"
          },
          {
            "name": "어느 한 기사의 맹세 or 누각 위, 유리달 맞이",
            "note": "하얀 달의 온기는 햇빛처럼/불굴의 역작 대체"
          },
          {
            "name": "언더커버 캅",
            "note": "조용한 휴식 시간/본 투 비 와일드/만족스러운 식사 대체"
          },
          null
        ]
      }
    }
  },
  {
    "id": "sunshine-cat-smile",
    "name": "스마일",
    "subtitle": "선샤인 캣",
    "affiliation": "선샤인 캣",
    "grade": "SSR",
    "element": "star",
    "className": "어쌔신",
    "role": "어쌔신",
    "attackType": "",
    "image": "https://starsavior-db.pages.dev/images/icons/UFS_NKM_UNIT_S_SUMMER_SMILE.webp",
    "summary": "미정",
    "guideUrl": "https://star-savior-arcana-db.pages.dev/savior/1046"
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
  ["괴리의 표상", "https://arca.live/b/starsavior/175840063"],
  ["올베로스", "https://arca.live/b/starsavior/177951693"]
];


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
const languageSelect = document.querySelector("#language-select");

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
      getLocalizedSaviorName(savior.name),
      savior.subtitle,
      getLocalizedSubtitle(savior.subtitle),
      savior.affiliation,
      getLocalizedSubtitle(savior.affiliation),
      savior.className,
      translateString(savior.className),
      savior.role,
      translateString(savior.role),
      savior.attackType,
      translateString(savior.attackType),
      ELEMENT_LABELS[savior.element],
      translateString(ELEMENT_LABELS[savior.element])
    ].join(" ").toLocaleLowerCase(LANGUAGE_HTML_CODES[currentLanguage] || "ko-KR");

    const queryMatch = !q || haystack.includes(q);
    const elementMatch = state.element === "all" || savior.element === state.element;
    const classMatch = state.className === "all" || savior.className === state.className;

    return queryMatch && elementMatch && classMatch;
  });

  saviorGrid.replaceChildren(...filtered.map(createSaviorCard));
  visibleCount.textContent = String(filtered.length);
  totalCount.textContent = String(SAVIORS.length);
  emptyState.hidden = filtered.length > 0;
  applyLanguageToDOM(listView);
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
  applyLanguageToDOM(detailView);
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

  const isStrikerArcanaSwapTarget = STRIKER_ARCANA_SWAP_IDS.has(savior.id);

  (existingAlternatives || []).forEach((slot) => {
    if (!slot?.name) return;

    if (isStrikerArcanaSwapTarget && String(slot.name).includes("음독의 각오")) {
      add(
        String(slot.name).split("음독의 각오").join("완벽한 바니걸"),
        "음독의 각오 대체"
      );
      return;
    }

    add(slot.name, slot.note || "");
  });

  const names = new Set(getResolvedArcanaNames(pveArcana));

  if (savior.id === "white-pearl-luna") {
    return [
      { name: "노 페인, 노 게인", note: "단점 보완 맞춤 훈련 대체" },
      { name: "메이드 바이 페트라♡ or 별을 보며 꿈을", note: "꽃들에게 죽음을 대체" },
      { name: "어느 한 기사의 맹세 or 누각 위, 유리달 맞이", note: "하얀 달의 온기는 햇빛처럼/불굴의 역작 대체" },
      { name: "언더커버 캅", note: "조용한 휴식 시간/본 투 비 와일드/만족스러운 식사 대체" },
      null
    ];
  }

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
      {
        name: "불굴의 역작 or 하얀 달의 온기는 햇빛처럼",
        note: "빛을 쫓아라! 대체"
      },
      null,
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
  if (isStrikerArcanaSwapTarget) {
    add("완벽한 바니걸", "음독의 각오 대체");
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
  const basePveArcana = hasCommonArcana ? COMMON_ARCANA_SLOTS : build.arcana.pve;
  const pveArcana = STRIKER_ARCANA_SWAP_IDS.has(savior.id)
    ? (basePveArcana || []).map((slot) =>
        slot
          ? {
              ...slot,
              name: String(slot.name).split("완벽한 바니걸").join("음독의 각오")
            }
          : null
      )
    : basePveArcana;
  const alternativeArcana = savior.detail
    ? buildAlternativeArcana(
        savior,
        pveArcana,
        build.arcana.alternatives
      )
    : build.arcana.alternatives;

  const saviorDetailId = SAVIOR_DETAIL_IDS[savior.id];
  const saviorDetailUrl = saviorDetailId
    ? `${SAVIOR_DETAIL_ROOT}/${saviorDetailId}`
    : (savior.guideUrl || SAVIOR_DETAIL_ROOT);

  const guideButton = saviorDetailUrl
    ? `<a class="external-guide" href="${escapeHtml(saviorDetailUrl)}" target="_blank" rel="noopener noreferrer">스킬설명 및 상세정보</a>`
    : "";

  const growthPriority = GROWTH_PRIORITY[savior.id] || {
    tier: "미정",
    level: "tier-unrated"
  };
  const mainContents = MAIN_CONTENTS[savior.id] || ["미정"];

  const roleBadge =
    savior.role && savior.role !== savior.className
      ? `<span class="detail-badge">${escapeHtml(savior.role)}</span>`
      : "";

  const attackTypeBadge = savior.attackType
    ? `<span class="detail-badge">${escapeHtml(savior.attackType)}</span>`
    : "";

  const pveArcanaTitle = "PVE 추천 아르카나";
  const alternativeArcanaTitle = "대체 아르카나";

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
        ${createArcanaMode(pveArcanaTitle, "주요 PVE 콘텐츠", pveArcana, "var(--pve)")}
        ${createArcanaMode(alternativeArcanaTitle, "보유 상황에 따라 교체", alternativeArcana, "var(--accent)")}
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

function getArcanaDetailUrl(name) {
  const detailId = ARCANA_DETAIL_IDS[name];
  return detailId ? `${ARCANA_DETAIL_ROOT}/${detailId}` : "";
}

function createArcanaImages(choices) {
  if (!choices.length) return "";

  return `
    <div class="arcana-card-images" style="--arcana-count:${Math.min(choices.length, 3)}">
      ${choices.slice(0, 3).map((choice) => {
        const detailUrl = getArcanaDetailUrl(choice.name);

        return detailUrl
          ? `
            <a class="arcana-card-link" href="${escapeHtml(detailUrl)}"
              target="_blank" rel="noopener noreferrer"
              aria-label="${escapeHtml(choice.name)} 아르카나 상세정보">
              <img src="${escapeHtml(choice.image)}" alt="${escapeHtml(choice.name)}"
                loading="lazy" referrerpolicy="no-referrer"
                onerror="this.style.display='none'">
            </a>
          `
          : `
            <span class="arcana-card-link is-disabled">
              <img src="${escapeHtml(choice.image)}" alt="${escapeHtml(choice.name)}"
                loading="lazy" referrerpolicy="no-referrer"
                onerror="this.style.display='none'">
            </span>
          `;
      }).join("")}
    </div>
  `;
}

function createArcanaNameLinks(choices) {
  return choices.map((choice, index) => {
    const detailUrl = getArcanaDetailUrl(choice.name);
    const separator = index > 0
      ? `<span class="arcana-card-separator" aria-hidden="true">/</span>`
      : "";

    const nameMarkup = detailUrl
      ? `<a class="arcana-card-name-link" href="${escapeHtml(detailUrl)}"
          target="_blank" rel="noopener noreferrer">${escapeHtml(choice.name)}</a>`
      : `<span>${escapeHtml(choice.name)}</span>`;

    return `${separator}${nameMarkup}`;
  }).join("");
}

function createArcanaMode(title, description, slots, color) {
  const normalized = Array.from(
    { length: Math.max(5, slots?.length || 0) },
    (_, index) => slots?.[index] || null
  );

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

          const rawNoteText = String(arcana.note || "").trim();
          const noteText = /엑셀.*추천/.test(rawNoteText) ? "" : rawNoteText;

          return `
            <div class="arcana-slot has-arcana-card" style="--slot-color:${color}">
              ${createArcanaImages(choices)}
              <div class="arcana-card-copy">
                <small>SLOT ${index + 1}${choices.length > 1 ? " · 선택" : ""}</small>
                <strong class="arcana-card-name-links">${createArcanaNameLinks(choices)}</strong>
                ${noteText ? `<em>${escapeHtml(noteText)}</em>` : ""}
              </div>
            </div>
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
            <p class="equipment-guidance-note">* 속도 수치가 높을 시 0.5티어 상승.</p>
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

  applyLanguageToDOM(simpleView);
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

function applyTheme(theme, options = {}) {
  const selected = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = selected;
  if (!options.skipSave) saveTheme(selected);

  const light = selected === "light";
  themeToggle.querySelector("span").textContent = light ? "☾" : "☀";
  themeToggle.setAttribute("aria-label", translateString(light ? "어두운 테마로 변경" : "밝은 테마로 변경"));
}

themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
});

if (languageSelect) {
  languageSelect.addEventListener("change", (event) => {
    setLanguage(event.currentTarget.value);
  });
}

window.addEventListener("popstate", syncFromHash);
window.addEventListener("hashchange", syncFromHash);

applyRequestedLayoutFixes();
installArcanaCardStyles();
renderList();
refreshLanguageChrome();
applyTheme(readSavedTheme() || "dark", { skipSave: true });
syncFromHash();
applyLanguageToDOM(document.body);
if (languageSelect) languageSelect.value = currentLanguage;
