import React from 'react';
import { format } from 'date-fns';

export default function EventCard({ event, quantity, onQuantityChange, onAdd }) {
  const soldPercent = Math.min(100, Math.round((event.ticketsSold / event.capacity) * 100));

  return (
    <div className={`p-6 rounded-2xl shadow-lg group relative overflow-hidden ${event.imageBg}`}>
      <div className="bg-white/70 backdrop-blur p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-sm mb-2">{format(new Date(event.date), 'PPPpp')}</p>
        <p className="text-sm mb-4">{event.location}</p>
        <p className="text-sm mb-4 line-clamp-3">{event.description}</p>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${soldPercent}%` }} />
          </div>
          <small>{soldPercent}% sold</small>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            min="1"
            max={event.capacity - event.ticketsSold}
            value={quantity}
            onChange={(e) => onQuantityChange(event.id, parseInt(e.target.value, 10))}
            className="w-16 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={() => onAdd(event.id)}
            disabled={event.ticketsSold >= event.capacity}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {event.ticketsSold >= event.capacity ? 'Sold Out' : `Buy $${event.price}`}
          </button>
        </div>
      </div>
    </div>
  )
}
