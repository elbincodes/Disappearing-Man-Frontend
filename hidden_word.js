class HiddenWord {

  constructor(wordObj) {
    this.name = wordObj.name
    this.guesses = []
    this.image = wordObj.url
    this.counter = 0
    this.incorrectGuesses = []//
  }

  addGuess(letter) {
    this.guesses.push(letter)
    document.getElementById("all_guesses").innerHTML = `YOUR PREVIOUS GUESSES:  ${this.guesses.join(', ')}`
    if (!this.name.includes(letter)) {
      this.counter += 1;
      this.incorrectGuesses.push(letter)//
      document.getElementById("dpman_image").src = `${imgArr[this.counter]}`;
      console.log(this.counter)
    }
  }


  display() {
    return this.name.split('').map(char => {
      if (this.guesses.includes(char)){
        return char
      } else {
        return '#'
      }
    }).join('')
  }


  hintImage(){
    wordPic.src = this.image
    // wordPic.style.opacity = (.1).toString()
    wordPic.style.opacity = (((this.counter) + 1)/15).toString()
  }
}
