import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { setItemLanguage } from '../actions/itemLanguage';

class ItemLanguage extends React.Component {
  handleItemLanguageChange = () => {
    const { itemLanguage, dispatch } = this.props;
    if (itemLanguage === 'en') {
      dispatch(setItemLanguage('fr'));
    } else {
      dispatch(setItemLanguage('en'));
    }
  }

  render() {
    const { itemLanguage } = this.props;
    return (
      <div className="itemLanguageBtn">
        <Button onClick={() => this.handleItemLanguageChange()} type="dashed">
          {`Use ${itemLanguage === 'en' ? 'french' : 'english'} items names`}
        </Button>
      </div>
    );
  }
}

ItemLanguage.propTypes = { itemLanguage: PropTypes.string, dispatch: PropTypes.func.isRequired };

ItemLanguage.defaultProps = { itemLanguage: 'en' };

const mapStatetoProps = state => ({ itemLanguage: state.itemLanguage });

export default connect(mapStatetoProps)(ItemLanguage);
