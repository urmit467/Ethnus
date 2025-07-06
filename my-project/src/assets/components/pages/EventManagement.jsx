// Event.jsx
import React, { useState, useMemo } from 'react';
import Header from '../ui/Header';
import EventCard from '../ui/EventCard';
import CartModal from '../ui/CartModal';
import CreateEventModal from '../ui/CreateEventModal';
import Footer from '../ui/Footer';

const initialEvents = [
  {
    id: '1',
    title: 'Summer Music Festival',
    date: '2025-07-15T19:00',
    location: 'Central Park, New York',
    description: 'Join us for the biggest music festival...',
    price: 89.99,
    capacity: 5000,
    ticketsSold: 1250,
    imageBg: 'bg-gradient-to-r from-pink-400 to-rose-500',
  },
  {
    id: '2',
    title: 'Tech Innovation Summit',
    date: '2025-08-22T09:00',
    location: 'Convention Center, San Francisco',
    description: 'Explore the future of technology...',
    price: 249.99,
    capacity: 1200,
    ticketsSold: 850,
    imageBg: 'bg-gradient-to-r from-blue-400 to-indigo-500',
  },
  {
    id: '3',
    title: 'Championship Basketball Finals',
    date: '2025-09-05T18:30',
    location: 'Madison Square Garden',
    description: 'Witness the ultimate showdown...',
    price: 149.99,
    capacity: 20000,
    ticketsSold: 18450,
    imageBg: 'bg-gradient-to-r from-green-400 to-emerald-500',
  },
];

export default function EventManagement() {
  const [events, setEvents] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [ticketQuantities, setTicketQuantities] = useState(
    initialEvents.reduce((acc, ev) => ({ ...acc, [ev.id]: 1 }), {})
  );
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    price: '',
    capacity: '',
    imageBg: 'bg-gradient-to-r from-indigo-400 to-purple-500',
  });
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  // Header callbacks
  const handleSearch = (term) => setSearchTerm(term.toLowerCase());
  const handleFilter = (date) => setFilterDate(date);
  const handleSort = (criteria) => setSortBy(criteria);

  // Filter, sort and search
  const visibleEvents = useMemo(() => {
    return events
      .filter((e) => e.title.toLowerCase().includes(searchTerm))
      .filter((e) => !filterDate || e.date.startsWith(filterDate))
      .sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'popularity') return b.ticketsSold - a.ticketsSold;
        return new Date(a.date) - new Date(b.date);
      });
  }, [events, searchTerm, filterDate, sortBy]);

  // Quantity change
  const handleQuantityChange = (id, qty) => {
    setTicketQuantities({ ...ticketQuantities, [id]: Math.max(1, qty) });
  };

  // Add to cart
  const handleAddToCart = (id) => {
    const qty = ticketQuantities[id];
    const evt = events.find((e) => e.id === id);
    if (evt.ticketsSold + qty > evt.capacity) {
      alert(`Only ${evt.capacity - evt.ticketsSold} tickets left.`);
      return;
    }
    const existing = cart.find((item) => item.event.id === id);
    let updated;
    if (existing) {
      updated = cart.map((item) =>
        item.event.id === id ? { ...item, quantity: item.quantity + qty } : item
      );
    } else {
      updated = [...cart, { event: evt, quantity: qty }];
    }
    setCart(updated);
    setShowCart(true);
  };

  // Cart quantity update
  const updateCartQuantity = (idx, qty) => {
    if (qty < 1) return;
    const updated = [...cart];
    updated[idx].quantity = qty;
    setCart(updated);
  };

  // Remove from cart
  const removeFromCart = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  // Complete purchase
  const handleCompletePurchase = () => {
    const updatedEvents = events.map((evt) => {
      const item = cart.find((ci) => ci.event.id === evt.id);
      return item ? { ...evt, ticketsSold: evt.ticketsSold + item.quantity } : evt;
    });
    setEvents(updatedEvents);
    setCart([]);
    setPurchaseComplete(true);
    setTimeout(() => setPurchaseComplete(false), 3000);
  };

  // Create new event
  const handleCreateEvent = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    const evt = {
      ...newEvent,
      id,
      ticketsSold: 0,
      price: Number(newEvent.price),
      capacity: Number(newEvent.capacity),
    };
    setEvents([...events, evt]);
    setTicketQuantities({ ...ticketQuantities, [id]: 1 });
    setNewEvent({
      title: '',
      date: '',
      location: '',
      description: '',
      price: '',
      capacity: '',
      imageBg: 'bg-gradient-to-r from-indigo-400 to-purple-500',
    });
    setShowCreate(false);
  };

  // Cart total
  const cartTotal = cart.reduce((sum, ci) => sum + ci.quantity * ci.event.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
        />

        {purchaseComplete && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in">
            Purchase complete! Your tickets are confirmed.
          </div>
        )}

        <main className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <div className="space-x-3">
              <button onClick={() => setShowCart(true)}>
                View Cart ({cart.reduce((a, i) => a + i.quantity, 0)})
              </button>
              <button onClick={() => setShowCreate(true)}>Create Event</button>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                quantity={ticketQuantities[evt.id]}
                onQuantityChange={handleQuantityChange}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        </main>

        {showCart && (
          <CartModal
            cart={cart}
            onClose={() => setShowCart(false)}
            onQuantityChange={updateCartQuantity}
            onRemove={removeFromCart}
            onPurchase={handleCompletePurchase}
            total={cartTotal}
          />
        )}

        <CreateEventModal
          visible={showCreate}
          onClose={() => setShowCreate(false)}
          newEvent={newEvent}
          onChange={setNewEvent}
          onSubmit={handleCreateEvent}
        />

        <Footer />
      </div>
    </div>
  );
}

// Header.jsx, EventCard.jsx, CartModal.jsx, CreateEventModal.jsx, Footer.jsx remain as previously defined.
