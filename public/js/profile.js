//Create a new post
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-desc').value.trim();
  const image = document.querySelector('#post-img').secure_url;
  // const location = userLocation(data);

  if (title && description & image) {
    const response = await fetch(`/api/posts`, {

      method: 'POST',
      body: JSON.stringify({ title, description, image }),
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

const updateFormHandler = async (event) => {
  event.preventDefault();
  // alert('update button pushed'); //Works!

  var updateFormEl = document.querySelector('.update');
  var createNewFormEl = document.querySelector('.new-post');
  // console.log(updateFormEl);
  updateFormEl.classList.remove("hide");
  createNewFormEl.classList.add("hide");
};

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
    console.log(response);

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

//Render the GEOLocations Map
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
// let map, infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//   });
//   infoWindow = new google.maps.InfoWindow();

//   const locationButton = document.createElement("button");

//   locationButton.textContent = "Pan to Current Location";
//   locationButton.classList.add("custom-map-control-button");
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//   locationButton.addEventListener("click", () => {
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           infoWindow.setPosition(pos);
//           infoWindow.setContent("Location found.");
//           infoWindow.open(map);
//           map.setCenter(pos);
//         },
//         () => {
//           handleLocationError(true, infoWindow, map.getCenter());
//         },
//       );
//     } else {
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter());
//     }
//   });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation.",
//   );
//   infoWindow.open(map);
// }

// window.initMap = initMap;

//Event Listeners
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.delete-btn')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.update-btn')
  .addEventListener('click', updateFormHandler);

document
  .querySelector('#submit-update-btn')
  .addEventListener('click', updateButtonHandler);
