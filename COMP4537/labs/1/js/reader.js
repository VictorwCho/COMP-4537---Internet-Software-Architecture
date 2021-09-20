const backBtn = document.getElementById('readBckBtn');
const msg_notSupported = 'Sorry web Storage is not supported!';

// Global array to store objects.
let arrayDiv = [];

backBtn.onclick = () => {
  window.location.href = 'index.html';
}

// Object constructor for the data box.
function DataBox(data) {
  let div = document.createElement('Div');

  this.txtBox = document.createElement('TextArea');
  this.txtBox.data = data;
  let txtBoxData = document.createTextNode(this.txtBox.data);

  this.txtBox.appendChild(txtBoxData);
  div.appendChild(this.txtBox);

  let textArea = document.getElementById('textArea');
  textArea.appendChild(div);
}

// checks to see if browsers support web storage.
function supportBrowser() {
  if (typeof Storage == 'undefined') {
    document.write(msg_notSupported);
    window.stop();
  }
}

// Creates the object using information from the local storage.
function addLocalText() {
  if (localStorage.length != 0) {
    let bx = JSON.parse(localStorage.getItem("KEY"));
    for (let i = 0; i < bx.length; i++) {
      arrayDiv.push(new DataBox(bx[i].txtBox.data));
    }
  }
}

// Updates the textarea with new information when local storage is changed.
function readAt() {
  let query_div = document.querySelector('div');
  let divChildren = query_div.firstElementChild;
  while (divChildren) {
    query_div.removeChild(divChildren);
    divChildren = query_div.firstElementChild;
  }
  arrayDiv.length = 0;
  addLocalText();
  updateReadAt();
}

// Increments the time.
function updateReadAt() {
  let d = new Date();
  let newD = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  document.getElementById('readAt').innerHTML = 'Read at: ' + newD;
}

supportBrowser();
addLocalText();
setInterval(readAt, 2000);
