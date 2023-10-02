//  S# SEVERITY
//
//  PlaceValueType.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

export enum PlaceValueType {
  unit = 'Unidade',
  ten = 'Dezena',
  hundred = 'Centena',
  thousand = 'Milhar',
  tenThousand = 'Ten Thousand',
  hundredThousand = 'Hundred Thousand',
  millions = 'Millions',
}

// +Idea For Future Implementation
// +const description: string = {
// +  switch (this.description) {
// +    case PlaceValueType.unit:
// +      return 'Unidade'
// +      case PlaceValueType.ten:
// +      return 'Dezena'
// +      case PlaceValueType.hundred:
// +      return 'Centena'
// +  }
// +}
