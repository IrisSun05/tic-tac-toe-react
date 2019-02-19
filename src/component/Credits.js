import React, {Component} from 'react'
import { Image, Segment, Header, Grid, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import '../component/Credits.css'
import CharacterName from './CharacterName'
import '../global/index.css'

class Credits extends Component {
    constructor(props){
        super(props)
        this.state = {
            castcreditsLink : []
        }
        
        fetch('http://api.tvmaze.com/people/1/castcredits').then(result => {
            return result.json()
            }).then(data => {
                this.setState({
                    castcreditsLink : data
                })
            }
        )
    }

    render(){

        const items = []
        for (const[index, value] of this.state.castcreditsLink.entries()){
            // fetch href that contains character's name
            items.push(
                <div key={index}>
                        <CharacterName characterLink={this.state.castcreditsLink[index]._links.character.href} />
                </div>
            )
        }
        // Credits content is extracted from given Rest API
        return (
            <div className="ui container ">
            <br />
            <br />
                <Image src="./picture/logo.svg" size='big' centered/>
                <br />
                <Segment basic textAlign='center'>
                    <Header id="whiteHeader"> Credits </Header>
                    <Grid centered columns={3}>
                        <Grid.Column>
                            <Segment inverted textAlign='center' className="greybackground">
                                {items}
                            </Segment>
                        </Grid.Column>
                    </Grid>
                    <br />
                    <Link to={'/'}> <Button size="small" className="default-btn"> Back </Button></Link>
                </Segment> 
            </div>
        )
    }
}

export default Credits;