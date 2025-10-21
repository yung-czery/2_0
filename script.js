(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function () {
    const list = document.createElement('ul');
    answer.textContent = 'Loading...';
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        array.map((post) => {
          const listElement = document.createElement('li');
          listElement.innerText = `${post.id} - ${post.title}\n${post.body}\n\n`
          list.appendChild(listElement);
        })
      })
      .finally(() => {
        answer.textContent = ''
        answer.appendChild(list);
      })
  })

  cw2.addEventListener("click", function () {
    answer.textContent = 'Loading...';
    fetch('https://jsonplaceholder.typicode.com/posts/67')
      .then(response => response.json())
      .then(post => {
        console.log(post)
        answer.innerText = `${post.id} - ${post.title}\n${post.body}\n\n`
      })
  })

  cw3.addEventListener("click", function () {
    //TODO
  })

})();
