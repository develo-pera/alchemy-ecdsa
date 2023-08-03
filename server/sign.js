const secp =  require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

const privateKey = process.argv[2];

const amount = process.argv[3];
const to = process.argv[4];
const msgHash = toHex(keccak256(utf8ToBytes(`${amount},${to}`)));

const signature = secp.secp256k1.sign(msgHash, privateKey);

console.log(signature);