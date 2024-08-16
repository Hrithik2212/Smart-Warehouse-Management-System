import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import { SankeyController, Flow } from 'chartjs-chart-sankey';

// Register the controllers and elements required for the chart
Chart.register(...registerables);
Chart.register(SankeyController, Flow);

const SanKey = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const colors = {
      a: 'red',
      b: 'green',
      c: 'blue',
      d: 'gray',
      e:'pink'
    };

    const getColor = (key) => colors[key];

    const sankeyChart = new Chart(ctx, {
      type: 'sankey',
      data: {
        datasets: [{
          label: 'Transport Efficiency Sankey',
          data: [
            { from: 'a', to: 'c', flow: 75 },
            { from: 'a', to: 'd', flow: 60 },
            { from: 'a', to: 'e', flow: 30 },
            { from: 'b', to: 'c', flow: 95 },
            { from: 'b', to: 'd', flow: 45 },
            { from: 'b', to: 'e', flow: 65 },
          ],
          colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
          colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
          colorMode: 'gradient', // or 'from' or 'to'
          /* optional labels */
          labels: {
            a: 'Warehouse 1',
            b: 'Warehouse 2',
            c: 'DC 1',
            d: 'DC 2',
            e: 'DC 3'
          },
          size: 'max', // or 'min' if flow overlap is preferred
        }]
      },
    });

    // Cleanup on component unmount
    return () => {
      sankeyChart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} width="800" height="500"></canvas>
    </div>
  );
};

export default SanKey;
