import React, { useEffect, useState } from 'react';
import robot from '../../assessts/img/robot.gif';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

const Welcome = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const setName = async () => {
      setUsername(await JSON.parse(localStorage.getItem('user')).username);
    };
    setName();
  }, []);

  return (
    <Container>
      <img src={robot} alt="" />
      <h1>
        Welcome, <span>{username} !</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
};

export default Welcome;
