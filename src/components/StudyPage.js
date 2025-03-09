import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const StudyPage = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log('Sending request with payload:', {
          class_id: user.user_grade,
          user_id: user.user_id.toString(), // Convert user_id to string
          board: 'CBSC',
        });
        const response = await axios.post('http://3.6.229.61:9089/v1/get_book_details', {
          class_id: user.user_grade,
          user_id: user.user_id.toString(), // Convert user_id to string
          board: 'CBSC',
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        console.log('API Response:', response.data);
        setBooks(response.data.data || []); // Handle case where data might be undefined
      } catch (err) {
        const errorMessage = `Failed to load book details. Status: ${err.response?.status || 'unknown'}, Response: ${JSON.stringify(err.response?.data || err.message)}`;
        setError(errorMessage);
        console.error('Error fetching book details:', err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <img src="/assets/tee-scholar-logo.png" alt="Tee Scholar Logo" className="logo" />
      <h2>Study Resources</h2>
      <div className="section">
        <h3>Available Books</h3>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.book_id} className="book-card">
              <img
                src={`http://3.6.229.61:9089/${book.book_cover_page}`}
                alt={book.book_name}
                className="book-cover"
              />
              <h4>{book.book_name}</h4>
              <p>Chapters: {book.book_chapters}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyPage;