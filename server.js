import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.post('/api/getTechInfo', async (req, res) => {
    const { username } = req.body;

    try {
        const openaiResponse = await axios.post('https://api.openai.com/v1/completions', {
            prompt: `Get tech stack, known languages, and learning recommendations for ${username}.`,
            model: 'text-davinci-003',
            max_tokens: 100,
        }, {
            headers: {
                ' Key': 'Authorization',
                'Value': 'Bearer sk-proj-Tyzydp8I9gQvVvlExLpLT3BlbkFJwEwGydrP7RzdxrN7hGrs',
                'Content-Type': 'application/json'
            }
        });

        const techInfo = openaiResponse.data.choices[0].text.trim();

        // Extract tech stack, known languages, and learning recommendations from the response
        const techStack = techInfo.match(/Tech Stack: (.*?)(?:\n|$)/)[1];
        const knownLanguages = techInfo.match(/Known Languages: (.*?)(?:\n|$)/)[1];
        const toLearn = techInfo.match(/To Learn: (.*?)(?:\n|$)/)[1];

        res.json({ techStack, knownLanguages, toLearn });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: 'Failed to fetch tech information' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
