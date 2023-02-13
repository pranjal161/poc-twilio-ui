import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { useState } from 'react';

const App = () => {

  const [from, updateFrom] = useState();
  const [message, updatemsg] = useState();
  const [to, updateTo] = useState();
  const [disableCallBtn, setDisable] = useState(false);

  const call = () => {
    setDisable(true);
    fetch('https://fo82xa5uv0.execute-api.eu-west-1.amazonaws.com/dev/call', {
      method: 'POST',
      body: JSON.stringify({ from: from, to: to, message: message }),
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      if (response.status === 200) {
        response.clone().json().then((data) => {
          console.log(data)
        });
      }
    }, (error) => {
      alert(error)
    });
  }

  const reset = () => {
    updateFrom('');
    updateTo('');
    updatemsg('');
    setDisable(false);
  }

  return (
    <div className="App">
      <Header />
      <div style={{ marginTop: '2%' }}>
        <input style={{ marginRight: '1%' }} value={from} onChange={(event) => updateFrom(event.target.value)} placeholder='From'></input>
        <input style={{ marginRight: '1%' }} value={to} onChange={(event) => updateTo(event.target.value)} placeholder='To'></input>
        <input style={{ marginRight: '1%' }} value={message} onChange={(event) => updatemsg(event.target.value)} placeholder='Message'></input>
        <button style={{ marginRight: '1%' }} disabled={disableCallBtn} onClick={() => call()}>Call</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
      {disableCallBtn && <div>
        Calling...
      </div>}
    </div>
  );
}

export default App;
