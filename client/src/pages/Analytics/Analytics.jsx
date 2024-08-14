import SideBar from '@/components/sideBar/SideBar'
import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

const Analytics = () => {
    return (
        <div className='flex'>
            <SideBar />
            <div className='flex flex-col items-center justify-center flex-1 gap-10'>
                <div className='flex flex-col lg:flex-row gap-10'>
                    <div className='border-2 border-black rounded-lg h-auto lg:w-[500px]'>
                        <h3 className='text-center font-semibold pt-4 px-2'>Trucks Loaded, Unloaded and In Transit</h3>
                        <div className='hidden md:block'>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ['Loaded', 'Unloaded', 'In Transit'] }]}
                                series={[{ data: [10, 20, 30] }, { data: [20, 30, 40] }, { data: [30, 40, 50] }]}
                                width={500}
                                height={300}
                            />
                        </div>
                        <div className='md:hidden'>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ['Loaded', 'Unloaded', 'In Transit'] }]}
                                series={[{ data: [10, 20, 30] }, { data: [20, 30, 40] }, { data: [30, 40, 50] }]
                                }
                                width={300}
                                height={200}
                            />
                        </div>
                    </div>
                    <div className='border-2 border-black rounded-lg lg:h-auto lg:w-[500px]'>
                        <h3 className='text-center text-sm md:text-base font-semibold pt-4 px-2'>Ports to 1 distribution center to local stores</h3>
                        <div className='hidden md:block'>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                series={[
                                    {
                                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        </div>
                        <div className='md:hidden'>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                series={[
                                    {
                                        data: [2, 5.5, 2, 8.5, 1.5, 5],
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
                        <h3 className='text-center font-semibold pt-4 px-2'>Average number of trailers on day basis</h3>
                        <div className='hidden md:block'>
                            <PieChart
                                className=''
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'Monday' },
                                            { id: 1, value: 15, label: 'Tuesday' },
                                            { id: 2, value: 20, label: 'Wednesday' },
                                            { id: 3, value: 10, label: 'Thursday' },
                                            { id: 4, value: 15, label: 'Friday' },
                                            { id: 5, value: 20, label: 'Saturday' },

                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </div>
                        <div className='md:hidden'>
                            <PieChart
                                className=''
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'Monday' },
                                            { id: 1, value: 15, label: 'Tuesday' },
                                            { id: 2, value: 20, label: 'Wednesday' },
                                            { id: 3, value: 10, label: 'Thursday' },
                                            { id: 4, value: 15, label: 'Friday' },
                                            { id: 5, value: 20, label: 'Saturday' },

                                        ],
                                    },
                                ]}
                                width={300}
                                height={200}
                            />
                        </div>
                    </div>
                    <div className='border-2 border-black rounded-lg lg:h-[300px] lg:w-[500px] mb-10'>
                        <h3 className='text-center font-semibold pt-4 px-2'>Please provide a title</h3>
                        <div className='hidden md:block'>
                            <ChartContainer
                                width={500}
                                height={300}
                                series={[{ data: uData, label: 'uv', type: 'bar' }]}
                                xAxis={[{ scaleType: 'band', data: xLabels }]}
                            >
                                <BarPlot />
                            </ChartContainer>
                        </div>
                        <div className='md:hidden'>
                            <ChartContainer
                                width={300}
                                height={200}
                                series={[{ data: uData, label: 'uv', type: 'bar' }]}
                                xAxis={[{ scaleType: 'band', data: xLabels }]}
                            >
                                <BarPlot />
                            </ChartContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Analytics