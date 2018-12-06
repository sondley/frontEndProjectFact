import React, { Component } from 'react';
import { Button, Icon, Table, Pagination, Grid } from 'semantic-ui-react';
import lodash from 'lodash';


class CustomTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: null,
      data: this.props.data,
      direction: null,
    }
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      return this.setState({
        column: clickedColumn,
        data: lodash.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      });
    }

    return this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  }

  renderTableRows = (data) => {
    const rows = data.map((item, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{item.dummy}</Table.Cell>
          <Table.Cell>{item.dummy}</Table.Cell>
          <Table.Cell>{item.dummy}</Table.Cell>
          <Table.Cell>{item.dummy}</Table.Cell>
          <Table.Cell>{item.dummy}</Table.Cell>
          <Table.Cell>{item.dummy}</Table.Cell>
          <Table.Cell>{item.dummy}</Table.Cell>
          <Table.Cell collapsing>
            <div className="cellSpacing">
              <Button icon="edit" color="blue" />
              <Button icon="trash" color="red" />
            </div>
          </Table.Cell>
        </Table.Row>
      );
    });
    return rows;
  }

  render() {
    const { column, data, direction } = this.state;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column floated="right" className="rightAligned">
              <Button icon labelPosition='left' positive size='large'>
                <Icon name='add user' /> Agregar Dummy
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <Table compact celled striped sortable size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'dummy' ? direction : null}
                onClick={this.handleSort('dummy')}
              >
                DummyData
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'dummy' ? direction : null}
                onClick={this.handleSort('dummy')}
              >
                DummyData
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'dummy' ? direction : null}
                onClick={this.handleSort('dummy')}
              >
                DummyData
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'dummy' ? direction : null}
                onClick={this.handleSort('dummy')}
              >
                DummyData
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'dummy' ? direction : null}
                onClick={this.handleSort('dummy')}
              >
                DummyData
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'dummy' ? direction : null}
                onClick={this.handleSort('dummy')}
              >
                DummyData
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'dummy' ? direction : null}
                onClick={this.handleSort('dummy')}
              >
                DummyData
              </Table.HeaderCell>
              <Table.HeaderCell>
                Acciones
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderTableRows(data)}
          </Table.Body>
        </Table>
        <Pagination

          defaultActivePage={1}
          ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
          firstItem={{ content: <Icon name='angle double left' />, icon: true }}
          lastItem={{ content: <Icon name='angle double right' />, icon: true }}
          prevItem={{ content: <Icon name='angle left' />, icon: true }}
          nextItem={{ content: <Icon name='angle right' />, icon: true }}
          totalPages={1}
        />
      </div>
    );
  }
}

export default CustomTable;