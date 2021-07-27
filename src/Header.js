import React, { Component } from 'react';
import './Header.css'

class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			color: "header-army-green"
		}
	}

	componentDidUpdate(prevProps) {
		if(this.props.color !== prevProps.color) {
			this.setState({color: `header-${this.props.color}`})
		}
	}

	render() {
  		return (
    		<header className={this.state.color}>War</header>
		)
	};
}

export default Header;