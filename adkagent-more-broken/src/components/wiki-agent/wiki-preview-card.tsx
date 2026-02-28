'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Globe } from 'lucide-react';

interface WikiPreviewData {
  title: string;
  excerpt: string;
  thumbnail?: string;
  url: string;
}

interface WikiPreviewCardProps {
  url: string;
}

function extractTitleFromUrl(url: string): string | null {
  try {
    const match = url.match(/\/wiki\/(.+)$/);
    if (match) return decodeURIComponent(match[1].replace(/_/g, ' '));
  } catch {}
  return null;
}

export function WikiPreviewCard({ url }: WikiPreviewCardProps) {
  const [data, setData] = useState<WikiPreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const title = extractTitleFromUrl(url);
    if (!title) {
      setError(true);
      setLoading(false);
      return;
    }

    const encoded = encodeURIComponent(title);
    // Use Wikipedia REST API for summary (includes thumbnail + extract)
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((json) => {
        setData({
          title: json.title || title,
          excerpt: json.extract || '',
          thumbnail: json.thumbnail?.source,
          url,
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) {
    return (
      <Card className="flex gap-3 p-3 w-full">
        <Skeleton className="h-16 w-16 rounded shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <Skeleton className="h-3.5 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-secondary text-primary hover:bg-primary/10 transition-colors border border-primary/20"
      >
        <Globe className="h-3 w-3" />
        Wikipedia
        <ExternalLink className="h-2.5 w-2.5 opacity-60" />
      </a>
    );
  }

  return (
    <a href={data.url} target="_blank" rel="noopener noreferrer" className="block w-full">
      <Card className="flex gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer border border-border/60">
        {data.thumbnail ? (
          <img
            src={data.thumbnail}
            alt={data.title}
            className="h-16 w-16 rounded object-cover shrink-0"
          />
        ) : (
          <div className="h-16 w-16 rounded bg-muted flex items-center justify-center shrink-0">
            <Globe className="h-6 w-6 text-muted-foreground/50" />
          </div>
        )}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-foreground truncate">{data.title}</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
          </div>
          <p className="text-[11px] leading-snug text-muted-foreground line-clamp-2">
            {data.excerpt}
          </p>
          <span className="text-[10px] text-primary/60 truncate">{data.url}</span>
        </div>
      </Card>
    </a>
  );
}
