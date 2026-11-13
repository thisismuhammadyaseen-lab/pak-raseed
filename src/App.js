import React, { useState } from 'react';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('receipt');
  const [themeColor, setThemeColor] = useState('#0f5132');

  // Page 1: Receipt States
  const [shopName, setShopName] = useState('Rohana Online Store');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('EasyPaisa');
  const [accountNumber, setAccountNumber] = useState('0300-1234567');
  const [deliveryFee, setDeliveryFee] = useState(0);

  const [items, setItems] = useState([
    { name: 'Ladies Cotton Suit', qty: 1, price: 2500 }
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState('');

  // Page 2: Profit Calculator States
  const [costPrice, setCostPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [courierCost, setCourierCost] = useState(250);
  const [adsCost, setAdsCost] = useState(0);

  const colors = [
    { name: 'Green', hex: '#0f5132' },
    { name: 'Blue', hex: '#1d4ed8' },
    { name: 'Purple', hex: '#6d28d9' },
    { name: 'Red', hex: '#b91c1c' },
    { name: 'Black', hex: '#1e293b' }
  ];

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    setItems([...items, { name: newItemName, qty: Number(newItemQty), price: Number(newItemPrice) }]);
    setNewItemName('');
    setNewItemQty(1);
    setNewItemPrice('');
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subTotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const grandTotal = subTotal + Number(deliveryFee || 0);
  const todayDate = new Date().toLocaleDateString('en-PK');
  const invoiceNo = Math.floor(100000 + Math.random() * 900000);

  // Profit Calculation
  const netProfit = Number(sellPrice || 0) - Number(costPrice || 0) - Number(courierCost || 0) - Number(adsCost || 0);

  return (
    <div style={styles.page}>
      {/* Top Navbar with 2 Page Buttons */}
      <div className="no-print" style={{ ...styles.navbar, backgroundColor: themeColor }}>
        <h2 style={{ margin: 0 }}>PakRaseed</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActivePage('receipt')}
            style={{
              ...styles.navBtn,
              backgroundColor: activePage === 'receipt' ? '#ffffff' : 'rgba(255,255,255,0.2)',
              color: activePage === 'receipt' ? themeColor : '#ffffff'
            }}
          >
            1. Receipt Maker
          </button>
          <button
            onClick={() => setActivePage('calculator')}
            style={{
              ...styles.navBtn,
              backgroundColor: activePage === 'calculator' ? '#ffffff' : 'rgba(255,255,255,0.2)',
              color: activePage === 'calculator' ? themeColor : '#ffffff'
            }}
          >
            2. Profit Calculator
          </button>
        </div>
      </div>

      {/* PAGE 1: RECEIPT MAKER */}
      {activePage === 'receipt' && (
        <div className="container" style={styles.container}>
          <div className="no-print" style={styles.card}>
            <div style={styles.colorBar}>
              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Select Receipt Color:</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setThemeColor(c.hex)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: c.hex,
                      border: themeColor === c.hex ? '3px solid #000' : '2px solid #fff',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                    }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <h3 style={{ ...styles.cardTitle, color: themeColor }}>1. Dukan Aur Customer Ki Maloomat</h3>
            <label style={styles.label}>Dukan / Brand Ka Naam</label>
            <input style={styles.input} value={shopName} onChange={(e) => setShopName(e.target.value)} />

            <div style={styles.row}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Customer Ka Naam</label>
                <input style={styles.input} placeholder="Ali Khan" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Customer Phone</label>
                <input style={styles.input} placeholder="03XX-XXXXXXX" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
              </div>
            </div>

            <div style={styles.row}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Payment Method</label>
                <select style={styles.input} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="EasyPaisa">EasyPaisa</option>
                  <option value="JazzCash">JazzCash</option>
                  <option value="Cash on Delivery (COD)">Cash on Delivery</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Account / EasyPaisa No</label>
                <input style={styles.input} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              </div>
            </div>

            <h3 style={{ ...styles.cardTitle, color: themeColor, marginTop: '25px' }}>2. Cheezein Shamil Karein (Add Items)</h3>
            <form onSubmit={addItem} style={styles.addItemBox}>
              <input style={styles.input} placeholder="Cheez ka naam (e.g. Watch)" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
              <div style={styles.row}>
                <input style={styles.input} type="number" min="1" placeholder="Tadad" value={newItemQty} onChange={(e) => setNewItemQty(e.target.value)} />
                <input style={styles.input} type="number" placeholder="Qeemat (Rs)" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} />
                <button type="submit" style={{ ...styles.addBtn, backgroundColor: themeColor }}>+ Add</button>
              </div>
            </form>

            <label style={styles.label}>Delivery Charges (Rs)</label>
            <input style={styles.input} type="number" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} />
          </div>

          <div className="print-area" style={{ ...styles.receipt, borderTop: `6px solid ${themeColor}` }}>
            <div style={styles.receiptTop}>
              <h2 style={{ margin: 0, color: themeColor }}>{shopName || 'Your Brand Name'}</h2>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>OFFICIAL PAYMENT RECEIPT</p>
            </div>

            <div style={styles.metaRow}>
              <span><strong>Date:</strong> {todayDate}</span>
              <span><strong>Receipt #:</strong> {invoiceNo}</span>
            </div>

            <div style={styles.customerBox}>
              <p style={{ margin: '3px 0' }}><strong>Customer:</strong> {customerName || 'Walk-in Customer'}</p>
              <p style={{ margin: '3px 0' }}><strong>Phone:</strong> {customerPhone || 'N/A'}</p>
              <p style={{ margin: '3px 0' }}><strong>Payment:</strong> {paymentMethod} ({accountNumber})</p>
            </div>

            <table style={styles.table}>
              <thead>
                <tr style={{ backgroundColor: '#e9ecef' }}>
                  <th style={styles.th}>Item</th>
                  <th style={styles.th}>Qty</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Total</th>
                  <th className="no-print" style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td style={styles.td}>{item.name}</td>
                    <td style={styles.td}>{item.qty}</td>
                    <td style={styles.td}>{item.price}</td>
                    <td style={styles.td}>{item.qty * item.price}</td>
                    <td className="no-print" style={styles.td}>
                      <button onClick={() => removeItem(idx)} style={styles.delBtn}>x</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={styles.totalsBox}>
              <p style={{ margin: '4px 0' }}>Subtotal: <strong>Rs. {subTotal}</strong></p>
              <p style={{ margin: '4px 0' }}>Delivery: <strong>Rs. {deliveryFee || 0}</strong></p>
              <h3 style={{ margin: '8px 0 0', color: themeColor, borderTop: `2px solid ${themeColor}`, paddingTop: '8px' }}>
                Grand Total: Rs. {grandTotal}
              </h3>
            </div>

            <button className="no-print" onClick={() => window.print()} style={{ ...styles.printBtn, backgroundColor: themeColor }}>
              Print / Download PDF Receipt
            </button>

            <p style={styles.brandFooter}>
              Powered by <strong>PakRaseed</strong> | Developed by <strong>Rohana</strong>
            </p>
          </div>
        </div>
      )}

      {/* PAGE 2: PROFIT CALCULATOR */}

      {activePage === 'calculator' && (
        <div className="container" style={styles.container}>
          <div style={{ ...styles.card, width: '480px', borderTop: `6px solid ${themeColor}` }}>
            <h3 style={{ ...styles.cardTitle, color: themeColor }}>Online Seller Profit & COD Calculator</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
              Apne order ka khalis munafa (Net Profit) maloom karein:
            </p>

            <label style={styles.label}>Cheez Ki Asal Qeemat / Khareed (Cost Price - Rs)</label>
            <input style={styles.input} type="number" placeholder="Maslan: 1200" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} />

            <label style={styles.label}>Customer Ko Farokht Qeemat (Selling Price - Rs)</label>
            <input style={styles.input} type="number" placeholder="Maslan: 2200" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} />

            <div style={styles.row}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Courier / Delivery Charges (Rs)</label>
                <input style={styles.input} type="number" value={courierCost} onChange={(e) => setCourierCost(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Facebook / TikTok Ads Kharcha (Rs)</label>
                <input style={styles.input} type="number" value={adsCost} onChange={(e) => setAdsCost(e.target.value)} />
              </div>
            </div>

            <div style={{
              marginTop: '25px',
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: netProfit >= 0 ? '#ecfdf5' : '#fef2f2',
              border: `2px solid ${netProfit >= 0 ? '#10b981' : '#ef4444'}`,
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '14px', color: '#475569', marginBottom: '5px' }}>Aap Ka Khalis Munafa (Net Profit)</p>
              <h2 style={{ fontSize: '28px', color: netProfit >= 0 ? '#047857' : '#b91c1c' }}>
                Rs. {netProfit}
              </h2>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
                {netProfit > 0 ? 'Zabardast! Yeh order munafe mein hai.' : netProfit < 0 ? 'Khabardar! Is order mein nuqsan ho raha hai.' : 'Qeemat darj karein'}
              </p>
            </div>

            <p style={styles.brandFooter}>
              Powered by <strong>PakRaseed</strong> | Developed by <strong>Rohana</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#eef2f6', minHeight: '100vh' },
  navbar: { color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', flexWrap: 'wrap', gap: '10px' },
  navBtn: { border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' },
  container: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', padding: '30px 15px' },
  card: { backgroundColor: '#fff', padding: '25px', borderRadius: '12px', width: '420px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' },
  colorBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '8px', marginBottom: '18px', border: '1px solid #e2e8f0' },
  cardTitle: { margin: '0 0 15px', fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' },
  row: { display: 'flex', gap: '10px' },
  label: { display: 'block', marginTop: '10px', fontSize: '13px', fontWeight: '600', color: '#333' },
  input: { width: '100%', padding: '9px', marginTop: '4px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px' },
  addItemBox: { backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '8px', border: '1px solid #e9ecef' },
  addBtn: { color: '#fff', border: 'none', borderRadius: '6px', padding: '0 18px', marginTop: '4px', cursor: 'pointer', fontWeight: 'bold' },
  receipt: { backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '400px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' },
  receiptTop: { textAlign: 'center', borderBottom: '2px dashed #ccc', paddingBottom: '12px' },
  metaRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#555', margin: '10px 0' },
  customerBox: { backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '15px' },
  th: { padding: '8px', textAlign: 'left', borderBottom: '1px solid #dee2e6' },
  td: { padding: '8px', borderBottom: '1px solid #eee' },
  delBtn: { backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px' },
  totalsBox: { textAlign: 'right', fontSize: '14px', marginTop: '10px' },
  printBtn: { width: '100%', padding: '12px', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' },
  brandFooter: { textAlign: 'center', fontSize: '11px', color: '#888', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px' }
};

export default App;
