import SideBar from '@/components/sideBar/SideBar';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';

// Updated data representing warehouse metrics
const inventoryLevels = [12000, 15000, 11000, 18000, 16000, 13000];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Analytics = () => {
    return (
        <div className='flex'>
            <SideBar />
            <div className='flex flex-col items-center justify-center flex-1 gap-10'>
                <div className='flex flex-col lg:flex-row gap-10'>
                    <div className='border-2 border-black rounded-lg h-auto lg:w-[500px]'>
                        <h3 className='text-center font-semibold pt-4 px-2'>Warehouse Operations Status</h3>
                        <div className='hidden md:block'>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ['Loaded', 'Unloaded', 'In Transit'] }]}
                                series={[
                                    { data: [500, 700, 300], label: 'Pallets' },
                                    { data: [600, 500, 400], label: 'Crates' },
                                    { data: [700, 800, 600], label: 'Boxes' }
                                ]}
                                width={500}
                                height={300}
                            />
                        </div>
                        <div className='md:hidden'>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ['Loaded', 'Unloaded', 'In Transit'] }]}
                                series={[
                                    { data: [500, 700, 300], label: 'Pallets' },
                                    { data: [600, 500, 400], label: 'Crates' },
                                    { data: [700, 800, 600], label: 'Boxes' }
                                ]}
                                width={300}
                                height={200}
                            />
                        </div>
                    </div>
                    <div className='border-2 border-black rounded-lg lg:h-auto lg:w-[500px]'>
                        <h3 className='text-center text-sm md:text-base font-semibold pt-4 px-2'>Transport Efficiency from Warehouse to Distribution Centers</h3>
                        <div className='hidden md:block'>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
                                series={[
                                    {
                                        data: [95, 88, 90, 85, 92, 87],
                                        label: 'Efficiency (%)'
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        </div>
                        <div className='md:hidden'>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
                                series={[
                                    {
                                        data: [95, 88, 90, 85, 92, 87],
                                        label: 'Efficiency (%)'
                                    },
                                ]}
                                width={300}
                                height={200}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-10'>
                    <div className='border-2 border-black rounded-lg h-[300px] lg:w-[500px]'>
                        <h3 className='text-center font-semibold pt-4 px-2'>Average Inventory Levels per Day</h3>
                        <div className='hidden md:block'>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 12000, label: 'Monday' },
                                            { id: 1, value: 15000, label: 'Tuesday' },
                                            { id: 2, value: 11000, label: 'Wednesday' },
                                            { id: 3, value: 18000, label: 'Thursday' },
                                            { id: 4, value: 16000, label: 'Friday' },
                                            { id: 5, value: 13000, label: 'Saturday' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </div>
                        <div className='md:hidden'>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 12000, label: 'Monday' },
                                            { id: 1, value: 15000, label: 'Tuesday' },
                                            { id: 2, value: 11000, label: 'Wednesday' },
                                            { id: 3, value: 18000, label: 'Thursday' },
                                            { id: 4, value: 16000, label: 'Friday' },
                                            { id: 5, value: 13000, label: 'Saturday' },
                                        ],
                                    },
                                ]}
                                width={300}
                                height={200}
                            />
                        </div>
                    </div>
                    <div className='border-2 border-black rounded-lg lg:h-[300px] lg:w-[500px] mb-10'>
                        <h3 className='text-center font-semibold pt-4 px-2'>Weekly Inventory Fluctuations</h3>
                        <div className='hidden md:block'>
                            <ChartContainer
                                width={500}
                                height={300}
                                series={[{ data: inventoryLevels, label: 'Inventory Levels', type: 'bar' }]}
                                xAxis={[{ scaleType: 'band', data: daysOfWeek }]}
                            >
                                <BarPlot />
                            </ChartContainer>
                        </div>
                        <div className='md:hidden'>
                            <ChartContainer
                                width={300}
                                height={200}
                                series={[{ data: inventoryLevels, label: 'Inventory Levels', type: 'bar' }]}
                                xAxis={[{ scaleType: 'band', data: daysOfWeek }]}
                            >
                                <BarPlot />
                            </ChartContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
