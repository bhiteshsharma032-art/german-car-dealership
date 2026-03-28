import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const WEBHOOK_URL = 'https://n8n.srv967587.hstgr.cloud/webhook/7a2239d3-9c80-44e2-b83f-c1bef0832e89';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          timestamp: new Date().toISOString(),
          source: 'nordhessen-automobile-chat',
        }),
      });

      const data = await response.json();
      
      // Only show the response from webhook
      if (data.response || data.message || data.output) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || data.message || data.output || 'Entschuldigung, ich konnte Ihre Nachricht nicht verarbeiten.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Entschuldigung, es gab ein technisches Problem. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt unter +49 561 930 04 649.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center',
          'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-xl hover:shadow-red-500/50 transform hover:scale-110',
          'text-white font-semibold',
          isOpen && 'rotate-180'
        )}
        aria-label="Chat öffnen"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 h-[500px] bg-[#1a1a1f]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Nordhessen Assistant</h3>
              <p className="text-xs opacity-90">Online • Antwortet sofort</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-2 animate-fadeIn',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'bot' && (
                  <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-red-500/50">
                    <Bot className="h-3 w-3 text-red-500" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[70%] p-3 rounded-2xl text-sm',
                    message.sender === 'user'
                      ? 'bg-red-500 text-white rounded-br-md'
                      : 'bg-[#2b2b36] text-white rounded-bl-md border border-white/10'
                  )}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-red-500/50">
                  <Bot className="h-3 w-3 text-red-500" />
                </div>
                <div className="bg-[#2b2b36] p-3 rounded-2xl rounded-bl-md border border-white/10">
                  <div className="flex items-center gap-2 text-white/70">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Tippt...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-[#1a1a1f]">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Schreiben Sie Ihre Nachricht..."
                className="flex-1 px-4 py-2 bg-[#2b2b36] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm text-white placeholder-white/50"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isLoading}
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                  'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                aria-label="Nachricht senden"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-white/50 mt-2 text-center">
              Powered by Nordhessen Automobile AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
