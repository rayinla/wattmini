class App extends React.Component {

	constructor(){
		super()
		this.state = {
			books: [], 
			searchTerm: "Search for books in",
			initState: true,
			offset: 0,
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
		this.changeSearchTerm = this.changeSearchTerm.bind(this)
		this.handleScroll = this.handleScroll.bind(this)
	}

	componentDidMount(){ 
		var p1 = $.ajax({
			url: '/library',
			method: 'post',
			data: {story: {category: this.state.currentCat, offset: 0, limit: 100}}
		})
		.done(function(response){
			this.setState({books: response.stories})
			this.setState({offset: this.state.offset + 100})
		}.bind(this))
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
					initState		  = {this.state.initState}
					friendlyCat		  = {this.state.friendlyCat}
				 />
			 </div>

		)	
	}
}