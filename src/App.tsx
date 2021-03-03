import React, { useEffect, useState } from 'react';
import './App.css';
import User from './User';
import styled from 'styled-components';

const Container = styled.div `
  background-color: #eee;
  @media (min-width: 768px){
    margin-left:auto;
    margin-right:auto;
    padding-bottom: 15px;
    width: 75%;
  }
`;


const App: React.FC = () => {
  const[showUser,setShowUser] = useState(false);
  const[inputValue,setInputValue] = useState('');
  const[disableButton,setDisableButton] = useState(false);
  useEffect(()=>{
    if (inputValue !== ''){
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
  },[inputValue]);
  return (
    <Container className="App">
      <h1>REACTusca</h1>
      <h4><i>HUBusca feito em React.</i></h4>
      <p>Digite um usuário de GitHub</p>
      <input type="text" onChange={(arg)=>{setInputValue(arg.target.value);setShowUser(false)}}/>
      <button onClick={() => setShowUser(true)} disabled={disableButton}>Buscar</button>
      { showUser ? <User user={inputValue}></User> : <></> }
    </Container>
  );
}

export default App;
