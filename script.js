const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const languageToggle = document.querySelector("#language-toggle");

const zh = {
  skip: "跳转到主要内容", navResearch: "研究方向", navPublications: "论文", navProjects: "项目", navTeaching: "助教经历", navContact: "联系我",
  heroEyebrow: "AI 安全 · 生成模型 · 鲁棒人工智能", heroTitle: "致力于构建可控、鲁棒的人工智能系统。",
  heroIntroBefore: "我是马里兰大学本科生，目前在 ", heroIntroAfter: " 的指导下从事对抗攻击及相关人工智能研究。",
  explore: "了解我的研究", resume: "简历", focusLabel: "研究重点", focusValue: "对抗生成", basedLabel: "现居", basedValue: "美国马里兰州大学公园市",
  openStatus: "正在积极寻找博士研究机会",
  researchEyebrow: "研究方向", researchTitle: "当前研究", researchLead: "我的研究聚焦生成模型、对抗机器学习与神经计算鲁棒性。",
  carrierKicker: "扩散模型 · 对抗机器学习", carrierResearchTitle: "保持主体特征的对抗图像生成",
  carrierResearchP1: "面向个性化扩散模型，我开发并评估对抗图像生成流程，涵盖分割引导的图像构建、分类器引导的隐空间优化、主体专属 LoRA 集成，以及可复现的 GPU 实验。",
  carrierResearchP2: "我设计可控的 Carrier 实验条件，实现多种攻击方法，评估主体保持效果与跨模型迁移能力，并分析攻击特征在主体区域之外的分布。",
  ongoing: "在研项目", snnTitle: "脉冲神经网络（SNN）鲁棒性", snnP1: "我实现并评估脉冲神经网络（SNN），自动执行不同模型检查点与参数配置下的实验，并调试攻击、检测和重编程流程。",
  snnP2: "研究指标包括 SNN 鲁棒性、检测器表现、脉冲时序活动、推理延迟与计算开销；实验框架也可扩展至新的数据集和攻击方法。",
  publicationsEyebrow: "论文", publicationsTitle: "代表性成果",
  carrierSummary: "提出一种由 Carrier 引导的对抗生成框架，在实现定向攻击与跨模型迁移的同时，尽可能保留个性化主体特征。",
  figureCaption: "图 1：No-Carrier 基线与不同 Carrier 设置下的定性结果对比。", redactionNote: "因投稿尚未截止，论文标题暂作模糊处理。",
  earlierWork: "早期成果", earlierWorkNote: "完成这些工作时，我还是一名高中生，正值大 AI 时代到来之前——回头看，世界竟已变化得如此之快。", weatherMeta: "会议论文 · ICCEIC 2023", pdfMeta: "研究论文 · Applied and Computational Engineering 16 (2023)，159-165", patentMeta: "专利申请 · MC23-P10075",
  projectsEyebrow: "代表项目", projectsTitle: "从算法模型到实际应用", ml: "机器学习", pvTitle: "超短期光伏功率预测", pvText: "基于 CNN-LSTM 构建光伏功率超短期时间序列预测与分析流程。",
  coinCategory: "网络安全", coinTitle: "COFE Coin 安全机制优化", coinText: "围绕 COFE Coin 的安全机制开展分析，梳理潜在系统风险，并提出增强其安全防护体系的改进方案。", coinMeta: "数字货币 · 安全分析 · 机制设计",
  securitySystems: "安全系统", dashboardTitle: "集中式安全态势仪表盘", dashboardText: "面向管理层设计安全仪表盘，集中展示安全事件、系统漏洞与组织风险等关键信息。",
  responsibleAI: "负责任人工智能", nistText: "以简洁的归纳与演绎方式呈现 AI 风险管理概念，帮助其更清晰地应用于模型评估。",
  contactEyebrow: "联系", contactTitle: "联系我", contactText: "我正在积极寻找博士研究机会，也欢迎人工智能与 AI 安全方向的研究合作。", fandomLabel: "研究之外", fandomText: "曼联与克里斯蒂亚诺·罗纳尔多球迷", visitLabel: "总访问次数", backTop: "返回顶部 ↑"
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

fetch("https://dav1.goatcounter.com/counter/TOTAL.json")
  .then((response) => {
    if (!response.ok) throw new Error("Visit count unavailable");
    return response.json();
  })
  .then((data) => {
    document.querySelector("#visit-total").textContent = data.count;
  })
  .catch(() => {
    document.querySelector("#visit-total").textContent = "—";
  });
