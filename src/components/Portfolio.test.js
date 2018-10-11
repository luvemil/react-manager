import React from 'react';
import ReactDOM from 'react-dom';
import { PositionCols, PositionRow } from './Portfolio.js';
import Portfolio from './Portfolio.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PositionCols name="test" data_a={["bar", 22]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PositionRow is_header={true} display_var={["bar", 22]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PositionRow display_var={["bar", "foo"]} data={{bar: 11, foo: 22}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Portfolio />, div);
  ReactDOM.unmountComponentAtNode(div);
});
