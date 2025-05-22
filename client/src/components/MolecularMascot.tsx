import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Wand2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function MolecularMascot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Add a welcome message when the chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add the initial greeting
      setMessages([
        {
          id: generateId(),
          role: 'assistant',
          content: "👋 Hello there! I'm MoleCueBuddy, your friendly molecular guide from Hexachem. I'd be delighted to help you learn about our specialty chemicals, applications, or sustainability initiatives. What can I help you with today?",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);
  
  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Generate a random ID for messages
  const generateId = () => {
    return Math.random().toString(36).substring(2, 11);
  };
  
  // Handle sending messages to the API
  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isSending) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);
    
    try {
      // Prepare messages for API in the format OpenAI expects
      const formattedMessages = messages
        .concat(userMessage)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      // Create assistant typing effect
      setIsTyping(true);
      
      // Send the request to our API endpoint
      const response = await apiRequest("POST", '/api/chat', { 
        messages: formattedMessages 
      });
      
      // Parse the response JSON
      const responseData = await response.json();
      
      // Get the assistant's response
      const assistantContent = responseData.choices[0].message.content;
      
      // Clear any existing typing timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      // Add a delay before showing the response to simulate typing
      const typingDelay = Math.min(1000 + assistantContent.length * 10, 3000);
      
      const timeout = setTimeout(() => {
        setIsTyping(false);
        
        // Add assistant message to chat
        setMessages(prev => [
          ...prev,
          {
            id: generateId(),
            role: 'assistant',
            content: assistantContent,
            timestamp: new Date()
          }
        ]);
        
        setIsSending(false);
      }, typingDelay);
      
      setTypingTimeout(timeout);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      toast({
        title: "Connection Error",
        description: "Couldn't connect to the AI assistant. Please try again later.",
        variant: "destructive"
      });
      
      // If there's an error, add an error message
      setMessages(prev => [
        ...prev,
        {
          id: generateId(),
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later or contact our team directly at hexasales@hexachem.sg.",
          timestamp: new Date()
        }
      ]);
      
      setIsTyping(false);
      setIsSending(false);
    }
  };
  
  // Handle pressing Enter to send a message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Detect when user stops typing
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  
  // Helper to format message content with line breaks
  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };
  
  // Molecule mascot SVG
  const MoleculeMascot = () => (
    <svg width="100%" height="100%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        {/* Main molecule body - center circle */}
        <circle cx="60" cy="60" r="25" fill="#1a56db" className="main-atom" />
        
        {/* Eyes */}
        <circle cx="52" cy="52" r="5" fill="white" className="eye" />
        <circle cx="68" cy="52" r="5" fill="white" className="eye" />
        <circle cx="52" cy="52" r="2.5" fill="#000" className="pupil" />
        <circle cx="68" cy="52" r="2.5" fill="#000" className="pupil" />
        
        {/* Smile */}
        <path d="M50,65 Q60,75 70,65" stroke="white" strokeWidth="2.5" fill="none" className="smile" />
        
        {/* Atoms connected to main body */}
        <circle cx="30" cy="40" r="10" fill="#4299e1" className="atom-1" />
        <circle cx="90" cy="40" r="10" fill="#4299e1" className="atom-2" />
        <circle cx="40" cy="90" r="10" fill="#4299e1" className="atom-3" />
        <circle cx="80" cy="90" r="10" fill="#4299e1" className="atom-4" />
        
        {/* Bonds connecting atoms */}
        <line x1="49" y1="49" x2="36" y2="46" stroke="#4299e1" strokeWidth="3" className="bond" />
        <line x1="71" y1="49" x2="84" y2="46" stroke="#4299e1" strokeWidth="3" className="bond" />
        <line x1="49" y1="71" x2="46" y2="84" stroke="#4299e1" strokeWidth="3" className="bond" />
        <line x1="71" y1="71" x2="74" y2="84" stroke="#4299e1" strokeWidth="3" className="bond" />
        
        {/* Small accent atoms */}
        <circle cx="20" cy="20" r="5" fill="#90cdf4" className="accent-atom" />
        <circle cx="100" cy="20" r="5" fill="#90cdf4" className="accent-atom" />
        <circle cx="20" cy="100" r="5" fill="#90cdf4" className="accent-atom" />
        <circle cx="100" cy="100" r="5" fill="#90cdf4" className="accent-atom" />
      </g>
    </svg>
  );

  // Determine chat position based on screen width
  const [chatPosition, setChatPosition] = useState<'left' | 'bottom'>('left');
  
  // Update chat position based on screen size
  useEffect(() => {
    const updateChatPosition = () => {
      setChatPosition(window.innerWidth < 640 ? 'bottom' : 'left');
    };
    
    updateChatPosition();
    window.addEventListener('resize', updateChatPosition);
    
    return () => window.removeEventListener('resize', updateChatPosition);
  }, []);

  return (
    <>
      {/* Molecule mascot button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: 'spring', 
          damping: 15, 
          stiffness: 300,
          delay: 0.5 
        }}
      >
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          animate={{ 
            rotate: isOpen ? 0 : [0, -10, 10, -5, 5, 0],
            scale: isOpen ? 1.1 : 1
          }}
          transition={{ 
            rotate: { duration: 1, repeat: Infinity, repeatType: 'loop', repeatDelay: 3 },
            scale: { duration: 0.2 }
          }}
        >
          {/* Speech bubble shown when chatbot is closed */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div 
                className="absolute -top-12 right-0 bg-white shadow-md rounded-full px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ delay: 1 }}
              >
                Click to chat with me!
                <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white transform rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg overflow-hidden">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotateZ: isOpen ? [0, 5, 0, -5, 0] : 0
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity, repeatType: 'loop' },
                rotateZ: { duration: 1.5, repeat: isOpen ? Infinity : 0, repeatType: 'loop' }
              }}
            >
              <MoleculeMascot />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Chat window - positioned dynamically based on screen size */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`absolute ${
                chatPosition === 'left' 
                  ? 'bottom-0 right-20 mb-[4px]' 
                  : 'bottom-20 right-0 mb-2'
              } shadow-2xl`}
              initial={{ 
                opacity: 0, 
                scale: 0.9, 
                x: chatPosition === 'left' ? 20 : 0,
                y: chatPosition === 'bottom' ? 20 : 0
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0, 
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.9, 
                x: chatPosition === 'left' ? 20 : 0,
                y: chatPosition === 'bottom' ? 20 : 0
              }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 300 
              }}
            >
              <motion.div 
                className="bg-white rounded-lg shadow-xl w-[320px] sm:w-[350px] h-[400px] flex flex-col overflow-hidden"
                initial={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                animate={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <motion.div 
                  className="bg-primary p-3 text-white flex items-center justify-between"
                  initial={{ backgroundColor: "#1a56db" }}
                  whileHover={{ backgroundColor: "#1e429f" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-white p-1"
                      animate={{ 
                        rotate: [0, 10, 0, -10, 0],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        repeatType: 'loop',
                        ease: "easeInOut" 
                      }}
                    >
                      <MoleculeMascot />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-sm">MoleCueBuddy</h3>
                      <p className="text-xs text-blue-100">Hexachem's AI Assistant</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-1 hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.1, backgroundColor: "#1e40af" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </motion.div>
                
                {/* Chat messages */}
                <div 
                  ref={chatRef}
                  className="flex-1 p-3 overflow-y-auto" 
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex mb-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`max-w-[85%] p-2 text-sm rounded-lg ${
                          message.role === 'user' 
                            ? 'bg-primary text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {formatMessageContent(message.content)}
                      </motion.div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex mb-3 justify-start">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-100 text-gray-800 p-2 rounded-lg rounded-tl-none"
                      >
                        <div className="flex space-x-1 items-center">
                          <motion.div 
                            className="w-2 h-2 bg-gray-400 rounded-full" 
                            animate={{ y: ["0%", "-30%", "0%"] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-gray-400 rounded-full" 
                            animate={{ y: ["0%", "-30%", "0%"] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-gray-400 rounded-full" 
                            animate={{ y: ["0%", "-30%", "0%"] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                          />
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
                
                {/* Input area */}
                <motion.div 
                  className="p-3 border-t border-gray-200"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about Hexachem..."
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        rows={1}
                        disabled={isSending}
                        style={{ minHeight: '38px', maxHeight: '80px' }}
                      />
                      {inputValue.trim() !== '' && (
                        <motion.button
                          onClick={handleSendMessage}
                          disabled={isSending}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary-dark"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Send className="h-4 w-4" />
                        </motion.button>
                      )}
                    </div>
                    
                    {inputValue.trim() === '' && (
                      <motion.button
                        className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark flex-shrink-0"
                        title="Suggest topics"
                        onClick={() => {
                          setInputValue("What products does Hexachem offer?");
                        }}
                        whileHover={{ scale: 1.05, backgroundColor: "#1e40af" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Wand2 className="h-4 w-4" />
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="mt-1 text-xs text-gray-500 text-center">
                    Powered by RSV AI | Ask about products, services, or industry solutions
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}