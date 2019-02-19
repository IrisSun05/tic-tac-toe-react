import React, {Component} from 'react';

class CharacterName extends Component{
    constructor(props){
        super(props)
        this.state = {
            content : []
        }
    }

    // fetch character name
    componentDidMount(){
        if (this.props.characterLink != null) {
            fetch(this.props.characterLink).then(result => {
                return result.json()
                }).then(data => {
                    this.setState({
                        content : data
                    })
                }
            )
        }
    }
    
    render(){
        if(this.state.content == null){
            return (<div>fetching</div>);
        } else {
            return (
            <div>
                {this.state.content.name}
            </div>
            )
        }
    }
}

export default CharacterName;