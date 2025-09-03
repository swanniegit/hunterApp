import { useState, useEffect } from 'react'
import { getCollaborativeChallenges, getIndividualPuzzles, calculateStationScore } from '../data/stationContent'

function CollaborativeStation({ station, team, physicalGroup, onComplete, onBack, onUnlockForGroup }) {
  const [phase, setPhase] = useState('collaboration') // 'collaboration', 'individual'
  const [groupProgress, setGroupProgress] = useState(0)
  const [collaborativeComplete, setCollaborativeComplete] = useState(false)
  const [teamAnswers, setTeamAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes total
  const [hintsUsed, setHintsUsed] = useState(0)

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

  const collaborativeChallenges = getCollaborativeChallenges(station.id)
  const individualPuzzles = getIndividualPuzzles(station.id)

  const handleCollaborativeProgress = (challengeId, completed) => {
    if (completed) {
      const newProgress = groupProgress + (100 / collaborativeChallenges.length)
      setGroupProgress(newProgress)
      
      if (newProgress >= 100) {
        setCollaborativeComplete(true)
        setPhase('individual')
        // Unlock individual phase for all teams in group
        onUnlockForGroup(physicalGroup.id, station.id, 'individual')
      }
    }
  }

  const handleTeamAnswer = (questionId, answer) => {
    setTeamAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleIndividualComplete = () => {
    const score = calculateTeamScore()
    onComplete({
      stationId: station.id,
      teamId: team.id,
      groupId: physicalGroup.id,
      score,
      timeUsed: 600 - timeRemaining,
      hintsUsed,
      answers: teamAnswers,
      phase: 'individual'
    })
  }

  const calculateTeamScore = () => {
    const baseScore = calculateStationScore(teamAnswers, station.id)
    const timeBonus = Math.max(0, Math.floor(timeRemaining / 20))
    const hintPenalty = hintsUsed * 10
    const collaborationBonus = collaborativeComplete ? 20 : 0
    return Math.max(0, baseScore + timeBonus - hintPenalty + collaborationBonus)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
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
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Physical Group: {physicalGroup.name}</span>
                  <span>•</span>
                  <span>Your Team: {team.name}</span>
                </div>
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
                  {phase === 'individual' ? calculateTeamScore() : 0}pts
                </div>
                <div className="text-xs text-gray-600">Your Team Score</div>
              </div>
              
              <div className="text-center">
                <div className={`text-lg font-semibold ${
                  phase === 'collaboration' ? 'text-cerise-500' : 'text-teal-500'
                }`}>
                  {phase === 'collaboration' ? 'Collaborate' : 'Individual'}
                </div>
                <div className="text-xs text-gray-600">Phase</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Phase Indicator */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {phase === 'collaboration' ? 'Collaborative Phase' : 'Individual Team Phase'}
            </h2>
            <div className="flex space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                phase === 'collaboration' ? 'bg-cerise-500' : 'bg-teal-500'
              }`} />
              <div className={`w-3 h-3 rounded-full ${
                collaborativeComplete ? 'bg-teal-500' : 'bg-gray-300'
              }`} />
            </div>
          </div>
          
          {phase === 'collaboration' && (
            <div>
              <p className="text-gray-600 mb-4">
                Work together with all teams in your physical group to unlock the individual phase.
                All {physicalGroup.teams.length} teams must collaborate to progress.
              </p>
              <div className="bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-cerise-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${groupProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Group Progress: {Math.round(groupProgress)}%
              </p>
            </div>
          )}
          
          {phase === 'individual' && (
            <p className="text-gray-600">
              Great! Your group unlocked the individual phase. Now compete with your original team 
              ({team.members.join(', ')}) to earn points for your team ranking.
            </p>
          )}
        </div>

        {/* Collaborative Phase */}
        {phase === 'collaboration' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Group Members */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Physical Group Members ({physicalGroup.members.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {physicalGroup.teams.map(groupTeam => (
                  <div 
                    key={groupTeam.id}
                    className={`p-3 rounded-lg border-2 ${
                      groupTeam.id === team.id 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{groupTeam.name}</div>
                    <div className="text-sm text-gray-600">
                      {groupTeam.members.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaborative Challenges */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Group Challenges</h3>
              <div className="space-y-4">
                {collaborativeChallenges.map((challenge, index) => (
                  <CollaborativeChallenge 
                    key={challenge.id}
                    challenge={challenge}
                    isUnlocked={index === 0 || groupProgress >= (index * (100 / collaborativeChallenges.length))}
                    onComplete={(completed) => handleCollaborativeProgress(challenge.id, completed)}
                    physicalGroup={physicalGroup}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Individual Phase */}
        {phase === 'individual' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Team Challenge - {team.name}
                </h3>
                <p className="text-gray-600">
                  Complete these puzzles to earn points for your team ranking
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-600">
                  {calculateTeamScore()} points
                </div>
                <div className="text-sm text-gray-600">Potential Score</div>
              </div>
            </div>

            <div className="space-y-6">
              {individualPuzzles.map((puzzle, index) => (
                <IndividualPuzzle 
                  key={puzzle.id}
                  puzzle={puzzle}
                  answer={teamAnswers[puzzle.id]}
                  onAnswer={handleTeamAnswer}
                  isLocked={index > 0 && !teamAnswers[individualPuzzles[index - 1].id]}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setHintsUsed(hintsUsed + 1)}
                disabled={hintsUsed >= 2}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:bg-gray-300"
              >
                Use Hint ({2 - hintsUsed} left)
              </button>

              <button
                onClick={handleIndividualComplete}
                disabled={!Object.keys(teamAnswers).length}
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300"
              >
                Complete Station
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Collaborative Challenge Component
function CollaborativeChallenge({ challenge, isUnlocked, onComplete, physicalGroup }) {
  const [solved, setSolved] = useState(false)
  const [checkpoints, setCheckpoints] = useState({})
  const [qrScanned, setQrScanned] = useState(false)
  
  if (!isUnlocked) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg opacity-60">
        <h4 className="font-medium text-gray-500">{challenge.title}</h4>
        <p className="text-sm text-gray-400">Complete previous challenge to unlock</p>
      </div>
    )
  }

  const handleCheckpointToggle = (checkpoint, index) => {
    setCheckpoints(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const completedCheckpoints = Object.values(checkpoints).filter(Boolean).length
  const totalCheckpoints = challenge.checkpoints?.length || 0
  const isAssemblyComplete = completedCheckpoints === totalCheckpoints

  return (
    <div className={`p-4 border rounded-lg ${solved ? 'bg-teal-50 border-teal-300' : 'bg-white border-gray-300'}`}>
      <h4 className="font-medium text-gray-900 mb-2">{challenge.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
      
      {challenge.materials && (
        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
          <strong>Materials:</strong> {challenge.materials}
        </div>
      )}
      
      {challenge.type === 'hands-on' && challenge.checkpoints && (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 mb-2">
            Assembly Progress: {completedCheckpoints} / {totalCheckpoints} checkpoints
          </div>
          <div className="space-y-2">
            {challenge.checkpoints.map((checkpoint, index) => (
              <label key={index} className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={checkpoints[index] || false}
                  onChange={() => handleCheckpointToggle(checkpoint, index)}
                  className="mt-1 text-teal-600"
                />
                <span className={`text-sm ${checkpoints[index] ? 'text-teal-700 font-medium' : 'text-gray-700'}`}>
                  {checkpoint}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-3">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-teal-500 to-cerise-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCheckpoints / totalCheckpoints) * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => {
              setSolved(true)
              onComplete(true)
            }}
            disabled={!isAssemblyComplete || solved}
            className="w-full px-3 py-2 bg-cerise-600 text-white rounded-md hover:bg-cerise-700 disabled:bg-gray-300 text-sm"
          >
            {solved ? 'Assembly Completed ✓' : isAssemblyComplete ? 'Complete Assembly' : `Complete ${totalCheckpoints - completedCheckpoints} more checkpoints`}
          </button>
        </div>
      )}
      
      {challenge.type === 'validation' && (
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Success Criteria:</strong> {challenge.successCriteria}
            </p>
          </div>
          
          {!qrScanned ? (
            <div className="space-y-3">
              <button
                onClick={() => setQrScanned(true)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                📱 Scan QR Code (Simulate)
              </button>
              <p className="text-xs text-gray-500 text-center">
                Click to simulate scanning the QR code that appears when desktop powers on
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800 text-sm font-medium">
                  ✅ QR Code Scanned Successfully!
                </p>
                <p className="text-green-600 text-xs mt-1">
                  Individual questions are now unlocked
                </p>
              </div>
              <button
                onClick={() => {
                  setSolved(true)
                  onComplete(true)
                }}
                disabled={solved}
                className="w-full px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300 text-sm"
              >
                {solved ? 'Validation Complete ✓' : 'Complete Validation'}
              </button>
            </div>
          )}
        </div>
      )}
      
      {challenge.type === 'discussion' && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            Discuss with your physical group and reach consensus
          </p>
          <button
            onClick={() => {
              setSolved(true)
              onComplete(true)
            }}
            disabled={solved}
            className="px-3 py-2 bg-cerise-600 text-white rounded-md hover:bg-cerise-700 disabled:bg-gray-300 text-sm"
          >
            {solved ? 'Completed ✓' : 'Mark Complete'}
          </button>
        </div>
      )}
    </div>
  )
}

// Individual Puzzle Component
function IndividualPuzzle({ puzzle, answer, onAnswer, isLocked }) {
  if (isLocked) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg opacity-60">
        <h4 className="font-medium text-gray-500">{puzzle.title}</h4>
        <p className="text-sm text-gray-400">Complete previous puzzle to unlock</p>
      </div>
    )
  }

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <h4 className="font-medium text-gray-900 mb-2">{puzzle.title}</h4>
      <p className="text-gray-600 mb-4">{puzzle.question}</p>
      
      {puzzle.type === 'multiple-choice' && (
        <div className="space-y-2">
          {puzzle.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={puzzle.id}
                value={option}
                checked={answer === option}
                onChange={(e) => onAnswer(puzzle.id, e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
      
      {puzzle.type === 'text' && (
        <input
          type="text"
          value={answer || ''}
          onChange={(e) => onAnswer(puzzle.id, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter your answer..."
        />
      )}
      
      {puzzle.type === 'dropdown' && (
        <div>
          <select
            value={answer || ''}
            onChange={(e) => onAnswer(puzzle.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
          >
            <option value="">-- Select your answer --</option>
            {puzzle.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {puzzle.type === 'multi-dropdown' && (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            Select {puzzle.requiredSelections} options:
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
            {puzzle.options.map((option, index) => {
              const selectedAnswers = Array.isArray(answer) ? answer : []
              const isSelected = selectedAnswers.includes(option)
              const canSelect = selectedAnswers.length < puzzle.requiredSelections || isSelected
              
              return (
                <label 
                  key={index} 
                  className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                    isSelected ? 'bg-teal-50 border border-teal-200' : 
                    canSelect ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={!canSelect}
                    onChange={(e) => {
                      const currentAnswers = Array.isArray(answer) ? [...answer] : []
                      if (e.target.checked) {
                        if (currentAnswers.length < puzzle.requiredSelections) {
                          onAnswer(puzzle.id, [...currentAnswers, option])
                        }
                      } else {
                        onAnswer(puzzle.id, currentAnswers.filter(a => a !== option))
                      }
                    }}
                    className="text-teal-600"
                  />
                  <span className={isSelected ? 'font-medium text-teal-700' : ''}>{option}</span>
                </label>
              )
            })}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Selected: {Array.isArray(answer) ? answer.length : 0} / {puzzle.requiredSelections}
          </div>
        </div>
      )}
      
      {puzzle.hint && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
          💡 <strong>Hint:</strong> {puzzle.hint}
        </div>
      )}
    </div>
  )
}


export default CollaborativeStation