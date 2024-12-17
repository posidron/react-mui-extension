export const chromeUtils = {
  getSystemInfo: () => {
    return new Promise((resolve, reject) => {
      try {
        chrome.system.cpu.getInfo((info) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(info);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  getMemoryInfo: () => {
    return new Promise((resolve, reject) => {
      try {
        chrome.system.memory.getInfo((info) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(info);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
