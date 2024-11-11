import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Send, X } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: "Hello! How can I assist you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user'
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message. How else can I help you?",
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <Popover open={isChatOpen} onOpenChange={setIsChatOpen}>
      <PopoverTrigger asChild>
        <Button className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0">
          {isChatOpen ? <X className="h-6 w-6" /> : <Send className="h-6 w-6" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-96 p-0">
        <Card className="w-full h-full flex flex-col">
          <CardHeader className="py-3">
            <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto py-0">
            <ScrollArea className="h-full w-full pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className="flex items-center max-w-[80%]">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.sender === 'user' ? "/user-placeholder.svg" : "/bot-placeholder.svg"} />
                      <AvatarFallback>{message.sender === 'user' ? 'U' : 'B'}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`mx-2 p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex w-full"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
