'use client'

import { useRef } from 'react'; // Importe o useRef do React

import { styled } from 'styled-components';
import Artefato from '../Artefato';

const MainContent = styled.main`
  flex: 2;
  background-color: var(--branco-paz);
  border-radius: 5px;
  overflow: hidden;
  width: 97%;
  height: 500px;
  display: flex;
  flex-direction: row;
  margin: 30px 25px 25px 25px;
  justify-content: center; 
  align-items: center;
`

const Baia = styled.div`
  width: 30%;
  height: 90%;
  background-color: var(--braco-isabeline);
  /* background-image: linear-gradient(var(--azul-atlatico) 1px, transparent 1px), linear-gradient(to right, var(--azul-petroleo) 1px, var(--azul-ararinha) 1px); */
  margin-left: 15px;
  border-radius: 8px;
`

export default function Main() {
  const mainContentRef = useRef(null);

  return (
    <MainContent ref={mainContentRef}>
      <Baia>
      </Baia>
      <Baia>
      </Baia>
      <Baia>
      </Baia>
      <Artefato refExterna={mainContentRef} />
    </MainContent >
  )
}