import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const App = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  const emp_no = new URLSearchParams(window.location.search).get('emp_no');

  useEffect(() => {
    if (!emp_no) {
      setError('No employee number provided.');
      return;
    }

    axios
      .get(`https://api.rccmaldives.com/ess/employees/index.php?emp_no=${emp_no}`)
      .then((res) => {
        if (res.data.status === 'success') setEmployee(res.data.data);
        else setError(res.data.message || 'Employee not found');
      })
      .catch(() => setError('Failed to fetch employee data.'));
  }, [emp_no]);

  if (error) {
    return (
      <div style={styles.container}>
        <h2 style={styles.error}>🚫 {error}</h2>
      </div>
    );
  }

  if (!employee) {
    return (
      <div style={styles.container}>
        <h3>Loading profile...</h3>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={`https://api.rccmaldives.com/ess/document/index.php?emp_no=${employee.emp_no}`}
          alt="Profile"
          style={styles.image}
        />
        <h2 style={styles.name}>{employee.name}</h2>
        <div style={styles.row}><strong>Employee ID:</strong> {employee.emp_no}</div>
        <div style={styles.row}><strong>Designation:</strong> {employee.designation}</div>
        <div style={styles.row}><strong>Department:</strong> {employee.department}</div>
        <div style={styles.row}><strong>Passport No:</strong> {/* Add when available */}</div>
        <div style={styles.row}><strong>Work Permit No:</strong> {/* Add when available */}</div>
        <div style={styles.row}><strong>Nationality:</strong> {/* Add when available */}</div>
        <div style={styles.row}><strong>Contact:</strong> {employee.contact_number}</div>
        <div style={styles.row}><strong>Email:</strong> {employee.email}</div>
        <div style={styles.row}><strong>Address:</strong> {employee.persentaddress}</div>
        <div style={styles.row}><strong>Date of Join:</strong> {employee.date_of_join}</div>
        <div style={styles.row}><strong>Emergency Contact:</strong> {employee.emergency_contact_name} ({employee.emergency_contact_number})</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: 16,
    maxWidth: 400,
    margin: 'auto',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
    height: '100vh',
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
    display: 'block',
    margin: '0 auto 12px auto'
  },
  name: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#333'
  },
  row: {
    marginBottom: 8
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
