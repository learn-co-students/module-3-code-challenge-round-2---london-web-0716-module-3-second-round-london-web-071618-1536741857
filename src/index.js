document.addEventListener('DOMContentLoaded', () => {
  const endPoint = 'http://localhost:3000/beers'
  const beerList = document.querySelector('.list-group')
  const beerDetailDiv = document.querySelector('#beer-detail')

  function getBeers () {
    return fetch(endPoint)
  .then(resp => resp.json())
  .then(beers => beers.forEach(beer => appendBeer(beer)))
  }

  function appendBeer (beer) {
    const beerName = document.createElement('li')

    beerName.innerHTML =
    `<li class="list-group-item">${beer.name}</li>`

    beerList.append(beerName)

    beerName.addEventListener('click', event => displayBeerDetails(beer))
  }

  function displayBeerDetails (beer) {
    beerDetailDiv.innerHTML =
    `<h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea id="description" value="">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">Save</button>`

    const saveButton = beerDetailDiv.querySelector('#edit-beer')
    console.log(saveButton)
    saveButton.addEventListener('click', event => updateBeerDetails(beer))

    const descriptionElement = beerDetailDiv.querySelector('#description')

    function updateBeerDetails (beer) {
      const options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({description: descriptionElement.value})
      }
      fetch(`http://localhost:3000/beers/${beer.id}`, options)
      beer.description = descriptionElement.value
    }
  }

  getBeers()
})
