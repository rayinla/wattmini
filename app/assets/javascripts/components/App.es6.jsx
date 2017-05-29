class App extends React.Component {

	constructor(){
		super()
		this.state = {
			books: [], 
			searchTerm: "Search for books in",
			initState: true,
			offset: 0,
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
	}

	componentDidMount(){
	 while(this.state.offset < 1000){
		$.ajax({
			url: '/',
			method: 'post',
			data: {page: {offset: this.state.offset}}	
		})
		.done(function(response){		
			this.setState({ books: response.stories})	

		}.bind(this))
	 }
	}

	getBooksByGenre(genre){
		//Wattpad API currently only accepts int
		var encryptGenre = this.state.categories[genre]

		$.ajax({
			url: 'books/library',
			method: 'post',
			data: {story: {category: encryptGenre }}
		})
		.done(function(response){
			this.setState({books:response.stories})
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

				 />
				<BookDisplay
				    searchTerm        = {this.state.searchTerm}
					library           = {this.state.books}
					onGetBooksByGenre = {this.getBooksByGenre}
					initState		  = {this.state.initState}
				 />
			 </div>

		)	
	}
}