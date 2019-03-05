import React from 'react';
import RealmSelection from './RealmSelection';
import MainList from './MainList';
import Stats from './Stats';

// TODO Ajouter la selection de language au store puis corrigé celle en place et ajouter a display table

export default class AuctionPriceTrack extends React.Component {
  // State par default pour faciliter les tests
  state = {
    realm: {
      label: 'Arathi',
      value: 'arathi',
    },
    loading: false,
  };

  handleRealmPicked = (realm) => {
    console.log(realm, 'realm');
    this.setState({ realm });
  }

  render() {
    const { loading, realm } = this.state;
    return (
      <div className="main">
        <RealmSelection loading={loading} handleRealmPicked={this.handleRealmPicked} />
        <MainList />
        <Stats realm={realm} />
      </div>
    );
  }
}
