(function() {
/* DOM */
var imageDOM = document.getElementById('photo');
var caption = document.getElementById('caption');

var loader = document.getElementById('loader');

/* Page and image setup */
var currentImage = '';

var photos = {
	cats: {
		caption: 'Cat',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Cat_in_the_window_Susak.jpg/1280px-Cat_in_the_window_Susak.jpg'
	}
};

setImage('cats');
  
function setImage(imageName) {
	willScale = false;
	currentImage = new Image();
  currentImage.crossOrigin = 'Anonymous';
  currentImage.onload = function() {
    imageDOM.src = photos[imageName].url;
	caption.textContent = photos[imageName].caption;
  }
	currentImage.src = photos[imageName].url;
	
}

function show(loader) {
	loader.removeAttribute('hidden');
}

function hide(loader) {
	loader.setAttribute('hidden', 'hidden');
}

/* Insta-fy the selected image */

document.getElementById('filterButtons').addEventListener('click', prepFilterEffect, false);

function prepFilterEffect(e) {
	show(loader);

	var filterButton = e.target.parentNode;
	if(!filterButton) return;

	var options = null;

	var promise = new Promise(function(resolve) {
		setTimeout(function() {
			var f = filterous.importImage(currentImage, options)
			.applyInstaFilter(filterButton.id)
	    .renderHtml(imageDOM);
	    resolve(f);
		}, 1);
	});
	
	promise.then(function() {
		hide(loader);
	});

}

})();