import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHotel, FaMapMarkedAlt, FaUsers, FaRupeeSign, FaFilePdf, FaCalendarAlt } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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
    revenue: 0,
    bookings: 0
  });
  const [bookingStats, setBookingStats] = useState({
    labels: [],
    data: []
  });
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
          setError('Please log in to view dashboard');
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`
          }
        };

        const [roomsRes, placesRes, usersRes, bookingsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/rooms/', config),
          axios.get('http://localhost:5000/api/places/', config),
          axios.get('http://localhost:5000/api/users/', config),
          axios.get('http://localhost:5000/api/bookings/admin', config)
        ]);

        setBookings(bookingsRes.data);

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
          revenue: totalRevenue,
          bookings: bookingsRes.data.length
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.message || 'Error fetching dashboard data');
      }
    };

    fetchData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Hotel Booking Report', 14, 15);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);
    
    // Add summary
    doc.setFontSize(14);
    doc.text('Summary', 14, 35);
    doc.setFontSize(12);
    doc.text(`Total Rooms: ${totals.rooms}`, 14, 45);
    doc.text(`Total Places: ${totals.places}`, 14, 55);
    doc.text(`Total Users: ${totals.users}`, 14, 65);
    doc.text(`Total Bookings: ${totals.bookings}`, 14, 75);
    doc.text(`Total Revenue: ₹${totals.revenue}`, 14, 85);
    
    // Add bookings table
    doc.setFontSize(14);
    doc.text('Recent Bookings', 14, 95);
    
    const tableData = bookings.map(booking => [
      booking._id.slice(-6),
      booking.user?.name || 'N/A',
      booking.room?.name || 'N/A',
      new Date(booking.checkIn).toLocaleDateString(),
      new Date(booking.checkOut).toLocaleDateString(),
      booking.status,
      `₹${booking.totalAmount}`
    ]);
    
    autoTable(doc, {
      startY: 100,
      head: [['Booking ID', 'User', 'Room', 'Check In', 'Check Out', 'Status', 'Amount']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10 }
    });
    
    // Save the PDF
    doc.save('hotel-bookings-report.pdf');
  };

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

  if (error) {
    return (
      <Container className="py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <div className="admin-dashboard">
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <Button 
            variant="primary" 
            onClick={generatePDF}
            className="download-pdf-btn"
          >
            <FaFilePdf className="me-2" />
            Download Report
          </Button>
        </div>
        
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
            title="Total Bookings"
            value={totals.bookings}
            icon={<FaCalendarAlt className="stat-icon" />}
            color="danger"
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