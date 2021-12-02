/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

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
          <div class="last-tweet-day">${getTime(object.created_at)}</div>
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
    $(".tweet-container").append($tweet);
  }
};

const getTime = (created) => {
  const now = new Date().getTime();
  const howLongAgo = created - now;
  const time = Math.abs(howLongAgo);

  let humanTime = 0;
  let units = "";
  if (time > 1000 * 60 * 60 * 24 * 365) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 365), 10);
    units = "years";
  } else if (time > 1000 * 60 * 60 * 24 * 30) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10);
    units = "months";
  } else if (time > 1000 * 60 * 60 * 24 * 7) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 7), 10);
    units = "weeks";
  } else if (time > 1000 * 60 * 60 * 24) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24), 10);
    units = "days";
  } else if (time > 1000 * 60 * 60) {
    humanTime = parseInt(time / (1000 * 60 * 60), 10);
    units = "hours";
  } else if (time > 1000 * 60) {
    humanTime = parseInt(time / (1000 * 60), 10);
    units = "seconds";
  }

  return `${humanTime} ${units} ago`;
};

// renderTweets(data);

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
      // dataType: "JSON",
      success: function (response) {
        renderTweets(response);
      },
    });
  };

  loadTweets();
});
