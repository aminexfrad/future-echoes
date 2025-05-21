
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundEffect from '@/components/BackgroundEffect';
import MessageForm from '@/components/MessageForm';
import MessageDisplay from '@/components/MessageDisplay';
import EchoDisplay from '@/components/EchoDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

// Enhanced data structure for messages and echoes
const sampleEchoes = [
  {
    id: 1,
    originalMessage: "Est-ce que je serai encore là, dans un an ?",
    responseMessage: "Oui, mais tu ne seras plus tout à fait la même personne. Et c'est très bien comme ça.",
    originalDate: "21 mai 2025",
    responseDate: "25 mai 2025",
    isAIResponse: true
  },
  {
    id: 2,
    originalMessage: "Comment savoir si mes choix sont les bons ?",
    responseMessage: "Les bons choix n'existent pas. Il n'y a que des chemins différents, et le courage de les emprunter.",
    originalDate: "19 mai 2025",
    responseDate: "22 mai 2025",
    isAIResponse: false
  }
];

const Index = () => {
  const [view, setView] = useState<'write' | 'sent'>('write');
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [echoes, setEchoes] = useState(sampleEchoes);
  const [loading, setLoading] = useState(true);
  const [showEchoes, setShowEchoes] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // After 3 seconds, fade out the intro
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => {
      clearTimeout(introTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  // Background image selection with animation
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgroundImages = [
    "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1513628253939-010e64ac66cd?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1527100673774-cce25eafaf7f?auto=format&fit=crop&w=1600&q=80"
  ];
  
  const [bgOpacity, setBgOpacity] = useState(1);
  const [bgImage, setBgImage] = useState(backgroundImages[backgroundIndex]);

  useEffect(() => {
    // Change background image every 30 seconds
    const bgInterval = setInterval(() => {
      setBgOpacity(0);
      
      setTimeout(() => {
        setBackgroundIndex(prev => (prev + 1) % backgroundImages.length);
        setBgImage(backgroundImages[(backgroundIndex + 1) % backgroundImages.length]);
        setBgOpacity(1);
      }, 1000);
    }, 30000);
    
    return () => clearInterval(bgInterval);
  }, [backgroundIndex]);

  const handleMessageSent = (message: string) => {
    setSentMessage(message);
    setView('sent');

    // Show the feedback message
    toast({
      title: "Message envoyé vers le futur",
      description: "Votre message voyage dans le temps, en attente d'une réponse...",
      duration: 5000,
    });
  };

  const handleReplySubmit = (id: number, reply: string) => {
    // In a real application, this would send the reply to an API
    // For now, we'll just simulate a successful reply
    toast({
      title: "Réponse envoyée",
      description: "Votre réponse a été enregistrée et sera transmise anonymement.",
      duration: 5000,
    });
  };

  const toggleEchoes = () => {
    setShowEchoes(prev => !prev);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative py-20 px-4 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: bgOpacity,
        transition: 'opacity 1.5s ease-in-out, background-image 0.1s ease-in-out'
      }}
    >
      <BackgroundEffect />
      <Header />

      {/* Intro overlay with enhanced animation */}
      {showIntro && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50 animate-fade-out">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-white animate-breathe mb-4">
              Échos du Futur
            </h1>
            <p className="text-white/70 max-w-md mx-auto animate-fade-in">
              Laissez un message au futur, recevez un écho du passé
            </p>
          </div>
        </div>
      )}

      {/* Loading screen */}
      {loading && !showIntro && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40">
          <div className="flex space-x-2">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="h-2 w-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center z-10 space-y-8 mt-8">
        {view === 'write' && (
          <>
            <h1 className="text-3xl md:text-4xl font-light text-center text-white animate-fade-in mb-2">
              Laissez un écho pour le futur
            </h1>
            <p className="text-center text-white/80 max-w-md mx-auto animate-fade-in mb-8">
              Une pensée, un doute, un rêve... Un jour, vous recevrez un écho anonyme en retour.
            </p>
            <Card className="w-full max-w-lg mx-auto bg-black/30 backdrop-blur-md border-white/20 transition-all duration-500 hover:shadow-white/20 hover:shadow-xl animate-fade-in">
              <CardContent className="p-6">
                <MessageForm onMessageSent={handleMessageSent} />
              </CardContent>
            </Card>

            {/* Button to view existing echoes */}
            <div className="mt-8 animate-fade-in">
              <Button 
                variant="outline" 
                onClick={toggleEchoes}
                className=" hover:bg-white/20 transition-colors group"
              >
                {showEchoes ? "Masquer les échos" : "Voir les échos récents"}
                <span className={`ml-2 transition-transform duration-300 ${showEchoes ? 'rotate-180' : ''}`}>▼</span>
              </Button>
            </div>

            {/* Echoes section */}
            {showEchoes && (
              <div className="w-full space-y-12 mt-8 animate-fade-in">
                {echoes.map((echo) => (
                  <EchoDisplay
                    key={echo.id}
                    id={echo.id}
                    originalMessage={echo.originalMessage}
                    responseMessage={echo.responseMessage}
                    originalDate={echo.originalDate}
                    responseDate={echo.responseDate}
                    isAIResponse={echo.isAIResponse}
                    onReplySubmit={handleReplySubmit}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {view === 'sent' && sentMessage && (
          <>
            <h1 className="text-3xl md:text-4xl font-light text-center text-white animate-fade-in mb-2">
              Votre message voyage vers le futur
            </h1>
            <p className="text-center text-white/80 max-w-md mx-auto animate-fade-in mb-8">
              Revenez dans quelques jours pour découvrir la réponse anonyme qu'il recevra.
            </p>
            <MessageDisplay 
              message={sentMessage} 
              date={new Date().toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
              isSent={true}
            />
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setView('write')}
                className="border-white/30 text-white hover:bg-white/20 transition-colors animate-fade-in group"
              >
                <span className="relative overflow-hidden inline-block">
                  <span className="block transition-transform group-hover:translate-y-[-100%]">Écrire un nouveau message</span>
                  <span className="absolute top-[100%] left-0 block transition-transform group-hover:translate-y-[-100%]">Écrire un nouveau message</span>
                </span>
              </Button>
              <Button 
                variant="ghost"
                onClick={toggleEchoes}
                className="text-white/70 hover:text-white hover:bg-white/10 transition-colors animate-fade-in"
              >
                {showEchoes ? "Masquer les échos" : "Voir les échos récents"}
                <span className={`ml-2 transition-transform duration-300 ${showEchoes ? 'rotate-180' : ''}`}>▼</span>
              </Button>
            </div>

            {/* Echoes section when in sent view */}
            {showEchoes && (
              <div className="w-full space-y-12 mt-8 animate-fade-in">
                {echoes.map((echo) => (
                  <EchoDisplay
                    key={echo.id}
                    id={echo.id}
                    originalMessage={echo.originalMessage}
                    responseMessage={echo.responseMessage}
                    originalDate={echo.originalDate}
                    responseDate={echo.responseDate}
                    isAIResponse={echo.isAIResponse}
                    onReplySubmit={handleReplySubmit}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
