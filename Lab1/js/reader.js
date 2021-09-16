const backBtn = document.getElementById('readBckBtn');

backBtn.onclick = () => {
  window.location.href = 'index.html';
};

let total = 0;
let arrayDiv = [];

function DataReadIn(key, data) {
  this.key = key;
  if (data === null) {
    this.data = '';
  } else {
    this.data = data;
  }

  let div = document.createElement('Div');
  div.id = total;

  this.divArea = document.createElement('Div');
  this.divAreaData = document.createTextNode(this.data);
  div.appendChild(this.divAreaData);

  div.appendChild(this.divArea);

  let textArea = document.getElementById('textArea');
  textArea.appendChild(div);
}

function addLocalText() {
  if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let localKey = localStorage.key(i);
      let bx = JSON.parse(localStorage.getItem(localKey));
      let newBx = new DataReadIn(bx.key, bx.data);
      arrayDiv.push(newBx);
      total++;
    }
  }
}

function readAt() {
  for (let i = 0; i < arrayDiv.length; i++) {
    let myObj = arrayDiv[i];
    let myJson = JSON.stringify(myObj);
    localStorage.setItem(i, myJson);
  }
  updateReadAt();
}

function updateReadAt() {
  let d = new Date();
  let newD = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  document.getElementById('readAt').innerHTML = 'Read at: ' + newD;
}

addLocalText();
setInterval(readAt, 2000);
