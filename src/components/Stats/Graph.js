import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from "./CustomTooltip"


class Stats extends React.Component {
    render() {
        const { stats, recipe, selectedStats } = this.props
        let data;
        if (stats && stats[recipe.craft.blizzardId]) {
            console.log(recipe);
            console.log(recipe.craft.blizzardId, 'craftId');
            console.log(stats, 'stats');
            console.log(stats[recipe.craft.blizzardId], '////');
            data = stats[recipe.craft.blizzardId].map(element => ({ name: element.timestamp, value: element.mean }))
            console.log('data', data);
            return (
                <div>
                    <h2>here</h2>
                    <LineChart width={600} height={300} data={data}>
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                    {selectedStats.includes('recipe') && <h1>Recipe Stats</h1>}
                    {selectedStats.includes(recipe.craft.blizzardId) && <h1>{stats[recipe.craft.blizzardId][0]['mean']} Stats</h1>}
                    {recipe.reagents.map((reagent) => (
                        selectedStats.includes(reagent.blizzardId) && <h1>{reagent.name} Stats</h1>
                    ))}
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