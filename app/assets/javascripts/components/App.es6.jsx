var imported = document.createElement('script');
imported.src = '/assets/dragger.js';
document.head.appendChild(imported);


class App extends React.Component {
	constructor(){
		super()
		this.state = {
			books: [], 
			userLibrary: [],
			searchTerm: "Search for books in",
			initState: true,
			offset: 0,
			droppedBook: "",
			currentCat: 3,
			friendlyCat: "fantasy",
			categories: {
				"adventure": 11,
				"paranormal": 12,
				"spiritual": 13,
				"action": 14,
				"nonfiction": 16,
				"shortstory": 17,
				"vampire": 18,
				"random": 19,
				"generalfiction": 21,
				"werewolf": 22,
				"historicalfiction": 23,
				"chicklit": 24,
				"classics": 10,
				"horror": 9,
				"thriller": 8,
				"humor": 7,
				"fanfiction": 6,
				"scifi": 5,
				"romance": 4,
				"fantasy": 3,
				"poetry": 2,
				"teenfiction": 1
			}
		}

		this.getBooksByGenre = this.getBooksByGenre.bind(this)
		this.getDroppedBook = this.getDroppedBook.bind(this)
		this.changeSearchTerm = this.changeSearchTerm.bind(this)
		this.handleScroll = this.handleScroll.bind(this)
		this.findPollyfill = this.findPollyfill.bind(this)
	}

	componentDidMount(){ 
		$.ajax({
			url: '/library',
			method: 'post',
			data: {story: {category: this.state.currentCat, offset: 0, limit: 100}}
		})
		.done(function(response){
			this.setState({books: response.stories})
			this.setState({offset: this.state.offset + 100})
		}.bind(this))
	}
	
	//Initialize draggabale and droppable elements
	componentDidUpdate(){
		mountDragDrop()
	}

	findPollyfill(){
		if (!Array.prototype.find) {
		  		   Object.defineProperty(Array.prototype, 'find', {
		    	   value: function(predicate) {
		     // 1. Let O be ? ToObject(this value).
		     		 if (this == null) {
		       				 throw new TypeError('"this" is null or not defined');
		      		 }
		            var o = Object(this);
		      // 2. Let len be ? ToLength(? Get(O, "length")).
		            var len = o.length >>> 0;
		      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
		            if (typeof predicate !== 'function') {
		        		throw new TypeError('predicate must be a function');
		            }
		      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
		      		var thisArg = arguments[1];
		      // 5. Let k be 0.
		     		 var k = 0;
		      // 6. Repeat, while k < len
		      		while (k < len) {
		        // a. Let Pk be ! ToString(k).
		        // b. Let kValue be ? Get(O, Pk).
		        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
		        // d. If testResult is true, return kValue.
		       		   var kValue = o[k];
		       		    if (predicate.call(thisArg, kValue, k, o)) {
		         		 return kValue;	        		
		        	   }
		        // e. Increase k by 1.
		        	  k++;
		      	    }
		      // 7. Return undefined.
		         return undefined;
		        }
		    })
		}
	}	


	getDroppedBook(droppedBook){
		if(droppedBook != ""){
			this.findPollyfill()
			function findById(book){  
				return book.id === Number(droppedBook)		
	    	}
			var book = this.state.books.find(findById)
			
			this.setState({userLibrary: this.state.userLibrary.concat([book])})
			
		}
		
	}

	//Detect bottom of doc and load more books
	handleScroll(e){
		if (document.body.scrollHeight == 
	        document.body.scrollTop +        
	        window.innerHeight) {
				//ease the amount of books loaded
		        this.setState({offset: this.state.offset + (this.state.offset / 4)})
		    	$.ajax({
					url: '/library',
					method: 'post',
					data: {story: {category: this.state.currentCat, offset: this.state.offset, limit: 25 }}
			    })
		    	.done(function(response){
		    		this.setState({books: this.state.books.concat(response.stories)})
		    	}.bind(this))	    	
	     }
	 }
	

	getBooksByGenre(genre){
		//Convert genre to int representation
		this.setState({friendlyCat: genre})
		var encryptGenre = this.state.categories[genre]
		//we want the genre to be accesible to scroll handler
		this.setState({currentCat: encryptGenre})
		this.setState({offset: 100})
		$.ajax({
			url: '/library',
			method: 'post',
			data: {story: {category: encryptGenre, offset: 0, limit: 100}}
		})
		.done(function(response){
			this.setState({books:response.stories})
			// this.setState({offset: this.state.offset + 100})
		}.bind(this))
	}

	changeSearchTerm(query){
		this.setState({searchTerm: query})
		this.setState({initState: false})
	}

	render(){
		return(
			<div>
				<SiteHeader />
				<SearchContainer 
				  searchTerm         = {this.state.searchTerm}
				  onChangeSearchTerm = {this.changeSearchTerm}
				  friendlyCat	     = {this.state.friendlyCat}

				 />
				<BookDisplay
					onWindowScroll    = {this.handleScroll}
				    searchTerm        = {this.state.searchTerm}
					library           = {this.state.books}
					onGetBooksByGenre = {this.getBooksByGenre}
					onGetDroppedBook  = {this.getDroppedBook}
					initState		  = {this.state.initState}
					friendlyCat		  = {this.state.friendlyCat}
					findPollyfill     = {this.findPollyfill}
					findById  		  = {this.findById}
				 />
				 <SiteFooter 
				 	library 		 = {this.state.books}			 
				 	droppedBook 	 = {this.state.droppedBook}
				 	userLibrary		 = {this.state.userLibrary}
 				 />
			</div>

		)	
	}
}