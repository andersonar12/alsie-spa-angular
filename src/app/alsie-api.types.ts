export type Line = {
  id: number
  name: string
  description: string
  iconFilename: string
  imageFilename: string
}

export type ProgramItem = {
  readonly id: number
  readonly name: string
  readonly version: number
  readonly durationInMonths: number
  readonly imageFilename: string
  readonly line: number
  readonly university: string
  readonly courseType: string
}

export type Page = {
  readonly content: ProgramItem[]
  readonly pageable: {
    readonly sort: {
      readonly sorted: boolean
      readonly unsorted: boolean
      readonly empty: boolean
    }
    readonly offset: number
    readonly pageSize: number
    readonly pageNumber: number
    readonly paged: boolean
    readonly unpaged: boolean
  }
  readonly totalPages: number
  readonly totalElements: number
  readonly last: boolean
  readonly size: number
  readonly number: number
  readonly first: boolean
  readonly numberOfElements: number
  readonly sort: {
    readonly sorted: boolean
    readonly unsorted: boolean
    readonly empty: boolean
  }
  readonly empty: boolean
}

export type GoalType = 'MAIN' | 'SPECIFIC'

export type Goal = {
  readonly id: number
  readonly type: GoalType
  readonly description: string
}

export type Program = {
  readonly id: number
  readonly name: string
  readonly code: string
  readonly university: string
  readonly line: number
  readonly courseType: string
  readonly summary: string
  readonly requisites: string
  readonly profile: string
  readonly aimedTo: string
  readonly version: number
  readonly durationInMonths: number
  readonly modulesSorting: string
  readonly goals: Goal[]
  readonly imageItemFilename: string
  readonly imageFilename: string
}

export type ModuleType = 'OFFICIAL' | 'OPTIONAL' | 'LECTURE'

export type Module = {
  readonly id: number
  readonly name: string
  readonly program: number
  readonly goal: string
  readonly content: string
  readonly credits: number
  readonly onSiteHours: number
  readonly offSiteHours: number
  readonly type: ModuleType
}

export type GroupStatus =
  | 'OPEN'
  | 'OPEN_IN_PROGRESS'
  | 'CLOSED_IN_PROGRESS'
  | 'CLOSED'

export type GroupMode =
  | 'FACE2FACE'
  | 'BLENDED'
  | 'VIRTUAL'
  // RETIRED MODE debe ser oculto de la vista de grupos
  | 'RETIRED'

export type Group = {
  readonly id: number
  readonly code: string
  readonly registerPrice: number
  readonly price: number
  readonly quota: number
  readonly recoveryPrice: number
  readonly retakePrice: number
  readonly startDate: Date
  readonly endDate: Date
  readonly numberOfQuotas: number
  readonly additional: string
  readonly status: GroupStatus
  readonly mode: GroupMode
  readonly program: number
  readonly currency: 'BS'
  readonly host: string
  readonly numberOfEnrollments: number
}

export type ProgramFilter = {
  readonly lineId: string
  readonly customText: string
  readonly page: string
  readonly sortBy: string
  readonly size: string
}
