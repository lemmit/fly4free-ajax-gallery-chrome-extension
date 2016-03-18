var getUrl = function(linkType, gallery) { 
	return $('a.'+linkType, gallery)[0]['href']; 
}

var updateGallery = function(nextPage){
	var newGallery = $($('div.gallery', nextPage)[0]);
	var gallery = $($('div.gallery')[0]);
	gallery.html(newGallery.html());		
};

var unbindLinks = function(linkType){
	var nextElems = $('a.'+linkType);
	$.each(nextElems, function(index, nextLink){
		$(nextLink).on('click', function(e){ 
			e.preventDefault(); 
		});
	});
};

var addOverlay = function(){
	$("<div id='myOverlay'/>").css({
		position: "absolute",
		top: "-1px",
		left: "-1px",
		bottom: "-1px",
		right: "-1px",
		color: "#000000",
		background: "#ffffff url(https://dc415.4shared.com/img/fybQwEaA/s3/ajax-loading-image.gif) center center no-repeat",
		"z-index": 100,
		opacity: 0.9
	}).appendTo($("div.gallery").css("position", "relative"));
};

var bindLinks = function(linkType, onClick){
	var nextElems = $('a.'+linkType);
	$.each(nextElems, function(index, nextLink){
		//console.log("Set click event on " + nextLink);
		var nl = $(nextLink);
		nl.on('click', function(e){
			//console.log("NEXT CLICKED");
			addOverlay();
			e.preventDefault();
			unbindLinks(linkType);
			onGetImage(linkType);
		});
	});
};

var rebindControlls = function(){
	bindLinks('next');
	bindLinks('prev');
};

var onGetImage = function(linkType){
	var url = getUrl(linkType);
	$.get(url, function(data){
		//console.log("Next page downloaded.");
		var newPage = $('<output>'); 
		newPage.append($.parseHTML(data)); 
		updateGallery(newPage);
		rebindControlls();
	});
}

var initialize = function(){ 
	//console.log("try init");
	if (typeof jQuery == 'undefined'){
		//console.log("jQuery is undefined");
		setTimeout(function(){ 
			initialize();
		}, 3000);
	}else{
		//console.log("jQuery defined!");
		$(function(){
			rebindControlls();
		});
	}
};
initialize();



