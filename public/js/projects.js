/*!
 * projects page
 * Date: 2022-10-15
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

  // ------------------------
  // select 初期値のColor変更
  // ------------------------
  function select_color_set(select) {
    if (select.val() !== "") {
      select.css("color", "#000");
    } else {
      select.css("color", "#bbb");
    }
  }
  $(window).on("load", function () {
    if (windowWidth <= spW) {
      $("select").each(function (key, item) {
        select_color_set($(this));
      });
      $("select").on("change", function () {
        select_color_set($(this));
      });
    }
  });

  // ------------------------
  // 検索モーダル（スマホ）
  // ------------------------
  if ($(".js_search_modal").length && windowWidth <= tbW) {
    let scrollPosition;
    let search_modal = $(".js_search_modal");
    function modal_close() {
      search_modal.fadeOut().removeClass("is_open");
      $("body").removeClass("fixed modal_open").css("top", 0);
      window.scrollTo(0, scrollPosition);
    }
    if (windowWidth <= tbW) {
      search_modal.hide();
      // OPEN
      $(".js_search_open").on("click", function () {
        if (search_modal.is(":hidden")) {
          search_modal.fadeIn().addClass("is_open");
          scrollPosition = $(window).scrollTop();
          $("body").addClass("fixed modal_open").css("top", -scrollPosition);
          setTimeout(function () {
            search_modal.css("height", window.innerHeight);
          }, 200);
        }
      });
      // CLOSE
      search_modal.find(".js_search_modal_close").on("click", function () {
        modal_close();
      });

    } else {
      search_modal.show();
    }

    $(window).on("resize", function () {
      if (resizeWide) {
        setTimeout(function () {
          if (window.innerWidth <= tbW) {
            modal_close();
          } else {
            $(".js_search_modal").removeClass("is_open").show().css("height", "auto");
            $("body").removeClass("fixed modal_open").css("top", 0);
          }
        }, 200);
      }
    });


  }
});
