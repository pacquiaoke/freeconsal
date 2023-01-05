/*!
 * columns page
 * Date: 2022-10-25
 */
$(function () {
  // ------------------------
  // 画面サイズ
  // ------------------------
  const windowWidth = window.innerWidth ? window.innerWidth : windowWidth;
  let tbW = 960;
  let spW = 600;

  // ------------------------
  // デバイス・ブラウザ判定
  // ------------------------
  const agent = window.navigator.userAgent.toLowerCase();

  // ------------------------
  // 横幅リサイズ判定
  // ------------------------
  let lastInnerWidth = window.innerWidth;
  let resizeWide = false;
  $(window).on("resize", function () {
    if (lastInnerWidth != window.innerWidth) {
      resizeWide = true;
    } else {
      resizeWide = false;
    }
    lastInnerWidth = window.innerWidth;
  });

  // ------------------------
  // カルーセルスライダー
  // ------------------------
  if ($(".js_pc_box_slider").length >= 1) {
    function slick_slider_init() {
      $(".js_pc_box_slider")
        .not(".slick-initialized")
        .slick({
          infinite: true,
          lazyLoad: "progressive",
          autoplay: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          waitForAnimate: false,
          autoplaySpeed: 4000,
          speed: 800,
          dots: false,
          arrows: true,
          prevArrow: '<div class="slick-arr prev"></div>',
          nextArrow: '<div class="slick-arr next"></div>',
          responsive: [
            {
              breakpoint: tbW,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: spW,
              settings: "unslick",
            },
          ],
        });
    }
    function slick_slider_set() {
      if (windowWidth <= spW) {
        $(".js_pc_box_slider").slick("unslick");
        $(".js_pc_box_slider")
          .find("img")
          .each(function (key, item) {
            if ($(this).attr("data-lazy")) {
              $(this).attr("src", $(this).attr("data-lazy"));
            }
          });
      }
    }
    slick_slider_init();
    slick_slider_set();
    $(window).on("resize orientationchange", function () {
      if (resizeWide) {
        $(".js_pc_box_slider").slick("resize");
        slick_slider_set();
      }
    });
  }

});
