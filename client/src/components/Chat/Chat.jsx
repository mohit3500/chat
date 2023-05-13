import React, { useEffect, useRef, useState } from 'react';
import Contacts from '../Contacts/Contacts';
import { useNavigate } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import ChatContainer from '../ChatContainer/ChatContainer';
import axios from 'axios';
import styled from 'styled-components';
import { io } from 'socket.io-client';

const host = 'http://localhost/3500';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

const Chat = () => {
  const navigate = useNavigate();
  const allUsersRoute = 'http://localhost:3500/api/getAllUsers';
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const response = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          );
          setContacts(response.data.users);
        } else {
          navigate('/setAvatar');
        }
      }
    };
    fetchUsers();
  }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  );
};

export default Chat;
