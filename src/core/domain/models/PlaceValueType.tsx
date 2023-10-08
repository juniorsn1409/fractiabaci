//  S# SEVERITY
//
//  PlaceValueType.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

export enum PlaceValueType {
  unit,
  ten,
  hundred,
  thousand,
  tenThousand,
  hundredThousand,
  millions,
}

export const Descriptions: Record<PlaceValueType, string> = {
  [PlaceValueType.unit]: 'Unidade',
  [PlaceValueType.ten]: 'Dezena',
  [PlaceValueType.hundred]: 'Centena',
  [PlaceValueType.thousand]: 'Milhar',
  [PlaceValueType.tenThousand]: 'Dez Mil',
  [PlaceValueType.hundredThousand]: 'Cem Mil',
  [PlaceValueType.millions]: 'Milhões',
}
