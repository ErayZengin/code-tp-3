const postsContainer = document.getElementById('posts-container')
console.log(postsContainer)

fetch ('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    data.forEach(post => {
      let postElement = document.createElement('div')
      postElement.classList.add('post')

      let title = document.createElement('h2')
      title.textContent = post.title

      let body = document.createElement('p')
      body.textContent = post.body

      postElement.appendChild(title)
      postElement.appendChild(body)

      postsContainer.appendChild(postElement)
    })
  })
  .catch(error => {
    console.error('Erreur de chargement des posts', error)
    let errorMessage = document.createElement('p')
    errorMessage.textContent = 'Erreur. Réésayez plus tard.'
    errorMessage.style.color = 'red'
    postsContainer.appendChild(errorMessage)
  })