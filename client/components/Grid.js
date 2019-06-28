import React, {Component} from 'react'
import GridRow from './GridRow'
import {Table} from 'semantic-ui-react'

const gridRow = new Array(10).fill(0)
const grid = new Array(20).fill(gridRow)

export default class Grid extends Component {
  render() {
    return (
      <div>
        <Table>
          {grid.map((row, rowIdx) => {
            return (
              <Table.Row key={rowIdx}>
                {row.map((cell, cellIdx) => {
                  return <Table.Cell key={cellIdx}>{cell}</Table.Cell>
                })}
              </Table.Row>
            )
          })}
        </Table>
      </div>
    )
  }
}
