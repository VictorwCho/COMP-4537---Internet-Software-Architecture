const backBtn = document.getElementById('writeBckBtn');
const txtBox = document.getElementById('addTextBox');

txtBox.onclick = () => {
  addTextBox();
};

backBtn.onclick = () => {
  window.location.href = 'index.html';
};

//global variable to keep track of div numbers.
let total = 0;
let apples = true;

/**
 * - addTextBox() function creates a div tag with an incremental number assigned to
 * a variable called total
 * - A button and textarea is then appended to the unique div
 * - An event listener is added to the remove button to delete the div
 * - total gets incremented accordingly
 *
 * */
let arrayDiv = [];

function TextBox(key, data) {
  this.key = key;
  this.data = data;

  let div = document.createElement('Div');
  div.id = total;

  this.txtbx = document.createElement('TextArea');

  this.btn = document.createElement('Button');
  this.btnName = document.createTextNode('Remove');
  this.btn.appendChild(this.btnName);

  div.appendChild(this.txtbx);
  div.appendChild(this.btn);

  let textArea = document.getElementById('textArea');
  textArea.appendChild(div);

  this.btn.addEventListener('click', function () {
    div.remove();
    arrayDiv.pop(div);
    console.log(arrayDiv);
  });
}

function addTextBox() {
  arrayDiv.push(new TextBox(total, 'Any'));
  total = total + 1;
  console.log(arrayDiv);
}

const msg_notSupported = 'Sorry web Storage is not supported!';
const msg_key = 'hidden secret';
const msg_written = 'A piece of data was written in local storage for they key:';
if (typeof Storage == 'undefined') {
  document.write(msg_notSupported);
  window.stop();
}
localStorage.setItem(msg_key, '2021');
document.write(msg_written + key);
