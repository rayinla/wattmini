class SearchContainer extends React.Component {

	constructor(){
		super()	
		this.handleSearch = this.handleSearch.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	//TODO: restyle form to deprecate this function	
	handleSubmit(e){
   		e.preventDefault()
	}

	handleSearch(e){
		e.preventDefault()
		this.props.onChangeSearchTerm(e.target.value)
	}	

	render(){
		return(
			<div className="hero">
				<form className="srch-form" onSubmit={this.handleSubmit}>
				<input className="search" onChange={this.handleSearch} type="search" placeholder={this.props.searchTerm + " " + this.props.friendlyCat}  />
				<button className="srch-btn"><i className="material-icons srch-ico md-36">&#xE8B6;</i></button>
				</form>
			</div>
		)
	}
}