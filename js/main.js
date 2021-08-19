const elUsersList = document.querySelector(".users__list");
const elPostsList = document.querySelector(".posts__list");
const elCommentsList = document.querySelector(".comments__list");

// ==========template=============

const elUsersTemplate = document.querySelector(".users-template").content;
const elPostsTemplate = document.querySelector(".posts-template").content;
const elCommentsTemplate = document.querySelector(".comments-template").content;

function renderUsers(arr, element) {
  element.innerHTML = null;

  const usersFragment = document.createDocumentFragment();

  arr.forEach(row => {
    const usersTemplate = elUsersTemplate.cloneNode(true);
    console.log(usersTemplate);
    usersTemplate.querySelector(".users__id").textContent = "id: " + row.id;

    usersTemplate.querySelector(".users__name").textContent = "name: " + row.name;

    usersTemplate.querySelector(".users__username").textContent =
      "username: " + row.username;

    usersTemplate.querySelector(".users__email").textContent = "email: " + row.email;

    usersTemplate.querySelector(".users__address").textContent =
      "address: " + row.address;

    //   ================

    // usersTemplate.querySelector(".users__address__street").textContent =
    //   "address: " + row.address.street;

    // usersTemplate.querySelector(".users__address__suite").textContent =
    //   "suite: " + row.address.suite;

    // usersTemplate.querySelector(".users__address__city").textContent =
    //   "city: " + row.address.city;

    // usersTemplate.querySelector(".users__address__zipcode").textContent =
    //   "zipcode: " + row.address.zipcode;

    // usersTemplate.querySelector(".users__address__geo").textContent =
    //   "geo: " + row.address.geo;

    //   ======================
    usersTemplate.querySelector(".users__phone").textContent = "phone: " + row.phone;

    usersTemplate.querySelector(".users__website").textContent = row.website;

    usersTemplate.querySelector(".users__company").textContent =
      "company: " + row.company;

    usersFragment.appendChild(usersTemplate);
  });
  element.appendChild(usersFragment);
}

async function fetchUsers() {
  try {
    elUsersList.innerHTML = null;

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const data = await response.json();

    renderUsers(data, elUsersList);
  } catch (err) {
    console.log("error", err);
  }
}

fetchUsers();
