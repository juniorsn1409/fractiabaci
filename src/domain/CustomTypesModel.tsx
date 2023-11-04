//  S# SEVERITY
//
//  CustomTypesModel.tsx
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

export enum PositionType {
  top,
  middle,
  bottom,
}

export const Descriptions: Record<PlaceValueType, string> = {
  [PlaceValueType.unit]: 'Unidade',
  [PlaceValueType.ten]: 'Dezena',
  [PlaceValueType.hundred]: 'Centena',
  [PlaceValueType.thousand]: 'Unidades de Milhar',
  [PlaceValueType.tenThousand]: 'Dezenas de Milhar',
  [PlaceValueType.hundredThousand]: 'Centena de Milhar',
  [PlaceValueType.millions]: 'Unidade de Milhão',
}
