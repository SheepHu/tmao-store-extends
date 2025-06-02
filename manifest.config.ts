import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json"; // 可以读取 package.json 的信息

// 将版本号的小数点转换为 Chrome 扩展要求的整数版本
const version = packageJson.version.replace(/[.-]/g, "");
// 注意：Chrome 扩展版本号最多 4 段，每段不能超过 65535
// 如果你的 package.json 版本是 x.y.z，这里简化为 xyz0
const chromeVersion = `${version}0`;

export default defineManifest({
  manifest_version: 3,
  name: packageJson.name || "My CRXJS Extension", // 从 package.json 读取名称
  description: packageJson.description || "A basic extension built with CRXJS",
  version: chromeVersion, // 使用处理后的版本号
  version_name: packageJson.version, // 显示原始版本号

  // -------- 常规配置 --------
  icons: {
    "16": "src/assets/icons/icon16.png", // 示例路径，确保图标存在
    "48": "src/assets/icons/icon16.png",
    "128": "src/assets/icons/icon16.png",
  },

  // -------- 定义插件的主要交互点 --------
  action: {
    default_popup: "index.html", // 指向你的 Popup HTML 入口
    // 通常，Vite 项目的入口是根目录的 index.html，CRXJS 会处理
    default_icon: {
      // 图标也需要在这里指定
      "16": "src/assets/icons/icon16.png",
      "48": "src/assets/icons/icon16.png",
    },
  },

  // -------- 后台脚本 (Service Worker) --------
  background: {
    service_worker: "src/background/index.ts", // 指向你的后台脚本入口
    type: "module", // 必须是 module 类型
  },

  // -------- 内容脚本 --------
  // CRXJS 会自动检测 src/content/ 目录下的脚本，并添加到这里
  // 你也可以在这里手动定义更复杂的匹配规则
  // content_scripts: [
  //   {
  //     matches: ['<all_urls>'],
  //     js: ['src/content/index.tsx'], // 指向内容脚本入口
  //   },
  // ],

  // -------- 网页可访问资源 --------
  // CRXJS 会自动处理脚本注入所需的资源，通常无需手动配置
  web_accessible_resources: [
    {
      resources: ["src/assets/*"], // 如果需要在页面上直接访问资源
      matches: ["<all_urls>"],
    },
  ],

  // -------- 权限声明 --------
  permissions: [
    "storage", // 示例：允许使用 chrome.storage
    "activeTab", // 示例：允许临时访问活动标签页
    // "tabs", // 按需添加
    // "scripting", // 如果需要通过 API 注入脚本或 CSS
  ],

  // -------- 主机权限 (Manifest V3 必须) --------
  host_permissions: [
    "<all_urls>", // 谨慎使用，只在必要时申请
  ],

  // -------- 选项页面 --------
  // options_page: 'options.html', // 如果有选项页面，指向其 HTML
});
