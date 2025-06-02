console.log("first extends", chrome);
chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "content-script-port");
  port.postMessage({ type: "PORT_READY" });
});
