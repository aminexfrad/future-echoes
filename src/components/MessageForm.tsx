
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface MessageFormProps {
  onMessageSent: (message: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onMessageSent }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending to a backend
    setTimeout(() => {
      onMessageSent(message);
      setMessage('');
      setIsSending(false);
      
      // Show success toast
      toast({
        title: "Écho envoyé",
        description: "Votre message voyage désormais vers le futur...",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="space-y-4">
        <Textarea
          placeholder="Laissez un écho pour le futur..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[150px] bg-black/30 backdrop-blur-sm border-white/30 focus:border-white transition-all duration-300 text-white shimmer"
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!message.trim() || isSending}
            className="bg-black/40 hover:bg-white/20 text-white transition-all duration-300"
          >
            {isSending ? (
              <span className="flex items-center">
                <span className="h-1 w-1 bg-white rounded-full animate-pulse mr-1"></span>
                <span className="h-1 w-1 bg-white rounded-full animate-pulse mr-1" style={{ animationDelay: '0.2s' }}></span>
                <span className="h-1 w-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </span>
            ) : "Envoyer vers le futur"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
