import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, User, Bot, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  sources?: string[];
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

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
          'p-3 text-sm leading-relaxed shadow-sm',
          isUser ? 'bg-primary text-white border-primary' : 'bg-card text-foreground'
        )}>
          {message.content}
        </Card>

        {/* Source links */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            <Badge variant="outline" className="text-[10px] px-2 py-0">
              {message.sources.length} source{message.sources.length > 1 ? 's' : ''}
            </Badge>
            {message.sources.map((source, idx) => (
              <a
                key={idx}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-secondary text-primary hover:bg-primary/10 transition-colors border border-primary/20"
              >
                <Globe className="h-3 w-3" />
                Reference {idx + 1}
                <ExternalLink className="h-2.5 w-2.5 opacity-60" />
              </a>
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
