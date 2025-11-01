import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ExternalLink } from 'lucide-react';
import { products } from '../data/products'; // Import your actual products

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
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
      actions: [
        { text: '🥩 Meat & Fish', action: 'Meat, Fish & Poultry', type: 'category' },
        { text: '🥬 Fresh Produce', action: 'Fresh Food', type: 'category' },
        { text: '🧴 Beauty & Care', action: 'Beauty & Personal Care', type: 'category' }
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

  // Get actual products by category
  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  // Get all unique categories from products
  const allCategories = [...new Set(products.map(product => product.category))].filter(Boolean);

  // Enhanced product information based on actual products
  const productInfo = {
    'meat': {
      categories: ['Meat, Fish & Poultry', 'Frozen proteins'],
      items: getProductsByCategory('Meat, Fish & Poultry').map(p => p.name),
      description: "We offer a wide selection of fresh and frozen meat, fish & poultry including:\n\n• Fresh fish and seafood\n• Frozen proteins like snails\n• Poultry products\n• Traditional African meat cuts\n\nAll our products are properly sourced and stored for maximum quality and freshness."
    },
    'fresh food': {
      categories: ['Fresh Food'],
      items: getProductsByCategory('Fresh Food').map(p => p.name),
      description: "Fresh African and Caribbean produce including:\n\n• Yam flour and beans\n• Fresh vegetables\n• Traditional staples\n• Cooking ingredients\n\nWe source directly from quality suppliers to ensure freshness and authenticity."
    },
    'frozen proteins': {
      categories: ['Frozen proteins'],
      items: getProductsByCategory('Frozen proteins').map(p => p.name),
      description: "Premium frozen proteins and specialty items:\n\n• Fresh frozen snails\n• Other frozen delicacies\n• Properly packaged for freshness\n• Traditional African proteins"
    },
    'beauty personal care': {
      categories: ['Beauty & Personal Care'],
      items: getProductsByCategory('Beauty & Personal Care').map(p => p.name),
      description: "Beauty and personal care products for African hair and skin:\n\n• Hair extensions and braids\n• Traditional soaps and balms\n• Hair care accessories\n• Personal grooming items"
    },
    'snacks': {
      categories: ['Snacks'],
      items: getProductsByCategory('Snacks').map(p => p.name),
      description: "Delicious snacks and breakfast items:\n\n• Cereals and breakfast foods\n• Bread and baked goods\n• Traditional snacks\n• Quick meal options"
    },
    'drinks': {
      categories: ['Drinks'],
      items: getProductsByCategory('Drinks').map(p => p.name),
      description: "Refreshing beverages and drink mixes:\n\n• Traditional drink mixes\n• Herbal teas and infusions\n• Beverage ingredients\n• Cultural drinks"
    }
  };

  const quickResponses = [
    "Show me fresh food",
    "What beauty products do you have?",
    "Browse all categories",
    "Store location & hours",
    "Delivery information",
    "Show me snacks"
  ];

  const mainCategories = [
    { name: 'All Products', value: 'all', icon: '🛒' },
    { name: 'Fresh Food', value: 'Fresh Food', icon: '🥬' },
    { name: 'Frozen Proteins', value: 'Frozen proteins', icon: '🧊' },
    { name: 'Beauty & Personal Care', value: 'Beauty & Personal Care', icon: '✨' },
    { name: 'Snacks', value: 'Snacks', icon: '🍿' },
    { name: 'Drinks', value: 'Drinks', icon: '🥤' }
  ];

  const getEnhancedResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    
    // Handle category browsing requests
    if (message.includes('browse') || message.includes('catalog') || message.includes('categories') || message.includes('sections')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `🛒 **Browse Our Categories:**\n\nWe have ${allCategories.length} categories with ${products.length} products available:\n\n${allCategories.map(cat => {
          const categoryProducts = getProductsByCategory(cat);
          return `• ${cat} (${categoryProducts.length} products)`;
        }).join('\n')}\n\nClick any category below to explore:`,
        isUser: false,
        timestamp: new Date(),
        actions: allCategories.map(cat => ({
          text: `${cat} (${getProductsByCategory(cat).length})`,
          action: cat,
          type: 'category' as const
        }))
      };
    }
    
    // Handle meat-specific requests
    if (message.includes('meat') || message.includes('protein') || message.includes('fish') || 
        message.includes('poultry') || message.includes('seafood') || message.includes('snail')) {
      const info = productInfo['meat'];
      const meatProducts = getProductsByCategory('Meat, Fish & Poultry');
      const frozenProducts = getProductsByCategory('Frozen proteins');
      
      return {
        id: (Date.now() + 1).toString(),
        text: `🥩 **Meat, Fish & Poultry Selection:**\n\n${info.description}\n\n**Available products:**\n${[...meatProducts, ...frozenProducts].map(item => `• ${item.name} - £${item.price.toFixed(2)}`).join('\n')}`,
        isUser: false,
        timestamp: new Date(),
        actions: [
          { text: '🐟 Meat & Poultry', action: 'Meat, Fish & Poultry', type: 'category' },
          { text: '🧊 Frozen Proteins', action: 'Frozen proteins', type: 'category' }
        ]
      };
    }

    // Handle fresh food requests
    if (message.includes('fresh') || message.includes('produce') || message.includes('vegetable') || 
        message.includes('plantain') || message.includes('yam') || message.includes('beans') || 
        message.includes('flour') || message.includes('food')) {
      const info = productInfo['fresh food'];
      const freshProducts = getProductsByCategory('Fresh Food');
      
      return {
        id: (Date.now() + 1).toString(),
        text: `🥬 **Fresh Food & Staples:**\n\n${info.description}\n\n**Available products:**\n${freshProducts.map(item => `• ${item.name} - £${item.price.toFixed(2)}`).join('\n')}`,
        isUser: false,
        timestamp: new Date(),
        actions: [
          { text: '🥬 View Fresh Food', action: 'Fresh Food', type: 'category' }
        ]
      };
    }
    
    // Handle beauty and personal care requests
    if (message.includes('beauty') || message.includes('care') || message.includes('hair') || 
        message.includes('soap') || message.includes('personal') || message.includes('balm') ||
        message.includes('wig') || message.includes('braid') || message.includes('broom')) {
      const info = productInfo['beauty personal care'];
      const beautyProducts = getProductsByCategory('Beauty & Personal Care');
      
      return {
        id: (Date.now() + 1).toString(),
        text: `✨ **Beauty & Personal Care:**\n\n${info.description}\n\n**Available products:**\n${beautyProducts.map(item => `• ${item.name} - £${item.price.toFixed(2)}`).join('\n')}`,
        isUser: false,
        timestamp: new Date(),
        actions: [
          { text: '✨ Beauty & Care', action: 'Beauty & Personal Care', type: 'category' }
        ]
      };
    }
    
    // Handle snacks requests
    if (message.includes('snack') || message.includes('cereal') || message.includes('bread') || 
        message.includes('breakfast') || message.includes('golden morn')) {
      const info = productInfo['snacks'];
      const snackProducts = getProductsByCategory('Snacks');
      
      return {
        id: (Date.now() + 1).toString(),
        text: `🍿 **Snacks & Breakfast:**\n\n${info.description}\n\n**Available products:**\n${snackProducts.map(item => `• ${item.name} - £${item.price.toFixed(2)}`).join('\n')}`,
        isUser: false,
        timestamp: new Date(),
        actions: [
          { text: '🍿 View Snacks', action: 'Snacks', type: 'category' }
        ]
      };
    }

    // Handle drinks requests
    if (message.includes('drink') || message.includes('beverage') || message.includes('sorrel') || 
        message.includes('juice') || message.includes('tea')) {
      const info = productInfo['drinks'];
      const drinkProducts = getProductsByCategory('Drinks');
      
      return {
        id: (Date.now() + 1).toString(),
        text: `🥤 **Drinks & Beverages:**\n\n${info.description}\n\n**Available products:**\n${drinkProducts.map(item => `• ${item.name} - £${item.price.toFixed(2)}`).join('\n')}`,
        isUser: false,
        timestamp: new Date(),
        actions: [
          { text: '🥤 View Drinks', action: 'Drinks', type: 'category' }
        ]
      };
    }

    // Handle frozen requests
    if (message.includes('frozen') || message.includes('freeze') || message.includes('ice')) {
      const info = productInfo['frozen proteins'];
      const frozenProducts = getProductsByCategory('Frozen proteins');
      
      return {
        id: (Date.now() + 1).toString(),
        text: `🧊 **Frozen Proteins:**\n\n${info.description}\n\n**Available products:**\n${frozenProducts.map(item => `• ${item.name} - £${item.price.toFixed(2)}`).join('\n')}`,
        isUser: false,
        timestamp: new Date(),
        actions: [
          { text: '🧊 Frozen Proteins', action: 'Frozen proteins', type: 'category' }
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

    // Product search
    if (message.includes('search') || message.includes('find') || message.includes('look for')) {
      const searchTerm = message.replace(/search|find|look for/gi, '').trim();
      if (searchTerm) {
        const foundProducts = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
        
        if (foundProducts.length > 0) {
          return {
            id: (Date.now() + 1).toString(),
            text: `🔍 **Search Results for "${searchTerm}":**\n\nFound ${foundProducts.length} products:\n\n${foundProducts.slice(0, 5).map(item => `• ${item.name} - £${item.price.toFixed(2)} (${item.category})`).join('\n')}${foundProducts.length > 5 ? `\n\n... and ${foundProducts.length - 5} more products` : ''}`,
            isUser: false,
            timestamp: new Date(),
            actions: foundProducts.length > 0 ? [
              { text: '🛒 Browse All', action: 'all', type: 'category' },
              ...foundProducts.slice(0, 3).map(item => ({
                text: item.name,
                action: item.category,
                type: 'category' as const
              }))
            ] : undefined
          };
        }
      }
    }

    // Price inquiries
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      const priceProducts = products.slice(0, 6); // Show first 6 products with prices
      return {
        id: (Date.now() + 1).toString(),
        text: `💰 **Current Product Prices:**\n\n${priceProducts.map(item => `• ${item.name} - £${item.price.toFixed(2)}`).join('\n')}\n\nWe offer competitive prices on all our authentic African and Caribbean products!`,
        isUser: false,
        timestamp: new Date(),
        actions: [
          { text: '🛒 View All Products', action: 'all', type: 'category' },
          { text: '💰 Price Match', action: 'pricing_info', type: 'info' }
        ]
      };
    }

    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || 
        message.includes('good morning') || message.includes('good afternoon') || 
        message.includes('good evening') || message.includes('greetings')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `👋 Hello and welcome to Nimi Store!\n\nI'm here to help you find authentic African and Caribbean groceries. We have ${products.length} products across ${allCategories.length} categories.\n\nWhat would you like to explore today?`,
        isUser: false,
        timestamp: new Date(),
        actions: [
          { text: '🛒 Browse All Categories', action: 'browse_categories', type: 'info' },
          { text: '🥩 Meat & Fish', action: 'Meat, Fish & Poultry', type: 'category' },
          { text: '✨ Beauty Products', action: 'Beauty & Personal Care', type: 'category' }
        ]
      };
    }

    // Thank you responses
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `You're very welcome! 😊 Is there anything else I can help you find in our ${products.length} products?`,
        isUser: false,
        timestamp: new Date(),
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
      text: `I'd love to help you find what you're looking for! 😊\n\nWe have ${products.length} authentic African and Caribbean products available. You can:\n\n• Browse by category\n• Search for specific items\n• Ask about prices\n• Get store information\n\nWhat would you like to see?`,
      isUser: false,
      timestamp: new Date(),
      actions: [
        { text: '🛒 Browse All Categories', action: 'browse_categories', type: 'info' },
        { text: '🥬 Fresh Food', action: 'Fresh Food', type: 'category' },
        { text: '✨ Beauty & Care', action: 'Beauty & Personal Care', type: 'category' },
        { text: '🍿 Snacks', action: 'Snacks', type: 'category' }
      ]
    };
  };

  const handleActionClick = (action: string, type: string) => {
    if (type === 'category' && onCategoryClick) {
      onCategoryClick(action);
      const actionMessage: Message = {
        id: Date.now().toString(),
        text: `Taking you to our ${action} section with ${getProductsByCategory(action).length} products...`,
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
    } else if (action === 'pricing_info') {
      const pricingMessage = getEnhancedResponse('price information');
      setMessages(prev => [...prev, pricingMessage]);
    }
  };

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
              <p className="text-xs opacity-90">{products.length} products • Ready to help</p>
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
                {message.actions && message.actions.length > 0 && (
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