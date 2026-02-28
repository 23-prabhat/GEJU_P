import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { User, Bot, Copy, Check, Volume2, Square } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { WikiPreviewCard } from './wiki-preview-card';

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  sources?: string[];
}

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReadAloud = useCallback(() => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.rate = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    utteranceRef.current = utterance;
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, message.content]);

  return (
    <div className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {/* Avatar for assistant */}
      {!isUser && (
        <Avatar className="h-8 w-8 mt-1 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn('flex flex-col max-w-[80%] gap-1', isUser ? 'items-end' : 'items-start')}>
        {/* Role label */}
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide px-1">
          {isUser ? 'You' : 'WikiAgent'}
        </span>

        <Card className={cn(
          'p-3 text-sm leading-relaxed shadow-sm group relative',
          isUser ? 'bg-primary text-white border-primary' : 'bg-card text-foreground'
        )}>
          {message.content}
          {isStreaming && (
            <span className="inline-block w-1.5 h-4 ml-0.5 bg-primary animate-pulse rounded-sm align-text-bottom" />
          )}
          {!isUser && (
            <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleReadAloud}
                  >
                    {isSpeaking ? (
                      <Square className="h-3 w-3 text-red-500" />
                    ) : (
                      <Volume2 className="h-3 w-3 text-muted-foreground" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isSpeaking ? 'Stop reading' : 'Read aloud'}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{copied ? 'Copied!' : 'Copy to clipboard'}</TooltipContent>
              </Tooltip>
            </div>
          )}
        </Card>

        {/* Source preview cards */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-col gap-2 mt-2 w-full">
            <Badge variant="outline" className="text-[10px] px-2 py-0 w-fit">
              {message.sources.length} source{message.sources.length > 1 ? 's' : ''}
            </Badge>
            {message.sources.map((source, idx) => (
              <WikiPreviewCard key={idx} url={source} />
            ))}
          </div>
        )}
      </div>

      {/* Avatar for user */}
      {isUser && (
        <Avatar className="h-8 w-8 mt-1 shrink-0">
          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
