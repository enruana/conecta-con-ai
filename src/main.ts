import { testTextGeneration } from './text-generation.js';
import { testVision, testVisionWithLocalImage } from './vision.js';
import {
  testImageGeneration,
  testImageEdit,
  testImageVariation,
} from './image-generation.js';
import { testAudio, testAudioInAudioOut } from './audio.js';
import { testSpeechToText, testTextToSpeech } from './tts-stt.js';
import inquirer from 'inquirer';
import { saveEmbeddings, testEmbeddings } from './embeddings.js';

// Define the available test options
enum TestOption {
  TextGeneration = '1',
  Vision = '2',
  VisionLocalImage = '3',
  ImageGeneration = '4',
  ImageEdit = '5',
  ImageVariation = '6',
  Audio = '7',
  AudioInOut = '8',
  TextToSpeech = '9',
  SpeechToText = '10',
  SaveEmbeddings = '11',
  TestEmbeddings = '12',
}

const TEST_CHOICES = [
  { name: 'Text Generation', value: TestOption.TextGeneration },
  { name: 'Vision', value: TestOption.Vision },
  { name: 'Vision with Local Image', value: TestOption.VisionLocalImage },
  { name: 'Image Generation', value: TestOption.ImageGeneration },
  { name: 'Image Edit', value: TestOption.ImageEdit },
  { name: 'Image Variation', value: TestOption.ImageVariation },
  { name: 'Audio', value: TestOption.Audio },
  { name: 'Audio In/Out', value: TestOption.AudioInOut },
  { name: 'Text to Speech', value: TestOption.TextToSpeech },
  { name: 'Speech to Text', value: TestOption.SpeechToText },
  { name: 'Save Embeddings', value: TestOption.SaveEmbeddings },
  { name: 'Test Embeddings', value: TestOption.TestEmbeddings },
] as const;

async function runSelectedTest(selection: TestOption): Promise<void> {
  switch (selection) {
    case TestOption.TextGeneration:
      await testTextGeneration();
      break;
    case TestOption.Vision:
      await testVision();
      break;
    case TestOption.VisionLocalImage:
      await testVisionWithLocalImage();
      break;
    case TestOption.ImageGeneration:
      await testImageGeneration();
      break;
    case TestOption.ImageEdit:
      await testImageEdit();
      break;
    case TestOption.ImageVariation:
      await testImageVariation();
      break;
    case TestOption.Audio:
      await testAudio();
      break;
    case TestOption.AudioInOut:
      await testAudioInAudioOut();
      break;
    case TestOption.TextToSpeech:
      await testTextToSpeech();
      break;
    case TestOption.SpeechToText:
      await testSpeechToText();
      break;
    case TestOption.SaveEmbeddings:
      await saveEmbeddings();
      break;
    case TestOption.TestEmbeddings:
      await testEmbeddings();
      break;
    default:
      throw new Error(`Unsupported test option: ${selection}`);
  }
}

async function main(): Promise<void> {
  try {
    const { selection } = await inquirer.prompt<{ selection: TestOption }>([
      {
        type: 'list',
        name: 'selection',
        message: 'Please select which test you want to run:',
        choices: TEST_CHOICES,
      },
    ]);

    await runSelectedTest(selection);
    process.exit(0);
  } catch (error) {
    console.error(
      'Error running test:',
      error instanceof Error ? error.message : 'Unknown error occurred',
    );
    process.exit(1);
  }
}

// Execute the main function
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
