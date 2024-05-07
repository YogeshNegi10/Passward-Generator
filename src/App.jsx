import { useRef, useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [passward, setPassward] = useState("");
  const [length, setlength] = useState(0);
  const [addNumbers, setAddNumbers] = useState(false);
  const [addCharacters, setCharacters] = useState(false);
  const [copied, isCopied] = useState(false);
  const [copiedValue, setCopiedValue] = useState('');
  const passwardRef = useRef(null)

  const generatePassward = () => {


    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    let numbers = 123456789;
    let characters = '!@#$%^&*(),-_=+\|{};:/?.>';

    if (addNumbers && addCharacters) {
      str += numbers + characters;
     
    } else if (addNumbers) {
      str += numbers;
    } else if (addCharacters) {
      str += characters;
      
    }

    for (let i = 0; i < length; i++) {
      let hex = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(hex);
    }

    isCopied(false)
    setPassward(pass);
    setCopiedValue('')
  };

const copyToClipboard = () =>{

  if(!passward){
        return;
  }

  passwardRef.current?.select()
  navigator.clipboard.writeText()
  isCopied(true);
  setCopiedValue(passward)
 
  
  
}

  useEffect(() => {
    generatePassward();
  }, [length,addNumbers,addCharacters]);

  return (
    <>
      <div className="passward_container">
        <h3>Random Password Generator</h3>
        <div className="input_box">
          <input
            type="text"
            readOnly
            id="input"
            value={passward}
            ref={passwardRef}
            placeholder="Slide or Click to Create Passward"
            onChange={(e) => {
              setPassward(e.target.value);
            }}
          />
          <i className={copied ? "far fa-copy active": "far fa-copy" } onClick={copyToClipboard}></i>
        </div>

        <div className="radio-btn">
          <div className="range-box">
            <input
              type="range"
              name=""
              id=""
              value={length}
              min={0}
              max={20}
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <div className="length">{length} length</div>
          </div>
          <div className="number">
            <div className="number-check">
              <input
                type="checkbox"
                checked={addNumbers}
                name=""
                id=""
                onChange={(e) => {
                  setAddNumbers(e.target.checked);
                }}
              />
              Number
            </div>
            <div className="Character-check">
              <input
                type="checkbox"
                checked={addCharacters}
                name=""
                id=""
                onChange={(e) => {
                  setCharacters(e.target.checked);
                }}
              />
              Character
            </div>
          </div>
        </div>
        <div className="btn_container">
          <button className="btn" onClick={generatePassward}>
            Generate
          </button>
        </div>

        <div>

        { copied ? <div className="copied active">Passward Copied : <mark>{copiedValue}</mark></div> : ''  }
        
      </div>
      </div>
    </>
  );
}

export default App;
