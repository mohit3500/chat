import React from 'react';
import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutRoute = 'http://localhost:3500/api/logout';

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = JSON.parse(localStorage.getItem('user'))._id;
    const response = await axios.get(`${LogoutRoute}/${id}`);
    if (response.status === 201) {
      localStorage.clear();
      navigate('/login');
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
};

export default Logout;
