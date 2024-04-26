(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function() {
	    let blogArticles = [];
        let contentContainer = document.getElementById('blog-blog');
        let chunkSize = 3;
        let loadedChunks = 0;
        let loadMoreButton = document.getElementById('loadMore');

	    if(loadMoreButton) {
	        loadMoreButton.addEventListener("click", lazyLoad);
	        loadMoreButton.on("click", function(e){
                e.preventDefault();
                lazyLoad();
            });
	    }

	    fetch('./public/blog.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonData => {
            console.log(jsonData);
            if(jsonData) {
                blogArticles = jsonData.blogArticles;
                if(blogArticles.length > 0) {
                    lazyLoad();
                }
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

        function lazyLoad() {
            let start = loadedChunks * chunkSize;
            let end = Math.min(start + chunkSize, blogArticles.length);
            for (let i = start; i < end; i++) {
              let nodeElement = document.createElement('div');
              nodeElement.innerHTML = getArticleCardMarkup(blogArticles[i]);
              contentContainer.appendChild(nodeElement);
            }


            loadedChunks++;

            if (end >= blogArticles.length) {
              // hide load more button
              loadMoreButton.classList.add("hidden");
            }
        }

        function getArticleCardMarkup(articleCard) {
            return `
                <div class="blog-container07">
                    <div class="blog-post-card1-blog-post-card blog-post-card1-root-class-name5">
                        <img alt="image" src="${articleCard.image}" class="blog-post-card1-image"/>
                        <div class="blog-post-card1-container">
                            <span class="blog-post-card1-text">
                                <span>${articleCard.articleCardTitle}</span>
                            </span>
                            <span class="blog-post-card1-text1">
                                <span>${articleCard.articleCardSubtitle}</span>
                            </span>
                            <span class="blog-post-card1-text2">
                                <span>
                                    ${articleCard.articleCardText}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }
    });

})();