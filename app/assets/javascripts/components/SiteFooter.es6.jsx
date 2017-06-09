var imported = document.createElement('script');
imported.src = '/assets/dragger.js';
document.head.appendChild(imported);



class SiteFooter extends React.Component {

	constructor(){
		super()
		this.state = {
			dragOn: false,
			modalOn: false,
			personalLib: []
		}

		this.handleClick = this.handleClick.bind(this)		
	}


	handleClick(e){
		e.preventDefault()
		this.setState({modalOn: !this.state.modalOn})
	}

	render(){
		that = this
		function footerDisplay(){
			if(that.state.modalOn){
				return(
					<div>
						<Library 
							userLibrary = {that.props.userLibrary}
							/>
						<footer className="footer">
							<button className="lib-btn" onClick={that.handleClick}>My Library</button>
							<a href='http://www.freepik.com/free-vector/white-shelf-background_801442.htm'>shelves designed by Freepik</a>
							<a href='http://www.freepik.com/free-vector/realistic-book-template-in-front-side_764449.htm'>book template designed by Freepik</a>
						</footer>
					</div>
				)
			}else{
				return(
					<footer className="footer">
						<button className="lib-btn" onClick={that.handleClick}>My Library</button>
						<a href='http://www.freepik.com/free-vector/white-shelf-background_801442.htm'>shelves designed by Freepik</a>
						<a href='http://www.freepik.com/free-vector/realistic-book-template-in-front-side_764449.htm'>book template designed by Freepik</a>
					</footer>
				)
			}
		}


		return(
			<div>
				<div className="book-slots" >
					<div className="book-slot">
						<div className="add">
							<p>Drop Book in My Library</p> 
							<i className="material-icons md-48 get-app ">&#xE884;</i>
						</div>
						<div className="added">
							<p>Book Added to My Library</p>
							<i className="material-icons  md-48 thumb-up">&#xE876;</i>
						</div>

					</div>
					
				</div>
				{footerDisplay()}
			</div>
		)
	}
}


