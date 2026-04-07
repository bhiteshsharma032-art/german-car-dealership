import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const WEBHOOK_URL = 'https://n8n.srv967587.hstgr.cloud/webhook/c4c6a588-36f1-4c97-a405-272747948943';

export default function ChatBot() {
  const { t } = useLanguage();
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

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
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
      
      // Handle n8n response format (can be an array or object)
      const responseData = Array.isArray(data) ? data[0] : data;
      
      if (responseData && (responseData.response || responseData.message || responseData.output)) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseData.response || responseData.message || responseData.output || t('chat.error_generic'),
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t('chat.error_technical'),
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
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'fixed z-[110] w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center',
            'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-xl hover:shadow-red-500/50 transform hover:scale-110',
            'text-white font-semibold',
            'bottom-20 right-4 md:bottom-6 md:right-24'
          )}
          aria-label={t('chat.aria_open')}
        >
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      )}

      {/* Desktop toggle (close) button - only on desktop when open */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className={cn(
            'fixed z-[110] w-14 h-14 rounded-full shadow-lg transition-all duration-300 items-center justify-center',
            'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-xl hover:shadow-red-500/50 transform hover:scale-110',
            'text-white font-semibold',
            'hidden md:flex md:bottom-6 md:right-24'
          )}
          aria-label={t('chat.aria_open')}
        >
          <X className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            'fixed z-[105] shadow-2xl flex flex-col',
            // Mobile: true full screen with strict containment
            'top-0 left-0 w-full h-full bg-[#1a1a1f] rounded-none',
            'overflow-hidden overscroll-none',
            // Desktop: floating panel
            'md:inset-auto md:top-auto md:left-auto md:bottom-24 md:right-24 md:w-96 md:h-[500px] md:rounded-2xl md:bg-[#1a1a1f]/95 md:backdrop-blur-xl md:border md:border-white/10'
          )}
          style={{ maxWidth: '100vw', maxHeight: '100dvh', touchAction: 'pan-y' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4 flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{t('chat.bot_name')}</h3>
              <p className="text-xs opacity-90">{t('chat.status')}</p>
            </div>
            {/* Close button in header - visible on mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4" style={{ overscrollBehavior: 'contain' }}>
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                  <Bot className="h-8 w-8 text-red-500" />
                </div>
                <p className="text-white/70 text-sm">
                  {t('chat.bot_name')}
                </p>
                <p className="text-white/40 text-xs mt-1">
                  {t('chat.status')}
                </p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-2 animate-fadeIn',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'bot' && (
                  <div className="w-7 h-7 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-red-500/50">
                    <Bot className="h-3.5 w-3.5 text-red-500" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed',
                    message.sender === 'user'
                      ? 'bg-red-500 text-white rounded-br-md'
                      : 'bg-[#2b2b36] text-white rounded-bl-md border border-white/10'
                  )}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-red-500/50">
                  <Bot className="h-3.5 w-3.5 text-red-500" />
                </div>
                <div className="bg-[#2b2b36] p-3 rounded-2xl rounded-bl-md border border-white/10">
                  <div className="flex items-center gap-2 text-white/70">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">{t('chat.typing')}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input - safe area padding for mobile notch/home indicator */}
          <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-white/10 bg-[#1a1a1f] flex-shrink-0 overflow-hidden">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chat.placeholder')}
                className="flex-1 min-w-0 px-4 py-3 bg-[#2b2b36] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm text-white placeholder-white/50"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isLoading}
                className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center transition-all flex-shrink-0',
                  'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                aria-label={t('chat.aria_send')}
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
