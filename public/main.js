var update = document.getElementById('vote_up')
update.addEventListener('click', function () {
  fetch('/noticia/vote_up/', {
  method: 'put',
  headers: {'Content-Type': 'application/json'}
})
})