class BookDisplay extends React.Component {



	render(){

		var books = (
			this.props.library.map(function(book){
				return(
					<img src={book.cover} />
				)
				
			})

		)
		return(
		
			<div>
				{books}
			</div>

	    )
	}
}