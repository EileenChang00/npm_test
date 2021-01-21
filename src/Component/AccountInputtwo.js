import Button from '@material-ui/core/Button';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Airtable from 'airtable';
import "./login.css";

const base = new Airtable({ apiKey: "keyUAL9XklAOyi08b" }).base('appCXAKHRyUQDamjK');

export default function AccountInput(){
  const [userid, setUserid] = useState("");
  const [password, setPassword] =useState("");
  let history = useHistory();
  
  function fetchdata(){
      base("employee")
        .select({ view: "Grid view"})
        .eachPage((records,fetchNextPage) => {
            
        })
  }

     

   

  return (
    <div className="container">
      <p>
        帳號 <input id="userid" type="text" required placeholder="請輸入身分證字號" value={userid} onChange={e => setUserid(e.target.value)} />
      </p>
      <p>
        密碼 <input id="password" type="password" required placeholder="請輸入密碼" value={password} onChange={e => setPassword(e.target.value)}/>
      </p>
      <p>
        <Button id="loginbtn" variant="contained" onClick={fetchData}>
          登入
        </Button>
      </p>
    </div>
  );
}

