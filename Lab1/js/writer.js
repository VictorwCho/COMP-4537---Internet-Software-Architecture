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

function TextBox(key) {
  this.key = key;
  this.data = null;

  let div = document.createElement('Div');
  div.id = total;

  this.txtBox = document.createElement('TextArea');

  this.btnRemove = document.createElement('Button');
  this.btnName = document.createTextNode('Remove');
  this.btnRemove.appendChild(this.btnName);

  div.appendChild(this.txtBox);
  div.appendChild(this.btnRemove);

  textArea = document.getElementById('textArea');
  textArea.appendChild(div);

  //Removes the textbox.
  this.btnRemove.addEventListener('click', function () {
    div.remove();
    arrayDiv.pop(div);
  });
  
  //Listens for changes in the textbox.
  this.txtBox.addEventListener('input', function() {
    textBoxData = this.value;
    textBoxIndex = arrayDiv.findIndex(item => item.key === key);
    arrayDiv[textBoxIndex].data = textBoxData;
    console.log(arrayDiv);
  });
}

function addTextBox() {
  arrayDiv.push(new TextBox(total, 'Any'));
  total = total + 1;
};



const msg_notSupported = 'Sorry web Storage is not supported!';
const msg_key = 'hidden secret';
const msg_written = 'A piece of data was written in local storage for they key:';
if (typeof Storage == 'undefined') {
  document.write(msg_notSupported);
  window.stop();
}

localStorage.setItem(msg_key, '2021');
document.write(msg_written + key);
