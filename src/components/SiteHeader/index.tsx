//  S# SEVERITY
//
//  SiteHeader.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import Link from 'next/link'

import {
  AbacusIcon,
  InfoIcon,
  MapIcon,
  MoonIcon,
  StarIcon,
  SunIcon,
} from '@/components/Icons'
import { useHydrateProgress, useProgressStore } from '@/stores/useProgressStore'
import { useSyncTheme, useThemeStore } from '@/stores/useThemeStore'

import styles from './index.module.css'

export type SiteSection = 'aprender' | 'abaco' | 'sobre'

const NAV: {
  id: SiteSection
  href: string
  label: string
  short: string
  Icon: typeof MapIcon
}[] = [
  {
    id: 'aprender',
    href: '/trilha',
    label: 'Aprender',
    short: 'Aprender',
    Icon: MapIcon,
  },
  {
    id: 'abaco',
    href: '/',
    label: 'Ábaco livre',
    short: 'Ábaco livre',
    Icon: AbacusIcon,
  },
  {
    id: 'sobre',
    href: '/sobre',
    label: 'Sobre o projeto',
    short: 'Sobre',
    Icon: InfoIcon,
  },
]

const Logo = () => (
  <Link href="/" className={styles.logo} aria-label="Fracti Abacus, página inicial">
    <span className={styles.logoDiscs} aria-hidden="true">
      <span className={`${styles.logoDisc} ${styles.hundred}`} />
      <span className={`${styles.logoDisc} ${styles.ten}`} />
      <span className={`${styles.logoDisc} ${styles.unit}`} />
    </span>
    <span className={styles.logoText}>
      fracti<span className={styles.logoTail}> abacus</span>
    </span>
  </Link>
)

/**
 * Cabeçalho do site. Desktop: logo, navegação com pílula ativa, chip de
 * XP, tema e idioma. Mobile (<768px): barra compacta + abas fixas
 * no rodapé (use `var(--fa-tabbar-h)` como respiro inferior da página).
 */
export const SiteHeader = ({ active }: { active: SiteSection }) => {
  useHydrateProgress()
  useSyncTheme()

  const xp = useProgressStore((s) => s.xp)
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggle)
  const isDark = theme === 'dark'

  return (
    <>
      <header className={styles.header}>
        <div className={styles.side}>
          <Logo />
        </div>

        <nav className={styles.nav} aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={styles.navLink}
              aria-current={item.id === active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={`${styles.side} ${styles.sideEnd}`}>
          <div
            className={`${styles.chip} ${styles.xp}`}
            role="img"
            aria-label={`${xp} pontos de experiência`}
            title="Pontos de experiência (XP)"
          >
            <StarIcon />
            <span className={styles.chipValue}>{xp}</span>
          </div>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={isDark ? 'Usar tema claro' : 'Usar tema escuro'}
            aria-pressed={isDark}
            title={isDark ? 'Tema claro' : 'Tema escuro'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.lang}`}
            aria-label="Idioma: português (outros idiomas em breve)"
            title="Idioma: português"
          >
            PT
          </button>
        </div>
      </header>

      <nav className={styles.tabbar} aria-label="Navegação principal">
        {NAV.map(({ id, href, short, Icon }) => (
          <Link
            key={id}
            href={href}
            className={styles.tab}
            aria-current={id === active ? 'page' : undefined}
          >
            <Icon />
            <span>{short}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
