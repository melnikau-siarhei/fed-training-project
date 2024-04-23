(function () {
	"use strict";

	let title;
	let subtitle;
	let buttonName;
	let path;
	let mostPopularArticlesMarkup = "";

    extractData();
    createMarkup();
	
	function createMarkup() {
		const element = `
			<div class="registration-cta-container">
                 <div class="registration-cta-container__info">
                    <div class="registration-cta-container__title">${title}</div>
                    <div class="registration-cta-container__subtitle">${subtitle}</div>
                 </div>
                 <a class="registration-cta-container__button" href="${path}">
                    ${buttonName}
                 </a>
            </div>
		`;
		
		document.querySelector("#registration-cta").innerHTML = element;
	}


	function extractData() {
		const data = document.querySelector(".registration-cta-data");

		title = data.dataset.title;
		subtitle = data.dataset.subtitle;
		buttonName = data.dataset.buttonName;
		path = data.dataset.path;
	}

	fetch('./public/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(jsonData => {
        console.log(jsonData);
        if(jsonData) {
            let articles = jsonData.mostPopularArticles;
            articles.forEach( article => {
                mostPopularArticlesMarkup += getArticleMarkup(article);
            });
            console.log(mostPopularArticlesMarkup);
            document.querySelector("#most-popular-articles").innerHTML = mostPopularArticlesMarkup;
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

    function getArticleMarkup(article) {
        return `<div class="article-container">
                    <div class="article-post-card">
                        <img alt="image" src="${article.image}" class="article-card-image"/>
                        <div class="article-card-text-container">
                            <span class="article-card-title">
                                <span>${article.articleCardTitle}</span>
                            </span>
                            <span class="article-card-subtitle">
                                <span>${article.articleCardSubtitle}</span>
                            </span>
                            <span class="article-card-text">
                                <span>
                                    ${article.articleCardText}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>`;
    }


})();