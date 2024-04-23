(function () {
	"use strict";

	let title;
	let subtitle;
	let buttonName;
	let path;

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
    	})
    	.catch(error => {
    		console.error('Fetch error:', error);
    	});

})();