import React, {Component} from 'react'
import {Grid, Button, Image, Modal} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import GameBoard from './GameBoard'
import '../component/Game.css'
import '../global/index.css'

class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            userNameOne : this.props.location.state.userNameOne, 
            userNameTwo: this.props.location.state.userNameTwo,
            // play history
            record: [
                {boxes: Array(9).fill(null)}
              ],
            // current step
            step: 0,
            // who is next turn
            nextTurn: true,
            open: true,
        }
    }

    // quit game
    quit = () => {this.setState({ open: false })}
    
    // reset states and restart game
    restart = () => {
        this.setState({ open: false });
        this.goToState(0);
    }

    // update states and check end game condition when after one step
    handleClick = (i) => {
        const record = this.state.record.slice(0, this.state.step + 1);
        const current = record[record.length - 1];
        const boxes = current.boxes.slice();
        if (boxes[i]) {
          return;
        }
        boxes[i] = this.state.nextTurn ? "X" : "O";
        this.setState({
          record: record.concat([
            {boxes: boxes}
          ]),
          step: record.length,
          nextTurn: !this.state.nextTurn
        });
    }

    // jump to certain step
    goToState = (step) => {
        this.setState({
          step: step,
          nextTurn: (step % 2) === 0,
          open: true
        });
    }

    // highlight player
    setHighlight = (player) => {
        if (this.state.nextTurn && player === "X") {
            return 'highlight'
        } else if (!this.state.nextTurn && player === "O") {
            return 'highlight'
        } else {
            return null
        }
    }

    // check if there is a winner
    checkWinner = (boxes) => {
        // all possibilities to win
        const lines = [
        [0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 1, 2],
        [3, 4, 5],[6, 7, 8],[0, 4, 8],[2, 4, 6]];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (boxes[a] && boxes[a] === boxes[b] && boxes[b] === boxes[c]) {
                return boxes[a];
            }
        }
        return null;
    }

    render(){
        const open= this.state
        const record = this.state.record;
        const current = record[this.state.step];
        const win = this.checkWinner(current.boxes);
        var repeat = false;

        if (this.state.step === 9) {
            repeat = true
        }

        // set popup panel if win or draw
        let popupPanel;
        if (win || repeat) {
            let msg = "";
            if (win === 'X') {
                msg = (<Modal.Header className="whiteFont">Victory to Player 1!</Modal.Header>)
            } else if (win === 'O') {
                msg = (<Modal.Header className="whiteFont">Victory to Player 2!</Modal.Header>)
            } else {
                msg = (<Modal.Header className="whiteFont">Draw! One More Game?</Modal.Header>)
            }
            popupPanel = ( 
            <Modal open={open}
                size='mini'
                dimmer = 'blurring'
                className="darkBackground textcenter"
                >
                <Modal.Description>
                    <br /> <br />
                    {msg}
                    <br />
                    <Modal.Content>
                        <Image src="../picture/victory-icon.svg" className="victory-icon"/>
                    </Modal.Content>
                    <br />
                    <Modal.Actions centered>
                        <Button size = 'small' className = "default-btn" onClick={this.restart}>
                            Restart
                        </Button>
                        <div className="divider" />
                        <Link to={'/'}>
                            <Button size = 'small' className = "default-btn" onClick={this.quit}>
                                Quit     
                            </Button>
                        </Link>
                    </Modal.Actions>
                    <br /><br />
                </Modal.Description>
            </Modal>)
        }

        // render game page
        return (
            <div className="ui container">
            <br/>
                    <Grid columns={4} divided >
                    
                    <Grid.Row verticalAlign='middle'>
                    <Grid.Column></Grid.Column>
                        <Grid.Column>
                        <Image src="../picture/logo.svg" size='medium' floated='right' />
                        </Grid.Column>

                        <Grid.Column centered>
                            <Grid.Row className='whiteFont' textAlign='left'>
                                <label className={this.setHighlight('X')}>Player 1  </label>
                                <input 
                                type = "text"
                                className = "player-input-game"
                                name="player-one"
                                value={this.state.userNameOne}
                                disabled />
                            </Grid.Row>
                            <div className="divider"></div>
                            <Grid.Row className='whiteFont' textAlign='left'>
                                <label className={this.setHighlight('O')}>Player 2  </label>
                                <input 
                                type = "text"
                                className = "player-input-game"
                                name="player-two"
                                value={this.state.userNameTwo}
                                disabled />
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column></Grid.Column>
                    </Grid.Row>
                    </Grid>
                    <Grid columns={1} centered>
                        <div className="game-board">
                            <GameBoard
                                boxes={current.boxes}
                                onClick={i => this.handleClick(i)} />
                        </div>
                        <br/><br/><br/>
                    </Grid>
                    <div>{popupPanel}</div>
            </div>
        )
    }
}

export default Game;