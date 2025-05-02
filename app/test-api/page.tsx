"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestApiPage() {
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const testApi = async () => {
    setIsLoading(true)
    setError('')
    setResult('')

    try {
      // Use environment variable for backend URL
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/health`)
      
      // Log response status for debugging
      console.log('Response status:', response.status)
      
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('API test error:', error)
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <Button 
        onClick={testApi} 
        disabled={isLoading}
        className="mb-4"
      >
        {isLoading ? 'Testing...' : 'Test API Connection'}
      </Button>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error:</p>
          <pre className="mt-2 whitespace-pre-wrap">{error}</pre>
        </div>
      )}
      
      {result && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-bold">API Response:</p>
          <pre className="mt-2 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  )
} 