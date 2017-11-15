class HiddenWord {

  constructor(word) {
    this.word = word
    this.guesses = []
  }

  addGuess(letter) {
    this.guesses.push(letter)
  }


  display() {
    // 
    return this.word.split('').map(char => {
      if (this.guesses.includes(char)){
        return char
      } else {
        return '#'
      }
    }).join('')
  }
}

hiddenWord = new HiddenWord("puppy")
hiddenWord.addGuess('y')
hiddenWord.display()

/////////////////////
