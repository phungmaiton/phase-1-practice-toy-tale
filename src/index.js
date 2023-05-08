let addToy = false;
const toyCollection = document.querySelector('#toy-collection')
const createToyForm = document.querySelector('.add-toy-form')
// let toyName = document.querySelector('#name')
// let toyImage = document.querySelector('#image')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //Render Toys
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => renderToys(toy)))
  
  const renderToys = (toy) => {
    let div = document.createElement('div');
    div.classList.add('card');
    toyCollection.appendChild(div);
    
    let name = document.createElement('h2');
    name.textContent = toy.name;
    div.appendChild(name);
    
    let img = document.createElement('img');
    img.src = toy.image;
    img.className = 'toy-avatar';
    div.appendChild(img);

    let like = document.createElement('p');
    like.textContent = `${toy.likes} Likes`;
    div.appendChild(like);

    let button = document.createElement('button');
    button.classList.add('like-btn');
    button.id = `${toy.id}`;
    button.textContent = "Like ❤️"
    div.appendChild(button);

    button.addEventListener('click', () => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: parseInt(like.textContent) + 1
        })
      })
        .then(resp => resp.json())
        .then(toy => {
          like.textContent = `${toy.likes} Likes`
        })
    })
  }

  //Create Toy
  createToyForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event.target);
    let toyName = event.target.name.value;
    let toyImage = event.target.image.value;
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": toyName,
        "image": toyImage,
        "likes": 0  
      })
    })
    .then(resp => resp.json())
    .then(toy => renderToys(toy))

  })
  
});
