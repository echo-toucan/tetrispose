import React from 'react'
import {connect} from 'react-redux'
import {Dimmer, Segment, Header, Icon} from 'semantic-ui-react'
import {colors} from '../store/utility/AllShapes'

const GridPlaceholder = ({gameBoard}) => {
  return (
    <div>
      <Dimmer.Dimmable as={Segment} dimmed>
        <table className="game-table">
          <tbody>
            {gameBoard.map((row, rowIdx) => {
              return (
                <tr key={rowIdx} className="game-row">
                  {row.map((cell, cellIdx) => {
                    return (
                      <td
                        key={cellIdx}
                        style={{backgroundColor: colors[cell % 10]}}
                        className="game-cell"
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <Dimmer active>
          <Header as="h1" color="green">
            <Icon name="game" />
            Click 'Start Game'!
          </Header>
        </Dimmer>
      </Dimmer.Dimmable>
    </div>
  )
}

const mapStateToProps = state => ({
  gameBoard: state.gameBoard
})

export default connect(mapStateToProps)(GridPlaceholder)
