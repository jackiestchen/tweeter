/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
          ${object.content.text}
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

const renderTweets = (tweets) => {
  for (const el of tweets) {
    let $tweet = createTweetElement(el);
    $(".tweet-container").prepend($tweet);
  }
};

$("#new-tweet-form").submit(function (event) {
  const data = $(this).serialize();
  console.log(data);
  $.ajax({
    type: "POST",
    url: "/tweets",
    data,
  });
  event.preventDefault();
});

$(document).ready(function () {
  const loadTweets = function () {
    let output = [];
    $.ajax({
      url: "/tweets",
      type: "GET",
      success: function (response) {
        renderTweets(response);
      },
    });
  };

  loadTweets();
});
