interface ExercisePerformance {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exercises: number[]): ExercisePerformance => {
  const target = 2
  const average = exercises.reduce((acc, val) => acc + val) / exercises.length
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

console.log(calculateExercises([1, 3, 2, 0, 4, 3, 0, 0, 0, 1]))