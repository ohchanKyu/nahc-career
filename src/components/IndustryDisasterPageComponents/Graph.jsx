import React from 'react';
import classes from './Graph.module.css';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = ({ graph }) => {
    const chartData = {
        labels: Object.keys(graph.list[0].data),
        datasets: graph.list.map((item) => ({
            label: item.type,
            data: Object.values(item.data),
            fill: false,
            borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            tension: 0.3,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            backgroundColor: 'rgba(0,0,0,0)',
            hoverBorderWidth: 3,
        })),
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: graph.category,
                font: {
                    size: 24,
                    weight: 'bold',
                    family: "Noto Sans KR, sans-serif",
                },
                color: '#444',
                padding: {
                    bottom: 20,
                },
            },
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 9,
                        family: 'Arial',
                    },
                    padding: 10,
                },
            },
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart',
        },
        layout: {
            padding: {
                top: 20,
                left: 10,
                right: 10,
                bottom: 10,
            },
        },
    };

    return (
        <div className={classes.graphCard}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default Graph;
