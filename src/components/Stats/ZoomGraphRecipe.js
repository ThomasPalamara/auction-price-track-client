/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-bitwise */
/* provided as it by rechats */
import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import CustomTooltip from './ChartsMiscs/CustomTooltip';
import CustomAxisTick from './ChartsMiscs/CustomAxisTick';

class ZoomGraph extends React.Component {

  constructor(props) {
    super(props);

    const initialState = {
      data: this.props.data,
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      top: 'dataMax+1',
      bottom: 'dataMin-1',
      top2: 'dataMax+20',
      bottom2: 'dataMin-20',
      animation: true,
    };

    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    const { data, item } = this.props;
    if (prevProps.item !== item) {
      this.setState({ data });
    }
  }

  getAxisYDomain = (from, to, ref, offset) => {
    const { data } = this.state;
    const fromPos = data.map(e => e.timestamp).indexOf(from);
    const toPos = data.map(e => e.timestamp).indexOf(to);
    // const refData = data.slice(from-1, to);
    const refData = data.slice(fromPos, toPos);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset]
  };

  zoom() {
    let { refAreaLeft, refAreaRight, data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) {
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
    }
    // yAxis domain
    // let craftValues = [];
    // let recipeValues = [];
    // data.forEach(e => {
    //   craftValues.push(e.craft);
    //   recipeValues.push(e.recipe);
    // });
    
    const offset = Math.max(data.craft);
    console.log(offset);
    const [bottom1, top1] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'craft');
    const [bottom2, top2] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'recipe');

    const bottom = Math.min(bottom1, bottom2);
    const top = Math.max(top1, top2);
    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    }));
  };

  zoomOut() {
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
    }));
  }

  render() {
    const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom } = this.state;

    return (
      <div className="highlight-bar-charts">
        <button
          type="button"
          className="btn update"
          onClick={this.zoomOut.bind(this)}
        >
          Zoom Out
        </button>


        <p>Highlight / Zoom - able Line Chart</p>
        <LineChart
          width={800}
          height={400}
          data={data}
          onMouseDown={e => (e ? this.setState({ refAreaLeft: e.activeLabel }) : '')}
          onMouseMove={e => refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
          onMouseUp={this.zoom.bind(this)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="timestamp"
            domain={[left, right]}
            type="number"
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            tick={ <CustomAxisTick/> }
          />
          <Tooltip content={<CustomTooltip />} />
          <Line yAxisId="1" type="monotoneX" dot={false} dataKey="craft" stroke="#8884d8" animationDuration={300} />
          <Line yAxisId="1" type="monotoneX" dot={false} dataKey="recipe" stroke="#82ca9d" animationDuration={300} />

          {
            (refAreaLeft && refAreaRight) ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null

          }

        </LineChart>

      </div>
    );
  }
}

ZoomGraph.propTypes = {
  data: PropTypes.array.isRequired,
};


export default ZoomGraph;
