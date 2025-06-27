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

  // Build photo file path
  const photoUrl = `https://hros.rccmaldives.com/assets/document/${employee.emp_no}_photo_file_name.jpg`;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={photoUrl}
          alt="Profile"
          style={styles.image}
          onError={(e) => (e.target.style.display = 'none')}
        />
        <h2 style={styles.name}>{employee.name}</h2>
        <ProfileRow label="Employee ID" value={employee.emp_no} />
        <ProfileRow label="Designation" value={employee.designation} />
        <ProfileRow label="Department" value={employee.department} />
        <ProfileRow label="Passport No" value={employee.passport_nic_no} />
        <ProfileRow label="Work Permit No" value={employee.wp_no} />
        <ProfileRow label="Nationality" value={employee.nationality} />
        <ProfileRow label="Contact" value={employee.contact_number} />
        <ProfileRow label="Email" value={employee.email} />
        <ProfileRow label="Address" value={employee.persentaddress} />
        <ProfileRow label="Date of Join" value={employee.date_of_join} />
        <ProfileRow
          label="Emergency Contact"
          value={`${employee.emergency_contact_name} (${employee.emergency_contact_number})`}
        />
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div style={styles.row}>
    <strong>{label}:</strong> <span>{value || 'N/A'}</span>
  </div>
);

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: 16,
    maxWidth: 420,
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 0 12px rgba(0,0,0,0.08)',
    width: '100%',
    textAlign: 'left'
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '0 auto 16px auto',
    display: 'block',
    border: '2px solid #ddd'
  },
  name: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
    fontSize: 20
  },
  row: {
    marginBottom: 10,
    fontSize: 15,
    color: '#444'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
