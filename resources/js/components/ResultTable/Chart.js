// import { Chart, Tooltip, Axis, Bar } from 'viser-react';
import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { message, Button, Table, Tag, Popconfirm, Row, Col } from 'antd';


const ResultChart = ({ chartData }) => {

  useEffect(() => {
    console.log('chartData', chartData);
  }, [chartData])
  return (
    <Row style={{ display: 'flex', justifyContent: 'center' }}>
      <BarChart width={1200} height={400} data={chartData} barSize={100} margin={{top: 15}}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
        dataKey="score"
        label={{ position: 'top' }}>
          {
            chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name == 'Đánh giá chung' ? 'red' : '#3399ff'}/>
            ))
          }
        </Bar>
      </BarChart>
    </Row>
  );
}

export default ResultChart;

