import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Select } from 'antd';
import { apiURL } from '../../constants';

const { Option } = Select;

const RealmSelection = (props) => {
  const [status, setStatus] = useState('');
  const [realms, setRealms] = useState([]);

  useEffect(() => {
    console.log('Fetch Realms');
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

  const handleChange = (selected) => {
    const { handleRealmPicked } = props;
    handleRealmPicked(selected);
    setStatus('done');
  };

  return (
    <div className="realmSelection">
      <Divider orientation="left">
        <h3 className={`step ${status}`}>1/ Choose your realm</h3>
      </Divider>
      <div className="select-realm">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Realm"
          optionFilterProp="children"
          onChange={handleChange}
        >
          {realms && realms.map(realm => (
            <Option key={realm.value} value={realm.value}>{realm.label}</Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

RealmSelection.propTypes = { handleRealmPicked: PropTypes.func.isRequired };

export default RealmSelection;
