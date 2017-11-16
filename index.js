document.addEventListener('DOMContentLoaded', function(){
  displayImg();
  addLetterListener();
  dropDownListener();
  newWordListener()
  // fetchWord('http://localhost:3000/api/v1/words');
})
const wordsUrl = 'http://localhost:3000/api/v1/words';
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

const addLetterListener = () => {
  letterForm.addEventListener("submit", function(ev){
    ev.preventDefault();
    hiddenWord.addGuess(letterInputField.value.toLowerCase())
    censorWord(hiddenWord.display());
    document.forms["letter_form"].reset();
    hiddenWord.hintImage();
  });
}

function fetchWord(wordsUrl) {
   fetch(wordsUrl)
   .then(res => res.json())
   .then(objects => {
     // the above objects were originally json variable.
     //debugger
    let filtered =  objects.filter(function(elem){
    	return elem.level_id === parseInt(document.getElementById('level_section').value)

      //debugger;
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
    fetchWord('http://localhost:3000/api/v1/words', levelNum)
  })
}

function newWordListener() {
  let postForm = document.getElementById('post_form')
  postForm.addEventListener("submit", function(ev){
    //debugger
    ev.preventDefault()


    postWord()
    document.forms["post_form"].reset();
  })
}

function wordLevelFunc(word){

 let lengthNum = word.length;

 if (lengthNum <= 5){
   return 1;
 }
 else if (lengthNum <= 9){
   return 2;
 }else{
   return 3;
 }

}

 function winnerOption() {
  if (!(document.getElementById('censored').innerHTML).includes('#')){
    console.log("test no hash")
  }
}

const postWord = () => {
  // debugger
  const body = {
    name: document.getElementById("word_input").value,
    url: document.getElementById("url_input").value,
    level_id: wordLevelFunc(document.getElementById("word_input").value)
      // refacot this above function call.
}
  const headers = {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }
  fetch('http://localhost:3000/api/v1/words', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: headers
  })
}
