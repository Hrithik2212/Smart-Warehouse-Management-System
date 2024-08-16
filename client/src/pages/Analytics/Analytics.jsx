
import React from 'react';
import Network from '@/components/graphs/Network';
import SanKey from '@/components/graphs/SanKey';

import {
    LineChart, Line, BarChart, Bar,AreaChart,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
  } from 'recharts';




const warehouseStatusData = [
    { name: 'Process', value: 7 ,color:"#5522D0"},
    { name: 'At To Arrival', value: 10 ,color:"#5dceff"},
    { name: 'Idle', value: 5 ,color:"#ab79f0"},
    { name: 'Maintenance', value: 2 ,color:"#90ca71"},
  ];
  
  const transportEfficiencyData = [
    { name: 'DC 1', efficiency: 80 },
    { name: 'DC 2', efficiency: 75 },
    { name: 'DC 3', efficiency: 90 },
    { name: 'DC 4', efficiency: 85 },
  ];
  
  const inventoryLevelsData = [
    { day: 'Monday', level: 200 },
    { day: 'Tuesday', level: 220 },
    { day: 'Wednesday', level: 210 },
    { day: 'Thursday', level: 230 },
    { day: 'Friday', level: 240 },
    { day: 'Saturday', level: 250 },
    { day: 'Sunday', level: 190 },
  ];

  
  
  const inventoryFluctuationsData = [
    { week: 'Week 1', fluctuation: 5 },
    { week: 'Week 2', fluctuation: 10 },
    { week: 'Week 3', fluctuation: 15 },
    { week: 'Week 4', fluctuation: 8 },
    { week: 'Week 5', fluctuation: 12 },
  ];
const Analytics = () => {


    return (
        <div className='flex mb-20'>
            <div className='flex flex-col items-center justify-center flex-1 gap-10'>
                <div className='flex flex-col lg:flex-row gap-10'>
                    <div className='border-2 border-black rounded-lg h-auto flex flex-col justify-center items-center'>
                        <h3 className='text-center font-semibold  px-2'>Warehouse Operations Status</h3>
                        <div className='hidden md:block'>
                        <BarChart
                            width={600}
                            height={300}
                            data={inventoryFluctuationsData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="fluctuation" fill="#2061e2" />
                        </BarChart>
                        
                        </div>
                    </div>
                    <div className='border-2 border-black rounded-lg lg:h-auto flex flex-col justify-center items-center'>
                        <h3 className='text-center text-sm md:text-base font-semibold pt-4 px-2'>Transport Network</h3>
                       
                        <div className='w-fit'>
                            <Network/>
                        </div>
                    </div>
                </div>
                
                <div className='flex lg:flex-row gap-10 px-5'>
                    <div className='border-2 w-full border-black rounded-lg  flex flex-col justify-center items-center'>
                            <h3 className='text-center text-sm md:text-base font-semibold px-2'>Transport Efficiency from Warehouse to Distribution Centers</h3>
                            <div className='w-full'>
                                <SanKey/>
                            </div>
                        
                    </div>
                    <div className='border-2 border-black rounded-lg w-full flex flex-col justify-center items-center px-5 py-4'>
                        <h3 className='text-center font-semibold '>Average Inventory Levels per Day</h3>
                        <div className='w-full h-full flex flex-col justify-center items-center '>
                        <PieChart width={400} height={400}>
                                <Pie
                                    dataKey="value"
                                    data={warehouseStatusData}
                                    cx={200}
                                    cy={200}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    label
                                >
                                    {warehouseStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                        </PieChart>
                        
                        </div>
                       
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default Analytics;
