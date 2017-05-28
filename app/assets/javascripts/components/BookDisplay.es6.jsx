class BookDisplay extends React.Component {

	constructor(){
		super()

		this.state = {
			toggle: false,
			book: {}
		}

		this.handleClick = this.handleClick.bind(this)
		this.crossClick = this.crossClick.bind(this)
	}

	handleClick(e){
		e.preventDefault()
		that = this

		function findById(book){  
		  return book.id === Number(e.target.dataset.indexNumber)
		}

		var activeBook = this.props.library.find(findById)
			
		this.setState({toggle: true})
		this.setState({book: activeBook})
	}

	crossClick(e){
		e.preventDefault()
		this.setState({toggle: false})
	}

	render(){
		that = this
		function bookModal(){	
			if(that.state.toggle){
				return(
					<div className="blackout"> 
					<div className="book-modal middle-display">
						<div className="modal-head">
						<i onClick={that.crossClick} className="material-icons cross md-36">&#xE5CD;</i>
						<h2 className="book-title"> {that.state.book.title} </h2>
						
						<p className="byline"> by {that.state.book.user}</p>
						<p className="book-attrs middle-display">
						<span><i className="material-icons md-18">&#xE896;</i>{that.state.book.numParts} </span>
						<span><i className="material-icons md-18">remove_red_eye</i> {that.state.book.readCount} </span>
						<span><i className="material-icons md-18">&#xE885;</i>{that.state.book.voteCount} </span>
						<span><i className="material-icons md-18">&#xE0B9;</i>{that.state.book.commentCount} </span>
						</p>
						</div>
						<div className="modal-body">
						  <section className="col-1-2">
						  	<img src={that.state.book.cover} />
						  </section>
						  <section className="col-1-2">
						    <article>
						  	  <h3 className="info-title">Description</h3>
						  	  <p className="m-content">{that.state.book.description}</p>
						  	</article>
						  	 <article>
						  	  <h3 className="info-title">Tags</h3>
						  	  <p className="m-content">{that.state.book.tags}</p>
						  	</article>
						  </section>
						</div>
						<div className="modal-foot">

					    </div>
					</div>
					</div>
				)
			}
			else{
				return(

					<div className="book-modal inactive-modal middle-display">
						<div className="modal-head">
						<h2 className="book-title"> {that.state.book.title} </h2>
						<p className="byline"> by {that.state.book.user}</p>
						<p className="book-attrs middle-display">
						<span><i className="material-icons md-18">&#xE896;</i>{that.state.book.numParts} </span>
						<span><i className="material-icons md-18">remove_red_eye</i> {that.state.book.readCount} </span>
						<span><i className="material-icons md-18">&#xE885;</i>{that.state.book.voteCount} </span>
						<span><i className="material-icons md-18">&#xE0B9;</i>{that.state.book.commentCount} </span>
						</p>
						</div>
						<div className="modal-body">
						  <section className="col-1-2">
						  	<img src={that.state.book.cover} />
						  </section>
						  <section className="col-1-2">
						    <article>
						  	  <h3 className="info-title">Description</h3>
						  	  <p className="m-content">{that.state.book.description}</p>
						  	</article>
						  	 <article>
						  	  <h3 className="info-title">Tags</h3>
						  	  <p className="m-content">{that.state.book.tags}</p>
						  	</article>
						  </section>
						</div>
						<div className="modal-foot">
					    </div>
					</div>
				)
			}
		}



		var books = (
			this.props.library.map(function(book){
				return(
					
					  <div key={book.id} onClick={that.handleClick} className="book">
					    <img data-index-number={book.id} src={book.cover} />
					  </div>
					
				)
				
			})

		)
		return(
			<div>

				{bookModal()}
				<div className="book-container">		  	
					{books}	
				</div>
			</div>

	    )
	}
}