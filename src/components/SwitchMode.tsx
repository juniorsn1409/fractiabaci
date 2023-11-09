//  S# SEVERITY
//
//  SwitchMode.tsx
//
//  Created by Edson Júnior Ananias de Lima on 08/11/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { useState } from 'react'
import { BiSolidAdjust } from 'react-icons/bi'
import { AiFillAlert } from 'react-icons/Ai'

import '../styles/dark.css'

export const SwitchMode = () => {
  const [isDarkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode)
  }

  return (
    <>
      <label className="switch">
        <input
          className="switch__input"
          type="checkbox"
          role="switch"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <span className="switch__label"></span>
        <AiFillAlert />
        <BiSolidAdjust style={{ marginLeft: '5px' }} />
      </label>
    </>
  )
}
