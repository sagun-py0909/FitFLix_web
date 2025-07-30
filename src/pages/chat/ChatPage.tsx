import React, { useState, useRef, useEffect } from 'react';
import { useSendMessage, useChatHistory, useClearChatHistory } from '@/hooks/useApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Trash2,
  Sparkles,
  Dumbbell,
  Apple,
  Target
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: chatResponse, isLoading } = useChatHistory();
  const sendMessage = useSendMessage();
  const clearHistory = useClearChatHistory();

  const messages = chatResponse?.data?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');
    setIsTyping(true);

    try {
      await sendMessage.mutateAsync({
        message: userMessage,
        includeContext: true,
      });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = async () => {
    if (!confirm('Are you sure you want to clear your chat history?')) {
      return;
    }

    try {
      await clearHistory.mutateAsync();
      toast.success('Chat history cleared');
    } catch (error) {
      toast.error('Failed to clear chat history');
    }
  };

  const quickQuestions = [
    {
      icon: Dumbbell,
      text: "What's a good workout routine for beginners?",
      color: "bg-blue-500",
    },
    {
      icon: Apple,
      text: "How many calories should I eat to lose weight?",
      color: "bg-green-500",
    },
    {
      icon: Target,
      text: "How can I build muscle effectively?",
      color: "bg-purple-500",
    },
  ];

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              AI Fitness Coach
            </h1>
            <p className="text-muted-foreground">
              Get personalized fitness and nutrition advice
            </p>
          </div>
          {messages.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearHistory}
              disabled={clearHistory.isPending}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear History
            </Button>
          )}
        </div>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Chat with your AI Coach
            </CardTitle>
            <CardDescription>
              Ask anything about fitness, nutrition, or wellness
            </CardDescription>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <LoadingSpinner size="lg" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <div className="text-center space-y-2">
                  <Bot className="h-16 w-16 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">Welcome to your AI Fitness Coach!</h3>
                  <p className="text-muted-foreground max-w-md">
                    I'm here to help you with workout plans, nutrition advice, and fitness tips. 
                    Ask me anything or try one of these quick questions:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                  {quickQuestions.map((question, index) => {
                    const Icon = question.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 text-left justify-start"
                        onClick={() => setMessage(question.text)}
                      >
                        <div className="space-y-2">
                          <div className={`w-8 h-8 rounded-full ${question.color} flex items-center justify-center`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-sm">{question.text}</p>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.message_id} className="space-y-4">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="max-w-[80%] bg-primary text-primary-foreground rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4" />
                          <span className="text-sm font-medium">You</span>
                          <span className="text-xs opacity-70">
                            {formatTime(msg.created_at)}
                          </span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex justify-start">
                      <div className="max-w-[80%] bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">AI Coach</span>
                          <span className="text-xs text-muted-foreground">
                            {msg.response_time_ms}ms
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{msg.response}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">AI Coach</span>
                        <LoadingSpinner size="sm" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me about fitness, nutrition, or wellness..."
                disabled={sendMessage.isPending}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={!message.trim() || sendMessage.isPending}
                size="icon"
              >
                {sendMessage.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};