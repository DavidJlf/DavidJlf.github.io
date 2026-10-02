const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const languageToggle = document.querySelector("#language-toggle");

const zh = {
  skip: "跳到主要内容", navResearch: "研究", navPublications: "论文", navProjects: "项目", navTeaching: "教学", navContact: "联系",
  heroEyebrow: "AI 安全 · 生成模型 · 鲁棒人工智能", heroTitle: "构建更可控、更鲁棒的人工智能系统。",
  heroIntroBefore: "我是马里兰大学本科研究人员，目前在 ", heroIntroAfter: " 的指导下开展扩散模型与对抗攻击研究。",
  explore: "查看我的研究", resume: "简历", focusLabel: "当前重点", focusValue: "对抗生成", basedLabel: "所在地", basedValue: "美国马里兰州 College Park",
  openStatus: "正在积极寻找博士岗位",
  researchEyebrow: "研究", researchTitle: "正在推进的研究", researchLead: "我的工作连接生成模型、对抗学习与鲁棒神经计算。",
  carrierKicker: "扩散模型 · 对抗机器学习", carrierResearchTitle: "主体保持的对抗图像生成",
  carrierResearchP1: "我开发并评估面向个性化扩散模型的对抗生成流程，包括分割引导构建、分类器引导的隐空间优化、主体专属 LoRA 集成，以及可复现的 GPU 实验。",
  carrierResearchP2: "我还设计可控的 Carrier 条件、实现不同攻击变体、开展主体保持与迁移性评估，并分析攻击证据如何分布在主要主体之外。",
  ongoing: "持续研究", snnTitle: "鲁棒神经计算", snnP1: "我实现匹配的神经网络评估代码，自动化不同检查点和配置下的实验，并调试攻击、检测与重编程流程。",
  snnP2: "分析涵盖鲁棒性、检测器行为、时间活动、延迟与运算成本，同时保持实验框架可扩展到新的数据与攻击族。",
  publicationsEyebrow: "论文", publicationsTitle: "代表性研究", carrierStatus: "第一作者 · ICLR 2027 投稿评审中",
  carrierSummary: "通过 Carrier 引导的框架，在支持定向对抗图像生成和跨模型迁移的同时保持个性化主体。",
  figureCaption: "图 1：No-Carrier 基线与 Carrier 条件的定性比较。", redactionNote: "论文标题在投稿截止前暂以马赛克遮盖。",
  projectsEyebrow: "代表项目", projectsTitle: "从模型到实际系统", ml: "机器学习", pvTitle: "超短期光伏出力预测", pvText: "用于光伏功率超短期时间序列预测与分析的 CNN-LSTM 流程。",
  aiSecurity: "AI 安全", stegTitle: "上下文感知隐写文本生成", stegText: "在保持文本自然度的同时承载隐藏信息的上下文感知语言生成。",
  securitySystems: "安全系统", dashboardTitle: "集中式安全仪表盘", dashboardText: "面向管理层的仪表盘方案，用于整合安全事件、漏洞和组织风险信号。",
  responsibleAI: "负责任 AI", nistText: "通过简洁的归纳与演绎方式，让 AI 风险管理概念更易应用于模型评估。",
  contactEyebrow: "联系", contactTitle: "有兴趣一起合作吗？", contactText: "我正在积极寻找博士岗位，也欢迎 AI 与 AI 安全方向的研究合作。", fandomLabel: "研究之外", fandomText: "曼联与 C 罗球迷", backTop: "返回顶部 ↑"
};

const original = {};
document.querySelectorAll("[data-i18n]").forEach((element) => { original[element.dataset.i18n] = element.textContent; });

function setLanguage(language) {
  const isChinese = language === "zh";
  document.documentElement.lang = isChinese ? "zh-CN" : "en";
  document.body.classList.toggle("lang-zh", isChinese);
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = isChinese ? (zh[key] || original[key]) : original[key];
  });
  languageToggle.textContent = isChinese ? "EN" : "中文";
  languageToggle.setAttribute("aria-label", isChinese ? "Switch to English" : "切换为中文");
  languageToggle.setAttribute("href", isChinese ? "?lang=en#top" : "?lang=zh#top");
  localStorage.setItem("portfolio-language", language);
}

document.querySelector("#year").textContent = new Date().getFullYear();
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 12));
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false");
}));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
setLanguage(requestedLanguage === "zh" || requestedLanguage === "en" ? requestedLanguage : (localStorage.getItem("portfolio-language") || "en"));
