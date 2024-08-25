import { useEffect } from 'react'
import { storeData } from './lib/utils';
import './App.css'
import Dashboard from './components/Dashboard'

function App() {
  useEffect(() => {
    storeData();
  }, []);

  return (
    <>
      <div className=''>
        <Dashboard />
      </div>
    </>
  )
}

export default App
