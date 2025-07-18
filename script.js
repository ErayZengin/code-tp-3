const postsContainer = document.getElementById('posts-container')
const recherche = document.getElementById('recherche')
const burger = document.querySelector('.burger')
const navLinks = document.querySelector('.nav-links')

let postsData = []

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active')
})

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    postsData = data
    displayPosts(data)
  })
  .catch(error => {
    console.error('Erreur de chargement des posts', error)
    const errorMessage = document.createElement('p')
    errorMessage.textContent = 'Erreur. Réessayez plus tard.'
    errorMessage.style.color = 'red'
    postsContainer.appendChild(errorMessage)
  })
function displayPosts(posts) {
  postsContainer.innerHTML = ''
  posts.forEach(post => {
    const postElement = document.createElement('div')
    postElement.classList.add('post')

    const title = document.createElement('h2')
    title.textContent = post.title

    const body = document.createElement('p')
    body.textContent = post.body

    postElement.appendChild(title)
    postElement.appendChild(body)
    postsContainer.appendChild(postElement)
  })
}

recherche.addEventListener('input', () => {
  const query = recherche.value.toLowerCase()
  const filtered = postsData.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.body.toLowerCase().includes(query)
  )
  displayPosts(filtered)
})