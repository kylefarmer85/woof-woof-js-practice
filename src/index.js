function main() {
  fetchDogs()
  divDogBarEventListener()
}

const DogsURL = "http://localhost:3000/pups"
const divDogBar = document.querySelector('#dog-bar')
const filterBtn = document.querySelector('#good-dog-filter')

function fetchDogs() {
  divDogBar.innerHTML ='';
  fetch(DogsURL)
  .then(resp => resp.json())
  .then(dogs => renderDogs(dogs))
}

function renderDogs(dogs) {
  dogs.forEach(dog => {
  if (filterBtn.innerText.includes("OFF")) {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.className = "dog-span"
    dogSpan.dataset.id = dog.id
    divDogBar.append(dogSpan)
  } else {
    if (dog.isGoodDog) {
      const dogSpan = document.createElement('span')
      dogSpan.innerText = dog.name
      dogSpan.className = "dog-span"
      dogSpan.dataset.id = dog.id
      divDogBar.append(dogSpan)
    }
  }
  })
}

filterBtn.addEventListener("click", () => {
  if (filterBtn.innerText === "Filter good dogs: OFF") {
    filterBtn.innerText = "Filter good dogs: ON";
    fetchDogs();
  } else {
    filterBtn.innerText = "Filter good dogs: OFF";
    fetchDogs();
  }
})

function filterDogBar() {

}

function divDogBarEventListener() {
  divDogBar.addEventListener('click', (e) => {
    if (e.target.className === "dog-span") { 
      fetchDog(e.target.dataset.id)
    }
  })
}

function fetchDog(id) {
  fetch(DogsURL + `/${id}`)
    .then(resp => resp.json())
    .then(dog => renderDog(dog))
}

function renderDog(dog) {
  const dogInfo = document.querySelector('#dog-info')

  dogInfo.innerHTML = 
  `<img src=${dog.image}>
  <h2>${dog.name}<h2>
  <button class="dog-btn">${isGoodOrBad(dog)}</button>`

  function isGoodOrBad(dog) {
    return (dog.isGoodDog ? "Good Dog!" : "Bad Dog!")
  }

  const dogBtn = document.querySelector('.dog-btn')

  dogBtn.addEventListener("click", () => {  
    reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: !dog.isGoodDog
      })
    }
    fetch(DogsURL + `/${dog.id}`, reqObj)
      .then(resp => resp.json())
      .then(newDog => renderDog(newDog))
  })
}



main()