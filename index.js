const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const data = []
let displayData = []
const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
}
const genresList = document.getElementById('genres')
const movieList = document.getElementById('movieList')

axios.get(INDEX_URL)
    .then(function(response) {
        data.push(...response.data.results)
        displayGenres()
        displayMovie(data)
    })
    .catch(function(error) {
        console.log(error)
    })

function displayGenres() {
    let genreBox = ''
    for (let key in genres) {
        genreBox += `
      <label class="btn btn btn-outline-primary w-100" value="${key}">
        <input type="radio" name="options" autocomplete="off"> ${genres[key]}
      </label>`
    }
    genresList.innerHTML = genreBox
}

function displayMovie(data) {
    let movieBox = ''
    data.forEach(function(item, index) {
        movieBox += `
        <div class="col-sm-3 p-0 mb-3">
          <div class="card">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h5 class="card-title">${item.title}</h5>
            `

        item.genres.forEach(function(item, index) {
            movieBox += `
<span class="badge badge-pill badge-light">${genres[item]}</span>
`
        })
        movieBox += `</div></div></div>`
    })
    movieList.innerHTML = movieBox
}

genresList.addEventListener('click', (event) => {
    displayData = []
    let results = []
    let searchInput = event.target.getAttributeNode("value").value
    const regex = new RegExp(searchInput, 'i')
    results = data.filter(function(item, index, array) {
        return item.genres.find(function checkValue(num) {
            return num == searchInput
        })
    })
    displayData.push(...results)
    displayMovie(displayData)
})