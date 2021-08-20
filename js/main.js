const elUsersList = document.querySelector(".users__list");
const elPostsList = document.querySelector(".posts__list");
const elCommentsList = document.querySelector(".comments__list");

// ==========template=============

const elUsersTemplate = document.querySelector(".users-template").content;
const elPostsTemplate = document.querySelector(".posts-template").content;
const elCommentsTemplate = document.querySelector(".comments-template").content;
const elUsersItem = document.querySelector(".users__item");

function renderUsers(arr, element) {
  const usersFragment = document.createDocumentFragment();

  arr.forEach(users => {
    const usersTemplate = elUsersTemplate.cloneNode(true);
    usersTemplate.querySelector(".users__item").dataset.user_id = users.id;
    usersTemplate.querySelector(".users__id").textContent = "id: " + users.id;

    usersTemplate.querySelector(".users__name").textContent = "name: " + users.name;

    usersTemplate.querySelector(".users__username").textContent =
      "username: " + users.username;

    usersTemplate.querySelector(".users__email").textContent = "email: " + users.email;

    usersTemplate.querySelector(".users__address").textContent =
      "address: " + users.address;

    usersTemplate.querySelector(".users__phone").textContent = "phone: " + users.phone;

    usersTemplate.querySelector(".users__website").textContent = users.website;

    usersTemplate.querySelector(".users__company").textContent =
      "company: " + users.company;

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

async function fetchUsers(endPoint = "users", id) {
  // endPoint = "users";
  elUsersList.innerHTML = null;

  const response = await fetch("https://jsonplaceholder.typicode.com/" + endPoint);

  const data = await response.json();

  renderUsers(data, elUsersList);
}
fetchUsers();

async function fetchPosts(endPoint = "posts", id) {
  const response = await fetch("https://jsonplaceholder.typicode.com/" + endPoint);

  const data = await response.json();

  renderPosts(data, elPostsList);
}

// fetchPosts();
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================

// ==================render posts==============
function renderPosts(arr, element) {
  const postsFragment = document.createDocumentFragment();

  arr.forEach(posts => {
    element.innerHTML = null;
    const postsTemplate = elPostsTemplate.cloneNode(true);

    postsTemplate.querySelector(".posts__item").dataset.post_id = posts.id;
    postsTemplate.querySelector(".posts__item__usersId").textContent = posts.userId;
    postsTemplate.querySelector(".posts__item__id").textContent = posts.id;
    postsTemplate.querySelector(".posts__item__title").textContent = posts.title;
    postsTemplate.querySelector(".posts__item__body").textContent = posts.body;

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
function filterPosts(userId, data) {
  const posts = data.filter(post => {
    return post.user_id == userId;
  });
  renderPosts(posts, elPostsList);
}

// filterPosts()

// filterPosts(userId, elPostsList);

// ===========================
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================

// ===============add eveny user list====================
elUsersList.addEventListener("click", evt => {
  const clickedUsers = evt.target.closest("li").dataset.user_id;

  console.log(clickedUsers);
  elCommentsList.innerHTML = null;
  // filterPosts(clickedUsers);
  fetchPosts("posts", elPostsList);
});

// ================render comments ============

function renderComments(arr, element) {
  element.innerHTML = null;

  const commentFragment = document.createDocumentFragment();

  arr.forEach(comments => {
    const commentTemplate = elCommentsTemplate.cloneNode(true);

    commentTemplate.querySelector(".comments__item__postId").textContent =
      comments.postId;
    commentTemplate.querySelector(".comments__item__id").textContent = comments.id;
    commentTemplate.querySelector(".comments__item__name").textContent = comments.name;
    commentTemplate.querySelector(".comments__item__email").textContent = comments.email;
    commentTemplate.querySelector(".comments__item__body").textContent = comments.body;

    commentFragment.appendChild(commentTemplate);
  });
  element.appendChild(commentFragment);
}

async function fetchComments(id) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/comments?postId=" + id
  );

  const data = await response.json();

  renderComments(data, elCommentsList);
}

// fetchComments();
// ============

elPostsList.addEventListener("click", evt => {
  const clickedPosts = evt.target.closest("li").dataset.post_id;

  fetchComments(clickedPosts);
});
