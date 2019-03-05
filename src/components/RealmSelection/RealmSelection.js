import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import { apiURL } from '../../constants';

export default class RealmSelection extends React.Component {
  state = {
    status: undefined,
    error: undefined,
    selectedOption: { value: '', label: '' },
    realms: [],
  };

  componentDidMount() {
    fetch(`${apiURL}/realms`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not found');
        }
        return res.json();
      })
      .then((response) => {
        const realms = response.map(realm => ({ value: realm.slug, label: realm.name }));
        this.setState({ realms });
      });
  }


  handleChange = (selected) => {
    const { selectedOption, realms } = this.state;
    const { handleRealmPicked } = this.props;

    this.setState({
      selectedOption: {
        value: selected.value,
        label: selected.label,
      },
    }, () => {
      if (selectedOption && realms.find(x => (x.value === selectedOption.value))) {
        const realm = selectedOption;
        this.setState({ error: '' });
        handleRealmPicked(realm);
      } else {
        this.setState({ selectedOption: null });
        this.setState({ error: 'Veuillez selectionner un nom de royaume valide' });
      }
    });
  }

  render() {
    const { selectedOption, status, realms, error } = this.state;
    return (
      <div className="realmSelection">
        <Divider orientation="left">
          <h3 className={`step ${status}`}>1/ Choisissez votre royaume</h3>
        </Divider>
        <div className="select-realm">
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            name="realm"
            isClearable
            isSearchable
            options={realms.map(realm => realm)}
          />
          {error && <span className="error">{error}</span>}
        </div>
      </div>
    );
  }
}

RealmSelection.propTypes = { handleRealmPicked: PropTypes.func.isRequired };
