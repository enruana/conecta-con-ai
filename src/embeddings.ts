import OpenAI from 'openai';
const openai = new OpenAI();

const generateEmbeddings = async (text: string): Promise<number[]> => {
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
    encoding_format: 'float',
  });
  return embedding.data[0].embedding;
};

export const saveEmbeddings = async (): Promise<void> => {
  const inputs = [
    'gato',
    'perro',
    'oso',
    'elefante',
    'jirafa',
    'tigre',
    'león',
    'leopardo',
  ];

  const embeddings = await Promise.all(inputs.map(generateEmbeddings));

  // Create an array of objects relating each input with its embedding
  const relatedData = inputs.map((input, index) => ({
    input,
    embedding: embeddings[index],
  }));

  // Save the related data to a file
  await import('fs/promises').then((fs) =>
    fs.writeFile('embeddings.json', JSON.stringify(relatedData, null, 2)),
  );
};

export const testEmbeddings = async (): Promise<void> => {
  const input = 'animal';

  // load the saved embeddings
  const embeddings: { input: string; embedding: number[] }[] = JSON.parse(
    await import('fs/promises').then((fs) =>
      fs.readFile('embeddings.json', 'utf-8'),
    ),
  );

  // generate the embedding for the input
  const inputEmbedding = await generateEmbeddings(input);

  // calculate the cosine similarity between the input and the embeddings
  console.log(`Similarity with ${input}:`);
  const similarities = embeddings.map(embedding => ({
    input: embedding.input,
    similarity: _cosineSimilarity(inputEmbedding, embedding.embedding)
  }));
  
  similarities.sort((a, b) => b.similarity - a.similarity);
  
  for (const {input, similarity} of similarities) {
    console.log(`${input}: ${similarity}`);
  }
};

const _dotProduct = (a: number[], b: number[]): number => {
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
};

const _cosineSimilarity = (a: number[], b: number[]): number => {
  const dotProduct = _dotProduct(a, b);
  const magnitudeA = Math.sqrt(
    a.reduce((sum, value) => sum + value * value, 0),
  );
  const magnitudeB = Math.sqrt(
    b.reduce((sum, value) => sum + value * value, 0),
  );
  return dotProduct / (magnitudeA * magnitudeB);
};
