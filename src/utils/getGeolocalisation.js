export const getGeolocation = (options = {}) => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, (err) => {
          reject(err);
        }, options);
      }
    });
  };
  