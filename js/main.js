const elUsersList = document.querySelector(".users__list");
const elPostsList = document.querySelector(".posts__list");
const elCommentsList = document.querySelector(".comments__list");

// ==========template=============

const elUsersTemplate = document.querySelector(".users-template").content;
const elPostsTemplate = document.querySelector(".posts-template").content;
const elCommentsTemplate = document.querySelector(".comments-template").content;
const elUsersItem = document.querySelector(".users__item");
function renderUsers(arr, element) {
  element.innerHTML = null;

  const usersFragment = document.createDocumentFragment();

  arr.forEach(row => {
    const usersTemplate = elUsersTemplate.cloneNode(true);
    usersTemplate.querySelector(".users__item").dataset.user_id = row.id;
    usersTemplate.querySelector(".users__id").textContent = "id: " + row.id;

    usersTemplate.querySelector(".users__name").textContent = "name: " + row.name;

    usersTemplate.querySelector(".users__username").textContent =
      "username: " + row.username;

    usersTemplate.querySelector(".users__email").textContent = "email: " + row.email;

    usersTemplate.querySelector(".users__address").textContent =
      "address: " + row.address;

    usersTemplate.querySelector(".users__phone").textContent = "phone: " + row.phone;

    usersTemplate.querySelector(".users__website").textContent = row.website;

    usersTemplate.querySelector(".users__company").textContent =
      "company: " + row.company;

    elUsersList.dataset.user_id = row.id;

    usersFragment.appendChild(usersTemplate);
  });
  element.appendChild(usersFragment);
}
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================

// ================async users function================

async function fetchUsers(arr, id) {
  try {
    elUsersList.innerHTML = null;

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const data = await response.json();

    renderUsers(data, elUsersList);
  } catch (err) {
    console.log("error" + err);
  }
}
fetchUsers();

// ===========================
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================

// ==================render posts==============
function renderPosts(arr, element) {
  const postsFragment = document.createDocumentFragment();

  arr.forEach(row => {
    element.innerHTML = null;
    const postsTemplate = elPostsTemplate.cloneNode(true);

    postsTemplate.querySelector(".posts__item").dataset.post_id = row.id;
    postsTemplate.querySelector(".posts__item__usersId").textContent = row.userId;
    postsTemplate.querySelector(".posts__item__id").textContent = row.id;
    postsTemplate.querySelector(".posts__item__title").textContent = row.title;
    postsTemplate.querySelector(".posts__item__body").textContent = row.body;

    postsFragment.appendChild(postsTemplate);
  });
  element.appendChild(postsFragment);
}

// ===========================
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================

// }=============================filter-posts=============
function filteredPosts(userId, data) {
  const usersPosts = data.filter(posts => {
    return posts.user_id == userId;
  });
  console.log(usersPosts);
  renderPosts(usersPosts, elPostsList);
}

// ===========================
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================

// ===============add eveny user list====================

elUsersList.addEventListener("click", evt => {
  const clickedUsers = evt.target.closest("li").dataset.user_id;
  elCommentsList.innerHTML = null;
  fetchUsers(elPostsList, clickedUsers);
  console.log(clickedUsers);
});

async function fetchPosts() {
  try {
    elUsersList.innerHTML = null;

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    const data = await response.json();
    // renderPosts(data, elPostsList);
  } catch (err) {
    console.log(err + "error");
  }
}

fetchPosts();

// ============

// elPostsList.addEventListener("click", evt => {
//   const clickedPosts = evt.target.closest("li").dataset.post_id;

//   console.log(clickedPosts);
// });
