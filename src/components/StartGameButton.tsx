import { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { match } from 'ts-pattern';
import { GameStatus, initGame } from '../redux/gameSlice';
import { invertedShadow, shadow } from '../styles/shadow';
import { useTypedSelector } from '../utils/useTypedSelector';
import dizzyFace from '../images/dizzy-face.png';
import smilingFace from '../images/smiling-face.png';
import smilingFaceWithSunglasses from '../images/smiling-face-with-sunglasses.png';

const Button = styled.button`
  ${shadow}
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 2.6rem;
  height: 2.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;

  &:active {
    ${invertedShadow}
  }
`;

const Emoji = styled.img`
  width: 80%;
`;

const emojisPattern = (status: GameStatus) =>
  match(status)
    .with('starting', () => <Emoji src={smilingFace} alt="smiling face" />)
    .with('playing', () => <Emoji src={smilingFace} alt="smiling face" />)
    .with('win', () => (
      <Emoji
        src={smilingFaceWithSunglasses}
        alt="smiling face with sunglasses"
      />
    ))
    .with('lose', () => <Emoji src={dizzyFace} alt="dizzy face" />)
    .run();

export const StartGameButton: FC = () => {
  const dispatch = useDispatch();
  const gameStatus = useTypedSelector((state) => state.game.status);

  const handleClick = () => dispatch(initGame());

  return <Button onClick={handleClick}>{emojisPattern(gameStatus)}</Button>;
};
