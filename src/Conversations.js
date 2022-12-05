import Icons from './components/Icons';
import Nav from './components/Nav';
import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import ChatMessage from './components/ChatMessage';
import { fetchUserInformation } from './fetch_requests/user.fetch';
import { fetchChat } from './fetch_requests/chat.fetch';
import WideNav from './components/WideNav';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.Authorization) {
      navigate(`${process.env.PUBLIC_URL}/signIn`, { replace: true });
    }
  });

  useEffect(() => {
    socket.on('receive-message', (messageData) => {
      if (list) console.log();
      if (
        list.current.scrollHeight - list.current.scrollTop ===
        list.current.offsetHeight
      ) {
        setScrollBottom(true);
      }
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

  const [scrollBottom, setScrollBottom] = useState(false);

  useEffect(() => {
    if (messages.length && signedUserInfo)
      if (messages[messages.length - 1].author._id === signedUserInfo._id)
        list.current.scrollTop = list.current.scrollHeight;

    if (scrollBottom) {
      list.current.scrollTop = list.current.scrollHeight;
      setScrollBottom(false);
    }
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
    window.addEventListener('resize', screenWidth);
  });

  const icons = Icons();
  return (
    <div
      className={`w-full hide-scroll dark:bg-neutral-900 dark:text-neutral-50 dark:fill-neutral-400 ${
        mobile
          ? 'min-h-screen grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }`}
    >
      {mobile ? null : <WideNav />}
      <div
        className={`max-w-[500px] w-full overflow-auto hide-scroll border-x-2 border-neutral-900 dark:border-neutral-400 ${
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
            {existingChat.length && signedUserInfo ? (
              existingChat.map((messageInfo) => {
                return (
                  <ChatMessage
                    key={messageInfo._id}
                    signedUserInfo={signedUserInfo}
                    messageData={messageInfo}
                  />
                );
              })
            ) : (
              <div className="w-full h-full flex flex-col font-mono items-center justify-center dark:fill-neutral-50">
                {icons.loading}
                Chat Loading..
              </div>
            )}
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
        <div className="sticky bottom-0 max-w-[500px] w-full border-t-2 border-neutral-900 dark:border-neutral-400">
          <div className="p-2 w-full flex gap-3">
            <input
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              ref={messageInput}
              className="p-1 rounded-md w-full dark:bg-neutral-700"
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
