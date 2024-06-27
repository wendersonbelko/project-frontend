import { Game } from "@/@core/modules/games/domain/game.entities";
import { Button } from "antd";
import React from "react";

const Card: React.FC<Game> = (props) => {
    const [hovered, setHovered] = React.useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div
          style={{
            position: 'relative',
            width: 200,
            height: 300,
            margin: 10,
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease', // Adiciona transição suave para a sombra
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url('${props.banner}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: hovered ? 'scale(1.1)' : 'scale(1)', // Aplica escala na imagem ao hover
              transition: 'transform 0.3s ease', // Adiciona transição suave para a escala
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%', // Altura do degradê sólido
                background: `linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%)`,
                borderRadius: '0 0 10px 10px',
                transition: 'background 0.3s ease, opacity 0.3s ease', // Adiciona transições suaves
                opacity: hovered ? 0 : 1, // Oculta os textos quando estiver em hover
              }}
            >
              <div
                style={{
                  position: 'relative',
                  zIndex: 3,
                  padding: '10px',
                  textAlign: 'center',
                  transition: 'opacity 0.3s ease', // Adiciona transição suave para a opacidade
                  opacity: hovered ? 0 : 1, // Oculta os textos quando estiver em hover
                }}
              >
                <h2 style={{ margin: 0, fontSize: '1.7em', fontFamily: '"Comic Sans MS", cursive, sans-serif', color: 'white' }}>{props.gameName}</h2>
                <p style={{ margin: 0, fontSize: '0.9em', fontFamily: '"Georgia", serif', color: 'white' }}>{props.providerGame}</p>
              </div>
            </div>
            {hovered && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  width: '100%',
                  transition: 'opacity 0.3s ease', // Adiciona transição suave para a opacidade
                  opacity: hovered ? 1 : 0, // Exibe o botão "Jogar" quando em hover
                }}
              >
                <Button type="primary" size="large" style={{
                    boxShadow: '-3px 11px 26px 0px rgba(0,0,0,0.75)',
                }}>Jogar</Button>
              </div>
            )}
          </div>
        </div>
    );
}

export default Card;
