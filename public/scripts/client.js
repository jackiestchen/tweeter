/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (object) => {
  let $tweet = `
  <article class="tweet-article">
        <header>
          <div id="avatar">
            <img src="${object.user.avatars}"/>
            ${object.user.name}
          </div>
          <div class="tweet-name">${object.user.handle}</div>
        </header>
        <p class="tweet-body">
          ${escape(object.content.text)}
        </p>
        <footer>
          <div class="last-tweet-day">${timeago.format(object.created_at)}</div>
          <div class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
  `;
  return $tweet;
};

const renderTweets = (tweet) => {
  let $tweet = createTweetElement(tweet);
  $(".tweet-container").prepend($tweet);
};

const loadTweets = function () {
  $.get("/tweets").then((tweets) => {
    tweets.forEach((tweet) => {
      renderTweets(tweet);
    });
  });
};

$("#new-tweet-form").submit(function (event) {
  event.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/tweets",
    data,
    success: function () {
      $.get("/tweets")
        .then((tweet) => {
          renderTweets(tweet[tweet.length - 1]);
        })
        .then(() => {
          tweetTextarea.val("");
        });
    },
  });
});

const tweetTextarea = $(".new-tweet form textarea");

$("#tweet-submit-button").click(function (event) {
  // event.preventDefault();
  const length = tweetTextarea.val().length;
  if (length > 140) {
    return alert("Tweet exceeded character limit!");
  }
  if (length < 1) {
    return alert("Empty tweet! Please input!");
  }
});

$(document).ready(function () {
  loadTweets();
});
