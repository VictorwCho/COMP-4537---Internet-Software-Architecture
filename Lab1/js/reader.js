const backBtn = document.getElementById('readBckBtn');

backBtn.onclick = () => {
  window.location.href = 'index.html';
}

let arrayDiv = [];

function Data(data) {
  let div = document.createElement('Div');

  this.txtBox = document.createElement('TextArea');
  this.txtBox.data = data;
  let txtBoxData = document.createTextNode(this.txtBox.data);

  this.txtBox.appendChild(txtBoxData);
  div.appendChild(this.txtBox);

  let textArea = document.getElementById('textArea');
  textArea.appendChild(div);
}


function addLocalText() {
  if (localStorage.length != 0) {
      let bx = JSON.parse(localStorage.getItem("KEY"));
      for (let i = 0; i < bx.length; i++) {
          arrayDiv.push(new Data(bx[i].txtBox.data));
          console.log(arrayDiv);
  }
  }
}

function readAt() {
  let query_div = document.querySelector('div');
  let divChildren = query_div.firstElementChild;
  while (divChildren) {
    query_div.removeChild(divChildren);
    divChildren = query_div.firstElementChild;
  }
  addLocalText();
  updateReadAt();
}

function updateReadAt() {
  let d = new Date();
  let newD = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  document.getElementById('readAt').innerHTML = 'Read at: ' + newD;
}

addLocalText();
setInterval(readAt, 2000);
