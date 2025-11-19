const apiKey = "AIzaSyBELapTPGMg4zmrrD7PUgwPovzuYx4-WbA";

const { GoogleGenAI } = require('@google/genai');
const mime = require('mime');
const { writeFile } = require('fs');

function saveBinaryFile(fileName, content) {
  writeFile(fileName, content, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file ${fileName}:`, err);
      return;
    }
    console.log(`File ${fileName} saved to file system.`);
  });
}

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const config = {
    responseModalities: ['IMAGE', 'TEXT'],
    imageConfig: {
      imageSize: '1K',
    },
  };

  const model = 'gemini-2.5-flash-image';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fileIndex = 0;

  for await (const chunk of response) {
    if (
      !chunk.candidates ||
      !chunk.candidates[0].content ||
      !chunk.candidates[0].content.parts
    ) {
      continue;
    }

    const part = chunk.candidates[0].content.parts[0];

    if (part.inlineData) {
      const fileName = `ENTER_FILE_NAME_${fileIndex++}`;
      const inlineData = part.inlineData;
      const fileExtension = mime.getExtension(inlineData.mimeType || '');
      const buffer = Buffer.from(inlineData.data || '', 'base64');

      saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
    } else {
      console.log(chunk.text);
    }
  }
}

main();
