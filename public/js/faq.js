/*!
 * faq page
 * Date: 2022-10-15
 */
$(function () {
  function faq_accordion() {
    $(".faq_box").each(function (key, item) {
      if (!$(this).hasClass("is_open")) {
        $(this).find(".faq_answer").hide();
      } else {
        $(this).find(".faq_answer").show();
      }
      $(this)
        .find(".faq_question")
        .click(function () {
          if ($(this).closest(".faq_box").hasClass("is_open")) {
            $(this).closest(".faq_box").removeClass("is_open");
            $(this).next(".faq_answer").slideUp();
          } else {
            $(this).closest(".faq_box").addClass("is_open");
            $(this).next(".faq_answer").slideDown();
          }
        });
    });
  }
  $(document).ready(function () {
    faq_accordion();
  });
});
