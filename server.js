import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: meta.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/sendMsgToOpenAI', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json({ text: response.data.choices[0].text });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Failed to fetch from OpenAI API' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
