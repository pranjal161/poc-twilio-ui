import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { useState } from 'react';

const App = () => {

  const [from, updateFrom] = useState();
  const [message, updatemsg] = useState();
  const [to, updateTo] = useState();

  const call = () => {
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

  return (
    <div className="App">
      <Header />
      <div style={{ marginTop: '2%' }}>
        <input style={{ marginRight: '1%' }} onChange={(event) => updateFrom(event.target.value)} placeholder='From'></input>
        <input style={{ marginRight: '1%' }} onChange={(event) => updateTo(event.target.value)} placeholder='To'></input>
        <input style={{ marginRight: '1%' }} onChange={(event) => updatemsg(event.target.value)} placeholder='Message'></input>
        <button onClick={() => call()}>Call</button>
      </div>
    </div>
  );
}

export default App;
