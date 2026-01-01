import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, ExternalLink } from "lucide-react";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function Browser() {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const [iframeKey, setIframeKey] = useState(0);

  if (!url) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="bg-[#1A1A2E] border-white/10 p-8 text-center">
          <p className="text-white/50">No URL provided</p>
          <Link to={createPageUrl('Dashboard')}>
            <Button className="mt-4 bg-[#9945FF] hover:bg-[#8035EE]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 left-20 lg:left-64 top-16 flex flex-col p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-4">
        <Link to={createPageUrl('Dashboard')}>
          <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white/70 text-sm truncate">
          {url}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/50 hover:text-white hover:bg-white/10"
          onClick={() => setIframeKey(prev => prev + 1)}
        >
          <RefreshCw className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/50 hover:text-white hover:bg-white/10"
          onClick={() => window.open(url, '_blank')}
        >
          <ExternalLink className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 bg-[#1A1A2E] border border-white/10 rounded-2xl overflow-hidden">
        <iframe
          key={iframeKey}
          src={url}
          className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          title="Browser View"
        />
      </div>
    </div>
  );
}