// on submit newWordListener


// function winnerOption() {
//   if (!(document.getElementById('censored').innerHTML).includes('#')){
//     console.log("test no hash")
//   }
// }

function appendWordForm() {
  const tag = document.getElementById('post_req_area')
  let node = `<form id="post_form"><h5>Congrats on winning!</h5>Please add a new word: <br><input id="word_input" type="text" name="word_input" placeholder="NEW WORD"/> <br>Please add an Image URL that has a picture of your word in it:<br><input id="url_input" type="text" name="url_input" placeholder="NEW IMAGE URL"/><br><input type="submit" value="Submit"/></form>`
  tag.innerHTML = node
}
