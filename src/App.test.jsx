// Minimal test to check if app renders
import App from './App.micro.jsx'

function TestApp() {
  return (
    <div style={{ padding: '20px', background: 'yellow' }}>
      <h1>🔥 EMERGENCY TEST - APP IS LOADING</h1>
      <p>If you see this, React is working</p>
      <hr />
      <App />
    </div>
  )
}

export default TestApp