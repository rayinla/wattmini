


    var currentBook = ""
	
	function mountDragDrop(){
		$(".book").draggable({
		 	scroll: false,
		  	revert: true, 
		  	zIndex: 100,
		  	reverDuration: 200,
		  	drag: onDrag,
		  	stop: onDragStop
		 })

		$(".book-slots").droppable({
		  	accept: ".book",
		  	tolerance: "intersect",
		  	drop: onDrop
	  }) 	
	}


	  function onDragStop(){
	  	$(".book-slots").hide()
	  }

	  function onDrag(e, ui){  
		// if user doesn't drop on droppable reset current book to empty
	  	currentBook = ""
	  	$(".book-slots").show()
	  	$(".add").show()
	  	$(".added").hide()
	   	
	  }	

	  function onDrop(e, ui){
	  	currentBook = ui.draggable.attr("data-index-number")
	  	$(".add").hide()
	  	$(".added").show()
	  	setTimeout(function(){$(".book-slots").hide()}, 2500)

	  } 	


	

	




	 