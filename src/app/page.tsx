'use client'

import Header from '@/components/Header';
import Main from '@/components/Main';
import { styled } from 'styled-components';

const Background = styled.div`
  /* height: 703px; */
  background-color: var(--braco-isabeline);
  width: 100%;
  min-width: 600;
  min-height: 100vh;
`

export default function App() {
  return (
    <Background>
      <Header />
      <Main />
    </Background>
  )
}
