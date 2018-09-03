import React from 'react';
import Select from 'react-select';
import { Button } from 'antd';
import config from '../config';

export default class realmSelection extends React.Component {
  state = {
    status: undefined,
    error: undefined,
    selectedOption: {},
    response: [],
    realm: '',
  };

  componentDidMount() {
    fetch(`${config.serverUrl}/api/realms`)
    .then(res => res.json())
    .then(response => this.setState({ response: response}));
  }

  handleRealmPicked = e => {
    e.preventDefault();
    if(this.state.selectedOption && this.state.response.find(x => x.label === this.state.selectedOption.label) ){
    const realm = this.state.selectedOption.label;
      this.setState({status: 'done'})
      this.props.handleRealmPicked(realm)
    }else{
      this.setState({selectedOption: null})
      this.setState({error: 'Veuillez selectionner un nom de royaume valide'})
    }

    
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    return (
      <div className="realmSelection">
      <h2 className={`step ${this.state.status}`}>1/ Choisissez votre royaume</h2>
        <form onSubmit={this.handleRealmPicked}>
        <div className="select-realm">
        <Select
          value={this.state.selectedOption}
          onChange={this.handleChange}
          name="realm"
          options={this.state.response}
        />
        </div>
        <Button id="chooseRealmBtn" htmlType="submit" className="btn btn-large" loading={this.props.loading} onClick={this.enterLoading}>
          Go !
        </Button>
        </form>
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