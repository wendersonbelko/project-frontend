import React, { useState, useEffect, useRef } from 'react';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [playerId, setPlayerId] = useState<number | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000');

    ws.current.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'game_started') {
        setMessages(prev => [...prev, message.message]);
      } else if (message.type === 'player_turn') {
        if (message.player === playerId) {
          setMessages(prev => [...prev, 'It\'s your turn! Shoot!']);
        } else {
          setMessages(prev => [...prev, `Player ${message.player}'s turn`]);
        }
      } else if (message.type === 'player_dead') {
        setMessages(prev => [...prev, `Player ${message.player} is dead`]);
      } else if (message.type === 'player_survived') {
        setMessages(prev => [...prev, `Player ${message.player} survived`]);
      } else if (message.type === 'game_ended') {
        if (message.winner) {
          setMessages(prev => [...prev, `Player ${message.winner} wins!`]);
        } else {
          setMessages(prev => [...prev, message.message]);
        }
      }
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      ws.current?.close();
    };
  }, [playerId]);

  const sendMessage = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'shoot' }));
    }
  };

  return (
    <div>
      <h1>Russian Roulette Game</h1>
      <div>
        {playerId ? (
          <>
            <button onClick={sendMessage}>Shoot</button>
            <ul>
              {messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </>
        ) : (
          <button onClick={() => setPlayerId(Math.floor(Math.random() * 1000))}>
            Join Game
          </button>
        )}
      </div>
    </div>
  );
};

export default WebSocketComponent;
