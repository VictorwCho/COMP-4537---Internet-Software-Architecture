const writePage = document.getElementById('writeBtn');
const readPage = document.getElementById('readBtn');

writePage.onclick = () => {
  window.location.href = 'writer.html';
};
readPage.onclick = () => {
  window.location.href = 'reader.html';
};
