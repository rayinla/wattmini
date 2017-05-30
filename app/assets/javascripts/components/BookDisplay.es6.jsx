class BookDisplay extends React.Component {

	constructor(){
		super()

		this.state = {
			toggle: false,
			book: {}			
		}

		this.handleClick = this.handleClick.bind(this)
		this.handleScroll = this.handleScroll.bind(this)
		this.crossClick = this.crossClick.bind(this)
		this.genreClick = this.genreClick.bind(this)
	}

	componentDidMount(){
		if (this.props.onWindowScroll){ 
			document.addEventListener("scroll", this.handleScroll)
		}
	}
	componentWillMount(){
		if (this.props.onWindowScroll){ 
			document.removeEventListener("scroll", this.handleScroll)
		}
	}

	handleScroll(e){	
		 if (this.props.onWindowScroll){
		 	this.props.onWindowScroll(e)
		 }
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

	genreClick(e){
      e.preventDefault()
      var genre = e.target.innerHTML
      this.props.onGetBooksByGenre(genre)
	}

	render(){
		var that = this
		//Book Modal on and off state   
		function bookModal(){	
			if(that.state.toggle){
				return(
					<div className="blackout">
					<h2 className="kiosk-cta">Hottest Reads In {that.props.friendlyCat.toUpperCase()} Just For You</h2> 
					<div className="kiosk"> 
					<div className="book-suggestions">
						{   //Filter based on most read books
							that.props.library   
		                    .filter(function(book,idx){
			   	              if(book.readCount	> 10000000 
			   	              	&& that.props.friendlyCat === "teenficton" 
			   	              	|| that.props.friendlyCat === "romance"){
			   	              	return book
			   	              }else if(book.readCount > 100000
			   	              			&& that.props.friendlyCat != "teenficton"
			   	              			&& that.props.friendlyCat != "romance"){

			   	              	return book
			   	              }	   

			                })
		                    .map(function(book, idx){	
		    					return(
			    					<div key={book.id} onClick={that.handleClick} className="curated-book">
						 				 <img className="stock-book" src="/assets/flat-book2.jpg" />
						  				<img className="book-jacket" data-index-number={book.id} src={book.cover} />
									</div>
								)	
		   				   })
						}
					</div>
					</div>
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

		//Sets books before subjecting them to search filtering
		function bookFilter(){		
			if(that.props.initState){
				return(
					that.props.library
					.map(function(book){
						return(						
							  <div key={book.id} onClick={that.handleClick} className="book">
							  	<span><img className="sm-stock-book" src="/assets/small-book.jpg" /></span>
							    <span><img className="sm-jacket" data-index-number={book.id} src={book.cover} /></span>
							  </div>						
						)	
				    })
			    )
			 }
			 else{
			 	return(
				 	that.props.library
					.filter(function(book){
						return `${book.title} ${book.description} ${book.tags}`.
						toUpperCase().indexOf(that.props.searchTerm.toUpperCase()) >=0
					})
					.map(function(book){			
						return(			
							  <div key={book.id} onClick={that.handleClick} className="book">
							    <img data-index-number={book.id} src={book.cover} />
							  </div>					
						)				
					})
				)
			 }
		  }
		   
		
		return(
			//TODO: Componentize bookModal, genreNav, books
			<div>
				{bookModal()}
				<div className="genre-nav">
					<button onClick={this.genreClick} ref="genre" className="genre-btn">adventure</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">paranormal</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">spiritual</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">action</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">nonfiction</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">shortstory</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">vampire</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">random</button>
					<button onClick={this.genreClick} className="genre-btn">generalfiction</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">werewolf</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">historicalfiction</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">chicklit</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">classics</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">horror</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">humor</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">fanfiction</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">scifi</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">romance</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">fantasy</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">poetry</button>
					<button onClick={this.genreClick} ref="genre" className="genre-btn">teenfiction</button>
				</div>			
				<div className="book-container">
					{bookFilter()}	
				</div>
			</div>

	    )
	}
}