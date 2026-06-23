function generateRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const randomIndex = Math.floor(
    Math.random() * alphabet.length
  );

  return alphabet[randomIndex];
}

export default generateRandomLetter;