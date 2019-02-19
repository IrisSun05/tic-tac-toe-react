import React, {Component} from 'react'
import { Image, Button, Icon, Segment, Modal, Header } from 'semantic-ui-react'
import '../component/Home.css'
import LoginPanel from './LoginPanel';
import {Redirect} from 'react-router-dom';
import '../global/index.css'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            renderCredits: false
        }
    }

    show = size => () => {
        this.setState({size, open : true})
    }

    close = () => {
        this.setState({open:false})
    }

    // set state to initialize credits page rendering
    goToCredits = () => {
        this.setState({renderCredits:true})
    }

    render(){
        const {renderCredits} = this.state;
        const { open, size } = this.state;

        if(renderCredits){
            return(
                <Redirect to='/Credits'/>
            )
        }

        return (
            <div className="ui container ">
            <br />
            <br />
                <Image src="./picture/logo.svg" size='big' centered/>
                <br />
                <Segment basic textAlign='center'>
                {/* new game button */}
                <Modal dimmer = 'blurring' trigger={
                    <Button size = 'large'  color = 'teal' className="default-btn" onClick={this.show('mini')}>New Game</Button>
                } size={size} open={open} onClose={this.close}>
                    
                    <Modal.Description>
                        <Modal.Header className="whiteHeader">Start a New Game</Modal.Header>
                            <Modal.Content>
                                <LoginPanel/>
                            </Modal.Content>
                    </Modal.Description>
                </Modal>
                <div className="divider"></div>
                {/* credit button */}
                <Button size = 'large'  color = 'teal' className="default-btn" onClick={this.goToCredits}>Credit</Button>
                <div className="divider"></div>
                {/* exit button */}
                <a href="https://www.seedbox.com/en/">
                <Button icon size = 'large'  color = 'teal' className="default-btn">Exit <Icon name='sign-out' /></Button>
                </a>
                </Segment>
            </div>
        )
    }
}

export default Home;