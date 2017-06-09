


    var currentBook = ""
	var addedBooks = []

	function initLibraryUI(){
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
	  	initLibraryBooks() 	
	}

	function initLibraryBooks(){
	  	if(currentBook.length > 1){
			$('.book[data-index-number="' + currentBook + '"]').draggable("destroy")
			$('.book[data-index-number="' + currentBook + '"]').children(".lib-check").show()
			if(addedBooks.includes(currentBook) === false){
				addedBooks.push(currentBook)
			}		
		}
		mapLibCheck()
	  }

	  function mapLibCheck(){
	  	if(addedBooks.length > 0){
	  		addedBooks.map(function(book){
	  		  $('.book[data-index-number="' + book + '"]').children(".lib-check").show()
		   })	
	  	}
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


	

	




	 