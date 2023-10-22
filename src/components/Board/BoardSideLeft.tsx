//  S# SEVERITY
//
//  Board/BoardSideLeft.tsx
//
//  Created by Edson Júnior Ananias de Lima on 12/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

export const BoardSideLeft = () => {
  return (
    <div
      id={`delet`}
      style={{
        width: '8%',
        height: '95%',
        margin: '1%',
        display: 'flex',
        borderRadius: '8px',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'background-color 0.3s',
        backgroundColor: 'var(--cinza-harpia)',
      }}
    ></div>
  )
}
