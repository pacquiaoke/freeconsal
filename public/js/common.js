/*!
 * common
 * Date: 2022-10-15
 */
import $ from 'jquery';

$(function () {
  // ------------------------
  // 画面サイズ
  // ------------------------
  const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
  let tbW = 960;
  let spW = 600;

  // ------------------------
  // デバイス・ブラウザ判定
  // ------------------------
  const agent = window.navigator.userAgent.toLowerCase();

  // -----------------------------
  // smoothScroll
  // -----------------------------
  function smoothScrollurlHash() {
    // 別ページからのアンカーリンクの場合
    var urlHash = window.location.hash;
    if (urlHash) {
      $("body,html").stop().scrollTop(0);
      setTimeout(function () {
        var target = $(urlHash);
        if (windowWidth > spW) {
          var headerHight = $("#header").outerHeight();
          var position = target.offset().top - headerHight;
        } else {
          var position = target.offset().top;
        }
        $("body,html").stop().animate({scrollTop: position}, 800, "swing");
      }, 100);
    }
  }
  function smoothScroll() {
    $('a[href^="#"].scroll').click(function () {
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? "html" : href);
      var headerHight = $("#header").outerHeight();
      var position = target.offset().top - headerHight;
      if (windowWidth <= tbW && $("#header_menu").hasClass("is_open")) {
        header_gnav_close();
      }
      $("html, body").animate({scrollTop: position}, 800, "swing");
      return false;
    });
  }

  // ------------------------
  // スクロール連動
  // ------------------------
  function scrollAnimation() {
    $("[data-scroll]").each(function () {
      var position = $(this).offset().top,
        scroll = $(window).scrollTop(),
        windowHeight = $(window).height();

      if (windowWidth <= spW) {
        if (scroll > position - windowHeight + 50) {
          $(this).addClass("show");
        }
      } else {
        if (scroll > position - windowHeight + 100) {
          $(this).addClass("show");
        }
      }
    });
  }

  // ------------------------
  // header
  // ------------------------
  function header_fix() {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("fixed");
    } else {
      $("#header").removeClass("fixed");
    }
  }
  function header_gnav_close() {
    $("#header_menu").removeClass("is_open");
    $("#header_nav").slideUp();
    $("#header_nav").find(".nav_list").hide();
    $("#header_nav").find(".nav_tit").removeClass("is_open");
    setTimeout(function () {
      $("html, body").removeClass("fixed").css("top", 0);
    }, 200);
  }
  function header_sp_gnav() {
    if (windowWidth <= tbW) {
      $("#header_nav").css({
        "max-height": $(window).height() - $("#header").outerHeight(),
      });
      let scrollPosition;
      $("#header_menu").click(function () {
        if ($(this).hasClass("is_open")) {
          header_gnav_close();
          setTimeout(function () {
            window.scrollTo(0, scrollPosition);
          }, 200);
        } else {
          $(this).addClass("is_open");
          $("#header_nav").slideDown();
          scrollPosition = $(window).scrollTop();
          $("html, body").addClass("fixed").css("top", -scrollPosition);
        }
      });
      $("#header_nav").find(".nav_list").hide();
      $("#header_nav")
        .find(".nav_tit")
        .click(function () {
          let target_wrap = $(this).closest(".nav_wrap");
          if ($(this).hasClass("is_open")) {
            $(this).removeClass("is_open");
            target_wrap.find(".nav_list").slideUp(600);
          } else {
            $(this).addClass("is_open");
            target_wrap.find(".nav_list").slideDown(600);
            target_wrap.siblings(".nav_wrap").find(".nav_list").slideUp("fast");
            target_wrap.siblings(".nav_wrap").find(".nav_tit").removeClass("is_open");
            setTimeout(function () {
              $("#header_nav")
                .stop()
                .animate(
                  {
                    scrollTop: $("#header_nav").scrollTop() + target_wrap.position().top,
                  },
                  600
                );
            }, 600);
          }
        });
    }
  }

  $(document).ready(function () {
    header_fix();
    header_sp_gnav();
    smoothScrollurlHash();
    smoothScroll();
    scrollAnimation();
  });

  $(window).on("load", function () {
  });

  $(window).scroll(function () {
    header_fix();
    scrollAnimation();
  });
});
