import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import { apiURL } from '../../constants';

const RealmSelection = (props) => {

  const [status, setStatus] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [selectedOption, setSelectedOption] = useState({ value: '', label: '' });
  const [realms, setRealms] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/realms`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not found');
        }
        return res.json();
      })
      .then((response) => {
        setRealms(response.map(realm => ({ value: realm.slug, label: realm.name })));
      });
  }, []);

  useEffect(() => {
    const { handleRealmPicked } = props;

    if (selectedOption && realms.find(x => (x.value === selectedOption.value))) {
      const realm = selectedOption;
      setError('');
      handleRealmPicked(realm);
    } else {
      setSelectedOption(null);
      setError('Veuillez selectionner un nom de royaume valide');
    }
  }, [selectedOption]);

  const handleChange = (selected) => {
    setSelectedOption({ value: selected.value, label: selected.label });
  };

  return (
    <div className="realmSelection">
      <Divider orientation="left">
        <h3 className={`step ${status}`}>1/ Choisissez votre royaume</h3>
      </Divider>
      <div className="select-realm">
        <Select
          value={selectedOption}
          onChange={handleChange}
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

RealmSelection.propTypes = { handleRealmPicked: PropTypes.func.isRequired };

export default RealmSelection;
