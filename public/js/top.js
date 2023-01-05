/*!
 * top page
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
  // タブパネル
  // ------------------------
  function tabpanel() {
    $(".js_tabpanel").find(".panel").eq(0).show().addClass("is_show");
    $(".js_tabpanel").find("ul.tab").find("li").eq(0).addClass("is_active");
    $(".js_tabpanel").find(".panel:not('.is_show')").hide();
    $(".js_tabpanel")
      .find("ul.tab")
      .find("li")
      .click(function () {
        let tabpane = $(this).parents(".js_tabpanel");
        let index = $(this).index();
        $(this).siblings().removeClass("is_active");
        $(this).addClass("is_active");
        tabpane.find(".panel").hide().removeClass("is_show");
        tabpane.find(".panel").eq(index).fadeIn().addClass("is_show");
      });
  }
  function tabpanel_set() {
    // パネルの高さをそろえる
    $(".js_tabpanel").each(function (key, item) {
      // 各パネルの高さを取得
      let panel_heights = new Array();
      $(this)
        .find(".panel")
        .each(function (index) {
          let previousCss = $(this).attr("style");
          //一度表示させてから
          $(this).css({
            position: "absolute",
            visibility: "hidden",
            display: "block",
            height: "auto",
          });
          //高さを取得して
          panel_heights[index] = $(this).outerHeight();
          //非表示にする
          $(this).attr("style", previousCss ? previousCss : "");
        });
      //各パネルの中で一番高い値を取得
      let panel_max_height = Math.max.apply(null, panel_heights);
      //パネル枠に高さを設定
      $(this).find(".panel").css("height", panel_max_height);
    });
  }
  $(window).on("load", function () {
    tabpanel_set();
    tabpanel();
  });
  $(window).on("resize", function () {
    if (resizeWide) {
      tabpanel_set();
    }
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
          slidesToShow: 4,
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
});
