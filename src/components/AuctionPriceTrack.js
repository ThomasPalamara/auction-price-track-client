import React from 'react';
import RealmSelection from './RealmSelection';
import MainList from './MainList';
import DisplayStats from './DisplayStats';
import { Divider } from 'antd';

// TODO Ajouter la selection de language au store puis corrigé celle en place et ajouter a display table

export default class AuctionPriceTrack extends React.Component {
  state = {
    realm : 'Ysondre',
    auctionHouse: null,
    loading: false,
  };
  handleRealmPicked = (realm) => {
    this.setState({ realm });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.realm && prevState.realm !== this.state.realm) {
      console.log('Fetching');
      this.setState({ loading: true });
      fetch(`/api/auctions/${this.state.realm}`)
        .then(res => res.json())
        .then(response => {
          this.setState({ loading: false });
          response.map((item) => {
            return item.auctions[0].prices.sort(function (a, b) { return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0); });
          })
          return this.setState({ auctionHouse: response })
        }
      );
    }
  }

    render() {
    let displayPriceSection;
    if(!this.state.auctionHouse){
      displayPriceSection = <h3>Veuillez selectionner un serveur</h3>;
    }else{
      displayPriceSection = <DisplayStats auctionHouse={this.state.auctionHouse}/>
    }
    return (
      <div className="main">
        <RealmSelection loading={this.state.loading} handleRealmPicked={this.handleRealmPicked}/>
        <Divider/>
        <MainList/>
        <Divider/>
        {displayPriceSection}
      </div>
    );
  }
}
