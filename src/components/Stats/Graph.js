import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from "./CustomTooltip"


class Stats extends React.Component {
    render() {
        const { stats, recipe, selectedStats } = this.props
        const statValue = 'median'
        let data;
        if (stats && stats[recipe.craft.blizzardId]) {
            data = stats[recipe.craft.blizzardId].map(element => {
                let obj = {};
                obj['timestamp'] = element.timestamp;
                obj[recipe.craft.blizzardId] = element[statValue];
                return obj;
            });
            console.log(data, '////////////');
            recipe.reagents.map( reagent => {
                console.log('ok');
                stats[reagent.blizzardId].map(stat => {
                    data.map(element => {
                        return element.timestamp === stat.timestamp ? element[reagent.blizzardId] = stat[statValue] : '' ;
                    })
                })
                
            })
            console.log('data', data);
            console.log(selectedStats);
            return (
                <div>
                    <h2>here</h2>
                    <LineChart width={600} height={300} data={data}>
                        {selectedStats && selectedStats.map((element, i) => {
                            console.log(element)    
                            return(
                            <Line key={element.id} type="monotone" name={element.name} dataKey={element.id} stroke="#ff4433" />
                        )})}
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


export default Stats;

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