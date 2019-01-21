import React from 'react';
import Select from 'react-select';
import { Button, Divider } from 'antd';
import { apiURL } from '../../constants';

export default class realmSelection extends React.Component {
  state = {
    status: undefined,
    error: undefined,
    selectedOption: {},
    realms: [],
  };

  componentDidMount() {
    console.log(`${apiURL}/realms`);
    fetch(`${apiURL}/realms`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Not found");
        }
        return res.json() //TODO See why this is here
      })
      .then(response => {
        console.log(response);
        let realms = response.map( realm => ( {value: realm.slug, label: realm.name} ));
        this.setState({ realms: realms });
      });
  }


  handleChange = (selectedOption) => {
    console.log('selected optio', selectedOption);
    var stateSelectedOption = this.state.selectedOption;
    stateSelectedOption = selectedOption;
    console.log(stateSelectedOption);
    this.setState({selectedOption: stateSelectedOption});
    console.log(this.state);
    if (this.state.selectedOption && this.state.realms.find(x => { console.log(x, this.state.selectedOption); return x.value === this.state.selectedOption.value})) {
      const realm = this.state.selectedOption.label;
      this.setState({ error: '' });
      this.setState({ status: 'done' });
      this.props.handleRealmPicked(realm);
    } else {
      this.setState({ selectedOption: null });
      this.setState({ error: 'Veuillez selectionner un nom de royaume valide' });
    }
  }

  render() {
    console.log(this.state.realms);
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
            {this.state.error && <label className="error">{this.state.error}</label> }
          </div>
        
      </div>
    );
  }
}

          //<Select options={this.state.response.map(e => e.name)}/>

          // <AutoComplete
          //   items = {this.state.response}
          //   shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
          //   getItemValue={item => item.name}
          //   renderItem={(item, highlighted) =>
          //     <div
          //       key={item.slug}
          //       style={{ backgroundColor: highlighted ? '#eee' : 'transparent', textAlign: 'left', paddingLeft: '5px', fontSize: '15px'}}
          //     >
          //       {item.name}
          //     </div>
          //   }
          //   value={this.state.value}
          //   onChange={e => this.setState({ value: e.target.value })}
          //   onSelect={value => this.setState({ value })}
          // />