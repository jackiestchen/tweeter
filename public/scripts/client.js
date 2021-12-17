/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
import { escape } from "./helpers.js";

$(document).ready(function () {
  const createTweetElement = (object) => {
    const { user, content, created_at } = object;
    const { avatars, name, handle } = user;
    const { text } = content;
    return `
      <article class="tweet-article">
        <header>
          <div id="avatar">
            <img src="${avatars}"/>
            ${name}
          </div>
          <div class="tweet-name">${handle}</div>
        </header>
        <p class="tweet-body">
          ${escape(text)}
        </p>
        <footer>
          <div class="last-tweet-day">${timeago.format(created_at)}</div>
          <div class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
  `;
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
  loadTweets();

  const tweetTextarea = $(".new-tweet form textarea");
  const tweetMessage = $(".tweet-error");
  const tweetBtn = $("#tweet-submit-button");
  const tweetErrorText = $(".tweet-error .message span");
  tweetMessage.hide();

  $("#new-tweet-form").submit(function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data);
    const length = $.trim(tweetTextarea.val()).length;

    if (length > 140) {
      tweetErrorText.text("Text must be less than or equal to 140 characters!");
      tweetMessage.slideDown("fast");
      tweetBtn.addClass("button-error");
      return;
    }

    if (length < 1) {
      tweetErrorText.text("Text must be not be empty!");
      tweetMessage.slideDown("fast");
      tweetBtn.addClass("button-error");
      return;
    }
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
            tweetTextarea.val("").change();
          });
      },
    });
    tweetMessage.slideUp("fast");
    tweetBtn.removeClass("button-error");
  });

});
