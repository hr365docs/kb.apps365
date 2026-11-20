// encryption and decryption functions for localStorage data
export const encodeBase64WithKey = (
  input = "trial",
  key = "5a0a00c8-1c6a-46c3-87be-411b2922730a",
) => {
  const encoder = new TextEncoder();
  const inputBytes = encoder.encode(input);
  const keyBytes = encoder.encode(key);
  const keyLength = keyBytes.length;
  const outputBytes = new Uint8Array(inputBytes.length);
  for (let i = 0; i < inputBytes.length; i++) {
    outputBytes[i] = inputBytes[i] ^ keyBytes[i % keyLength];
  }
  let binary = "";
  for (let i = 0; i < outputBytes.length; i++) {
    binary += String.fromCharCode(outputBytes[i]);
  }
  return btoa(binary);
};
 
export const decodeBase64WithKey = (input = "A2E=", key = "5a0a00c8-1c6a-46c3-87be-411b2922730a") => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(key);
  const decodedBinary = atob(input);
  const decodedBytes = new Uint8Array(decodedBinary.length);
  for (let i = 0; i < decodedBinary.length; i++) {
    decodedBytes[i] = decodedBinary.charCodeAt(i);
  }
  const keyLength = keyBytes.length;
  const outputBytes = new Uint8Array(decodedBytes.length);
  for (let i = 0; i < decodedBytes.length; i++) {
    outputBytes[i] = decodedBytes[i] ^ keyBytes[i % keyLength];
  }
  return decoder.decode(outputBytes);
};