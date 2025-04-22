import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHotel, FaMapMarkedAlt, FaUsers, FaRupeeSign } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './AdminDashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [totals, setTotals] = useState({ 
    rooms: 0, 
    places: 0, 
    users: 0, 
    revenue: 0
  });
  const [bookingStats, setBookingStats] = useState({
    labels: [],
    data: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, placesRes, usersRes, bookingsRes] = await Promise.all([
          axios.get('/api/rooms/'),
          axios.get('/api/places/'),
          axios.get('/api/users/'),
          axios.get('/api/bookings/admin')
        ]);

        // Calculate total revenue and process booking data
        const totalRevenue = bookingsRes.data.reduce((acc, booking) => 
          booking.status === 'confirmed' ? acc + booking.totalAmount : acc, 0);

        // Process bookings for chart data
        const last7Days = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.toISOString().split('T')[0];
        }).reverse();

        const bookingCounts = last7Days.map(date => {
          return bookingsRes.data.filter(booking => 
            booking.createdAt.split('T')[0] === date
          ).length;
        });

        setBookingStats({
          labels: last7Days.map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
          data: bookingCounts
        });

        setTotals({
          rooms: roomsRes.data.length,
          places: placesRes.data.length,
          users: usersRes.data.length,
          revenue: totalRevenue
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Col md={3} className="mb-4">
      <Card className="stat-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted mb-2">{title}</h6>
              <h3 className="mb-0">{value}</h3>
            </div>
            <div className={`icon-circle bg-${color}`}>
              {icon}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Bookings Last 7 Days',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const chartData = {
    labels: bookingStats.labels,
    datasets: [
      {
        data: bookingStats.data,
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <Container className="py-4">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        
        <Row>
          <StatCard
            title="Total Rooms"
            value={totals.rooms}
            icon={<FaHotel className="stat-icon" />}
            color="primary"
          />
          <StatCard
            title="Total Places"
            value={totals.places}
            icon={<FaMapMarkedAlt className="stat-icon" />}
            color="success"
          />
          <StatCard
            title="Total Users"
            value={totals.users}
            icon={<FaUsers className="stat-icon" />}
            color="info"
          />
          <StatCard
            title="Total Revenue"
            value={`₹${totals.revenue}`}
            icon={<FaRupeeSign className="stat-icon" />}
            color="warning"
          />
        </Row>

        <Card className="mt-4">
          <Card.Body>
            <Bar options={chartOptions} data={chartData} height={100} />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminDashboard; 