 document.getElementById('word_pic').src = "https://media1.tenor.com/images/56b2b212b5a14ce62cafd056ce954500/tenor.gif?itemid=5259835"

/////////////////////


hintImage(){
  wordPic.src = this.image
  wordPic.style.opacity =
}
}



function fetchWord(wordsUrl,level) {
   fetch(wordsUrl)
   .then(res => res.json())
   .then(objects => {
     // the above objects were originally json variable.
     objects.filter(elem, function(){
	      return elem.level_id === level
      })
    })
    .then(objects => {
     wordObj = objects[Math.floor(Math.random() * objects.length)]



     hiddenWord = new HiddenWord(wordObj);

     censorWord(hiddenWord.display());
   })
 }
