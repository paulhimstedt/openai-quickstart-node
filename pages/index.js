import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [senderInput, setSenderInput] = useState("");
  const [recieverInput, setRecieverInput] = useState("");
  const [keyInfoInput, setKeyInfoInput] = useState("");
  const [formalChecked, setFormalChecked] = useState(false);
  const [informalChecked, setInformalChecked] = useState(false);
  const [humorousChecked, setHumorousChecked] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({sender : senderInput, reciever: recieverInput, keyInfo: keyInfoInput ,isFormal: formalChecked, isInformal: informalChecked, isHumorous: humorousChecked}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data.result)
      setResult(data.result);
      setSenderInput("");
      setRecieverInput("");
      setKeyInfoInput("");
      setFormalChecked(false);
      setInformalChecked(false);
      setHumorousChecked(false);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/AIMAIL_icon.PNG" />
      </Head>

      <main className={styles.main}>
        <img src="/AIMAIL_icon.PNG" className={styles.icon} />
        <h3>Generate custom E-mails!</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="sender"
            placeholder="Enter an sender"
            value={senderInput}
            onChange={(e) => setSenderInput(e.target.value)}
          />
          <input
            type="text"
            name="reciever"
            placeholder="Enter an Reciever"
            value={recieverInput}
            onChange={(e) => setRecieverInput(e.target.value)}
          />
          <input
            type="text"
            name="keyInfo"
            placeholder="Provide key informations"
            value={keyInfoInput}
            onChange={(e) => setKeyInfoInput(e.target.value)}
          />
          <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              name="style"
              value="formal"
              checked={formalChecked}
              onChange={(e) => setFormalChecked({ formalChecked: e.target.checked })}
            />
            Formal
          </label>
          <label>
            <input
              type="checkbox"
              name="style"
              value="informal"
              checked={informalChecked}
              onChange={(e) => setInformalChecked({ informalChecked: e.target.checked })}
            />
            Informal
          </label>
          <label>
            <input
              type="checkbox"
              name="style"
              value="humorous"
              checked={humorousChecked}
              onChange={(e) => setHumorousChecked({ humorousChecked: e.target.checked })}
            />
            Humorous
          </label>
          </div>
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
/*import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";


export default function Home() {
  
  const [senderInput, setSenderInput] = useState("");
  const [receiverInput, setReceiverInput] = useState("");
  const [senderInput, setSenderInput] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      console.log("working");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({sender : senderInput}),
      });

      const data = await response.json();
      
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      
     
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>MailHelper</title>
        <link rel="icon" href="/AIMAIL_icon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/AIMAIL_icon.png" className={styles.icon} />
        <h3>Generate custom Mails</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="sender"
            placeholder="Enter an sender"
            value={senderInput}
            onChange={(e) => setSenderInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="receiver"
            placeholder="enter reciever name"
            value={receiverInput}
            onChange={(e) => setReceiverInput(e.target.value)}
          />
          <input
            type="text"
            name="sender"
            placeholder="enter sender name"
            value={senderInput}
            onChange={(e) => setSenderInput(e.target.value)}
          />
          <input
            type="text"
            name="key_info"
            placeholder="enter key points"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
          />
          
          <input type="submit" value="Generate Mail"/>
         
        </form>
        

        <div className={styles.result}>{result}</div>
        
      </main>
    </div>
  );
}
*/
/*
<div id="radio_input">
            <label className="label cursor-pointer">
              <span className="label-text">formal</span> 
              <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked/>
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">informal</span> 
              <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked/>
            </label>            
            <label className="label cursor-pointer">
              <span className="label-text">humerous</span> 
              <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked/>
            </label>
          </div>
          <input type="range" min="0" max="100" value="" className="range" />
*/