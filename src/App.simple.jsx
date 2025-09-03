// EMERGENCY SIMPLE APP - No imports, just basic React
import { useState } from 'react'

function SimpleApp() {
  const [message, setMessage] = useState('App is loading...')

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'green' }}>✅ SIMPLE APP WORKS</h1>
      <p>{message}</p>
      
      <div style={{ background: '#f0f0f0', padding: '20px', margin: '20px 0' }}>
        <h2>LOGIN FORM (Simple Version)</h2>
        <input type="text" placeholder="Team ID" style={{ margin: '5px', padding: '8px' }} />
        <input type="password" placeholder="Password" style={{ margin: '5px', padding: '8px' }} />
        <button style={{ margin: '5px', padding: '8px 16px', background: 'teal', color: 'white', border: 'none' }}>
          Login
        </button>
      </div>
      
      <button 
        onClick={() => setMessage('Button clicked! React is working!')}
        style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none' }}
      >
        Test React
      </button>
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        If you see this, React is working but there might be an issue with the main App component imports.
      </div>
    </div>
  )
}

export default SimpleApp