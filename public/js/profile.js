//Create a new post
const newFormHandler = async (event) => {
  event.preventDefault();
  alert('create button clicked');

  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-desc').value.trim();
  // const imageURL = document.querySelector('#post-img').value.trim();

  if (title && description) {
    const response = await fetch(`/api/posts`, {

      method: 'POST',
      body: JSON.stringify({ title, description}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(response);

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

//NEED TO MAKE WORK//
const updateFormHandler = async (event) => {
  event.preventDefault();
  // alert('update button pushed'); //Works!

  var updateFormEl = document.querySelector('.update');
  var createNewFormEl = document.querySelector('.new-post');
  // console.log(updateFormEl);
  updateFormEl.classList.remove("hide");
  createNewFormEl.classList.add("hide");
};

//NEED TO MAKE WORK//
const updateButtonHandler = async (event) => {
  event.preventDefault();
  alert('update button pushed'); //Works!

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update blog post');
    }
  }
  createNewFormEl.classList.remove("hide");
};


//Delete a current post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    // console.log('button id: ', id);

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    // console.log(response);

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};


//Event Listeners
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.delete-btn')
  .addEventListener('click', delButtonHandler);

// document
//   .querySelector('.update-btn')
//   .addEventListener('click', updateFormHandler);

// document
//   .querySelector('#submit-update-btn')
//   .addEventListener('click', updateButtonHandler);
