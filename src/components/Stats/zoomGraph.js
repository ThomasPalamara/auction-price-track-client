import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import CustomTooltip from "./CustomTooltip"
import PriceCoinDisplay from "components/PriceCoinDisplay"


const initialState = {
  data: [],
  left : 'dataMin',
  right : 'dataMax',
  refAreaLeft : '',
  refAreaRight : '',
  top : 'dataMax',
  bottom : 'dataMin-1',
  animation : true
};

// const priceFormatter = (value) => <PriceCoinDisplay price={value}/>;

const priceFormatter = (value) => {
  value = value.toString();
  return value.slice(0,-4).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0') + '.' + value.slice(-4,-2);
};

class ZoomGraph extends React.Component {

	constructor(props) {
    super(props);
    this.state = initialState;
  }

  getAxisYDomain = (from, to, ref, offset) => {
    const fromPos = this.state.data.map(e => e.timestamp).indexOf(from);
    const toPos = this.state.data.map(e => e.timestamp).indexOf(to);
    // const refData = this.state.data.slice(from-1, to);
    const refData = this.state.data.slice(fromPos, toPos);
    let [ bottom, top ] = [ refData[0][ref], refData[0][ref] ];
    refData.forEach( d => {
      if ( d[ref] > top ) top = d[ref];
      if ( d[ref] < bottom ) bottom = d[ref];
    });
    return [ (bottom|0) - offset, (top|0) + offset ]
  };

  componentDidMount() {
      this.setdata();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.item !== this.props.item){
    this.setdata();
    }
  }

  setdata = () => {
    let data = this.props.itemStats.map(element => {
      let obj = {};
      obj['timestamp'] = element.timestamp;
      this.props.stats.map(stat => obj[stat] = element[stat])
    
      return obj;
    });
    this.setState({ data })
  }
  
  zoom(){  
    let { refAreaLeft, refAreaRight, data } = this.state;
    console.log(refAreaLeft, refAreaRight);

		if ( refAreaLeft === refAreaRight || refAreaRight === '' ) {
    	this.setState( () => ({
      	refAreaLeft : '',
        refAreaRight : ''
      }) );
    	return;
    }

		// xAxis domain
	  if ( refAreaLeft > refAreaRight ) 
    		[ refAreaLeft, refAreaRight ] = [ refAreaRight, refAreaLeft ];

		// yAxis domain
    const [ bottom, top ] = this.getAxisYDomain( refAreaLeft, refAreaRight, this.props.stats[0], 0 );
    console.log(top, 'top after zoom');
    this.setState( () => ({
      refAreaLeft : '',
      refAreaRight : '',
    	data : data.slice(),
      left : refAreaLeft,
      right : refAreaRight,
      bottom: bottom, 
      top: top,
    } ), () => {console.log(this.state.top, 'top state after zoom');} );
    
  };

	zoomOut() {
  	const { data } = this.state;
  	this.setState( () => ({
      data : data.slice(),
      refAreaLeft : '',
      refAreaRight : '',
      left : 'dataMin',
      right : 'dataMax',
      top : 'dataMax',
      bottom : 'dataMin',
    }) );
  }
  
  render() {
    const { data, left, right, refAreaLeft, refAreaRight, top } = this.state;
    console.log(data, 'data');
    const { stats, itemStats } = this.props
      return (
        <div className="highlight-bar-charts">
        <a
          href="javascript: void(0);"
          className="btn update"
          onClick={this.zoomOut.bind( this )}
        >
          Zoom Out
        </a>


        <p>Highlight / Zoom - able Line Chart</p>
          <LineChart
            width={800}
            height={400}
            data={data}
            onMouseDown = { (e) => this.setState({refAreaLeft:e.activeLabel}) }
            onMouseMove = { (e) => this.state.refAreaLeft && this.setState({refAreaRight:e.activeLabel}) }
            onMouseUp = { this.zoom.bind( this ) }
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis 
              allowDataOverflow={true}
              dataKey="timestamp"
              domain={[left, right]}
              type="number"
            />
            <YAxis 
              allowDataOverflow={true}
              domain={[0, (isNaN(Number(top)) ? top => (top + top*0.3) : Number(top) + Number(top)*0.3)]}
              type="number"
              yAxisId="1"
              tickFormatter={priceFormatter}
              // tickFormatter={dateFormatter}
             />
            <Tooltip content={<CustomTooltip />}/>
            {stats.map((stat,i) => (
              <Line key={i} yAxisId="1" type='monotoneX' dot={false} dataKey={stat} stroke='#8884d8' animationDuration={300}/>
            ))}
            
            
            {
            	(refAreaLeft && refAreaRight) ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight}  strokeOpacity={0.3} /> ) : null
            
            }
            
          </LineChart> 

      </div>
      );
  }
}

export default ZoomGraph
