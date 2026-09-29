//  S# SEVERITY
//
//  About.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import Link from 'next/link'

import { ReactNode } from 'react'

import { ClayCard } from '@/components/ClayCard'
import { Disc } from '@/components/Disc'
import { BookIcon, InfoIcon, StarIcon } from '@/components/Icons'
import { PlaceValueType } from '@/domain/CustomTypesModel'

import styles from './index.module.css'

/** Texto ainda não confirmado — fica visível até alguém preencher. */
const Placeholder = ({ children }: { children: ReactNode }) => (
  <span className={styles.placeholder}>{children}</span>
)

const WEB_URL = 'https://fracti-abacus.vercel.app/'
const APK_URL =
  'https://install.appcenter.ms/users/eananias14/apps/fracti-abacus/distribution_groups/users/releases/5'

const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Framer Motion',
  'Zustand',
  'Capacitor (Android)',
]

const HeroDiscs = () => (
  <div className={styles.heroArt} aria-hidden="true">
    <div className={`${styles.heroCol} ${styles.colHundred}`}>
      <span className={styles.colLabel}>C</span>
      <div className={styles.colDiscs}>
        <Disc place={PlaceValueType.hundred} size={56} />
      </div>
    </div>
    <div className={`${styles.heroCol} ${styles.colTen}`}>
      <span className={styles.colLabel}>D</span>
      <div className={styles.colDiscs}>
        <Disc place={PlaceValueType.ten} size={56} />
        <Disc place={PlaceValueType.ten} size={56} />
        <Disc place={PlaceValueType.ten} size={56} />
      </div>
    </div>
    <div className={`${styles.heroCol} ${styles.colUnit}`}>
      <span className={styles.colLabel}>U</span>
      <div className={styles.colDiscs}>
        <Disc place={PlaceValueType.unit} size={56} />
        <Disc place={PlaceValueType.unit} size={56} />
      </div>
    </div>
    <span className={styles.heroTotal}>132</span>
  </div>
)

const FACTS = [
  {
    kicker: 'PARA QUEM',
    title: 'Crianças de 6 a 12 anos',
    text: 'Feito para quem está aprendendo o valor posicional: unidades, dezenas e centenas.',
    Icon: StarIcon,
  },
  {
    kicker: 'PEDAGOGIA',
    title: 'Validado com especialista',
    text: 'A proposta foi validada com especialista em pedagogia.',
    Icon: BookIcon,
  },
  {
    kicker: 'ORIGEM',
    title: 'TCC 2023',
    text: 'Nasceu como Trabalho de Conclusão de Curso em 2023.',
    Icon: InfoIcon,
  },
]

export const About = () => {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroText}>
          <span className={styles.kicker}>SOBRE O PROJETO</span>
          <h1 id="about-title" className={styles.title}>
            Um ábaco digital para aprender casas decimais
          </h1>
          <p className={styles.lead}>
            No Fracti Abacus cada casa (centena, dezena e unidade) tem sua cor,
            e o disco nunca muda de forma. Juntou 10 discos numa casa? Eles
            viram 1 disco da casa seguinte.
          </p>
          <div className={styles.actions}>
            <Link href="/trilha" className={styles.cta}>
              COMEÇAR A APRENDER
            </Link>
            <Link href="/" className={styles.secondary}>
              Abrir o ábaco livre
            </Link>
          </div>
        </div>
        <HeroDiscs />
      </section>

      <ul className={styles.facts}>
        {FACTS.map(({ kicker, title, text, Icon }) => (
          <ClayCard as="li" key={kicker} padding="lg" className={styles.fact}>
            <span className={styles.factIcon} aria-hidden="true">
              <Icon size={24} />
            </span>
            <span className={styles.factKicker}>{kicker}</span>
            <h2 className={styles.factTitle}>{title}</h2>
            <p className={styles.factText}>{text}</p>
          </ClayCard>
        ))}
      </ul>

      <section className={styles.split}>
        <ClayCard as="article" padding="lg" className={styles.block}>
          <span className={styles.factKicker}>ARTIGO CIENTÍFICO</span>
          <h2 className={styles.blockTitle}>
            <Placeholder>[TÍTULO DO ARTIGO]</Placeholder>
          </h2>
          <dl className={styles.details}>
            <div>
              <dt>Autoria</dt>
              <dd>
                <Placeholder>[AUTORES DO ARTIGO]</Placeholder>
              </dd>
            </div>
            <div>
              <dt>Publicação</dt>
              <dd>
                <Placeholder>[EVENTO OU REVISTA, ANO]</Placeholder>
              </dd>
            </div>
            <div>
              <dt>Resumo</dt>
              <dd>
                <Placeholder>[RESUMO DO ARTIGO]</Placeholder>
              </dd>
            </div>
          </dl>
          <span className={styles.linkPlaceholder}>
            <Placeholder>[LINK DO ARTIGO]</Placeholder>
          </span>
        </ClayCard>

        <ClayCard as="article" padding="lg" className={styles.block}>
          <span className={styles.factKicker}>EQUIPE</span>
          <h2 className={styles.blockTitle}>Quem fez</h2>
          <dl className={styles.details}>
            <div>
              <dt>Desenvolvimento</dt>
              <dd>
                <Placeholder>[NOMES DA EQUIPE]</Placeholder>
              </dd>
            </div>
            <div>
              <dt>Orientação</dt>
              <dd>
                <Placeholder>[NOME DO(A) ORIENTADOR(A)]</Placeholder>
              </dd>
            </div>
            <div>
              <dt>Especialista em pedagogia</dt>
              <dd>
                <Placeholder>[NOME DO(A) ESPECIALISTA]</Placeholder>
              </dd>
            </div>
            <div>
              <dt>Instituição</dt>
              <dd>
                <Placeholder>[INSTITUIÇÃO E CURSO]</Placeholder>
              </dd>
            </div>
          </dl>
        </ClayCard>
      </section>

      <ClayCard as="section" padding="lg" className={styles.where}>
        <div className={styles.whereText}>
          <span className={styles.factKicker}>ONDE USAR</span>
          <h2 className={styles.blockTitle}>No navegador e no Android</h2>
          <p className={styles.factText}>
            A versão web está publicada na Vercel e o aplicativo Android é
            distribuído pelo App Center.
          </p>
          <ul className={styles.stack} aria-label="Tecnologias">
            {STACK.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.whereLinks}>
          <a
            href={WEB_URL}
            className={styles.secondary}
            target="_blank"
            rel="noreferrer"
          >
            fracti-abacus.vercel.app
          </a>
          <a
            href={APK_URL}
            className={styles.secondary}
            target="_blank"
            rel="noreferrer"
          >
            Baixar para Android
          </a>
        </div>
      </ClayCard>
    </main>
  )
}
