import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset, click, run } from 'redux/actions/tiles';
import Button from 'components/button';
import Tile from 'components/tile';
import styles from './styles.scss';

export const Field = ({ tiles, onReset, onClick, onRun }) => {
  if (tiles.length < 1 || tiles[0].length < 1) {
    return null;
  }

  const cols = tiles.length;
  const rows = tiles[0].length;

  return (
    <div className={styles.field}>
      <div className={styles.wrapper} style={{ paddingBottom: `${rows * 100 / cols}%` }}>
        <div className={styles.content}>
          {tiles.map((col, x) => (
            <div
              key={x}
              className={styles.col}
            >
              {col.map((row, y) => (
                <div
                  key={`${x}-${y}`}
                  className={styles.row}
                >
                  <Tile {...row} onClick={() => onClick(x, y)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.buttonsPadding} />
        <Button className={styles.button} onClick={onReset}>
          RESET
        </Button>
        <div className={styles.buttonsSpacing} />
        <Button className={styles.button} accent onClick={onRun}>
          RUN
        </Button>
        <div className={styles.buttonsPadding} />
      </div>
    </div>
  );
};

Field.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  onReset: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onRun: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tiles: state.tiles,
});

const mapActionsToProps = {
  onReset: reset,
  onClick: click,
  onRun: run,
};

export default connect(mapStateToProps, mapActionsToProps)(Field);
