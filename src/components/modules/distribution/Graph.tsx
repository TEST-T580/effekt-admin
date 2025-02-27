import React from 'react';
import { IDistributionShare } from '../../../models/types';
import { Bar } from 'react-chartjs-2';
import { GraphWrapper } from './Graph.style';
import { ChartData, ChartOptions } from 'chart.js';
import Decimal from 'decimal.js';

interface IProps {
  distribution: Array<IDistributionShare> | undefined;
}
export const DistributionGraphComponent: React.FunctionComponent<IProps> = ({ distribution }) => {

  if (!distribution) return <div>No distribution</div>;

  const data: ChartData<"bar"> = {
    labels: distribution.map((dist) => dist.abbriv),
    datasets: [
      {
        label: 'Organizations',
        backgroundColor: 'black',
        borderWidth: 0,
        data: distribution.map((dist) => new Decimal(dist.share).toNumber()),
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <GraphWrapper>
      <Bar data={data} options={options}></Bar>
    </GraphWrapper>
  );
};
