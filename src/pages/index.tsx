import { useState } from 'react'

function Home() {
  const [text, setText] = useState('')
  const [choiceText, setChoiceText] = useState<string>('')

  const onRequest = async (message: string) => {
    try {
      const baseURL = process.env.VERCEL_URL || process.env.BASE_URL
      const response = await fetch(`${baseURL}/api/openai?message=${message}`)
      const json = await response.json()

      setChoiceText(json.choices[0].text)
    } catch (error) {
      setChoiceText('')
      console.log(error)
    }
  }

  return (
    <main style={{ padding: '10%' }}>
      <textarea
        style={{ width: '100%', padding: '8px' }}
        rows={5}
        placeholder="Type your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => e.code === 'Enter' && onRequest(text)}
      />
      <br />
      <button style={{ padding: '4px 8px' }} onClick={() => onRequest(text)}>
        Send
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
