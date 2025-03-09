import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [contests, setContests] = useState([]);
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await axios.post('http://3.6.229.61:9089/v1/get_book_details', {
          class_id: user.user_grade,
          user_id: user.user_id,
          board: 'CBSC',
        });
        setBooks(booksResponse.data.data);

        const contestsResponse = await axios.post('http://3.6.229.61:9089/v1/launch', {
          user_id: user.user_mobile,
        });
        setContests(contestsResponse.data.data);

        const performanceResponse = await axios.post('http://3.6.229.61:9089/v1/get_performance', {
          user_id: user.user_mobile,
        });
        setPerformance(performanceResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="dashboard-container">
      <img src="/assets/tee-scholar-logo.png" alt="Tee Scholar Logo" className="logo" />
      <div className="welcome-text">Welcome {user.user_name}</div>

      {/* Books Section */}
      <div className="section">
        <h3>Available Books</h3>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.book_id} className="book-card">
              <img
                src={`http://3.6.229.61:9089/${book.book_cover_page}`} // Adjust URL based on your server
                alt={book.book_name} // Already correct
                className="book-cover"
              />
              <h4>{book.book_name}</h4>
              <p>Chapters: {book.book_chapters}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contests Section */}
      <div className="section">
        <h3>Available Contests</h3>
        <div className="contests-list">
          {contests.map((contest) => (
            <div key={contest.contest_id} className="contest-card">
              <p>Contest ID: {contest.contest_id}</p>
              <p>Created: {new Date(contest.created_on).toLocaleDateString()}</p>
              <p>Questions: {contest.number_of_questions}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Section */}
      <div className="section">
        <h3>Performance</h3>
        <div className="performance-list">
          {performance.map((perf) => (
            <div key={perf.book_id} className="performance-card">
              <p>Subject: {perf.subject}</p>
              <p>Score: {perf.score}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Cards (Static for now) */}
      <div className="dashboard-grid">
        <div className="card study-card">
          <img src="/assets/grad-cap.png" alt="Study" /> {/* Already correct */}
          <h3>Study</h3>
          <p>Access curriculum-specific resources and ask question</p>
        </div>
        <div className="card test-card">
          <img src="/assets/book.png" alt="Test" /> {/* Already correct */}
          <h3>Test</h3>
          <p>Access curriculum-specific resources and ask question</p>
          <span className="new-label">New!</span>
        </div>
        <div className="card performance-card">
          <img src="/assets/lightbulb.png" alt="Performance" /> {/* Already correct */}
          <h3>Performance</h3>
          <p>Access curriculum-specific resources and ask question</p>
        </div>
        <div className="card pdf-card">
          <img src="/assets/paper-plane.png" alt="Upload PDF" /> {/* Already correct */}
          <h3>Upload PDF</h3>
          <p>Access curriculum-specific resources and ask question</p>
        </div>
        <div className="card image-card">
          <img src="/assets/backpack.png" alt="Upload" /> {/* Fixed: Removed "Image" */}
          <h3>Image Upload</h3>
          <p>Access curriculum-specific resources and ask question</p>
        </div>
        <div className="card chat-card">
          <img src="/assets/paper-plane.png" alt="Chat History" /> {/* Already correct */}
          <h3>Chat History</h3>
          <p>Access curriculum-specific resources and ask question</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;