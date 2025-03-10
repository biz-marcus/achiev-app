"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';
import Image from "next/image";
import { sendChatMessage } from "@/api/ai.api";
import { toast } from "sonner";

interface Message {
  content: string;
  role: "user" | "assistant";
}

interface ConversationStarter {
  title: string;
  description: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Career-focused conversation starters
  const conversationStarters: ConversationStarter[] = [
    {
      title: "Career Development",
      description: "Create a professional growth plan"
    },
    {
      title: "Resume Enhancement",
      description: "Improve your resume bullets"
    },
    {
      title: "Job Application",
      description: "Tailor experience to job descriptions"
    },
    {
      title: "Skills Assessment",
      description: "Identify your transferable skills"
    },
    {
      title: "Interview Preparation",
      description: "Practice answering common questions"
    },
    {
      title: "Achievement Highlighting",
      description: "Articulate your key accomplishments"
    }
  ];

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Scroll carousel left
  const scrollCarouselLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  // Scroll carousel right
  const scrollCarouselRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message on first load
  useEffect(() => {
    setMessages([
      { 
        role: "assistant", 
        content: "Hi, I'm Achiev AI, your career strategist. I can help you articulate your professional achievements, craft compelling resume bullets, and align your experience with job opportunities. How can I assist with your career today?" 
      }
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    // Clear input
    setInput("");
    
    // Show typing indicator
    setIsTyping(true);

    try {
      // Send message to AI
      const result = await sendChatMessage({
        messages: [...messages, userMessage],
      });

      // Add AI response
      setMessages((prev) => [...prev, { role: "assistant", content: result.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response from AI. Please try again.');
      // Remove the user's message if we couldn't get a response
      setMessages((prev) => prev.slice(0, -1));
      // Put the input back
      setInput(userMessage.content);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleStarterClick = async (starter: ConversationStarter) => {
    const message = `Help me with ${starter.title.toLowerCase()}: ${starter.description.toLowerCase()}`;
    setInput("");
    
    // Add user message
    const userMessage = { role: "user" as const, content: message };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);

    try {
      // Send message to AI
      const result = await sendChatMessage({
        messages: [...messages, userMessage],
      });

      // Add AI response
      setMessages((prev) => [...prev, { role: "assistant", content: result.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response from AI. Please try again.');
      // Remove the user's message if we couldn't get a response
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      { 
        role: "assistant", 
        content: "Hi, I'm Achiev AI, your career strategist. I can help you articulate your professional achievements, craft compelling resume bullets, and align your experience with job opportunities. How can I assist with your career today?" 
      }
    ]);
    setInput("");
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-white">
      {/* Header */}
      <header className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image 
                src="/images/logo.png" 
                alt="Achiev AI Logo" 
                width={32} 
                height={32}
                className="w-full h-full" 
                priority
              />
            </div>
            <h1 className="text-xl font-semibold">Achiev AI</h1>
          </div>
          <button 
            onClick={handleNewChat}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-2">
                  <Image 
                    src="/images/logo.png" 
                    alt="Achiev AI" 
                    width={20} 
                    height={20}
                  />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center ml-2">
                  <span className="text-white text-sm font-bold">You</span>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-2">
                <Image 
                  src="/images/logo.png" 
                  alt="Achiev AI" 
                  width={20} 
                  height={20}
                />
              </div>
              <div className="bg-gray-100 rounded-lg p-3 text-gray-900">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Conversation Starters Carousel - Only show when no messages or just welcome message */}
      {messages.length <= 1 && (
        <div className="border-t py-3">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Conversation Starters</h3>
              <div className="flex space-x-1">
                <button 
                  onClick={scrollCarouselLeft}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={scrollCarouselRight}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div 
              ref={carouselRef}
              className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {conversationStarters.map((starter, index) => (
                <div 
                  key={index}
                  onClick={() => handleStarterClick(starter)}
                  className="flex-shrink-0 w-48 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium text-sm">{starter.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{starter.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input form - Fixed at bottom with padding */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex gap-2 items-end">
            <TextareaAutosize
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
              placeholder="Ask about career achievements, resume help, or job alignment..."
              minRows={1}
              maxRows={5}
              className="flex-1 px-4 py-3 rounded-lg shadow-inner bg-gray-50 focus:outline-none focus:ring-0 border-0 resize-none"
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button 
              type="submit" 
              className="shrink-0 rounded-lg bg-emerald-500 p-3 text-white hover:bg-emerald-600 focus:outline-none"
              disabled={!input.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 