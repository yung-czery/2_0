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
    const form = document.createElement('form');
    const titleInput = document.createElement('input');
    const bodyInput = document.createElement('input');
    const submitButton = document.createElement('button');
    const response = document.createElement('div');

    form.appendChild(titleInput);
    form.appendChild(bodyInput);
    form.appendChild(submitButton);

    titleInput.placeholder = 'Podaj tytuł';
    bodyInput.placeholder = 'Podaj treść';

    submitButton.type = 'submit';
    submitButton.innerText = 'Wyślij';

    answer.appendChild(form);
    answer.appendChild(response);

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      response.textContent = 'Processing...'
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: titleInput.value,
          body: bodyInput.value,
          userId: Math.floor(Math.random() * 10),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        response.textContent = `Dodano nowy post o ID = ${json.id}`
      });
    })
  })
})();
