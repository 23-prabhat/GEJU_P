import { ai } from '@/ai/genkit';
import { NextRequest } from 'next/server';

// Reuse the Wikipedia search logic
async function searchWikipedia(query: string) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${encodeURIComponent(query)}&srlimit=3`;

  try {
    const searchResponse = await fetch(searchUrl);
    const searchData: any = await searchResponse.json();

    if (!searchData?.query?.search?.length) return [];

    const results: { title: string; extract: string; url: string }[] = [];

    for (const result of searchData.query.search) {
      const title = result.title;
      const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;

      const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&format=json&prop=extracts&exintro&explaintext`;
      const extractResponse = await fetch(extractUrl);
      const extractData: any = await extractResponse.json();

      let extract = '';
      if (extractData?.query?.pages) {
        const pageId = Object.keys(extractData.query.pages)[0];
        extract = extractData.query.pages[pageId].extract || '';
      }

      results.push({ title, extract, url: pageUrl });
    }
    return results;
  } catch (error) {
    console.error('Error fetching from Wikipedia:', error);
    return [];
  }
}

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question || typeof question !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing question' }), { status: 400 });
  }

  // Phase 1: Search Wikipedia (non-streamed)
  const wikiResults = await searchWikipedia(question);
  const sources = wikiResults.map((r) => r.url);

  const wikiContext = wikiResults
    .map((r) => `## ${r.title}\n${r.extract}\nURL: ${r.url}`)
    .join('\n\n');

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Send sources immediately so the client can render them
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: 'sources', sources })}\n\n`)
      );

      try {
        // Phase 2: Stream the answer generation
        const { stream: genkitStream, response } = ai.generateStream({
          prompt: `You are a helpful AI assistant that answers factual questions using Wikipedia.
Based on the following Wikipedia articles, synthesize a clear, accurate, and concise answer to the user's question.

Wikipedia Articles:
${wikiContext || 'No articles found.'}

User's question: ${question}

Provide a direct, well-structured answer. If no Wikipedia articles were found, let the user know you couldn't find relevant information.`,
        });

        for await (const chunk of genkitStream) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'token', text })}\n\n`)
            );
          }
        }

        // Wait for the full response to complete
        await response;

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`)
        );
      } catch (error) {
        console.error('Stream error:', error);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: 'error', message: 'Failed to generate answer' })}\n\n`
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
