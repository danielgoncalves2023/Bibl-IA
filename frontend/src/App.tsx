import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img 
              src={viteLogo} 
              className="h-24 w-24 hover:rotate-180 transition-transform duration-1000" 
              alt="Vite logo" 
            />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img 
              src={reactLogo} 
              className="h-24 w-24 animate-spin-slow hover:animate-spin" 
              alt="React logo" 
            />
          </a>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Vite + React + TypeScript + Tailwind
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
          >
            count is {count}
          </button>
          
          <p className="text-gray-600 mb-4">
            Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
          </p>
          
          <p className="text-sm text-gray-500">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
