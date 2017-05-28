class App extends React.Component {


	constructor(){
		super()
		this.state = {
			books: []
		}
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

	render(){
		return(
			<div>
				<SiteHeader />
				<SearchContainer />
				<BookDisplay
					library = {this.state.books}
				 />
			 </div>

		)	
	}
}