import React, { useState, useEffect } from 'react';
import { X, Gift, MailCheck } from 'lucide-react';

interface ExitIntentPopupProps {
  onClaimDiscount: (code: string) => void;
}

export default function ExitIntentPopup({ onClaimDiscount }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse coordinates indicate exit towards top window frame
      if (e.clientY < 15) {
        const dismissed = sessionStorage.getItem('ao_exit_intent_dismissed');
        if (!dismissed) {
          setIsOpen(true);
          sessionStorage.setItem('ao_exit_intent_dismissed', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setClaimed(true);
      onClaimDiscount('WELCOME10');
      // Hide after short delay to let guest read code success
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div 
        className="bg-cream border border-gold/30 rounded-xl max-w-lg w-full overflow-hidden p-6 sm:p-8 relative shadow-[0_25px_50px_-12px_rgba(59,31,14,0.3)] animate-in fade-in-50 zoom-in-95 duration-300"
        id="exit-intent-dialog"
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-walnut/40 hover:text-walnut p-1.5 hover:bg-black/5 rounded-full cursor-pointer transition-colors focus:outline-hidden"
          title="No thanks, close"
        >
          <X className="w-5 h-5" />
        </button>

        {!claimed ? (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center text-gold-dark animate-bounce mt-2">
              <Gift className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="font-sans text-[11px] font-bold text-gold-dark tracking-[0.2em] uppercase">
                Wait! Before you leave us... 🎁
              </span>
              <h2 className="font-serif text-3xl font-bold text-walnut leading-tight">
                Get 10% Off Your First Handcrafted Piece
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-md mx-auto">
                Join our private catalog mailing list! Get early alerts on new wood harvests and a secret 10% coupon immediately.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-walnut/20 font-sans text-sm rounded-md px-4 py-3 text-charcoal focus:outline-hidden focus:border-gold placeholder-charcoal/40"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-walnut hover:text-cream font-sans font-semibold py-3 px-4 rounded-md transition-all cursor-pointer shadow-md select-none focus:outline-hidden text-sm tracking-wide"
              >
                Claim My 10% Discount Code
              </button>
            </form>

            <button
              onClick={handleDismiss}
              className="text-xs text-charcoal/50 hover:underline hover:text-walnut cursor-pointer focus:outline-hidden"
            >
              No thank you, I prefer paying full price
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6 py-4">
            <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-pulse">
              <MailCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="font-sans text-[11px] font-bold text-emerald-600 tracking-[0.2em] uppercase">
                Coupon Code Unlocked!
              </span>
              <h2 className="font-serif text-3xl font-bold text-walnut">
                Welcome to A & O
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-sm mx-auto">
                Use this coupon code at checkout to claim your 10% furniture discount:
              </p>
            </div>

            <div className="bg-white border-2 border-dashed border-gold px-6 py-4 rounded-lg inline-block select-all cursor-copy">
              <span className="font-mono text-xl sm:text-2xl font-bold text-walnut tracking-wider">
                WELCOME10
              </span>
            </div>

            <p className="font-sans text-xs text-charcoal/40">
              This code has been applied to your cart subtotal. We have also sent details to <span className="font-semibold text-charcoal/70">{email}</span>. Click anywhere inside the box to copy!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
