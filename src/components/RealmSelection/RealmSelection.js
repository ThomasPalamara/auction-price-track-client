import React from 'react';
import Select from 'react-select';
import { Button, Divider } from 'antd';
import { apiURL } from '../../constants';

export default class realmSelection extends React.Component {
  state = {
    status: undefined,
    error: undefined,
    selectedOption: { value: "", label: "" },
    realms: [],
  };

  componentDidMount() {
    fetch(`${apiURL}/realms`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Not found");
        }
        return res.json();
      })
      .then(response => {
        let realms = response.map(realm => ({ value: realm.slug, label: realm.name }));
        this.setState({ realms: realms });
      });
  }


  handleChange = (selected) => {
    this.setState({
      selectedOption: {
        value: selected.value,
        label: selected.label
      }
    }, function () {
      if (this.state.selectedOption && this.state.realms.find(x => {return x.value === this.state.selectedOption.value })) {
        const realm = this.state.selectedOption.label;
        this.setState({ error: '' });
        this.props.handleRealmPicked(realm);
      } else {
        this.setState({ selectedOption: null });
        this.setState({ error: 'Veuillez selectionner un nom de royaume valide' });
      }
    });
  }

  render() {
    return (
      <div className="realmSelection">
        <Divider orientation="left"> <h3 className={`step ${this.state.status}`}>1/ Choisissez votre royaume</h3> </Divider>
        <div className="select-realm">
          <Select
            value={this.state.selectedOption}
            onChange={this.handleChange}
            name="realm"
            isClearable={true}
            isSearchable={true}
            options={this.state.realms.map(realm => realm)}
          />
          {this.state.error && <label className="error">{this.state.error}</label>}
        </div>
      </div>
    );
  }
}
