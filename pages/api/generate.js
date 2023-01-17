import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    const sender = req.body.sender || '';
    const reciever = req.body.reciever || '';
    const keyInfo = req.body.keyInfo || '';
    const chosenStyle = req.body.isSelected || '';
    const isInformal = req.body.isInformal || '';
    const isHumorous = req.body.isHumorous || '';




    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(sender, reciever, keyInfo, chosenStyle),
            temperature: 0.6,
            max_tokens: 300,
        });
        const text = completion.data.choices[0].text;
        const textWithBreaks = text.replace(/\n/g, "<br>");
        res.status(200).json({ result: textWithBreaks });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

function generatePrompt(sender, reciever, keyInfo, chosenStyle) {
    const capitalizedSender = sender[0].toUpperCase() + sender.slice(1).toLowerCase();
    const capitalizedReciever = reciever[0].toUpperCase() + reciever.slice(1).toLowerCase();
    const capitalizedKeyInput = keyInfo[0].toUpperCase() + keyInfo.slice(1).toLowerCase();
    return `Write an email including the following Informations: 
  Sender: ${capitalizedSender} 
  Reciever: ${capitalizedReciever}
  Key informations: ${capitalizedKeyInput}
  Style of the mail: ${chosenStyle}`;
}
/*process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
  });
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req, res) {

    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }
        const sender = req.body.sender || '';
        const receiver = req.body.receiver || '';
        const key_info = req.body.key_info || '';
        const animal = req.body.animal || '';
        console.log(sender, receiver, key_info)





    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompts(animal),
            temperature: 0.6,
        });
        res.status(200).json({ result: completion });
    } catch (error) {
        if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}`);
          }
    }
}

function generatePrompts(animal) {
    const capitalizedAnimal =
        animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}

function generatePrompt(senderInput, receiverInput, keyInput) {
    return `Write an email including the following Informations:
Sender: ${senderInput}
Receiver:${receiverInput}
Key Content Informations:${keyInput}`;
}
*/