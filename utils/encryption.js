import CryptoJS from "crypto-js";
export const encyrptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.CRYPTO_JS_SECRET
    ).toString();
  } catch (error) {
    console.log("error in encrypt data");
    throw error;
  }
};

export const decryptData = (encrptedData) => {
  try {
    return JSON.parse(
      CryptoJS.AES.decrypt(encrptedData, process.env.CRYPTO_JS_SECRET).toString(
        CryptoJS.enc.Utf8
      )
    );
  } catch (error) {
    console.log("error in decrypt data");
    throw error;
  }
};
