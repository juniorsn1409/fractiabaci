'use client'

import { FiMoon, FiSettings } from 'react-icons/fi'
import { RiTranslate2 } from 'react-icons/ri'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--branco-paz);
  padding: 10px;
  color: var(--preto-ebano);
`
const Logo = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`
const HeaderMenu = styled.div`
  display: flex;

  .activate {
    color: var(--azul-atlatico);
    border-bottom: 3px solid transparent;
    border-bottom-color: var(--c-accent-primary);
    }

  a {
    color: var(--preto-ebano);
    text-decoration: none;
    font-weight: 500;
    margin-right: 20px;

    &:hover{
      color: var(--azul-atlatico);
      transition: 0.3;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`
const UserSettings = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 20px;
    cursor: pointer;
    color: var(--preto-ebano);
    font-size: 24px; 

  &:hover{
    color: var(--azul-atlatico);
    transition: 0.3;
  }

  }
`

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M512 503.5H381.7a48 48 0 01-45.3-32.1L265 268.1l-9-25.5 2.7-124.6L338.2 8.5l23.5 67.1L512 503.5z"
            fill="#0473ff"
            data-original="#28b446"
          />
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="#0473ff"
            data-original="#219b38"
            d="M361.7 75.6L265 268.1l-9-25.5 2.7-124.6L338.2 8.5z"
          />
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M338.2 8.5l-82.2 234-80.4 228.9a48 48 0 01-45.3 32.1H0l173.8-495h164.4z"
            fill="#0473ff"
            data-original="#518ef8"
          />
        </svg> */}
        Fracti Abacus
      </Logo>
      <HeaderMenu>
        <a href="/" className="activate">Ábaco de Papel</a>
        <a href="/ArtigoCientifico">Artigo Cientifico</a>
        <a href="/Contato">Contato</a>
      </HeaderMenu>
      <UserSettings>
        <FiMoon className="icon" />
        <RiTranslate2 className="icon" />
        <FiSettings className="icon">Configuração</FiSettings>
      </UserSettings>
    </HeaderContainer>
  );
}
