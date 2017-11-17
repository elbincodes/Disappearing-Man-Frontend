document.addEventListener('DOMContentLoaded', function(){
  displayImg();
  addLetterListener();
  dropDownListener();
})

const wordsUrl = 'http://shielded-sands-96735.herokuapp.com/api/v1/words';
const letterForm = document.getElementById("letter_form")
const letterInputField = document.getElementById('letter_input');
let word;
let hiddenWord;
let wordPic = document.getElementById('word_pic')
let dropDown = document.getElementById('level_section');

const img1 = 'https://image.ibb.co/fLhRVw/Screen_Shot_2017_11_14_at_1_14_13_PM.png';
const img2 = 'https://image.ibb.co/kdtBxb/Screen_Shot_2017_11_14_at_1_14_06_PM.png';
const img3 = 'https://image.ibb.co/e8i0qw/Screen_Shot_2017_11_14_at_1_13_56_PM.png';
const img4 = 'https://image.ibb.co/k33uHb/Screen_Shot_2017_11_14_at_1_13_47_PM.png';
const img5 = 'https://image.ibb.co/eNJTcb/Screen_Shot_2017_11_14_at_1_13_08_PM.png';
const img6 = 'https://image.ibb.co/gk1TSb/Screen_Shot_2017_11_14_at_1_12_55_PM.png';
const img7 = 'http://weclipart.com/gimg/586781643994F715/AcbKobrni.png';

const imgArr = [img1, img2, img3, img4, img5, img6, img7];

const displayImg = () => {
  document.getElementById("dpman_image").src = imgArr[0];
}

function limit(element) {
  if (element.value.length > 1) {
    element.value = element.value.slice(0, 1);
    return element.value;
  } else {
    return element.value;
  }
}

const addLetterListener = () => {
  letterForm.addEventListener("submit", function(ev){
    ev.preventDefault();
    let newChar = limit(letterInputField);
    hiddenWord.addGuess(newChar.toLowerCase());
    censorWord(hiddenWord.display());
    winnerOption();
    document.forms["letter_form"].reset();
    hiddenWord.hintImage();
  });
}

function fetchWord(wordsUrl) {
   fetch(wordsUrl)
   .then(res => res.json())
   .then(objects => {
     // the above objects were originally json variable.
    let filtered =  objects.filter(function(elem){
    	return elem.level_id === parseInt(document.getElementById('level_section').value)
    })
     wordObj = filtered[Math.floor(Math.random() * filtered.length)]
     hiddenWord = new HiddenWord(wordObj);
     censorWord(hiddenWord.display());
   })
 }

function censorWord(word) {
  document.getElementById("censored").innerText = word;
}

function dropDownListener() {
  levelNum = parseInt(document.getElementById('level_section').value)
  dropDown.addEventListener("change", function(ev){
    fetchWord('http://shielded-sands-96735.herokuapp.com/api/v1/words', levelNum)
  })
}

function newWordListener() {
  let postForm = document.getElementById('post_form');
  postForm.addEventListener("submit", function(ev){
    ev.preventDefault();
    postWord();
    document.forms["post_form"].reset();
  })

}

function wordLevelFunc(word){
 let lengthNum = word.length;

 if (lengthNum <= 5){
   return 1;
 } else if (lengthNum <= 9){
   return 2;
 } else {
   return 3;
 }
}

 function winnerOption() {
  if (!(document.getElementById('censored').innerHTML).includes('#')) {
    const tag = document.getElementById('post_req_area')
    const node = `<form id="post_form"><h5>Congrats on winning!</h5>Please add a new word: <br><input id="word_input" type="text" name="word_input" placeholder="NEW WORD"/> <br>Please add an Image URL that has a picture of your word in it:<br><input id="url_input" type="text" name="url_input" placeholder="NEW IMAGE URL"/><br><input type="submit" value="Submit"/></form>`
    tag.innerHTML = node
    newWordListener()
  }
}

const postWord = () => {
  const body = {
    name: document.getElementById("word_input").value.toLowerCase(),
    url: document.getElementById("url_input").value,
    level_id: wordLevelFunc(document.getElementById("word_input").value)
      // refactor this above function call.
}
  const headers = {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }
  fetch('http://shielded-sands-96735.herokuapp.com/api/v1/words', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: headers
  }).then(
    alert("Congrats! Your word has been added to the game!"),
    location.reload()
  )
}
