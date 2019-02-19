import React, {Component} from 'react'
import {Segment, Form, Input, Grid, Button} from 'semantic-ui-react'
import '../component/LoginPanel.css'
import {Link} from 'react-router-dom';
import '../global/index.css'

class LoginPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            userNameOne: "",
            userNameTwo: "",
            error_msg: "",
        }
    }

    // set username for player 1
    setUserOne = (evt,{value}) => {
        this.setState({userNameOne : value, error_msg : null})
    }

    // set username for player 2
    setUserTwo = (evt,{value}) => {
        this.setState({userNameTwo : value, error_msg : null})
    }

    // Link to game page if both usernames are filled
    formSubmit = () => {
        if (this.state.userNameOne === "" || this.state.userNameTwo === "" ) {
            return ("Start!")
        } else {
            return (
            <Link to={{pathname:'/Game/'+ this.state.userNameOne+"&"+this.state.userNameTwo,
            state: {userNameOne : this.state.userNameOne, userNameTwo:this.state.userNameTwo}}}>
                <div fluid color='teal' id="whiteFont">Start!</div>
            </Link>)
           }
    }

    // show warning message if at lease one username is missing
    handleClick = () => {
        if (this.state.userNameOne === "" || this.state.userNameTwo === "") {
            let msg = (              
            <div>
                <label className="warning">*Please fill all fields</label>
            </div>)
            this.setState({error_msg : msg})
        } else {
            this.setState({error_msg : null})
        }
    }

    // render login panel
    render(){
        return (
            <div>
            <Segment basic textAlign='center'>
              <Form className="darkBackground">
                  <Grid>
                      <Grid.Row centered columns={1}>    
                            <Form>
                                <Form.Field inline>
                                  <label id="whiteFont">Player 1</label>
                                    <Input width='5'
                                        name='userNameOne'
                                        onChange={this.setUserOne}
                                        value={this.state.userNameOne}  
                                        />
                                </Form.Field>
                            </Form>
                      </Grid.Row>
                      <Grid.Row centered columns={1}>
                          <Form>
                                <Form.Field inline >
                                  <label id="whiteFont">Player 2</label>
                                    <Input width='5'
                                        name='userNameTwo'
                                        onChange={this.setUserTwo}
                                        value={this.state.userNameTwo} 
                                        />
                                </Form.Field>
                            </Form>
                      </Grid.Row>
                      {this.state.error_msg}
                      <Grid.Row centered >
                        <Button size="small" content={this.formSubmit()} onClick={this.handleClick} className="default-btn" />
                      </Grid.Row>
                      <br/><br/><br/><br/><br/>
                  </Grid >
              </Form>
              </Segment>
        </div>
        )
    }
}

export default LoginPanel;