import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Apples', price: 3 },
  { id: 2, name: 'Bananas', price: 2 },
  { id: 3, name: 'Bread', price: 4 },
  { id: 4, name: 'Chicken', price: 8 },
  { id: 5, name: 'Soda', price: 2 },
  { id: 6, name: 'Chocolate', price: 1.5 }
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
          {products.map(p => <div key={p.id}>{p.name} - ${p.price} <button onClick={()=>addToCart(p)}>Add</button></div>)}
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