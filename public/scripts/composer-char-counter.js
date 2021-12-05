$(document).ready(function () {
  //selecting textarea element in form classname new-tweet and listening to input event
  $(".new-tweet form textarea").on("input change", function () {
    let charCount = this.value.length;
    let charRemaining = 140 - charCount;
    const output = $(this).siblings("div").children("output");

    if (charRemaining < 0) {
      output.css("color", "red").text(charRemaining);
    } else {
      output.css("color", "initial").text(charRemaining);
    }
  });

});
