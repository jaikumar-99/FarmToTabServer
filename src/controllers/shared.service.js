import CryptoJS from "crypto-js";

export const parseBody = async (body) => {
  console.log(body);
  const result = await decryptService(body.cheese);
  return result;
};

export const parseOutput = async (output) => {
  const result = await encryptService(output);
  console.log({ cheese: result });
  return { cheese: result };
};

// ecnrypt data using nodejs crypto module
export const encryptService = async (dataToEncrypt) => {
  console.log("in encryption");

  try {
    const encryptedText = CryptoJS.AES.encrypt(
      JSON.stringify(dataToEncrypt),
      process.env.hashkey
    ).toString();
    // console.log(encryptedText);
    return encryptedText;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// decrypt data using nodejs crypto module
export const decryptService = async (dataToDecrypt) => {
  console.log("in decryption");

  try {
    const bytes = CryptoJS.AES.decrypt(dataToDecrypt, process.env.hashkey);
    console.info(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
    const decryptedText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // console.log('\n\nDecoded String', decryptedText);

    return decryptedText;
  } catch (error) {
    console.log(error);
    return false;
  }
};
