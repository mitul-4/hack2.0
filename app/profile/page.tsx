'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const DIETARY_OPTIONS = [
  'Vegan',
  'Vegetarian',
  'Pescatarian',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Paleo',
  'Low-Carb',
  'Low-Fat',
  'Halal',
  'Kosher'
]

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [preferences, setPreferences] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
    if (session?.user?.dietaryPreferences) {
      setPreferences(session.user.dietaryPreferences.map(pref => pref.type || pref))
    }
  }, [session, status, router])

  const handlePreferenceToggle = (preference: string) => {
    setPreferences(prev =>
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences }),
      })

      if (!response.ok) throw new Error('Failed to save preferences')

      setMessage('Preferences saved successfully!')
      router.refresh() // Refresh the session data
    } catch (error) {
      setMessage('Failed to save preferences. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (status === 'loading') {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Your Information</h2>
          <div className="flex items-center space-x-4">
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt=""
                className="h-16 w-16 rounded-full"
              />
            )}
            <div>
              <div className="font-medium">{session?.user?.name}</div>
              <div className="text-gray-500">{session?.user?.email}</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Dietary Preferences</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {DIETARY_OPTIONS.map((preference) => (
              <label
                key={preference}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={preferences.includes(preference)}
                  onChange={() => handlePreferenceToggle(preference)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{preference}</span>
              </label>
            ))}
          </div>

          {message && (
            <div className={`mb-4 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  )
} 