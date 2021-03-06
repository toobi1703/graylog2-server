import PropTypes from 'prop-types';
import React from 'react';

import { Row, Col } from 'components/graylog';
import { Input } from 'components/bootstrap';

import GrokPatternFilter from './GrokPatternFilter';

class GrokPatternInput extends React.Component {
  static propTypes = {
    pattern: PropTypes.string,
    patterns: PropTypes.array,
    onPatternChange: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    pattern: '',
    patterns: [],
    onPatternChange: () => {},
    className: '',
  };

  shownListItems = [];

  _onPatternChange = (e) => {
    const { onPatternChange } = this.props;

    onPatternChange(e.target.value);
  };

  _addToPattern = (name) => {
    const { pattern, onPatternChange } = this.props;
    const index = this.patternInput.getInputDOMNode().selectionStart || pattern.length;
    const newPattern = `${pattern.slice(0, index)}%{${name}}${pattern.slice(index)}`;

    onPatternChange(newPattern);
  };

  render() {
    const { className, patterns, pattern } = this.props;

    this.shownListItems = [];

    return (
      <Row className={className}>
        <Col sm={8}>
          <Input ref={(node) => { this.patternInput = node; }}
                 type="textarea"
                 id="pattern-input"
                 label="Pattern"
                 help="The pattern which will match the log line e.g: '%{IP:client}' or '.*?'"
                 rows={9}
                 onChange={this._onPatternChange}
                 value={pattern}
                 required />
        </Col>
        <Col sm={4}>
          <GrokPatternFilter addToPattern={this._addToPattern} patterns={patterns} />
        </Col>
      </Row>
    );
  }
}

export default GrokPatternInput;
