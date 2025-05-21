
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Reply, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface MessageDisplayProps {
  message: string;
  date?: string;
  className?: string;
  isSent?: boolean;
  id?: number;
  onReplySubmit?: (id: number, reply: string) => void;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ 
  message, 
  date = new Date().toLocaleDateString('fr-FR'),
  className,
  isSent = false,
  id = 0,
  onReplySubmit
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending reply
    setTimeout(() => {
      if (onReplySubmit) {
        onReplySubmit(id, replyText);
      }
      
      setReplyText('');
      setIsSending(false);
      setIsReplying(false);
      
      toast({
        title: "Réponse envoyée",
        description: "Votre message voyage désormais vers son destinataire...",
        duration: 5000,
      });
    }, 800);
  };

  return (
    <Card 
      className={cn(
        "message-card max-w-lg w-full mx-auto backdrop-blur-lg transition-all duration-500 hover:transform hover:scale-[1.02]", 
        isSent ? "bg-black/40 border-white/20 hover:shadow-white/20" : "bg-black/30 border-white/30 animate-fade-in hover:shadow-white/20",
        "hover:shadow-lg",
        className
      )}
    >
      <CardContent className="p-6 relative overflow-hidden">
        <div className="text-sm text-white/70 mb-2 animate-pulse-soft">{date}</div>
        <div className="text-lg font-light leading-relaxed text-white animate-fade-in">{message}</div>
        
        {!isSent && !isReplying && onReplySubmit && (
          <div className="mt-4 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReply}
              className="text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 animate-fade-in"
            >
              <Reply className="h-4 w-4 mr-1" />
              Répondre
            </Button>
          </div>
        )}

        {isSent && (
          <div className="mt-4 flex justify-end">
            <div className="text-xs text-white/60 italic animate-pulse-soft">
              Message envoyé
            </div>
          </div>
        )}

        {!isSent && !isReplying && !onReplySubmit && (
          <div className="mt-4 flex justify-end">
            <div className="text-xs text-white/60 italic animate-pulse-soft">
              En attente d'une réponse...
            </div>
          </div>
        )}
        
        {/* Reply form */}
        {isReplying && onReplySubmit && (
          <div className="mt-4 space-y-3 animate-fade-in">
            <Textarea
              placeholder="Laissez votre réponse à cet écho..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[100px] bg-black/30 backdrop-blur-sm border-white/30 focus:border-white transition-all duration-300 text-white"
            />
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsReplying(false)}
                className="border-white/30 text-white hover:bg-white/20"
              >
                Annuler
              </Button>
              <Button 
                size="sm"
                onClick={handleSubmitReply}
                disabled={!replyText.trim() || isSending}
                className="bg-white/20 hover:bg-white/30 text-white transition-all duration-300"
              >
                {isSending ? (
                  <span className="flex items-center">
                    <span className="h-1 w-1 bg-white rounded-full animate-pulse mr-1"></span>
                    <span className="h-1 w-1 bg-white rounded-full animate-pulse mr-1" style={{ animationDelay: '0.2s' }}></span>
                    <span className="h-1 w-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-1" />
                    Envoyer
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        
        {/* Background animated effect */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse-soft opacity-70"></div>
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse-soft opacity-70" style={{ animationDelay: '2s' }}></div>
      </CardContent>
    </Card>
  );
};

export default MessageDisplay;
