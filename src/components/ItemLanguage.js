import React from "react";
import { connect } from 'react-redux';
import { setItemLanguage } from '../actions/itemLanguage';
import { Button } from "antd";

class ItemLanguage extends React.Component {

  handleItemLanguageChange = () => {
    if (this.props.itemLanguage === 'en') {
      this.props.dispatch(setItemLanguage('fr'));
    } else {
      this.props.dispatch(setItemLanguage('en'));
    }
  }

  render() {
    return (
      <div className="itemLanguageBtn">
        <Button onClick={() => this.handleItemLanguageChange()} type="dashed">
          Utiliser les noms d'objets {this.props.itemLanguage === 'en' ? 'francais' : 'anglais'}
        </Button>
      </div>
    )
  }
};

const mapStatetoProps = state => {
  return {
    itemLanguage: state.itemLanguage
  }
};

//	More common way to do is to export by default for the HOC and call the function as parameters
export default connect(mapStatetoProps)(ItemLanguage);