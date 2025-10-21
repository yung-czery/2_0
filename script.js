(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  function createLoadingModal() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.4);
    color: white;
    font-size: 1.2rem;
    font-family: sans-serif;
    z-index: 9999;
    display: none;
  `;
    overlay.textContent = 'Loading...';
    document.body.appendChild(overlay);

    return {
      show: () => overlay.style.display = 'flex',
      hide: () => overlay.style.display = 'none'
    };
  }

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function () {
    answer.innerHTML = '';
    const list = document.createElement('ul');
    const popup = createLoadingModal();
    popup.show();
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log('Wszystkie posty: ', array)
        array.map((post) => {
          const listElement = document.createElement('li');
          const title = document.createElement('h2');
          const content = document.createElement('p');

          title.textContent = `${post.id} - ${post.title}`
          content.textContent = `${post.body}`

          listElement.appendChild(title);
          listElement.appendChild(content);
          list.appendChild(listElement);
        })
      })
      .finally(() => {
        popup.hide();
        answer.appendChild(list);
      })
  })

  cw2.addEventListener("click", function () {
    answer.innerHTML = '';
    const popup = createLoadingModal();
    popup.show();
    fetch('https://jsonplaceholder.typicode.com/posts/67')
      .then(response => response.json())
      .then(post => {
        console.log('Pojedyńczy post: ', post);
        const title = document.createElement('h2');
        const content = document.createElement('p');
        
        title.textContent = `${post.id} - ${post.title}`
        content.textContent = `${post.body}`

        popup.hide();
        answer.appendChild(title);
        answer.appendChild(content);
      })
  })

  cw3.addEventListener("click", function () {
    answer.innerHTML = '';
    const form = document.createElement('form');
    const titleInput = document.createElement('input');
    const bodyInput = document.createElement('input');
    const submitButton = document.createElement('button');
    const response = document.createElement('div');

    response.classList.add('nowy-post')

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
        console.log('Odpowiedź POST: ', json);
        response.textContent = `Dodano nowy post o ID = ${json.id}`;
      });
    })
  })
})();
