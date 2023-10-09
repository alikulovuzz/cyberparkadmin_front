import {useEffect, useState} from "react";
import * as eimzoService from "../EIMZO/services/eimzo";

import "./../styles/loginpagestyle.css";

const Example = () => {

  const [keys, setKeys] = useState([]);
  const [selectedKey, setselectedKey] = useState(null);
  const [obj, setobj] = useState(null);

  const [result, setresult] = useState("");

  useEffect(() => {
    eimzoService.startApi();
    eimzoService.getAllCertificates().then((res) => {
      setKeys(res);
      console.log(res[0].parsedAlias, res[0].inn, "<--")
      setselectedKey(res[0]?.serialNumber);
    });
  }, []);

  const sign = async () => {
    setresult("");
    const keyId = await eimzoService.preLoadKey(keys.find(item => item?.serialNumber === selectedKey));
    eimzoService.postLoadKey(keyId, obj).then((res) => setresult(res));
  }

  return (
    <div className="login-app">
      <div className="group">
        <select onChange={e => setselectedKey(e.target?.value)}>
          {keys.map((item, i) => (
            <option
            //   selected={i === 0}
              key={i}
              value={item?.serialNumber}
            >{item?.inn} - {item?.parsedAlias?.cn.toUpperCase()}</option>
          ))}
        </select>
      </div>
      <div className="group">
        <textarea onChange={e => setobj(e.target.value)}/>
      </div>
      <div className="group">
        <button onClick={sign} disabled={!selectedKey || !obj}>Imzolash</button>
      </div>

      {result !== "" && (
        <div className="group">
          <textarea style={{height: "500px"}} value={result}>{result}</textarea>
        </div>
      )}
    </div>
  );
}

export default Example;
