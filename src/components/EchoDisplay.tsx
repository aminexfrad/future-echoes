
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Reply, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface EchoDisplayProps {
  originalMessage: string;
  responseMessage: string;
  originalDate: string;
  responseDate: string;
  className?: string;
  isAIResponse?: boolean;
  id: number;
  onReplySubmit?: (id: number, reply: string) => void;
}

const EchoDisplay: React.FC<EchoDisplayProps> = ({ 
  originalMessage,
  responseMessage,
  originalDate,
  responseDate,
  className,
  isAIResponse = false,
  id,
  onReplySubmit
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Add a small delay for animation purposes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

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
        description: "Votre écho voyage désormais vers le destinataire...",
        duration: 5000,
      });
    }, 1000);
  };

  return (
    <div className={cn(
      "space-y-6 transition-all duration-1000", 
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      className
    )}>
      {/* Original message */}
      <Card className="message-card max-w-lg w-full mx-auto bg-black/40 backdrop-blur-md border-white/20 opacity-80 transform transition-all hover:shadow-white/20 hover:shadow-lg hover:scale-[1.01]">
        <CardContent className="p-6 relative overflow-hidden">
          <div className="text-sm text-white/70 mb-2 animate-pulse-soft">{originalDate}</div>
          <div className="text-lg font-light leading-relaxed text-white animate-fade-in">{originalMessage}</div>
          
          {/* Animated background elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse-soft"></div>
        </CardContent>
      </Card>
      
      {/* Connection line with animated dot */}
      <div className="flex justify-center">
        <div className="h-12 w-px bg-white/50 animate-pulse-soft relative">
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 h-2 w-2 rounded-full bg-white animate-pulse"></div>
        </div>
      </div>
      
      {/* Response message */}
      <Card className="message-card max-w-lg w-full mx-auto bg-black/30 backdrop-blur-lg border-white/30 animate-fade-in transform transition-all hover:shadow-white/30 hover:shadow-lg hover:scale-[1.01]">
        <CardContent className="p-6 relative overflow-hidden">
          <div className="text-sm text-white/70 mb-2 animate-pulse-soft">{responseDate}</div>
          <div className="text-lg font-light leading-relaxed italic text-white animate-fade-in">{responseMessage}</div>
          <div className="mt-4 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReply}
              className="text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 animate-fade-in group"
              disabled={isReplying}
            >
              <Reply className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
              <span className="relative overflow-hidden">
                <span className="block transition-transform group-hover:translate-y-0">Répondre</span>
              </span>
            </Button>
            <div className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1 text-white/70 opacity-70" />
              <div className="text-xs text-white/70">
                {isAIResponse ? "Écho de l'IA" : "Écho anonyme d'un voyageur"}
              </div>
            </div>
          </div>
          
          {/* Reply form */}
          {isReplying && (
            <div className="mt-4 space-y-3 animate-fade-in">
              <Textarea
                placeholder="Laissez votre réponse à cet écho..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[100px] bg-black/30 backdrop-blur-sm border-white/30 focus:border-white transition-all duration-300 text-white"
                autoFocus
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
                  className="bg-white/20 hover:bg-white/30 text-white transition-all duration-300 group"
                >
                  {isSending ? (
                    <span className="flex items-center">
                      <span className="h-1 w-1 bg-white rounded-full animate-pulse mr-1"></span>
                      <span className="h-1 w-1 bg-white rounded-full animate-pulse mr-1" style={{ animationDelay: '0.2s' }}></span>
                      <span className="h-1 w-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                    </span>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-1 group-hover:translate-x-1 transition-transform" />
                      Envoyer
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
          
          {/* Animated background elements */}
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse-soft"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EchoDisplay;
