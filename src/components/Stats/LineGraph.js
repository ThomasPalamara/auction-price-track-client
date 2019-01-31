import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from "./CustomTooltip"

const colors = ['#ff404a', '#b139ec', '#ff881d', '#5ca0f2', '#8fd16f', '#ea4c89']

class Graphs extends React.Component {
    render() {

        const { item, stats, itemStats } = this.props
        let data;

        if (itemStats) {
            data = itemStats.map(element => {
                let obj = {};
                obj['timestamp'] = element.timestamp;
                stats.map(stat => obj[stat] = element[stat])

                return obj;
            });
            console.log(data, 'data');
            return (
                <div>
                    <LineChart width={600} height={300} data={data}>
                        {stats.map((stat, i) => {
                            return (
                                <Line
                                    key={stat.blizzardId}
                                    type="monotone"
                                    name={stat.name}
                                    dataKey={stat}
                                    stroke={colors[i + 1]}
                                />
                            )
                        })}
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Legend />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                </div>
            );
        }
        return null;
    }
}


export default Graphs;

// <LineChart width={730} height={250} data={data}
// margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
// <CartesianGrid strokeDasharray="3 3" />
// <XAxis dataKey="name" />
// <YAxis />
// <Tooltip />
// <Legend />
// <Line type="monotone" dataKey="pv" stroke="#8884d8" />
// <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
// </LineChart>