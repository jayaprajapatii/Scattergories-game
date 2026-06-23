function scoreCalculator(answers) {

  let totalScore = 0;

  Object.values(answers).forEach((answer) => {

    if (answer.trim() !== "") {
      totalScore += 10;
    }

  });

  return totalScore;

}

export default scoreCalculator;