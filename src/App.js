import { useState, useCallback,useEffect } from 'react';
import './App.css';


function App() {

  const [length , setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [characterAllowed , setCharacterAllowed] = useState(false);
  const [password , setPassword] = useState("");

  // useref
  // const passRef = useRef();

  let copyToClip = ()=>{
    window.navigator.clipboard.writeText(password);
    alert("Your Password have been copied, ENJOY !")
  }

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";



    if(numberAllowed){str+="0123456789"};
    if(characterAllowed){str+="!@#$%^&*()"};

    for (let i = 1; i <=length; i++) {
      let char = Math.floor((Math.random()*str.length) + 1);
      pass+= str.charAt(char);
    }

    setPassword(pass);

  } ,[length,numberAllowed,characterAllowed, setPassword])


  useEffect(()=>{
    passwordGenerator();
  }, [length,numberAllowed,characterAllowed])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-orange-500 bg-gray-700'>
      PasswordGenerator<br />
      <input type='text' placeholder='Password' value={password}
      className='outline-none w-full py-1 px-3 my-5' />

      <button className='outline-none text-white bg-blue-700 py-0.5 px-3' onClick={copyToClip}>
      Copy</button>


      <input type='range' max={100} min={6} className='cursor-pointer mx-3'
      onChange={(e)=>{setLength(e.target.value)}} />
      <label>Length : {length}</label><br />
      <div className='my-3'>
      <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} 
      onChange={()=>{
        setNumberAllowed(prev => !prev)
      }}/>
      <label className='mx-3'>Numbers</label>
      <input type="checkbox" id="numberInput" defaultChecked={characterAllowed} 
      onChange={()=>{
        setCharacterAllowed(prev => !prev)
      }}/>
      <label className='mx-3'>Characters</label>
      </div>
    </div>
  );
}

export default App;
