import React, { useState } from 'react';

export default function CartModal({ cart, onClose, onQuantityChange, onRemove, onPurchase, total }) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon === 'SAVE10') setDiscount(0.1);
    else if (coupon === 'SAVE20' && total > 200) setDiscount(0.2);
    else alert('Invalid or inapplicable coupon');
  };

  const finalTotal = (total * (1 - discount)).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">✕</button>
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {cart.map((item, idx) => (
              <div key={item.event.id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.event.title}</h3>
                  <p>${item.event.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(idx, parseInt(e.target.value, 10))}
                    className="w-16 p-1 border rounded"
                  />
                  <button onClick={() => onRemove(idx)} className="text-red-500">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <input
            type="text"
            placeholder="Coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            className="p-2 border rounded mr-2"
          />
          <button onClick={applyCoupon} className="px-4 py-2 bg-yellow-500 rounded text-white">Apply</button>
        </div>

        <div className="mt-4 text-right">
          <p>Subtotal: ${total.toFixed(2)}</p>
          {discount > 0 && <p>Discount: {(discount * 100).toFixed(0)}%</p>}
          <p className="text-xl font-bold">Total: ${finalTotal}</p>
        </div>

        <button onClick={onPurchase} disabled={cart.length === 0} className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg disabled:opacity-50">Complete Purchase</button>
      </div>
    </div>
  )
}