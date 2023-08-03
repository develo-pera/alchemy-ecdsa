const secp =  require("ethereum-cryptography/secp256k1");

const express = require("express");
const app = express();
const cors = require("cors");
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils");
const {keccak256} = require("ethereum-cryptography/keccak");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x11eb02711757bab6d6d88d6902dfc16f803212e3": 100,
  "0xd0e5bdb2f13736d4024a7be3393f45b7473f1358": 50,
  "0x05c81d685d5eb22d59f483a0431b58956708bcc94": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signatureR, signatureS, signatureRec } = req.body;

  const msgHash = toHex(keccak256(utf8ToBytes(`${amount},${recipient}`)));
  const rString = signatureR[signatureR.length - 1] === "n" ? signatureR.slice(0, -1) : signatureR;
  const sString = signatureS[signatureS.length - 1] === "n" ? signatureS.slice(0, -1) : signatureS;
  const r = BigInt(rString);
  const s = BigInt(sString);

  const nonRecoverableSignature = new secp.secp256k1.Signature(BigInt(r), BigInt(s));
  const signature = nonRecoverableSignature.addRecoveryBit(Number(signatureRec));
  const publicKey = signature.recoverPublicKey(msgHash); // not sure what's the point of the msg hash here
  const verifySignature = secp.secp256k1.verify(signature, msgHash, publicKey.toHex());

  if (!verifySignature) {
    return res.status(400).send({ message: "Signature can't be verified" });
  }

  const address = `0x${toHex(keccak256(publicKey.toRawBytes().slice(1)).slice(-20))}`;

  if (address !== sender) {
    return res.status(400).send({ message: "Not allowed!" });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
