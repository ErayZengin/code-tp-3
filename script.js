const conteneurArticles = document.getElementById('conteneur-articles')
const champRecherche = document.getElementById('champ-recherche')
const boutonMenu = document.querySelector('.menu-burger')
const liensNavigation = document.querySelector('.liens-navigation')

let articles = []

boutonMenu.addEventListener('click', () => {
  liensNavigation.classList.toggle('active')
})

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(reponse => reponse.json())
  .then(donnees => {
    articles = donnees
    afficherArticles(articles)
  })
  .catch(erreur => {
    console.error('Erreur lors du chargement', erreur)
    const messageErreur = document.createElement('p')
    messageErreur.textContent = 'Erreur. Veuillez réessayer plus tard.'
    messageErreur.style.color = 'red'
    conteneurArticles.appendChild(messageErreur)
  })

function afficherArticles(liste) {
  conteneurArticles.innerHTML = ''
  liste.forEach(article => {
    const bloc = document.createElement('div')
    bloc.classList.add('article')

    const titre = document.createElement('h2')
    titre.textContent = article.title

    const contenu = document.createElement('p')
    contenu.textContent = article.body

    bloc.appendChild(titre)
    bloc.appendChild(contenu)
    conteneurArticles.appendChild(bloc)
  })
}

champRecherche.addEventListener('input', () => {
  const texte = champRecherche.value.toLowerCase()
  const filtrés = articles.filter(article =>
    article.title.toLowerCase().includes(texte) ||
    article.body.toLowerCase().includes(texte)
  )
  afficherArticles(filtrés)
})