import Icons from './components/Icons';
import Nav from './components/Nav';
import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import ChatMessage from './components/ChatMessage';
import { fetchUserInformation } from './fetch_requests/user.fetch';
import { fetchChat } from './fetch_requests/chat.fetch';
import WideNav from './components/WideNav';

export default function Conversations() {
  const socket = io(process.env.REACT_APP_APICHAT, {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
    query: { Authorization: localStorage.Authorization },
  });

  const [messages, setMessages] = useState([]);
  const [signedUserInfo, setSignedUserInfo] = useState();
  const [existingChat, setExistingChat] = useState([]);

  useEffect(() => {
    socket.on('receive-message', (messageData) => {
      const clone = structuredClone(messages);
      clone.push({
        message: messageData.message,
        author: messageData.author,
        id: messageData._id,
        createdAt: messageData.createdAt,
      });
      setMessages(clone);
    });
    return function disconnect() {
      socket.disconnect();
    };
  });

  useEffect(() => {
    fetchUserInformation().then(
      function (value) {
        if (value.response.status === 200) {
          setSignedUserInfo(value.user);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    fetchChat().then(
      function (value) {
        if (value.response.status === 200) {
          setExistingChat(value.chat);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    if (messages.length)
      if (messages[messages.length - 1].author._id === signedUserInfo._id)
        list.current.scrollTop = list.current.scrollHeight;
    // window.scrollTo({
    //   top: list.current.offsetHeight,
    //   behavior: 'smooth',
    // });
  }, [messages]);

  useEffect(() => {
    list.current.scrollTop = list.current.scrollHeight;
  }, [existingChat]);

  const messageInput = useRef();
  const list = useRef();

  function sendMessage() {
    if (messageInput.current.value !== '')
      socket.emit('send-message', { message: messageInput.current.value });
    messageInput.current.value = '';
  }

  const [mobile, setMobile] = useState(false);

  function screenWidth(event) {
    if (event.target.innerWidth > 768) setMobile(false);
    if (event.target.innerWidth <= 768) setMobile(true);
  }

  useEffect(() => {
    if (window.innerWidth > 768) setMobile(false);
    if (window.innerWidth <= 768) setMobile(true);
    window.onresize = screenWidth;
  });

  const icons = Icons();
  return (
    <div
      className={`w-full hide-scroll ${
        mobile
          ? 'min-h-screen grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }`}
    >
      {mobile ? null : <WideNav />}
      <div
        className={`bg-gradient-to-b from-violet-800 to-cyan-600 max-w-[500px] w-full text-neutral-300 overflow-auto hide-scroll ${
          mobile
            ? 'h-screen-chat min-h-screen-chat'
            : 'h-screen-chat-wide min-h-screen'
        }`}
      >
        <div>
          <ul
            ref={list}
            className={`overflow-auto hide-scroll scroll-smooth min-w-full ${
              mobile
                ? 'h-screen-chat-input'
                : 'h-screen-chat-wide min-w-[500px]'
            }`}
          >
            {existingChat.length && signedUserInfo
              ? existingChat.map((messageInfo) => {
                  return (
                    <ChatMessage
                      key={messageInfo._id}
                      signedUserInfo={signedUserInfo}
                      messageData={messageInfo}
                    />
                  );
                })
              : null}
            {messages.length && signedUserInfo
              ? messages.map((messageInfo) => {
                  return (
                    <ChatMessage
                      key={messageInfo.id}
                      signedUserInfo={signedUserInfo}
                      messageData={messageInfo}
                    />
                  );
                })
              : null}
          </ul>
        </div>
        <div className="sticky bottom-0 max-w-[500px] w-full">
          <div className="p-2 bg-blue-300 w-full flex gap-3">
            <input
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              ref={messageInput}
              className="p-1 rounded-md w-full"
            ></input>
            <button
              onClick={() => {
                sendMessage();
              }}
            >
              {icons.sendMessage}
            </button>
          </div>
        </div>
      </div>
      {mobile ? <Nav /> : null}
    </div>
  );
}
