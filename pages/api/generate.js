import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// console.log(req.body.userInput);

const basePromptPrefix = "You are a seasoned recruiter at a tech company, and you have to give insights and a 6 week plan to improve my skills based on the information i am providing to you- ";
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix} I interview at the company:${req.body.tag1}, the tech stack of the company is: ${req.body.tag3}. My Preparation level was ${req.body.tag4} out of 10. I was not able to answer questions related to the topics ${req.body.tag2}  (also write a motivational quote to inspire me in the end.)`,
        temperature: 0.7,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;