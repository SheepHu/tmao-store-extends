console.log("first extends", chrome);
chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "content-script-port");
  port.postMessage({ type: "PORT_READY" });
});

const onMessageHandler = async (
  data: {
    type: string;
    data: { keywords: string };
  },
  sender: chrome.runtime.MessageSender,
) => {
  if (data.type === "search_handle") {
    console.log(data, "data", sender);
    const { keywords } = data.data;

    // 在扩展背景脚本中
    const newWindows = await chrome.windows.create({
      url: `https://login.taobao.com/havanaone/login/login.htm?bizName=taobao&spm=a21bo.jianhua/a.754894437.1.5af92a89tP2IC4&f=top&redirectURL=https://pages.tmall.com/wow/z/import/tmg-rax-home/tmallimportwupr-index?wh_pid=tmg-ch-tubes/fJiiCQT5DbMxQXAaQeGc`, // 替换为实际链接
      type: "popup", // 可选：指定窗口类型
      width: 800, // 设置窗口宽度
      height: 600, // 设置窗口高度
    });

    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      console.log(changeInfo, tabId, "changeInfo.status");
      if (
        tabId === newWindows?.tabs?.[0].id &&
        changeInfo.status === "complete"
      ) {
        chrome.scripting
          .executeScript({
            target: { tabId },
            func: () => {
              console.log("Script executed");
              const inputs: HTMLInputElement = document.getElementById(
                "top-search-bar-input",
              );

              // 创建一个键盘事件对象，模拟回车键按下
              const events = new KeyboardEvent("keydown", {
                key: "Enter", // 设置按键为回车键
                code: "Enter", // 设置按键代码（可选，但推荐）
                keyCode: 13, // 设置键码为回车键的键码（在现代浏览器中，建议使用 key 和 code）
                charCode: 13, // 设置字符码（对于字符输入事件如 keypress 有用，但 keydown 和 keyup 通常不使用）
              });
              // inputs?.focus();

              // if (inputs) {
              //   inputs.value = "鞋子";
              // }
              // inputs?.dispatchEvent(events);
              // inputs?.blur();
              window.scrollTo({ top: 2000 });
            },
          })
          .catch((err) => {
            console.error("Script execution failed:", err);
          });
      }
    });

    // chrome.scripting
    //   .executeScript({
    //     target: { tabId: newWindows?.tabs?.[0].id || 1 },
    //     func: () => {
    //       alert("test");
    //     },
    //   })
    //   .catch((err) => {
    //     console.log(err, "err");
    //   })
    //   .then((res) => {
    //     console.log(res, "res");
    //   });
  }
};
chrome.runtime.onMessage.addListener(onMessageHandler);
