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
let newArrayDiv = [];

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
    // arrayDiv.pop(div);
    for (let i = 0; i < arrayDiv.length; i++) {
      if (i == div.id) {
        continue;
      } else {
        newArrayDiv[i] = arrayDiv[i];
      }
    }
    localStorage.removeItem(div.id);
    console.log(arrayDiv);
    console.log(newArrayDiv);
  });

  //Listens for changes in the textbox.
  this.txtBox.addEventListener('input', function () {
    let textBoxData = this.value;
    let textBoxIndex = newArrayDiv.findIndex((item) => item.key === key);
    newArrayDiv[textBoxIndex].data = textBoxData;
    // console.log(arrayDiv);
  });
}

function addLocalText() {
  if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let localKey = localStorage.key(i);
      let bx = JSON.parse(localStorage.getItem(localKey));
      let newBx = new TextBox(bx.key, bx.data);
      newArrayDiv.push(newBx);
      total++;
    }
  }
}

function addTextBox() {
  let textBox = new TextBox(total, null);
  arrayDiv.push(textBox);
  let myJson = JSON.stringify(textBox);
  localStorage.setItem(total, myJson);
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
  for (let i = 0; i < newArrayDiv.length; i++) {
    let myObj = newArrayDiv[i];
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
