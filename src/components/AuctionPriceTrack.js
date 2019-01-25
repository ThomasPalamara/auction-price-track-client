import React from 'react';
import RealmSelection from './RealmSelection';
import MainList from './MainList';
import Stats from './Stats';
import { apiURL } from '../constants';

// TODO Ajouter la selection de language au store puis corrigé celle en place et ajouter a display table

export default class AuctionPriceTrack extends React.Component {
  state = {
    realm: {
      label: '',
      value: ''
    },
    auctionHouse: null,
    loading: false,
  };
  handleRealmPicked = (realm) => {
    console.log(realm, 'relam');
    this.setState({ realm });
  }

  render() {
    let displayPriceSection;
    if (!this.state.auctionHouse) {
      displayPriceSection = <h3>Veuillez selectionner un serveur</h3>;
    } else {
      displayPriceSection = <Stats auctionHouse={this.state.auctionHouse} />
    }
    return (
      <div className="main">
        <RealmSelection loading={this.state.loading} handleRealmPicked={this.handleRealmPicked} />
        <MainList />
        <Stats realm={this.state.realm} />
        {displayPriceSection}
      </div>
    );
  }
}
