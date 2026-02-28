import { ChatContainer } from '@/components/wiki-agent/chat-container';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-headline font-bold text-primary mb-2">WikiAgent</h1>
          <p className="text-muted-foreground">AI-Powered Wikipedia Assistant — Ask any factual question</p>
        </div>
        <ChatContainer />
      </div>
    </main>
  );
}
