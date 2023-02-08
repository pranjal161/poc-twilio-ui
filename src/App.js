import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { useState } from 'react';

const App = () => {

  const [phoneNumber, updatePhone] = useState();
  const [message, updatemsg] = useState();


  const call = () => {
    fetch('http://localhost:8080/call', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber: phoneNumber, message: message }),
      headers: { 'Content-Type': 'application/json'}
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
        <input style={{ marginRight: '1%' }} onChange={(event) => updatePhone(event.target.value)} placeholder='Enter Phone Number'></input>
        <input style={{ marginRight: '1%' }} onChange={(event) => updatemsg(event.target.value)} placeholder='Enter Message'></input>
        <button onClick={() => call()}>Call</button>
      </div>
    </div>
  );
}

export default App;
