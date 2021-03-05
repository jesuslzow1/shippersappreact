import React from 'react'
import LineChart from '../../components/Charts/LineChart';
export const HomePage = () => {
    return (
        <div>
            Home
            <LineChart x={["Jan", "Feb", "March", "MAy"]} y={[23,43,234, 12]} />
        </div>
    )
}
