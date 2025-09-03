import { useState, useEffect } from 'react'
import { getIndividualPuzzles, calculateStationScore } from '../data/stationContent'

function Station({ station, team, onComplete, onBack }) {
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes
  const [hintsUsed, setHintsUsed] = useState(0)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const puzzles = getIndividualPuzzles(station.id)
  
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1)
      setShowHint(false)
    } else {
      handleCompleteStation()
    }
  }

  const handleCompleteStation = () => {
    const score = calculateScore()
    onComplete({
      stationId: station.id,
      score,
      timeUsed: 300 - timeRemaining,
      hintsUsed,
      answers
    })
  }

  const calculateScore = () => {
    const baseScore = calculateStationScore(answers, station.id)
    const timeBonus = Math.max(0, Math.floor(timeRemaining / 10))
    const hintPenalty = hintsUsed * 10
    return Math.max(0, baseScore + timeBonus - hintPenalty)
  }

  const useHint = () => {
    if (hintsUsed < 3) {
      setHintsUsed(hintsUsed + 1)
      setShowHint(true)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentPuzzleData = puzzles[currentPuzzle]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button 
                onClick={onBack}
                className="mr-4 text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{station.name}</h1>
                <p className="text-sm text-gray-600">Team: {team.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-cerise-600">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-xs text-gray-600">Time Left</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-teal-600">
                  {calculateScore()}pts
                </div>
                <div className="text-xs text-gray-600">Current Score</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-cerise-500">
                  {currentPuzzle + 1}/{puzzles.length}
                </div>
                <div className="text-xs text-gray-600">Puzzle</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentPuzzleData.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {currentPuzzleData.question || currentPuzzleData.description}
            </p>
          </div>

          <div className="mb-8">
            <PuzzleComponent 
              puzzle={currentPuzzleData}
              onAnswer={handleAnswer}
              userAnswer={answers[currentPuzzleData.id]}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={useHint}
                disabled={hintsUsed >= 3}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Use Hint ({3 - hintsUsed} left)
              </button>
              
              {showHint && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-800">{currentPuzzleData.hint}</p>
                </div>
              )}
            </div>

            <button
              onClick={handleNextPuzzle}
              disabled={!answers[currentPuzzleData.id]}
              className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {currentPuzzle < puzzles.length - 1 ? 'Next Puzzle' : 'Complete Station'}
            </button>
          </div>
        </div>

        <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
          <h3 className="font-semibold text-teal-900 mb-2">Station Progress</h3>
          <div className="flex space-x-2">
            {puzzles.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full ${
                  index < currentPuzzle
                    ? 'bg-teal-500'
                    : index === currentPuzzle
                    ? 'bg-cerise-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function PuzzleComponent({ puzzle, onAnswer, userAnswer }) {
  if (puzzle.type === 'multiple-choice') {
    return (
      <div className="space-y-4">
        {puzzle.options.map((option, index) => (
          <label key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name={puzzle.id}
              value={option}
              checked={userAnswer === option}
              onChange={(e) => onAnswer(puzzle.id, e.target.value)}
              className="mr-3"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    )
  }

  if (puzzle.type === 'text') {
    return (
      <div>
        <input
          type="text"
          value={userAnswer || ''}
          onChange={(e) => onAnswer(puzzle.id, e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter your answer..."
        />
      </div>
    )
  }

  return <div>Unknown puzzle type</div>
}


export default Station