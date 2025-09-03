// LEGO BUILDER - Processor Blocks: Score Calculations
// ASSIGNED CODER: Gemini  
// CATEGORY: Processor Block
// REWRITE TIME: 2 minutes
// COMPLEXITY: Simple (10-15 lines max)

import type { Team, StationResult } from '../../types'

// Pure score calculation function
export const calculateStationScore = (
  answers: Record<string, any>, 
  correctAnswers: Record<string, any>
): number => {
  const totalQuestions = Object.keys(correctAnswers).length
  if (totalQuestions === 0) return 0
  
  const correctCount = Object.entries(answers).reduce((count, [questionId, answer]) => {
    const correct = correctAnswers[questionId]
    if (Array.isArray(correct)) {
      return correct.some(c => c.toLowerCase() === answer.toLowerCase()) ? count + 1 : count
    }
    return correct.toLowerCase() === answer.toLowerCase() ? count + 1 : count
  }, 0)
  
  return Math.round((correctCount / totalQuestions) * 100)
}

// Team total score processor
export const processTeamTotalScore = (team: Team): number => {
  return team.totalScore || 0
}

// Station result processor
export const processStationResult = (
  stationId: string,
  answers: Record<string, any>,
  correctAnswers: Record<string, any>,
  timeUsed: number,
  hintsUsed: number
): StationResult => {
  const baseScore = calculateStationScore(answers, correctAnswers)
  
  // Apply time and hint bonuses/penalties
  const timeBonus = timeUsed < 180 ? 10 : 0  // Bonus for completing under 3 minutes
  const hintPenalty = hintsUsed * 5  // 5 point penalty per hint
  
  const finalScore = Math.max(0, baseScore + timeBonus - hintPenalty)
  
  return {
    stationId,
    score: finalScore,
    timeUsed,
    hintsUsed,
    answers
  }
}

// Team ranking processor
export const processTeamRankings = (teams: Team[]): Team[] => {
  return teams
    .sort((a, b) => {
      // Primary sort: total score (descending)
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore
      }
      // Secondary sort: completion count (descending)  
      return b.completedStations.length - a.completedStations.length
    })
}