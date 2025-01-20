(function ($) {
  
  "use strict";

    // AOS ANIMATIONS
    AOS.init();

    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    // NEWS IMAGE RESIZE
    function NewsImageResize(){
      $(".navbar").scrollspy({ offset: -76 });
      
      var LargeImage = $('.large-news-image').height();

      var MinusHeight = LargeImage - 6;

      $('.news-two-column').css({'height' : (MinusHeight - LargeImage / 2) + 'px'});
    }

    $(window).on("resize", NewsImageResize);
    $(document).on("ready", NewsImageResize);

    $('a[href*="#"]').click(function (event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 66
          }, 1000);
        }
      }
    });
    
  })(window.jQuery);

  document.addEventListener('DOMContentLoaded', function() {
    fetch('blog-project/blog-posts.json')
        .then(response => response.json())
        .then(posts => {
            const blogPostsContainer = document.createElement('div');
            blogPostsContainer.className = 'row';

            // Create the two column elements
            const firstColumn = document.createElement('div');
            firstColumn.className = 'col-lg-6 col-12 mb-5 mb-lg-0';
            firstColumn.id = 'first-post-column';

            const secondColumn = document.createElement('div');
            secondColumn.className = 'col-lg-6 col-12';
            secondColumn.id = 'second-post-column';

            // Append the columns to the container
            blogPostsContainer.appendChild(firstColumn);
            blogPostsContainer.appendChild(secondColumn);

            // Add posts to the correct columns
            posts.forEach((post, index) => {
                let postElement = document.createElement('div');
                postElement.className = 'news-thumb';
                postElement.innerHTML = `
                    <div class="news-thumb ${index === 1 ? 'news-two-column d-flex flex-column flex-lg-row' : ''} ${index === 2 ? 'news-two-column d-flex flex-column flex-lg-row mt-4' : ''}">
                        <div class="news-top w-100">
                            <a href="blog-project/${post.link}" class="news-image-hover ${index === 0 ? 'news-image-hover-warning' : index === 1 ? 'news-image-hover-primary' : 'news-image-hover-success'}">
                                <img src="${post.image}" class="img-fluid news-image" alt="" >
                            </a>
                            <div class="news-category ${index === 0 ? 'bg-warning' : index === 1 ? 'bg-primary' : 'bg-success'} text-white">${post.type}</div>
                        </div>
                        <div class="news-bottom w-100">
                            <div class="news-text-info">
                                <h5 class="news-title">
                                    <a href="blog-project/${post.link}" class="news-title-link">${post.title}</a>
                                </h5>
                                <span class="text-muted">${new Date(post.date).toLocaleDateString()}</span>
                                <br> <p class="news-summary"> ${post.summary}</p> <!-- Add summary here -->
                            </div>
                        </div>
                    </div>
                `;

                if (index === 0) {
                    firstColumn.appendChild(postElement);
                } else {
                    secondColumn.appendChild(postElement);
                }
            });

            document.querySelector('#blog-posts').appendChild(blogPostsContainer);
        })
        .catch(error => console.error('Error fetching blog posts:', error));
});