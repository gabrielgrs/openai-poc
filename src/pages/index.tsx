import { useState } from 'react'

function Home() {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [choiceText, setChoiceText] = useState<string>('')

  const onRequest = async (message: string) => {
    try {
      setLoading(true)
      const url = `${process.env.BASE_URL}/api/openai?message=${message}`
      const response = await fetch(url)
      const json = await response.json()

      setChoiceText(json.choices[0].text)
    } catch (error) {
      setChoiceText('')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '10%' }}>
      <textarea
        disabled={loading}
        style={{ width: '100%', padding: '8px' }}
        rows={5}
        placeholder="Type your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => e.code === 'Enter' && onRequest(text)}
      />
      <br />
      <button
        disabled={loading}
        style={{ padding: '4px 8px' }}
        onClick={() => onRequest(text)}
      >
        {loading ? 'Loading...' : 'Send'}
      </button>

      <br />
      <br />
      {choiceText && (
        <div>
          <strong>Response:</strong>
          <br />
          {choiceText}
        </div>
      )}
    </main>
  )
}

export default Home
