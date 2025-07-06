import React, { useState } from 'react';

export default function Header({ onSearch, onFilter, onSort }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterDate(e.target.value);
    onFilter(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    onSort(e.target.value);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center pb-4">
      <h1 className="text-3xl font-bold mb-4 md:mb-0">Event Manager</h1>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search events..."
          className="p-2 rounded-lg border border-gray-300 flex-1"
        />

        <input
          type="date"
          value={filterDate}
          onChange={handleFilter}
          className="p-2 rounded-lg border border-gray-300"
        />

        <select
          value={sortBy}
          onChange={handleSort}
          className="p-2 rounded-lg border border-gray-300"
        >
          <option value="date">Date</option>
          <option value="price">Price</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </header>
  )
}