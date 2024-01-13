
// Function to make API requests
async function fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

// Function to render posts
function renderPosts(posts) {
    const postsContainer = document.getElementById('posts');
    const morePostsBtn = document.createElement('button');

    posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <a href='${post.url}'>
            <h3>${post.title}</h3>
            </a>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Function to render comments
function renderComments(comments) {
    const commentsContainer = document.getElementById('comments');

    comments.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
      <p>${comment.text}</p>
      <p class='cmntAuthor'>Posted by: ${comment.by}</p>
    `;
    commentsContainer.appendChild(commentElement);
  });
}

let postLimit = 10;
// Function to load and handle posts
async function loadPosts() {
    const stories = await fetchData('https://hacker-news.firebaseio.com/v0/newstories.json')
    const posts = [];

    for (let i = 0; i < postLimit; i++) {
        const storyId = stories[i];
        const story = await fetchData(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
        posts.push(story);
    }
    renderPosts(posts);
}

// Function to load and handle comments
async function loadComments() {
    const stories = await fetchData('https://hacker-news.firebaseio.com/v0/newstories.json');
    const comments = [];

    for (let i = 0; i < 10; i++) {
        const storyId = stories[i];
        const story = await fetchData(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
        
        if (story.kids) {
          for (const commentId of story.kids) {
            const comment = await fetchData(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);
            comments.push(comment);
          }
        }
    }
    renderComments(comments);
}

// Load and handle posts
loadPosts();

// Load and handle comments
loadComments();

function updatePostLimit() {
    postLimit += 10;
    loadPosts();
}

const morePostsBtn = document.getElementById('morePostsBtn');