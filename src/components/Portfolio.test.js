import React from 'react';
import ReactDOM from 'react-dom';
import { PositionCols, PositionRow, AddPositionRow } from './Portfolio.js';
import Portfolio from './Portfolio.js';

it('renders PositionCols', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PositionCols name="test" data_a={["bar", 22]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders PositionRow as header', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PositionRow is_header={true} display_vars={["bar", 22]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders PositionRow as data', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PositionRow display_vars={["bar", "foo"]} data={{bar: 11, foo: 22}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders AddPositionRow', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddPositionRow display_vars={["bar", "foo"]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Portfolio />, div);
  ReactDOM.unmountComponentAtNode(div);
});
