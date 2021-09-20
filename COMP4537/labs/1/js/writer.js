const backBtn = document.getElementById('writeBckBtn');
const txtBox = document.getElementById('addTextBox');

// Global Array to store objects.
let arrayDiv = [];

txtBox.onclick = () => {
  addTextBox();
};

backBtn.onclick = () => {
  window.location.href = 'index.html';
};

// Object constructor for a TextBox
function TextBox(data) {
  let div = document.createElement('Div');

  this.txtBox = document.createElement('TextArea');
  this.txtBox.data = data;
  let txtBoxData = document.createTextNode(this.txtBox.data);

  this.btnRemove = document.createElement('Button');
  this.btnName = document.createTextNode('Remove');
  this.btnRemove.appendChild(this.btnName);

  this.txtBox.appendChild(txtBoxData);
  div.appendChild(this.txtBox);
  div.appendChild(this.btnRemove);

  let textArea = document.getElementById('textArea');
  textArea.appendChild(div);

  //Removes the textbox.
  this.btnRemove.addEventListener('click', function () {
    div.remove();

    // After removing the desired element, we store the remaining elements
    // in "textArea". We then select the parent element and while there are children
    // we remove them. We then empty the global array and for each element in our variable
    // textArea, we push the new object.
    let textArea = document.querySelectorAll('textArea');
    console.log(textArea);
    let query_div = document.querySelector('div');
    let divChildren = query_div.firstElementChild;
    while (divChildren) {
      query_div.removeChild(divChildren);
      divChildren = query_div.firstElementChild;
    }
    arrayDiv.length = 0;
    textArea.forEach(element => {
      arrayDiv.push(new TextBox(element.value));
    });
  });

  //Listens for changes in the textbox.
  this.txtBox.addEventListener('input', function () {
    this.data = this.value;
  });
}

// checks to see if browsers support web storage.
function supportBrowser() {
  const msg_notSupported = 'Sorry web Storage is not supported!';
  if (typeof Storage == 'undefined') {
    document.write(msg_notSupported);
    window.stop();
  }
}

// When writer.html loads, addLocalText() parases through the local storage and pushes the
// objects in the local storage array into arrayDiv
function addLocalText() {
  if (localStorage.length != 0) {
    let bx = JSON.parse(localStorage.getItem('KEY'));
    for (let i = 0; i < bx.length; i++) {
      arrayDiv.push(new TextBox(bx[i].txtBox.data));
    }
  }
}

// addTextBox adds a new TextBox object into arrayDiv
function addTextBox() {
  arrayDiv.push(new TextBox(""));
}

// Turns the arrayDiv into JSON and sets it into local storage every two seconds.
function storedAt() {
  let myJson = JSON.stringify(arrayDiv);
  localStorage.setItem('KEY', myJson);
  updateStoredAt();
}

// Increments the time.
function updateStoredAt() {
  let d = new Date();
  let newD = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  document.getElementById('storedAt').innerHTML = 'Stored at: ' + newD;
}

supportBrowser();
addLocalText();
setInterval(storedAt, 2000);
