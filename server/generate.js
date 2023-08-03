const secp =  require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = toHex(secp.secp256k1.utils.randomPrivateKey());
const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));
const address = toHex(keccak256(secp.secp256k1.getPublicKey(privateKey).slice(1)).slice(-20));

console.log("Private key:", privateKey);
console.log("Public key:", publicKey);
console.log("Address:", `0x${address}`);
