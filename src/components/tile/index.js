import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './styles.scss';

class Tile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isError } = nextProps;
    this.setState({ isError });
  }

  componentDidUpdate() {
    if (this.state.isError) {
      // drop the isError after an animation
      setTimeout(() => this.setState({ isError: false }), 350);
    }
  }

  render() {
    const { isSet, isWater, onClick } = this.props;

    let bgClassName = styles.bg;

    if (isSet) {
      bgClassName = styles.bgBlack;
    }

    if (isWater) {
      bgClassName = styles.bgBlue;
    }

    return (
      <div className={styles.tile} onClick={onClick}>
        <div className={bgClassName} />
        {this.state.isError && (
          <div className={styles.error} />
        )}
      </div>
    )
  }
}

Tile.proprTypes = {
  isSet: PropTypes.bool,
  isWater: PropTypes.bool,
  isError: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Tile.defaultProps = {
  onClick: _.noop,
};

export default Tile;