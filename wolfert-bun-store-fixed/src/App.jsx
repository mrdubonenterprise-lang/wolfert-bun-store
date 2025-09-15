
import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Apples', price: 3, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=100&q=80', category: 'Fruits' },
  { id: 2, name: 'Bananas', price: 2, image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e9a0?auto=format&fit=crop&w=100&q=80', category: 'Fruits' },
  { id: 3, name: 'Bread', price: 4, image: 'https://images.unsplash.com/photo-1604908177524-0c39ef0d0f06?auto=format&fit=crop&w=100&q=80', category: 'Bakery' },
  { id: 4, name: 'Chicken Breast', price: 8, image: 'https://images.unsplash.com/photo-1605475128307-6b9d40b8572f?auto=format&fit=crop&w=100&q=80', category: 'Meat' },
  { id: 5, name: 'Soda', price: 2, image: 'https://images.unsplash.com/photo-1591054332839-9ed76e5b1ff2?auto=format&fit=crop&w=100&q=80', category: 'Drinks' },
  { id: 6, name: 'Chocolate Bar', price: 1.5, image: 'https://images.unsplash.com/photo-1603046891343-0ebec9f0df2d?auto=format&fit=crop&w=100&q=80', category: 'Sweets' },
  { id: 7, name: 'Carrots', price: 2, image: 'https://images.unsplash.com/photo-1582515073490-d01d2e9b0c6e?auto=format&fit=crop&w=100&q=80', category: 'Vegetables' },
  { id: 8, name: 'Milk', price: 3, image: 'https://images.unsplash.com/photo-1585238342029-94b23b3de93b?auto=format&fit=crop&w=100&q=80', category: 'Drinks' },
  { id: 9, name: 'Cheese', price: 5, image: 'https://images.unsplash.com/photo-1585238341882-964a3bdfeb08?auto=format&fit=crop&w=100&q=80', category: 'Dairy' },
  { id: 10, name: 'Orange Juice', price: 3, image: 'https://images.unsplash.com/photo-1571044015373-7f1dc2cf1f8d?auto=format&fit=crop&w=100&q=80', category: 'Drinks' },
  { id: 11, name: 'Tomatoes', price: 2.5, image: 'https://images.unsplash.com/photo-1606813907617-8fcf63e3ed0f?auto=format&fit=crop&w=100&q=80', category: 'Vegetables' },
  { id: 12, name: 'Lettuce', price: 2, image: 'https://images.unsplash.com/photo-1572331169932-4b2c7a70c1f2?auto=format&fit=crop&w=100&q=80', category: 'Vegetables' },
  { id: 13, name: 'Yogurt', price: 1.5, image: 'https://images.unsplash.com/photo-1606813907563-92d4c73b4d0c?auto=format&fit=crop&w=100&q=80', category: 'Dairy' },
  { id: 14, name: 'Eggs', price: 2.5, image: 'https://images.unsplash.com/photo-1585238342053-998e7860c2d3?auto=format&fit=crop&w=100&q=80', category: 'Dairy' },
  { id: 15, name: 'Strawberries', price: 4, image: 'https://images.unsplash.com/photo-1592928307688-17abf0947ef2?auto=format&fit=crop&w=100&q=80', category: 'Fruits' }
  // You can continue adding more products up to 50-100 as needed
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [perks, setPerks] = useState(0);
  const [cash, setCash] = useState(100);
  const [tab, setTab] = useState('store');
  const [receipts, setReceipts] = useState([]);

  const addToCart = (p) => setCart([...cart, p]);

  const checkout = () => {
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    if(cash < total){ alert('Not enough cash!'); return; }
    setCash(cash - total);
    const earned = Math.floor(total);
    setPerks(perks + earned);
    const receipt = { id: Date.now(), date: new Date().toLocaleString(), items: [...cart], total, earnedPerks: earned };
    setReceipts([...receipts, receipt]);
    setCart([]);
    alert(`Purchase complete! You earned ${earned} perks.`);
  }

  return (
    <div style={{padding:'20px'}}>
      <h1>🐺 Wolfert the Bun Store</h1>
      <button onClick={()=>setTab('store')}>Store</button>
      <button onClick={()=>setTab('gas')}>Gas</button>
      <button onClick={()=>setTab('receipts')}>Receipts</button>

      {tab==='store' && (
        <div>
          <h2>Products</h2>
          {products.map(p => (
            <div key={p.id}>
              <img src={p.image} alt={p.name} width={100} height={100} />
              <div>{p.name} - ${p.price} <button onClick={()=>addToCart(p)}>Add</button></div>
            </div>
          ))}
          <h3>Cart</h3>
          {cart.map((i,j)=><div key={j}>{i.name} - ${i.price}</div>)}
          <button onClick={checkout}>Checkout</button>
        </div>
      )}

      {tab==='gas' && <div><h2>Gas Station</h2><p>You have {perks} perks</p></div>}

      {tab==='receipts' && (
        <div>
          <h2>Receipts</h2>
          {receipts.map(r=><div key={r.id}><p>Receipt #{r.id} - {r.date}</p>{r.items.map((i,j)=><p key={j}>{i.name} - ${i.price}</p>)}<p>Total: ${r.total}</p><p>Perks: {r.earnedPerks}</p></div>)}
        </div>
      )}

      <div><p>Cash: ${cash}</p><p>Total Perks: {perks}</p></div>
    </div>
  )
}
