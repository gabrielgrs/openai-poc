// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const openAI = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { message } = req.query

    const response = await openAI.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
    })

    return res.status(200).send({ choices: response.data.choices })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export default handler
