interface ExercisePerformance {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exercises: number[], target: number): ExercisePerformance => {
  if (isNaN(target)) {
    throw new Error("Target needs to be defined")
  }

  const average = exercises.length > 0 ? exercises.reduce((acc, val) => acc + val) / exercises.length : 0
  const rating = average < target / 2 ? 1 : average >= target ? 3 : 2
  const ratingDescription = rating === 1 
    ? "You can do better"
    : rating === 2
    ? "You're getting close"
    : "Splendid!"

  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter(e => e != 0).length,
    success: rating === 3,
    rating,
    ratingDescription,
    target,
    average,    
  }
}

if (require.main === module) {
  const target = parseInt(process.argv[2])
  const exercises = process.argv.splice(3, process.argv.length).map(e => parseFloat(e))

  try {
    console.log(calculateExercises(exercises, target))
  } catch(error) {
    console.log(error)
  }
}

export default calculateExercises