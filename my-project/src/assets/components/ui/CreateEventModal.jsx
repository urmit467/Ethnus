import React from 'react';
import { formatISO } from 'date-fns';

export default function CreateEventModal({ visible, onClose, newEvent, onChange, onSubmit }) {
  if (!visible) return null;

  const handleInput = (e) => {
    onChange({ ...newEvent, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 max-w-lg w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">✕</button>
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInput}
            placeholder="Event Title"
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="datetime-local"
            name="date"
            value={newEvent.date}
            onChange={handleInput}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="location"
            value={newEvent.location}
            onChange={handleInput}
            placeholder="Location"
            required
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInput}
            placeholder="Description"
            required
            className="w-full p-2 border rounded h-24"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              value={newEvent.price}
              onChange={handleInput}
              placeholder="Price"
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="capacity"
              value={newEvent.capacity}
              onChange={handleInput}
              placeholder="Capacity"
              required
              className="p-2 border rounded"
            />
          </div>

          <select
            name="category"
            onChange={handleInput}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="music">Music</option>
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
          </select>
        </div>

        <button type="submit" className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-lg">Create Event</button>
      </form>
    </div>
  )
}