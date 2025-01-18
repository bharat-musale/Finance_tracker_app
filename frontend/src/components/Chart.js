import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler, // Import the Filler plugin
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

// Register necessary chart components, including the Filler plugin
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler // Register the Filler plugin for fill functionality
);

const Chart = ({ type, data, options }) => {
  return (
    <div>
      {type === 'pie' && <Pie data={data} options={options} />}
      {type === 'line' && <Line data={data} options={options} />}
    </div>
  );
};

export default Chart;
