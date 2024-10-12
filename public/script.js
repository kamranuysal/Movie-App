$(document).ready(() => {
  // Header more menu dropdown
  $("[data-toggle=more-toggle]").on("click", function () {
    $(this).next().toggleClass("show");
  });

  // Handle clicks outside search and navigation elements
  $(document).on("click", (e) => {
    let myTargetElement = e.target;

    if (
      $(myTargetElement).hasClass("search-toggle") ||
      $(myTargetElement).closest(".search-toggle").length > 0
    ) {
      let mainElement = $(myTargetElement).closest(".search-toggle");
      let selector = mainElement.parent();

      // Close any other active elements
      if (!mainElement.hasClass("active")) {
        $(".navbar-right li").removeClass("iq-show");
        $(".navbar-right li .search-toggle").removeClass("active");
      }

      // Toggle the clicked element
      selector.toggleClass("iq-show");
      mainElement.toggleClass("active");
      e.preventDefault();
    } else {
      // Close all active navigation elements
      $(".navbar-right li").removeClass("iq-show");
      $(".navbar-right li .search-toggle").removeClass("active");
    }

    // Close main header dropdown if clicked outside
    let $trigger = $(".main-header .navbar");
    if ($trigger !== e.target && !$trigger.has(e.target).length) {
      $(".main-header .navbar-collapse").collapse("hide");
      $("body").removeClass("nav-open");
    }
  });

  // home-slider section

  // Reference to the home slider container
  const homeSlider = document.getElementById("home-slider");

  homeSlider &&
    fetch("/api/home-slider")
      .then((response) => response.json())
      .then((data) => {
        data.map((item, index) => {
          const slide = document.createElement("div");
          slide.className = `slide slick-bg s-bg-${index + 1}`;

          slide.innerHTML = `
          <div class="container-fluid position-relative h-100">
              <div class="slider-inner h-100">
                  <div class="row align-items-center h--100">
                      <div class="col-xl-6 col-lg-12 col-md-12">
                          <a href="javascript:void(0)">
                              <div class="channel-logo" data-animation-in="fadeInLeft" data-delay-in="0.5">
                                  <img src="${item.logoSrc}" class="c-logo" alt="" />
                              </div>
                          </a>
                          <h1 class="slider-text big-title title text-uppercase" data-animation-in="fadeInLeft" data-delay-in="0.6">${item.title}</h1>
                          <div class="d-flex flex-wrap align-items-center fadeInLeft animated" data-animation-in="fadeInLeft" style="opacity: 1">
                              <div class="slider-ratting d-flex align-items-center mr-4 mt-2 mt-md-3">
                                  <ul class="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                                      <li><i class="fa fa-star"></i></li>
                                      <li><i class="fa fa-star"></i></li>
                                      <li><i class="fa fa-star"></i></li>
                                      <li><i class="fa fa-star"></i></li>
                                      <li><i class="fa fa-star-half"></i></li>
                                  </ul>
                                  <span class="text-white ml-2">${item.rating}</span>
                              </div>
                              <div class="d-flex align-items-center mt-2 mt-md-3">
                                  <span class="badge badge-secondary p-2">${item.ageRating}</span>
                                  <span class="ml-3">${item.duration}</span>
                              </div>
                          </div>
                          <p data-animation-in="fadeInUp">${item.description}</p>
                          <div class="trending-list" data-animation-in="fadeInUp" data-delay-in="1.2">
                              <div class="text-primary title starring">
                                  Starring : <span class="text-body">${item.starring}</span>
                              </div>
                              <div class="text-primary title genres">
                                  Genres : <span class="text-body">${item.genres}</span>
                              </div>
                              <div class="text-primary title tag">
                                  Tags : <span class="text-body">${item.tags}</span>
                              </div>
                          </div>
                          <div class="d-flex align-items-center r-mb-23 mt-4" data-animation-in="fadeInUp" data-delay-in="1.2">
                              <a href="#" class="btn btn-hover iq-button"><i class="fa fa-play mr-3"></i>Play Now</a>
                              <a href="#" class="btn btn-link">More Details</a>
                          </div>
                      </div>
                      <div class="col-xl-5 col-lg-12 col-md-12 trailor-video">
                          <a href="${item.trailerSrc}" target="_blank" class="video-open playbtn">
                              <img src="images/play.png" class="play" alt="" />
                              <span class="w-trailor">Watch Trailer</span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
        `;

          homeSlider.appendChild(slide);
        });

        $("#home-slider")
          .slick({
            autoplay: false,
            speed: 800,
            lazyload: "progressive",
            arrows: true,
            dots: false,
            prevArrow:
              '<div class="slick-nav prev-arrow"><i class="fa fa-chevron-right"></i></div>',
            nextArrow:
              '<div class="slick-nav next-arrow"><i class="fa fa-chevron-left"></i></div>',
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false,
                },
              },
            ],
          })
          .slickAnimation();
      })
      .catch((error) => console.error("Error fetching movie data:", error));

  const initializeSlider = (selector) => {
    $(selector).slick({
      dots: false,
      arrow: true,
      infinite: true,
      speed: 300,
      autoplay: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow:
        '<a href="#" class="slick-arrow slick-next"><i class="fa fa-chevron-right"></i></a>',
      prevArrow:
        '<a href="#" class="slick-arrow slick-prev"><i class="fa fa-chevron-left"></i></a>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  };

  const fetchAndDisplayList = (apiURL, listElementId) => {
    const listElement = document.getElementById(listElementId);

    listElement &&
      fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
          data.map((item) => {
            const li = document.createElement("li");
            li.className = "slide-item";
            li.innerHTML = `
      <div class="block-images position-relative">
        <div class="img-box">
            <img src="${item.imgSrc}" class="img-fluid" alt="" />
        </div>
        <div class="block-description">
            <h6 class="iq-title">
                <a href="#">${item.title}</a>
            </h6>
            <div class="movie-time d-flex align-items-center my-2">
                <div class="badge badge-secondary p-1 mr-2">${item.ageRating}</div>
                <span class="text-white">${item.duration}</span>
            </div>
            <div class="hover-buttons">
                <span class="btn btn-hover iq-button">
                    <i class="fa fa-play mr-1"></i>
                    Play Now
                </span>
            </div>
          </div>
          <div class="block-social-info">
              <ul class="list-inline p-0 m-0 music-play-lists">
                  <li class="share">
                      <span><i class="fa fa-share-alt"></i></span>
                      <div class="share-box">
                          <div class="d-flex align-items-center">
                              <a href="#" class="share-ico"><i class="fa fa-share-alt"></i></a>
                              <a href="#" class="share-ico"><i class="fa fa-youtube"></i></a>
                              <a href="#" class="share-ico"><i class="fa fa-instagram"></i></a>
                          </div>
                      </div>
                  </li>
                  <li>
                      <span><i class="fa fa-heart"></i></span>
                      <span class="count-box">${item.likes}</span>
                  </li>
                  <li>
                      <span><i class="fa fa-plus"></i></span>
                  </li>
              </ul>
          </div>
        </div>
      </div>
    `;
            listElement.appendChild(li);
          });

          initializeSlider(`#${listElementId}`);
        })
        .catch((error) => console.error("Error fetching movie data"));
  };

  fetchAndDisplayList("/api/top-picks", "favoritesList");
  fetchAndDisplayList("/api/popular", "popularList");
  fetchAndDisplayList("/api/suggested", "suggestedList");
  fetchAndDisplayList("/api/recommended", "recommendedList");

  const trendingMoviesNavList = document.getElementById("top-ten-slider-nav");
  trendingMoviesNavList &&
    fetch("/api/trending")
      .then((responce) => responce.json())
      .then((data) => {
        data.map((item) => {
          const li = document.createElement("li");
          li.innerHTML = `
          <div class="block-images position-relative">
            <a href="#">
              <img src="${item.imgSrc}" class="img-fluid w-100" alt="" />
            </a>
    
            <div class="block-description">
              <h5>${item.title}</h5>
              <div class="movie-time d-flex align-items-center my-2">
                <div class="badge badge-secondary p-1 mr-2">${item.ageRating}</div>
                <span class="text-white">${item.duration}</span>
              </div>
              <div class="hover-buttons">
                <a href="#" class="btn btn-hover" tabindex="0">
                  <i class="fa fa-play mr-1" aria-hidden="true"></i>
                  Play Now
                </a>
              </div>
            </div>
          </div>
        `;
          trendingMoviesNavList.appendChild(li);
        });

        // Initialize Trending topten slider
        $("#top-ten-slider").slick({
          slidesToScroll: 1,
          slidesToShow: 1,
          arrows: false,
          fade: true,
          asNavFor: "#top-ten-slider-nav",
          responsive: [
            {
              breakpoint: 992,
              settings: {
                asNavFor: false,
                arrows: true,
                nextArrow:
                  '<button class="NextArrow"><i class="fa fa-angle-right"></i></button>',
                prevArrow:
                  '<button class="PrevArrow"><i class="fa fa-angle-left"></i></button>',
              },
            },
          ],
        });

        // Initialize Trending topten navigation
        $("#top-ten-slider-nav").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: "#top-ten-slider",
          dots: false,
          arrows: true,
          infinite: true,
          vertical: true,
          verticalSwiping: true,
          centerMode: false,
          nextArrow:
            '<button class="NextArrow"><i class="fa fa-angle-down"></i></button>',
          prevArrow:
            '<button class="PrevArrow"><i class="fa fa-angle-up"></i></button>',
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 600,
              settings: {
                asNavFor: false,
              },
            },
          ],
        });
      })
      .catch((error) =>
        console.error("Error fetching trending movies:", error)
      );

  // Initialize trending slider
  $("#trending-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    draggable: false,
    asNavFor: "#trending-slider-nav",
  });

  // Initialize trending slider navigation
  $("#trending-slider-nav").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: "#trending-slider",
    dots: false,
    arrows: true,
    nextArrow:
      '<a href="#" class="slick-arrow slick-next"><i class="fa fa-chevron-right"></i></a>',
    prevArrow:
      '<a href="#" class="slick-arrow slick-prev"><i class="fa fa-chevron-left"></i></a>',
    infinite: true,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Initialize episodes slider
  $(".episodes-slider1").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i> ",
    ],
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 4,
      },
    },
  });

  // set equal height for tabs in trending content
  $(".trending-content").each(() => {
    let highestBox = 0;
    $(".tab-pane", this).each(() => {
      if ($(this).height() > highestBox) {
        highestBox = $(this).height();
      }
    });
    $(".tab-pane", this).height(highestBox);
  });

  // Initialize select2 for season select
  if ($("select").hasClass("season-select")) {
    $("select").select2({
      theme: "bootstrap4",
      allowClear: false,
      width: "resolve",
    });
  }
});
