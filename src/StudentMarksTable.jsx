import React, { useState } from 'react';
import './StudentMarksTable.css';

const StudentMarksTable = () => {
  // Sample student data
  const initialData = [
    { id: 1, name: 'Alice Johnson', subject: 'Mathematics', score: 85 },
    { id: 2, name: 'Bob Smith', subject: 'Science', score: 92 },
    { id: 3, name: 'Charlie Brown', subject: 'Mathematics', score: 78 },
    { id: 4, name: 'Diana Prince', subject: 'English', score: 88 },
    { id: 5, name: 'Ethan Hunt', subject: 'Science', score: 95 },
    { id: 6, name: 'Fiona Green', subject: 'English', score: 82 },
    { id: 7, name: 'George Wilson', subject: 'Mathematics', score: 91 },
    { id: 8, name: 'Hannah Lee', subject: 'Science', score: 87 },
    { id: 9, name: 'Ian Malcolm', subject: 'English', score: 79 },
    { id: 10, name: 'Julia Roberts', subject: 'Mathematics', score: 94 },
  ];

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterSubject, setFilterSubject] = useState('');
  const [filterMinScore, setFilterMinScore] = useState('');
  const [filterMaxScore, setFilterMaxScore] = useState('');

  // Get unique subjects for filter dropdown
  const subjects = ['All', ...new Set(initialData.map(s => s.subject))];

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const getFilteredAndSortedData = () => {
    let filteredData = [...initialData];

    // Apply subject filter
    if (filterSubject && filterSubject !== 'All') {
      filteredData = filteredData.filter(student => student.subject === filterSubject);
    }

    // Apply score range filter
    if (filterMinScore !== '') {
      filteredData = filteredData.filter(student => student.score >= Number(filterMinScore));
    }
    if (filterMaxScore !== '') {
      filteredData = filteredData.filter(student => student.score <= Number(filterMaxScore));
    }

    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  };

  const displayData = getFilteredAndSortedData();

  // Reset filters
  const handleReset = () => {
    setFilterSubject('');
    setFilterMinScore('');
    setFilterMaxScore('');
    setSortConfig({ key: null, direction: 'asc' });
  };

  // Get sort indicator
  const getSortIndicator = (columnKey) => {
    if (sortConfig.key !== columnKey) return ' ⇅';
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="container">
      <h1>Student Marks Table</h1>
      
      <div className="filters">
        <div className="filter-group">
          <label>
            Subject:
            <select 
              value={filterSubject} 
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="">All</option>
              {subjects.slice(1).map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="filter-group">
          <label>
            Min Score:
            <input 
              type="number" 
              value={filterMinScore}
              onChange={(e) => setFilterMinScore(e.target.value)}
              placeholder="0"
              min="0"
              max="100"
            />
          </label>
        </div>

        <div className="filter-group">
          <label>
            Max Score:
            <input 
              type="number" 
              value={filterMaxScore}
              onChange={(e) => setFilterMaxScore(e.target.value)}
              placeholder="100"
              min="0"
              max="100"
            />
          </label>
        </div>

        <button className="reset-btn" onClick={handleReset}>Reset Filters</button>
      </div>

      <div className="results-info">
        Showing {displayData.length} of {initialData.length} students
      </div>

      <table className="marks-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className="sortable">
              Name{getSortIndicator('name')}
            </th>
            <th onClick={() => handleSort('subject')} className="sortable">
              Subject{getSortIndicator('subject')}
            </th>
            <th onClick={() => handleSort('score')} className="sortable">
              Score{getSortIndicator('score')}
            </th>
          </tr>
        </thead>
        <tbody>
          {displayData.length > 0 ? (
            displayData.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.subject}</td>
                <td className={`score ${student.score >= 90 ? 'excellent' : student.score >= 80 ? 'good' : ''}`}>
                  {student.score}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">No students found matching the filters</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentMarksTable;
