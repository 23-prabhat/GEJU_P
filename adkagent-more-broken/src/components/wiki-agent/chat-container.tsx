'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, type Message } from './chat-message';
import { answerQuestionWithWikipedia } from '@/ai/flows/answer-question-with-wikipedia';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Send, Loader2, Trash2, Bot, Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatContainerProps {
  suggestions?: string[];
}

export function ChatContainer({ suggestions }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: 'Unsupported', description: 'Your browser does not support speech recognition.' });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + ' ' + transcript : transcript));
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast({ title: 'Error', description: 'Speech recognition failed. Please try again.' });
    };
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClear = () => {
    setMessages([]);
    toast({ title: 'Chat cleared', description: 'Conversation history has been removed.' });
  };

  const submitQuestion = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await answerQuestionWithWikipedia({ question: question.trim() });
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while searching Wikipedia. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast({ title: 'Error', description: 'Failed to fetch answer. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitQuestion(input);
  };

  return (
    <TooltipProvider>
      <Card className="flex flex-col h-[600px] shadow-lg">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <Bot className={`h-5 w-5 text-primary transition-all ${isLoading ? 'animate-pulse' : ''}`} />
            <CardTitle className="text-base font-semibold">Chat</CardTitle>
            <Badge variant="secondary" className="text-[10px]">
              {messages.filter((m) => m.role === 'user').length} questions
            </Badge>
          </div>
          {messages.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClear}>
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear chat history</TooltipContent>
            </Tooltip>
          )}
        </CardHeader>

        <Separator />

        {/* Messages */}
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3 py-16">
                <Bot className="h-12 w-12 opacity-30" />
                <p className="text-sm">Ask a question to get started!</p>
                {suggestions && suggestions.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {suggestions.map((q) => (
                      <Badge
                        key={q}
                        variant="outline"
                        className="cursor-pointer text-xs py-1 px-3 hover:bg-primary/10 transition-colors"
                        onClick={() => submitQuestion(q)}
                      >
                        {q}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex gap-3 items-start">
                    <Avatar className="h-8 w-8 mt-1 shrink-0 animate-pulse ring-2 ring-primary/40 ring-offset-2 ring-offset-background">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        <Bot className="h-4 w-4 animate-bounce" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2 max-w-[85%]">
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide px-1">WikiAgent</span>
                      <div className="rounded-lg bg-card border p-3 shadow-sm">
                        <div className="flex flex-col gap-2">
                          <Skeleton className="h-4 w-64" />
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-4 w-56" />
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground mt-2">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span className="text-xs">Searching Wikipedia...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </CardContent>

        <Separator />

        {/* Input */}
        <CardFooter className="p-3">
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a factual question..."
              className="flex-1 resize-none min-h-[40px]"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={isListening ? 'destructive' : 'outline'}
                  size="icon"
                  onClick={toggleVoiceInput}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff className="h-4 w-4 animate-pulse" /> : <Mic className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isListening ? 'Stop listening' : 'Voice input'}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </form>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
