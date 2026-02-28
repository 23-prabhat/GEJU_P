import { ChatContainer } from '@/components/wiki-agent/chat-container';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl py-8 px-4">
        {/* Header */}
        <div className="relative text-center mb-6">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-4xl font-headline font-bold text-primary">WikiAgent</h1>
            <Badge variant="secondary" className="text-xs">AI Powered</Badge>
          </div>
          <p className="text-muted-foreground">Ask any factual question — answers sourced from Wikipedia</p>
        </div>

        <Separator className="mb-6" />

        {/* Chat */}
        <ChatContainer
          suggestions={[
            'What is quantum computing?',
            'History of the Internet',
            'How does photosynthesis work?',
            'Who invented the telephone?',
          ]}
        />

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Powered by Gemini AI &amp; Wikipedia &middot; Answers may not always be accurate
          </p>
        </div>
      </div>
    </main>
  );
}
