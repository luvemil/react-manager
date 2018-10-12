import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Container from 'react-bootstrap/lib/Container';
import Form from 'react-bootstrap/lib/Form';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import './Portfolio.css';

import getQuote from '../utils/Quotes.js';

function PositionRow(props) {
  let cols;
  if (props.is_header) {
    cols = props.display_vars.map((x,i) => <Col key={`col-header-${i}`}>{x}</Col>);
  } else {
    let data_a = props.display_vars.map((x) => {
      if (x === 'value') {
        return props.data['price'] * props.data['qty'];
      } else {
        return props.data[x];
      }
    });
    cols = data_a.map((x,i) => <Col key={`col-${props.name}-${i}`}>{x}</Col>);
  }

  return (
    <Row>
      { cols }
    </Row>
  );
}

function AddPositionRow(props) {
  // Check
  // - https://stackoverflow.com/questions/38511906/handle-change-of-formcontrol-react
  // - https://itnext.io/easy-form-handling-in-react-be5490a1284
  // - https://blog.logrocket.com/an-imperative-guide-to-forms-in-react-927d9670170a
  // to see how to control form values.
  let cols = props.display_vars.map((x,i) => {
    if ( i === props.display_vars.length - 1 ) {
      return (
        <Col key={`${i}`}>
          <InputGroup>
            <Form.Control name={x} />
            <InputGroup.Append>
              <Button variant="primary" type="submit">+</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      )
    } else {
      return <Col key={i}><Form.Control name={x} value={props.new_vals[x]} onChange={props.change_callback} /></Col>
    }
  });
  return (
    <Form onSubmit={props.submit_callback}>
      <Form.Row>
        { cols }
      </Form.Row>
    </Form>
  );
}

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_vars: ['name','exchange','qty','price','value'],
      user_defined_vars: ['name','exchange','qty','price'],
      data: [
        { name: "BTC", exchange: 'bitfinex', qty: 1.4, price: 5000, id:1 },
        { name: "BTC", exchange: 'not that great', qty: 1.4, price: 5000, id:2 },
        { name: "ETH", exchange: 'not that great', qty: 12, price: 100, id:3 },
        { name: "USD", exchange: 'my pockets', qty: 2000, price: 1, id:4},
      ],
      new_position: { name: "", exchange: "", qty: "", id:5 },
    };
  }

  handleChange(e) {
    this.setState({ new_position: {...this.state.new_position, [e.target.name]: e.target.value } })
  }

  handleSubmit(e) {
    e.preventDefault();
    const new_position = {...this.state.new_position};
    this.setState({ data: [...this.state.data, new_position], new_position: {name: "", exchange: "", qty: "", id: new_position.id + 1} })
  }

  changeExistingData(new_row) {
    let data = [ ...this.state.data.filter(row => row.id !== new_row.id), new_row ];
    this.setState({ data: data.sort((a,b) => a.id - b.id)});
  }

  componentDidMount() {
    // Ensure we don't edit the state variable, maybe this is an overkill since we use map afterwards...
    const data = this.state.data.slice(0);
    data.map((row) => {
      getQuote(row)
        .then((price) => {
          let new_row = {...row, price: price};
          return new_row;
        })
        .then((new_row) => {
          this.changeExistingData(new_row);
          return new_row;
        })
      ;
    })
  }

  render() {
    const rows = this.state.data.map((x,i) => <PositionRow key={`row-${i}`} display_vars={this.state.display_vars} data={x} />);
    return (
      <div className="Portfolio">
        <Container>
          <PositionRow is_header={true} display_vars={this.state.display_vars} />
          { rows }
          <AddPositionRow
            display_vars={this.state.display_vars}
            new_vals={this.state.new_position}
            submit_callback={e => this.handleSubmit(e)}
            change_callback={e => this.handleChange(e)}
          />
        </Container>
      </div>
    );
  }
}

export { PositionRow, AddPositionRow };
export default Portfolio;
