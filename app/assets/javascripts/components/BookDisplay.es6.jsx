
var imported = document.createElement('script');
imported.src = '/assets/dragger.js';
document.head.appendChild(imported);



class BookDisplay extends React.Component {
	constructor(){
		super()

		this.state = {
			toggle: false,
			droppedBook: "",
			book: {}			
		}

		this.handleClick = this.handleClick.bind(this)
		this.handleScroll = this.handleScroll.bind(this)
		this.crossClick = this.crossClick.bind(this)
		this.genreClick = this.genreClick.bind(this)
		this.handleDrag = this.handleDrag.bind(this)
		this.handleDrop =this.handleDrop.bind(this)

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


	handleDrag(e){
		e.preventDefault()
		console.log(e.target.dataset.indexNumber)
	}

	handleDrop(e){
		e.preventDefault()
		this.props.onGetDroppedBook(currentBook)	 
	}

	handleScroll(e){	
		if (this.props.onWindowScroll){
			this.props.onWindowScroll(e)
		}
	}

	handleClick(e){
		e.preventDefault()	
		that = this
		this.props.findPollyfill()
		function findById(book){  
			return book.id === Number(e.target.getAttribute("data-index-number"))		
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
		function clrNum(str){
			str = str.toString().split("").reverse().join("")
			var numArr = []
			var start = 0
			var end = 3
			while (end <= str.length){
			  numArr.push(str.slice(start, end).split("").reverse().join(""))
			  if(end == str.length - 1) {
			    start = end
			    end += 1 
			  }else if(end + 1 == str.length - 1) {
			    start = end
			    end += 2
			  }else {
			    start = end
			    end += 3
			  }
			}
			clrdNum = numArr.reverse().join(",")
			return clrdNum
		}
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
			   	              if(book.readCount	> 100000 ){
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
						</div>
						<div className="modal-body">
						  <section className="book-ui">
						  	<div className="col-1-2">
						  	  <img className="modal-jacket" src={that.state.book.cover} />
						  	</div>
						  	<div className="col-1-2">
							  	<a className="read-cta" href={that.state.book.url}>Read</a>
							  	<ul className="book-attrs">
									<li>{that.state.book.numParts} parts</li>
									<li>{clrNum(that.state.book.readCount)} reads</li>
									<li>{clrNum(that.state.book.voteCount)} votes</li>
									<li>{clrNum(that.state.book.commentCount)} comments</li>
								</ul>
							</div>
						  </section>
						  <section className="book-info">
						    <article>
						  	  <h3 className="info-title">Description</h3>
						  	  <p className="m-content">{that.state.book.description}</p>
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
						return(	/*The data-index-number is required for click event to function*/					
							  <div key={book.id} onClick={that.handleClick}  onMouseUp={that.handleDrop} data-index-number={book.id} className="book ui-draggable ui-draggable-handle">
							  	<img className="sm-stock-book" src="/assets/small-book.jpg" />					  	
							    <img className="sm-jacket" data-index-number={book.id} src={book.cover} />						 
							    <div className="lib-check" data-index-number={book.id}><i className="material-icons check">&#xE876;</i></div>
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
							   <div key={book.id} onClick={that.handleClick}  onMouseUp={that.handleDrop} data-index-number={book.id} className="book ui-draggable ui-draggable-handle">
							  	<img className="sm-stock-book" src="/assets/small-book.jpg" />					  	
							    <img className="sm-jacket" data-index-number={book.id} src={book.cover} />						 
							    <div className="lib-check" data-index-number={book.id}><i className="material-icons check">&#xE876;</i></div>
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