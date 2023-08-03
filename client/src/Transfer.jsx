import { useState } from "react";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import server from "./server";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signatureR, setSignatureR] = useState("");
  const [signatureS, setSignatureS] = useState("");
  const [signatureRec, setSignatureRec] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signatureR,
        signatureS,
        signatureRec,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        r
        <input
          placeholder="r value from signature"
          value={signatureR}
          onChange={setValue(setSignatureR)}
        ></input>
      </label>
      <label>
        s
        <input
          placeholder="s value from signature"
          value={signatureS}
          onChange={setValue(setSignatureS)}
        ></input>
      </label>
      <label>
        Recovery bit
        <input
          placeholder="Recovery bit value from signature"
          value={signatureRec}
          onChange={setValue(setSignatureRec)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
