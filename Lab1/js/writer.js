const backBtn = document.getElementById('writeBckBtn');
const txtBox = document.getElementById('addTextBox');

txtBox.onclick = () => {
  addTextBox();
};

backBtn.onclick = () => {
  window.location.href = 'index.html';
};

//Global variable to be used for unique ids.
let total = 0;
let arrayDiv = [];

function TextBox(key, data) {
  this.key = key;
  if (data === null) {
    this.data = '';
  } else {
    this.data = data;
  }

  let div = document.createElement('Div');
  div.id = total;

  this.txtBox = document.createElement('TextArea');
  this.txtBoxData = document.createTextNode(this.data);
  this.txtBox.appendChild(this.txtBoxData);

  this.btnRemove = document.createElement('Button');
  this.btnName = document.createTextNode('Remove');
  this.btnRemove.appendChild(this.btnName);

  div.appendChild(this.txtBox);
  div.appendChild(this.btnRemove);

  let textArea = document.getElementById('textArea');
  textArea.appendChild(div);

  //Removes the textbox.
  this.btnRemove.addEventListener('click', function () {
    div.remove();
    localStorage.removeItem(div.id);
    arrayDiv.splice(div.id, 1);
    console.log(arrayDiv);
  });

  //Listens for changes in the textbox.
  this.txtBox.addEventListener('input', function () {
    let textBoxData = this.value;
    let textBoxIndex = arrayDiv.findIndex((item) => item.key === key);
    arrayDiv[textBoxIndex].data = textBoxData;
    // console.log(arrayDiv);
  });
}

function addLocalText() {
  if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let localKey = localStorage.key(i);
      let bx = JSON.parse(localStorage.getItem(localKey));
      let newBx = new TextBox(bx.key, bx.data);
      arrayDiv.push(newBx);
      total++;
    }
  }
}

function addTextBox() {
  arrayDiv.push(new TextBox(total, null));
  total++;
}

const msg_notSupported = 'Sorry web Storage is not supported!';
// const msg_key = 'hidden secret';
// const msg_written = 'A piece of data was written in local storage for they key:';
if (typeof Storage == 'undefined') {
  document.write(msg_notSupported);
  window.stop();
}

function storedAt() {
  for (let i = 0; i < arrayDiv.length; i++) {
    // console.log(arrayDiv);
    let myObj = arrayDiv[i];
    let myJson = JSON.stringify(myObj);
    localStorage.setItem(myObj.key, myJson);
  }
  updateStoredAt();
}

function updateStoredAt() {
  let d = new Date();
  let newD = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  document.getElementById('storedAt').innerHTML = 'Stored at: ' + newD;
}

addLocalText();
setInterval(storedAt, 2000);
