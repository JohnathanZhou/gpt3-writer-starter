import { Configuration, OpenAIApi } from 'openai';
require('dotenv').config();


const configuration = new Configuration({
//   apiKey: "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",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "you are a famous youtuber who is known for video essays. you are going to generate a script based on the following title: ";
const generateAction = async (req, res) => {
  console.log(process.env);
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;