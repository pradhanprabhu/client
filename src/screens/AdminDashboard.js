import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHotel, FaMapMarkedAlt, FaUsers, FaRupeeSign, FaFilePdf, FaCalendarAlt } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
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
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

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
  const [revenueStats, setRevenueStats] = useState({
    labels: [],
    data: []
  });
  const [error, setError] = useState('');
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

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

        const [roomsRes, placesRes, usersRes, bookingsRes, paymentsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/rooms/', config),
          axios.get('http://localhost:5000/api/places/', config),
          axios.get('http://localhost:5000/api/users/', config),
          axios.get('http://localhost:5000/api/bookings/admin', config),
          axios.get('http://localhost:5000/api/payments/admin', config)
        ]);

        setPayments(paymentsRes.data);

        // Calculate total revenue from completed payments
        const totalRevenue = paymentsRes.data
          .filter(payment => payment.status === 'completed')
          .reduce((acc, payment) => acc + payment.amount, 0);

        // Process bookings and revenue for monthly chart data
        const currentDate = new Date();
        const last6Months = [...Array(6)].map((_, i) => {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          return d;
        }).reverse();

        const monthlyBookings = last6Months.map(date => {
          const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
          const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          
          return bookingsRes.data.filter(booking => {
            const bookingDate = new Date(booking.createdAt);
            return bookingDate >= monthStart && bookingDate <= monthEnd;
          }).length;
        });

        const monthlyRevenue = last6Months.map(date => {
          const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
          const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          
          return paymentsRes.data
            .filter(payment => {
              const paymentDate = new Date(payment.createdAt);
              return paymentDate >= monthStart && 
                     paymentDate <= monthEnd && 
                     payment.status === 'completed';
            })
            .reduce((acc, payment) => acc + payment.amount, 0);
        });

        setBookingStats({
          labels: last6Months.map(date => date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })),
          data: monthlyBookings
        });

        setRevenueStats({
          labels: last6Months.map(date => date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })),
          data: monthlyRevenue
        });

        setTotals({
          rooms: roomsRes.data.length,
          places: placesRes.data.length,
          users: usersRes.data.length,
          revenue: totalRevenue,
          bookings: bookingsRes.data.length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to fetch dashboard data');
      }
    };

    fetchData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Monthly Payment Report', 14, 15);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);
    
    // Calculate monthly revenue
    const currentDate = new Date();
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const monthlyPayments = payments.filter(payment => {
      const paymentDate = new Date(payment.createdAt);
      return paymentDate >= monthStart && paymentDate <= monthEnd;
    });

    const monthlyRevenue = monthlyPayments
      .filter(payment => payment.status === 'completed')
      .reduce((acc, payment) => acc + payment.amount, 0);
    
    // Add monthly summary
    doc.setFontSize(14);
    doc.text('Monthly Summary', 14, 35);
    doc.setFontSize(12);
    doc.text(`Month: ${currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`, 14, 45);
    doc.text(`Total Revenue: ₹${monthlyRevenue}`, 14, 55);
    
    // Add payment details
    doc.setFontSize(14);
    doc.text('Payment Details', 14, 75);
    
    // Table headers
    const headers = ['ID', 'User', 'Amount', 'Status', 'Method', 'Date'];
    let y = 85;
    
    // Draw table headers
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    headers.forEach((header, i) => {
      doc.text(header, 14 + (i * 32), y);
    });
    
    // Draw table rows
    doc.setFont(undefined, 'normal');
    monthlyPayments.forEach((payment, index) => {
      y += 10;
      if (y > 280) { // Check if we need a new page
        doc.addPage();
        y = 20;
      }
      
      const row = [
        payment._id.substring(0, 8),
        payment.user?.name || 'N/A',
        `₹${payment.amount}`,
        payment.status,
        payment.paymentMethod || 'N/A',
        new Date(payment.createdAt).toLocaleDateString()
      ];
      
      row.forEach((cell, i) => {
        doc.text(cell, 14 + (i * 32), y);
      });
    });
    
    // Save the PDF
    doc.save(`hotel-payments-report-${currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}.pdf`);
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
        text: 'Monthly Bookings',
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
        },
        title: {
          display: true,
          text: 'Number of Bookings'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    }
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
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
          callback: function(value) {
            return '₹' + value;
          }
        },
        title: {
          display: true,
          text: 'Revenue (₹)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
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
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const revenueChartData = {
    labels: revenueStats.labels,
    datasets: [
      {
        data: revenueStats.data,
        backgroundColor: '#f39c12',
        borderColor: '#f39c12',
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
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
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <Button 
            variant="danger" 
            className="download-pdf-btn"
            onClick={generatePDF}
          >
            <FaFilePdf className="me-2" /> Download Report
          </Button>
        </div>

        <Row>
          <StatCard 
            title="Total Rooms" 
            value={totals.rooms} 
            icon={<FaHotel />} 
            color="primary" 
          />
          <StatCard 
            title="Total Places" 
            value={totals.places} 
            icon={<FaMapMarkedAlt />} 
            color="success" 
          />
          <StatCard 
            title="Total Users" 
            value={totals.users} 
            icon={<FaUsers />} 
            color="info" 
          />
          <StatCard 
            title="Total Bookings" 
            value={totals.bookings} 
            icon={<FaCalendarAlt />} 
            color="danger" 
          />
          <StatCard 
            title="Total Revenue" 
            value={`₹${totals.revenue}`} 
            icon={<FaRupeeSign />} 
            color="warning" 
          />
        </Row>

        <Row className="mt-4">
          <Col md={12}>
            <Card className="chart-card">
              <Card.Body>
                <Bar data={chartData} options={chartOptions} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <Card className="chart-card">
              <Card.Body>
                <Bar data={revenueChartData} options={revenueChartOptions} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard; 