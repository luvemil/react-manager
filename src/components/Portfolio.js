import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Container from 'react-bootstrap/lib/Container';
import Form from 'react-bootstrap/lib/Form';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import './Portfolio.css';

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
            <Form.Control />
            <InputGroup.Append>
              <Button variant="primary" type="submit">+</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      )
    } else {
      return <Col key={i} name={x} ><Form.Control /></Col>
    }
  });
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Row>
        { cols }
      </Form.Row>
    </Form>
  );
}

function PositionCols(props) {
  return props.data_a.map((k,i) => <Col key={`col-${props.name}-${i}`} className="position-col">{k}</Col>)
}

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_vars: ['name','exchange','qty','price','value'],
      user_defined_vars: ['name','exchange','qty','price'],
      data: [
        { name: "BTC", exchange: 'best crypto traders', qty: 1.4, price: 5000 },
        { name: "BTC", exchange: 'not that great', qty: 1.4, price: 5000 },
        { name: "ETH", exchange: 'not that great', qty: 12, price: 100 },
        { name: "USD", exchange: 'my pockets', qty: 2000, price: 1},
      ],
      new_position: { name: "", exchange: "", qty: "" },
    }
  }

  handleChange(e) {
    this.setState({ event.target.name: event.target.value });
  }

  onSubmit(e) {
    alert(this.state.new_position.name);
  }

  render() {
    const rows = this.state.data.map((x,i) => <PositionRow key={`row-${i}`} display_vars={this.state.display_vars} data={x} />);
    return (
      <div className="Portfolio">
        <Container>
          <PositionRow is_header={true} display_vars={this.state.display_vars} />
          { rows }
          <AddPositionRow display_vars={this.state.display_vars} onSubmit={(e) => this.onSubmit(e)} onChange={event => this.handleChange(event)} />
        </Container>
      </div>
    );
  }
}

export { PositionCols, PositionRow, AddPositionRow };
export default Portfolio;
