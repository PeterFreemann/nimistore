import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  hasActions?: boolean;
  actions?: Array<{
    text: string;
    action: string;
    type: 'category' | 'external' | 'info';
  }>;
}

interface ChatbotProps {
  onCategoryClick?: (category: string) => void;
}

export default function EnhancedChatbot({ onCategoryClick }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Nimi Store shopping assistant. I can help you find authentic African & Caribbean groceries, answer questions about our products, store information, delivery options, and much more. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
      hasActions: true,
      actions: [
        { text: '🥩 Meat & Fish', action: 'Meat, Fish & Poultry', type: 'category' },
        { text: '🥬 Fresh Produce', action: 'Fresh Food', type: 'category' },
        { text: '🌶️ Ethnic Foods', action: 'Ethnic Foods', type: 'category' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickResponses = [
    "Show me fresh produce",
    "What meat do you have?",
    "Browse all categories",
    "Store location & hours",
    "Delivery information",
    "Popular African spices"
  ];

  // Enhanced product information with detailed meat products
  const productInfo = {
    'meat': {
      categories: ['Meat, Fish & Poultry', 'Frozen proteins'],
      items: [
        'Fresh Tilapia Fish',
        'Frozen Goat Meat',
        'Smoked Fish',
        'Beef Short Ribs',
        'Free Range Chicken',
        'Lamb Shoulder',
        'Chicken Wings',
        'Prawns',
        'Dried Stockfish',
        'Turkey Wings'
      ],
      description: "We offer a wide selection of fresh and frozen meat, fish & poultry including:\n\n• Goat meat (fresh and frozen)\n• Chicken (whole, wings, drumsticks)\n• Beef (short ribs, stew meat)\n• Lamb (shoulder, chops)\n• Fresh tilapia and other fish\n• Smoked and dried fish\n• Prawns and other seafood\n\nAll our products are properly sourced and stored for maximum quality and freshness."
    },
    'fresh produce': {
      categories: ['Fresh Food', 'Vegetables & Fresh Produce'],
      items: [
        'Fresh Plantain',
        'Yam Tuber',
        'Scotch Bonnet Peppers',
        'Ginger Root',
        'Green Beans',
        'Okra',
        'Bitter Leaf',
        'Ugu (Pumpkin Leaves)'
      ],
      description: "Fresh African and Caribbean produce including:\n\n• Plantains (green and ripe)\n• Yam tubers\n• Scotch bonnet peppers\n• Fresh ginger and garlic\n• Seasonal vegetables\n• African leafy greens\n\nWe source directly from local and international farms to ensure freshness."
    },
    'ethnic foods': {
      categories: ['Ethnic Foods'],
      items: [
        'Jollof Rice Seasoning',
        'Curry Goat Seasoning',
        'Ogbono Seeds',
        'Locust Beans',
        'Tamarind Paste',
        'African Pepper Soup Spice',
        'Palm Oil',
        'Groundnut Oil'
      ],
      description: "Authentic seasonings and ingredients from West Africa and the Caribbean for traditional dishes:\n\n• Rice seasonings\n• Soup thickeners (ogbono, egusi)\n• Traditional spices\n• Palm oil and other cooking oils\n• Beans and grains\n• Specialty flours"
    },
    'frozen': {
      categories: ['Frozen proteins'],
      items: [
        'Frozen Goat Meat',
        'Cassava Leaves',
        'Chicken Wings',
        'Prawns',
        'Smoked Fish',
        'Turkey Tails',
        'Ox Tail',
        'Pre-cut Vegetables'
      ],
      description: "Premium frozen proteins and prepared foods:\n\n• Frozen meats (goat, chicken, turkey)\n• Seafood (prawns, fish)\n• Pre-cut vegetables\n• Prepared soup ingredients\n• Specialty frozen items\n\nProperly packaged to maintain freshness and authentic flavors."
    }
  };

  const mainCategories = [
    { name: 'All Products', value: 'all', icon: '🛒' },
    { name: 'Fresh Farm Produce', value: 'Fresh Food', icon: '🥬' },
    { name: 'Frozen Proteins', value: 'Frozen proteins', icon: '🧊' },
    { name: 'African Soft Drinks', value: 'Drinks', icon: '🥤' },
    { name: 'Snacks', value: 'Snacks', icon: '🍿' },
    { name: 'Fruit Wine', value: 'Beer, Wine & Spirit', icon: '🍷' }
  ];

  const specialtyCategories = [
    { name: 'Ethnic Foods', value: 'Ethnic Foods', icon: '🌶️' },
    { name: 'Meat, Fish & Poultry', value: 'Meat, Fish & Poultry', icon: '🐟' },
    { name: 'Health & Beauty', value: 'Health & Beauty', icon: '✨' },
    { name: 'Household Items', value: 'Household', icon: '🧽' },
    { name: 'Dry Goods', value: 'Dry Goods', icon: '🌾' },
    { name: 'Vegetables & Fresh Produce', value: 'Vegetables & Fresh Produce', icon: '🥕' }
  ];

  const getEnhancedResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    
    // Handle category browsing requests
    if (message.includes('browse') || message.includes('catalog') || message.includes('categories') || message.includes('sections')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `🛒 **Browse Our Categories:**\n\n**Main Categories:**\n${mainCategories.map(cat => `${cat.icon} ${cat.name}`).join('\n')}\n\n**Specialty Categories:**\n${specialtyCategories.map(cat => `${cat.icon} ${cat.name}`).join('\n')}\n\nClick any category below to explore products:`,
        isUser: false,
        timestamp: new Date(),
        hasActions: true,
        actions: [
          ...mainCategories.map(cat => ({
            text: cat.name,
            action: cat.value,
            type: 'category' as const
          })),
          ...specialtyCategories.map(cat => ({
            text: cat.name,
            action: cat.value,
            type: 'category' as const
          }))
        ]
      };
    }
    
    // Handle meat-specific requests with more detailed responses
    if (message.includes('meat') || message.includes('protein') || message.includes('goat') || 
        message.includes('beef') || message.includes('lamb') || message.includes('chicken') || 
        message.includes('fish') || message.includes('poultry') || message.includes('seafood')) {
      const info = productInfo['meat'];
      return {
        id: (Date.now() + 1).toString(),
        text: `🥩 **Meat, Fish & Poultry Selection:**\n\n${info.description}\n\n**Popular items in this category:**\n${info.items.map(item => `• ${item}`).join('\n')}\n\nClick below to browse our meat sections:`,
        isUser: false,
        timestamp: new Date(),
        hasActions: true,
        actions: [
          { text: '🐟 View All Meat & Fish', action: 'Meat, Fish & Poultry', type: 'category' },
          { text: '🧊 View Frozen Proteins', action: 'Frozen proteins', type: 'category' },
          { text: '🍗 View Chicken Products', action: 'Meat, Fish & Poultry', type: 'category' }
        ]
      };
    }

    // Handle fish-specific requests
    if (message.includes('fish') || message.includes('tilapia') || message.includes('stockfish') || 
        message.includes('seafood') || message.includes('prawn') || message.includes('shrimp')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `🐟 **Fresh & Preserved Fish:**\n\nWe offer a variety of fresh and preserved fish products:\n\n• Fresh tilapia and other whole fish\n• Smoked fish (mackerel, catfish)\n• Dried stockfish\n• Salted fish\n• Prawns and other seafood\n\nPerfect for traditional African and Caribbean dishes like pepper soup, fish stew, and more.`,
        isUser: false,
        timestamp: new Date(),
        hasActions: true,
        actions: [
          { text: '🐟 Browse Fish & Seafood', action: 'Meat, Fish & Poultry', type: 'category' },
          { text: '🧊 Frozen Seafood', action: 'Frozen proteins', type: 'category' }
        ]
      };
    }

    // Handle fresh produce requests
    if (message.includes('fresh') || message.includes('produce') || message.includes('vegetable') || 
        message.includes('plantain') || message.includes('yam') || message.includes('pepper') || 
        message.includes('okra') || message.includes('leaf')) {
      const info = productInfo['fresh produce'];
      return {
        id: (Date.now() + 1).toString(),
        text: `🥬 **Fresh Produce:**\n\n${info.description}\n\n**Currently available:**\n${info.items.map(item => `• ${item}`).join('\n')}\n\nBrowse our fresh produce sections:`,
        isUser: false,
        timestamp: new Date(),
        hasActions: true,
        actions: [
          { text: '🥬 View Fresh Food', action: 'Fresh Food', type: 'category' },
          { text: '🥕 View Vegetables & Produce', action: 'Vegetables & Fresh Produce', type: 'category' }
        ]
      };
    }
    
    // Handle ethnic foods requests
    if (message.includes('ethnic') || message.includes('spice') || message.includes('seasoning') || 
        message.includes('jollof') || message.includes('curry') || message.includes('ogbono') || 
        message.includes('palm oil') || message.includes('egusi')) {
      const info = productInfo['ethnic foods'];
      return {
        id: (Date.now() + 1).toString(),
        text: `🌶️ **Ethnic Foods & Seasonings:**\n\n${info.description}\n\n**Featured items:**\n${info.items.map(item => `• ${item}`).join('\n')}\n\nExplore authentic ingredients:`,
        isUser: false,
        timestamp: new Date(),
        hasActions: true,
        actions: [
          { text: '🌶️ Browse Ethnic Foods', action: 'Ethnic Foods', type: 'category' },
          { text: '🌾 View Dry Goods', action: 'Dry Goods', type: 'category' }
        ]
      };
    }
    
    // Handle frozen requests
    if (message.includes('frozen') || message.includes('freeze') || message.includes('ice') || 
        message.includes('fridge') || message.includes('chilled')) {
      const info = productInfo['frozen'];
      return {
        id: (Date.now() + 1).toString(),
        text: `🧊 **Frozen Proteins & Prepared Foods:**\n\n${info.description}\n\n**Available items:**\n${info.items.map(item => `• ${item}`).join('\n')}\n\nView our frozen section:`,
        isUser: false,
        timestamp: new Date(),
        hasActions: true,
        actions: [
          { text: '🧊 Browse Frozen Proteins', action: 'Frozen proteins', type: 'category' },
          { text: '🥩 Frozen Meat Selection', action: 'Frozen proteins', type: 'category' }
        ]
      };
    }

    // Store information
    if (message.includes('location') || message.includes('address') || message.includes('where') || 
        message.includes('find') || message.includes('map') || message.includes('directions')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `📍 **Store Location:**\n\nNimi Store\nUnit 6F S10 Morelands Trading Estate\nGL1 5SA, Gloucester\n\n**Contact:**\n📞 07563007938\n✉️ Nimistores2025@gmail.com\n\n**Getting Here:**\n• Easy parking available\n• Conveniently located near public transport\n• Wheelchair accessible\n\nWe look forward to your visit!`,
        isUser: false,
        timestamp: new Date()
      };
    }
    
    if (message.includes('hours') || message.includes('open') || message.includes('close') || 
        message.includes('time') || message.includes('operating') || message.includes('today')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `🕐 **Store Hours:**\n\nMonday - Sunday: 8:00 AM - 10:00 PM\n\n✅ Open 7 days a week\n✅ Extended weekend hours\n✅ Holiday hours may vary\n\nWe're here when you need us!`,
        isUser: false,
        timestamp: new Date()
      };
    }
    
    if (message.includes('delivery') || message.includes('shipping') || message.includes('order') || 
        message.includes('online') || message.includes('pickup') || message.includes('collect')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `🚚 **Delivery & Order Information:**\n\n✅ Same-day delivery available\n✅ FREE delivery on orders over £35\n✅ Delivery within 5-mile radius\n✅ Curbside pickup option\n✅ Order tracking available\n\n**Payment Options:**\n• Visa/Mastercard\n• Cash on delivery\n• Mobile payments\n\n**Order Process:**\n1. Browse our products\n2. Add items to cart\n3. Choose delivery or pickup\n4. Complete your order`,
        isUser: false,
        timestamp: new Date()
      };
    }

    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || 
        message.includes('good morning') || message.includes('good afternoon') || 
        message.includes('good evening') || message.includes('greetings')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `👋 Hello and welcome to Nimi Store!\n\nI'm here to help you find authentic African and Caribbean groceries. You can browse our categories or ask me specific questions.\n\nWhat would you like to explore today?`,
        isUser: false,
        timestamp: new Date(),
        hasActions: true,
        actions: [
          { text: '🛒 Browse All Categories', action: 'browse_categories', type: 'info' },
          { text: '🥩 Show Me Meat Products', action: 'Meat, Fish & Poultry', type: 'category' },
          { text: '🥬 Fresh Produce', action: 'Fresh Food', type: 'category' }
        ]
      };
    }

    // Thank you responses
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `You're very welcome! 😊 Is there anything else I can help you with today?`,
        isUser: false,
        timestamp: new Date(),
        hasActions: true,
        actions: [
          { text: '🛒 Continue Shopping', action: 'browse_categories', type: 'info' },
          { text: '📍 Store Information', action: 'store_info', type: 'info' },
          { text: '🚚 Delivery Info', action: 'delivery_info', type: 'info' }
        ]
      };
    }

    // Default response with actions
    return {
      id: (Date.now() + 1).toString(),
      text: `I'd love to help you find what you're looking for! 😊\n\n**Popular sections to explore:**\n🥩 Meat, Fish & Poultry\n🥬 Fresh Produce\n🌶️ Ethnic Foods & Spices\n🧊 Frozen Proteins\n🥤 African Drinks\n\nWhat would you like to see?`,
      isUser: false,
      timestamp: new Date(),
      hasActions: true,
      actions: [
        { text: '🛒 Browse All Categories', action: 'browse_categories', type: 'info' },
        { text: '🥩 Meat & Fish', action: 'Meat, Fish & Poultry', type: 'category' },
        { text: '🥬 Fresh Produce', action: 'Fresh Food', type: 'category' },
        { text: '🌶️ Ethnic Foods', action: 'Ethnic Foods', type: 'category' }
      ]
    };
  };

  const handleActionClick = (action: string, type: string) => {
    if (type === 'category' && onCategoryClick) {
      onCategoryClick(action);
      // Add a message to show the action was taken
      const actionMessage: Message = {
        id: Date.now().toString(),
        text: `Taking you to our ${action} section...`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, actionMessage]);
    } else if (action === 'browse_categories') {
      const browseMessage = getEnhancedResponse('browse categories');
      setMessages(prev => [...prev, browseMessage]);
    } else if (action === 'store_info') {
      const storeMessage = getEnhancedResponse('store location');
      setMessages(prev => [...prev, storeMessage]);
    } else if (action === 'delivery_info') {
      const deliveryMessage = getEnhancedResponse('delivery information');
      setMessages(prev => [...prev, deliveryMessage]);
    }
  };

  // Rest of the component remains the same...
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getEnhancedResponse(currentInput);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickResponse = (response: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: response,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getEnhancedResponse(response);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 rounded-full shadow-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9998] w-96 h-[600px] bg-white rounded-lg shadow-2xl border flex flex-col overflow-hidden max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 flex items-center space-x-3 flex-shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="font-semibold">Nimi Store Assistant</h3>
              <p className="text-xs opacity-90">Online • Ready to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      message.isUser 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {message.isUser ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-amber-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line break-words">{message.text}</div>
                      <p className={`text-xs mt-2 ${
                        message.isUser ? 'text-amber-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                {message.hasActions && message.actions && (
                  <div className="mt-2 ml-8 flex flex-wrap gap-2">
                    {message.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleActionClick(action.action, action.type)}
                        className="px-3 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full transition-colors border border-amber-300 hover:border-amber-400 flex items-center space-x-1"
                      >
                        <span>{action.text}</span>
                        {action.type === 'category' && <ExternalLink size={10} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2 max-w-[85%]">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600 flex-shrink-0">
                    <Bot size={12} />
                  </div>
                  <div className="bg-white p-3 rounded-lg rounded-bl-none shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          {messages.length <= 2 && (
            <div className="p-3 bg-white border-t flex-shrink-0">
              <p className="text-xs text-gray-600 mb-2">Quick options:</p>
              <div className="flex text black flex-wrap gap-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="px-3 py-1 text-black text-xs bg-gray-100 hover:bg-amber-100 rounded-full transition-colors border hover:border-amber-300"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t flex-shrink-0">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about our products..."
                className="text-black flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                style={{ fontSize: '16px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}