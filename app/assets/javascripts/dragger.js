


$(document).ready(function(){
	
	setTimeout(function(){
	  $(".book").draggable({
	  	scroll: false,
	  	helper: 'clone', 
	  	revert: true, 
	  	reverDuration: 200
	  })
	  	

	}, 2000)
	
		

})