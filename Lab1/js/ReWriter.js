const backBtn = document.getElementById('writeBckBtn');
const txtBox = document.getElementById('addTextBox');

txtBox.onclick = () => {
  addTextBox();
};

backBtn.onclick = () => {
  window.location.href = 'index.html';
};

//Global variable to be used for unique ids.
// let total = 0;
let arrayDiv = [];

// Object constructor for a TextBox
function TextBox(data) {
  // // this.key = key;
  this.data = data

  let div = document.createElement('Div');
  // div.id = total;

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
    arrayDiv.splice(div, 1);
    // console.log(arrayDiv);
  });

  //Listens for changes in the textbox.
  this.txtBox.addEventListener('input', function () {
    this.data = this.value;
  

  //   // this.data = this.value;
  //   let textBoxIndex = arrayDiv.findIndex((item) => item.key == key);
  //   arrayDiv[textBoxIndex].data = this.value;
  //   console.log('hi');
  //   console.log(arrayDiv);

  });
}

// When writer.html loads, addLocalText() parases through the local storage and pushes the
// objects in the local storage array into arrayDiv
function addLocalText() {
  // for (let i = 0; i < arrayDiv.length; i++) {
  //   arrayDiv.push(new TextBox(arrayDiv[i]))
  // }
  if (localStorage.length != 0) {
    let bx = JSON.parse(localStorage.getItem('KEY'));
    for (let i = 0; i < bx.length; i++) {
      // arrayDiv[i].data = bx[i].txtBox.data;
      arrayDiv.push(new TextBox(bx[i].txtBox.data));
      // console.log(arrayDiv);
    }
  }


  // for (let i = 0; i < localStorage.length; i++) {
  //   let localKey = localStorage.key(i);
  //   let bx = JSON.parse(localStorage.getItem(localKey));
  //   let newBx = new TextBox(bx.key, bx.data);
  //   arrayDiv.push(newBx);
  //   total++;
  // }
  //   }
}

// addTextBox adds a new TextBox object into arrayDiv
function addTextBox() {
  arrayDiv.push(new TextBox(null));
  console.log(arrayDiv);
  // total++;
}

const msg_notSupported = 'Sorry web Storage is not supported!';
// const msg_key = 'hidden secret';
// const msg_written = 'A piece of data was written in local storage for they key:';
if (typeof Storage == 'undefined') {
  document.write(msg_notSupported);
  window.stop();
}

// function storedAt() {
//   for (let i = 0; i < arrayDiv.length; i++) {
//     // console.log(arrayDiv);
//     let myObj = arrayDiv[i];
//     let myJson = JSON.stringify(myObj);
//     localStorage.setItem(myObj.key, myJson);
//   }
//   updateStoredAt();
// }

// Turns the arrayDiv into JSON and sets it into local storage.
function storedAt() {
  // for (let i = 0; i < arrayDiv.length; i++) {
  //     arrayDiv[i] = arrayDiv[i].data;
  // }

  //saves to local storage
  let myJson = JSON.stringify(arrayDiv);
  localStorage.setItem('KEY', myJson);

  // taking from local storage and saving it in local array
  let bx = JSON.parse(localStorage.getItem('KEY'));
  for (let i = 0; i < bx.length; i++) {
    arrayDiv[i].txtBox.data = bx[i].txtBox.data;
    // console.log(bx[i].txtBox.data);
    // console.log(arrayDiv[i]);

  }
  updateStoredAt();
}

// Increments the time.
function updateStoredAt() {
  let d = new Date();
  let newD = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  document.getElementById('storedAt').innerHTML = 'Stored at: ' + newD;
}


addLocalText();
setInterval(storedAt, 2000);
