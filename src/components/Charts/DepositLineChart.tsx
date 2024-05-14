import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { DepositChartProps } from "./depositType";

interface DepositChartData {
    date: string;
    deposit: number;
    houseFund: number;
}
const DepositLineChart = ({ depositMap }: DepositChartProps) => {
    const chartData: DepositChartData[] = [];
    depositMap.forEach((deposits, date) => {
        let total = 0;
        let houseFund = 0;
        deposits.forEach(deposit => {
            if (!deposit.description.includes('公积金')) {
                total += deposit.amount;
            }
            if (deposit.description === '公积金') {
                houseFund = deposit.amount;
            }
        });
        chartData.push({ date, deposit: total, houseFund });
    })
    const sortedChartData = chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let formatter = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
    });
    const depositState = sortedChartData.map(data => formatter.format(data.deposit));
    const houseFundState = sortedChartData.map(data => formatter.format(data.houseFund));
    const depositWithHouseFundState = sortedChartData.map(data => formatter.format(data.deposit + data.houseFund));

    const toNumber = (decimal: string) => Number(decimal.replace(/[^0-9.-]+/g, ""));

    const dataState = {
        series: [{
            name: '不含公积金',
            type: 'column',
            data: depositState.map(toNumber)
        }, {
            name: '含公积金',
            type: 'column',
            data: depositWithHouseFundState.map(toNumber)
        }, {
            name: '公积金',
            type: 'line',
            data: houseFundState.map(toNumber)
        }]
    };

    const dataOptions: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4]
        },
        title: {
            text: `${chartData[0].date} ~ ${chartData[chartData.length - 1].date}`,
            align: 'left',
            offsetX: 0
        },
        xaxis: {
            categories: chartData.map(data => data.date),
        },
        yaxis: [
            {
                min: 0,
                seriesName: '不含公积金',
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#008FFB'
                },
                labels: {
                    style: {
                        colors: '#008FFB',
                    }
                },
                title: {
                    text: "不含公积金",
                    style: {
                        color: '#008FFB',
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            {
                min: 0,
                seriesName: '含公积金',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#00E396'
                },
                labels: {
                    style: {
                        colors: '#00E396',
                    }
                },
                title: {
                    text: "含公积金",
                    style: {
                        color: '#00E396',
                    }
                },
            },
            {
                seriesName: '公积金',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#FEB019'
                },
                labels: {
                    style: {
                        colors: '#FEB019',
                    },
                },
                title: {
                    text: "公积金",
                    style: {
                        color: '#FEB019',
                    }
                }
            },
        ],
        tooltip: {
            fixed: {
                enabled: true,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'left',
            offsetX: 40
        }
    }


    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
            <div className="mb-2">
                <div>
                    {(typeof window !== 'undefined') && <ReactApexChart options={dataOptions} series={dataState.series} type="line" height={350} />}
                </div>
            </div>
        </div>
    );
};

export default DepositLineChart;
