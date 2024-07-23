import { Configuration, OpenAIApi } from 'openai';

const ApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const configuration = new Configuration({
    apiKey: ApiKey,
});
const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(message) {
    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return res.data.choices[0].text;
}
