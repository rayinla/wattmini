class App extends React.Component {


	constructor(){
		super()
		this.state = {
			books: [],
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
	}

	componentDidMount(){
		$.ajax({
			url: '/',
			method: 'get'		
		})
		.done(function(response){		
			this.setState({ books: response.stories})	
		}.bind(this))
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

	render(){
		return(
			<div>
				<SiteHeader />
				<SearchContainer />
				<BookDisplay
					library           = {this.state.books}
					onGetBooksByGenre = {this.getBooksByGenre}
				 />
			 </div>

		)	
	}
}