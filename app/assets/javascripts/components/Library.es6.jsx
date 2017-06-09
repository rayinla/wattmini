class Library extends React.Component {


	render(){
		var that = this

		function bookLength(){
			if(that.props.userLibrary.length === 1){
				return(
					<p>{that.props.userLibrary.length} Book in My Library</p>
				)
			}else{
				return(
					<p>{that.props.userLibrary.length} Books in My Library</p>
				)
			}
		}

		function titleCutter(title){
			var newTitle = ""
			if (title.length > 15){
				for(i=0; i < 15; i++){
					newTitle += title[i]
				}
				return newTitle + "..."
			}else {
				return title
			}

			
		}

		function books(){	
			if(that.props.userLibrary === 0 ){
			  		return(
			  				<p>No Books in My Library</p>
			  			)
			 }else{

			  			
			  		that.props.userLibrary	
					.map(function(book){
						return(
							<div key={book.id}  className="book-details">		
								<img className="libbook-jacket" data-index-number={book.id} src={book.cover} />
								<p>{titleCutter(book.title)}</p>
							</div>
						)
				   })

				}

		}

		return(

			<div className="library">
			  <div className="lib-modalhead">
			  	{bookLength()}
			  </div>
			  <div className="lib-body">
			  {
					that.props.userLibrary	
					.map(function(book){
						return(
							<div key={book.id}  className="book-details">		
								<img className="libbook-jacket" data-index-number={book.id} src={book.cover} />
								<p>{titleCutter(book.title)}</p>
							</div>
						)
				   })
				}
			  </div>
			</div>


		)
	}


}