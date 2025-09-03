// LEGO BUILDER - Core Type Definitions
// ASSIGNED CODER: Claude
// REWRITE TIME: 2 minutes
// CATEGORY: Type Definitions

export interface Team {
  id: string
  name: string
  members: string[]
  unlockedStations: string[]
  completedStations: string[]
  currentStation: string | null
  stationAnswers: Record<string, any>
  totalScore: number
  startTime: string
  createdAt?: string
  lastUpdated?: string
}

export interface Station {
  id: string
  name: string
  description: string
  icon: string
  estimatedTime: number
  collaborative: CollaborativeChallenge[]
  individual: IndividualPuzzle[]
}

export interface StationStatus {
  id: string
  status: 'locked' | 'available' | 'completed'
  score?: number
}

export interface CollaborativeChallenge {
  id: string
  title: string
  description: string
  type: string
  hint?: string
  materials?: string
  expectedOutcomes?: string[]
}

export interface IndividualPuzzle {
  id: string
  title: string
  question: string
  type: 'multiple-choice' | 'text'
  options?: string[]
  correct: string | string[]
  hint: string
}

export interface PhysicalGroup {
  id: string
  name: string
  teams: Team[]
  stationProgress?: Record<string, any>
  lastUpdated?: string
}

export interface StationResult {
  stationId: string
  score: number
  timeUsed: number
  hintsUsed: number
  answers: Record<string, any>
}

// Block Interface Definitions
export interface BlockInterface<TInput, TOutput> {
  input: TInput
  output: TOutput
  dependencies?: Record<string, any>
}

// Utility Block Types
export interface ValidatorInput {
  value: any
  rules: ValidationRule[]
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern'
  value?: any
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// State Block Types
export interface StateUpdate<T> {
  type: string
  payload: Partial<T>
}

export interface StateBlock<T> {
  state: T
  update: (update: StateUpdate<T>) => T
}

// Event Block Types  
export interface EventPayload {
  type: string
  data: any
  timestamp: string
}

export interface EventHandler<T = any> {
  (payload: EventPayload): T
}