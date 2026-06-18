import kunlunCover from './assets/images/屏幕截图 2026-06-18 100148.png';
import kunlunSpleen from './assets/images/屏幕截图 2026-06-18 052656.png';
import kunlunLung from './assets/images/屏幕截图 2026-06-18 052707.png';
import kunlunLiver from './assets/images/屏幕截图 2026-06-18 052720.png';
import kunlunHeart from './assets/images/屏幕截图 2026-06-18 052729.png';
import kunlunKidney from './assets/images/屏幕截图 2026-06-18 052738.png';

import { ChapterDetail, InspirationBubble } from './types';

export const kunlunChapters: ChapterDetail[] = [
  {
    label: "Songs of Kunlun Scroll",
    title: "《昆仑谣之五音疗愈》主页封面",
    desc: "项目启幕长卷——“一弦清商泛云川，书写山水长卷”。通过极具人文气度的东方墨象、山岳线描与律动粒子，引导观众调节呼吸节奏以契合自然意象。",
    image: kunlunCover,
    tone: "宫商角徵羽",
    element: "五音汇聚",
    color: "#A78BFA" // Cosmic purple
  },
  {
    label: "Chapter 1: Spleen (脾土)",
    title: "第一章：入山 • 脾 (宫调式)",
    desc: "关联五音：【宫】。五行属性：土。脏腑对应的脾脏，能调和人体消化。在视觉中墨流婉蜒、山峰奇峭，宛如载承万物的浑厚后土。“宫音慷慨声博大，宛如后土载万物”，能够温和调理思维焦虑、安宁心脾。",
    image: kunlunSpleen,
    tone: "宫调 (Do)",
    element: "五行之土",
    color: "#F59E0B" // Gold/Yellow
  },
  {
    label: "Chapter 2: Lung (肺金)",
    title: "第二章：遇神 • 肺 (商调式)",
    desc: "关联五音：【商】。五行属性：金。对应脏腑之肺。古铜磬器和悬钟在数字气流波中自如流淌振荡，发出清凉声浪。“金商一动秋风凉，清响激越寒玉声”，有助于排挤浮尘、畅通呼吸系统、舒缓悲秋与郁结情志。",
    image: kunlunLung,
    tone: "商调 (Re)",
    element: "五行之金",
    color: "#9CA3AF" // Grey/Silver
  },
  {
    label: "Chapter 3: Liver (肝木)",
    title: "第三章：天启 • 肝 (角调式)",
    desc: "关联五音：【角】。五行属性：木。对应脏腑之肝。秀丽拱桥横跨碧波溪流，风中竹林摇曳，满原青翠渲染出盎然春气。“春风一弄角声开，苍林翠竹万物生”，温养肝气，疏宣体内郁塞，促使心境开阔坦荡。",
    image: kunlunLiver,
    tone: "角调 (Mi)",
    element: "五行之木",
    color: "#10B981" // Emerald/Green
  },
  {
    label: "Chapter 4: Heart (Heart Fire)",
    title: "第四章：归寂 • 心 (徵调式)",
    desc: "关联五音：【徵】。五行属性：火。对应脏腑之心。古塔高耸，周围燃烧着赤烈赤绚的数字篝火。漫天火粒顺热风扶摇。“徵音热烈炽如火，急管繁弦动星河”，有助于振奋精神倦怠，畅通心血脉气以驱逐低迷情绪。",
    image: kunlunHeart,
    tone: "徵调 (Sol)",
    element: "五行之火",
    color: "#EF4444" // Crimson/Red
  },
  {
    label: "Chapter 5: Kidney (Kidney Water)",
    title: "第五章：万象 • 肾 (羽调式)",
    desc: "关联五音：【羽】。五行属性：水。对应脏腑之肾。一轮圆满如镜的冰月悬置在干枯荷花的静默池塘之上。涟漪水滴荡开空灵古琴声。“羽音肃降如流水，万物归一入虚无”，清热明神，收敛肾水元气。",
    image: kunlunKidney,
    tone: "羽调 (La)",
    element: "五行之水",
    color: "#3B82F6" // Sapphire Blue
  }
];

export const inspirationBubbles: InspirationBubble[] = [
  {
    id: 1,
    title: "探索：算法中的浪漫与诗性",
    icon: "💡",
    desc: "在我的创作脉络里，程序代码并不是冰冷的冷光符号，而是饱含着感知的有机纤维。我一直在探寻如何运用数理运算规则来传递人文美感，在数字屏幕与大自然原生感官边界上，雕刻带有厚度与温度的生命共振。",
    top: "15%",
    left: "12%"
  },
  {
    id: 2,
    title: "创作兵器谱与核心媒介",
    icon: "🛠️",
    desc: "1. 视觉编程：精通 HTML5 Canvas 复杂流体力学模拟、WebGL 三维粒子引擎，能为交互项目编写高性能运算着色器(Shader)与物理碰撞模拟。\n2. 软硬件融合：熟练通过 Arduino、各类神经元传感器(EEG)、压力敏肌电传感器以及微型雷达捕获体验者的肢体及脑电微扰，并映射于交互画面。\n3. 三维建模：擅长采用 Blender 完成重数字颗粒感的超现实叙事材质以及视差长卷艺术渲染。",
    top: "52%",
    left: "45%"
  },
  {
    id: 3,
    title: "刘家伊的日常灵感异空间",
    icon: "🪐",
    desc: "• 极其痴迷在宁寂雷雨天里去采集室外水滴激荡的白噪音，并在高性能声谱仪上剖析其波形中呈现的和谐律动，运用于生成式艺术。\n• 衷情用偏振镜去拍摄一片竹叶的微观脉络流向，并提取其拓扑算法作为粒子生成树(L-system)的核心逻辑。\n• 持续收集并钻研《黄帝内经》中论述五音、本草与脏腑五行能量场关系的章节，尝试以现代交互声音艺术赋予其具身化再生。",
    top: "20%",
    left: "75%"
  },
  {
    id: 4,
    title: "寄语：技术为笔，艺术为心",
    icon: "✨",
    desc: "站在 2026 年科技与人文的交界处，我希望我的作品能像一阵和煦的山风，触碰到每个人内心深处最柔软的角落。用代码探寻生命的律动，用艺术治愈时代的焦虑，让每一次声光涟漪都化作身心宁息的良药。",
    top: "55%",
    left: "14%"
  },
  {
    id: 5,
    title: "美学：数字造园思维",
    icon: "📚",
    desc: "在 3D 虚拟画廊的设计中，我深受东方传统园林造景学说的‘步移景异’、‘隔景’与‘透景’手法启发。把这些三维空积美学，转化为代码的相加渲染与视差微位移算式，构筑出如镜花水月般可穿行浏览的灵性剧场。",
    top: "18%",
    left: "44%"
  },
  {
    id: 6,
    title: "生命：非遗五音能量转译",
    icon: "🌾",
    desc: "在《昆仑谣》中，我们将《黄帝内经》记载的五音对五行的配属，利用纯代数合成器(Digital Synthesizer)实时渲染为治愈频律。通过用户实时互动摩擦、触发五大脏腑音频，达到舒畅身心、导气宁神的深层多媒介疗愈体验。",
    top: "58%",
    left: "74%"
  },
  {
    id: 7,
    title: "未来：具身触觉与多传感器结合",
    icon: "🔮",
    desc: "在下一个阶段的艺术创作中，我计划引进深度体感麦克(Intra-body vibration mic)与微压神经振荡床。当听众点按虚拟界面的流体泡泡时，除了通过骨传导耳机享受清脆的听觉反馈，甚至能感知到身体多处对应的骨骼微颤，让疗愈音律渗透肌骨。",
    top: "35%",
    left: "28%"
  }
];
