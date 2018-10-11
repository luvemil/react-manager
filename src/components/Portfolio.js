import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Container from 'react-bootstrap/lib/Container';
import './Portfolio.css';


function PositionRow(props) {
  let cols, data_a;
  if (props.is_header) {
    cols = <PositionCols name="header" data_a={props.display_var} />;
  } else {
    data_a = props.display_var.map((x) => {
      if (x == 'value') {
        return props.data['price'] * props.data['qty'];
      } else {
        return props.data[x];
      }
    });
    cols = <PositionCols name={props.data.name} data_a={data_a} />;
  }

  return (
    <Row>
      { cols }
    </Row>
  );
}

function PositionCols(props) {
  return props.data_a.map((k,i) => <Col key={`col-${props.name}-${i}`} className="position-col">{k}</Col>)
}

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_var: ['name','exchange','qty','price','value'],
      data: [
        { name: "BTC", exchange: 'best crypto traders', qty: 1.4, price: 5000 },
        { name: "BTC", exchange: 'not that great', qty: 1.4, price: 5000 },
        { name: "ETH", exchange: 'not that great', qty: 12, price: 100 },
        { name: "USD", exchange: 'my pockets', qty: 2000, price: 1},
      ],
    }
  }

  render() {
    const rows = this.state.data.map((x,i) => <PositionRow key={`row-${i}`} display_var={this.state.display_var} data={x} />);
    return (
      <div className="Portfolio">
        <Container>
          <PositionRow is_header={true} display_var={this.state.display_var} />
          { rows }
        </Container>
      </div>
    );
  }
}

export { PositionCols, PositionRow };
export default Portfolio;
