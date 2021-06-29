
/*

*/
const calculateBmi = (cm: number, kg: number): string => {
  if (isNaN(cm) || isNaN(kg)) {
    throw new Error("cm and kg need to be valid numbers")
  }

  const bmi = kg / ((cm / 100) ** 2)
  if (bmi < 15) {
    return "Very severely underweight"
  } else if (bmi < 16) {
    return "Severely underweight"
  } else if (bmi < 18.5) {
    return "Underweight"
  } else if (bmi < 25) {
    return "Normal (healthy weight)"
  } else if (bmi < 30) {
    return "Overweight"
  } else if (bmi < 35) {
    return "Obese Class I (Moderately obese)"
  } else if (bmi < 40) {
    return "Obese Class II (Severely obese)"
  } else {
    return "Obese Class III (Very severely obese)"
  }
}

try {
  console.log(calculateBmi(parseInt(process.argv[2]), parseInt(process.argv[3])))
} catch(error) {
  console.error(error)
}