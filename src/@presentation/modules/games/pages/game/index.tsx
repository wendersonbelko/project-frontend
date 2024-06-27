import { Card } from 'antd';
import React from 'react';

const Game: React.FC = () => {
    return (
        <div>
            <Card>
                <h1>Game</h1>
                <iframe
                    title="game"
                    src="https://www.google.com"
                    width="100%"
                    height="1000"
                />
            </Card>
        </div>
    );
}

export default Game;