import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SalesChart = ({ APIURL, token, ApiKey }) => {
  const [monthlySales, setMonthlySales] = useState(Array(12).fill(0));

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    axios.get(`${APIURL}/orders`, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      }
    }).then((res) => {
      const orders = res.data.data;

      const validOrders = orders.filter(order => {
        const isOnlinePaidAndShipped = order.method_payment === "credit card" && order.status === "Shipped";
        const isCashOnDeliveryAndDelivered = order.method_payment === "cash" && order.status === "Delivered";
        return isOnlinePaidAndShipped || isCashOnDeliveryAndDelivered;
      });

      const monthlyTotals = Array(12).fill(0); // [0, 0, ..., 0]

      validOrders.forEach(order => {
        const date = new Date(order.order_date);
        const monthIndex = date.getMonth(); // 0-11

        const orderTotal = order.order_items.reduce((sum, item) => {
          return sum + (item.price * item.quantity);
        }, 0);

        monthlyTotals[monthIndex] += orderTotal;
      });

      setMonthlySales(monthlyTotals);
    });
  }, []);

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Sales Revenue',
        data: monthlySales,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Target Revenue',
        data: Array(12).fill(800), // optional target
        borderColor: 'rgba(255, 99, 132, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0)',
        borderDash: [5, 5],
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        titleFont: {
          size: 13
        },
        bodyFont: {
          size: 12
        },
        padding: 10,
        usePointStyle: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 1000,
        grid: {
          drawBorder: false,
          color: 'rgba(200, 200, 200, 0.2)'
        },
        ticks: {
          font: {
            size: 12
          },
          callback: function (value) {
            return `${value} TND`;
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '350px', position: 'relative' }}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default SalesChart;
