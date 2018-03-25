$(document).ready(function(){
	$('input[id^="star-rate"]').rating({
		displayOnly:true
	});
	$('input[id^="star-rtin"]').rating({
		showClear:false,
		showCaption:false
	});
	$('#hygiene').rating({
		showClear:false,
		showCaption:false
	});
	//$("#star-rate").rating({
	//	displayOnly:true
	//	});
	
	
});	