import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, ChevronDown, CheckCircle } from 'lucide-react';
import { FAQS } from '../../data';

interface ContactProps {
  onShowToast: (msg: string) => void;
}

export default function Contact({ onShowToast }: ContactProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0); // Default open first FAQ
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && email.trim() && message.trim()) {
      setFormSubmitted(true);
      onShowToast('✓ Inquiry submitted successfully. Amara will reply within 24 hours!');
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('General Inquiry');
    setMessage('');
    setFormSubmitted(false);
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const triggerWhatsApp = () => {
    window.open('https://wa.me/254700000000?text=Hi%20A%26O%20Furnitures!%20I%27d%20love%20to%20receive%20help%20cozifying%20my%20new%20interior%20living%20project.', '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* HEADER SECTION */}
      <div className="border-b border-walnut/10 pb-6 mb-12 text-center max-w-2xl mx-auto space-y-2">
        <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">We Love Hearing From You</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-walnut">Showroom Booking & Customer Inquiries</h1>
        <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
          Whether you require customized table sizes, specific boucle fabrics, or wants to tour our Westlands workshops, our team is standing by to serve your space.
        </p>
      </div>

      {/* TWO COLUMN CONTACT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left mb-16">
        
        {/* LEFT COLUMN: CUSTOM FORM */}
        <div className="lg:col-span-7 bg-white border border-walnut/15 p-6 sm:p-8 rounded-none">
          {!formSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-6 font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-walnut/60 mb-2">Full name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Fatuma Mwangi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-cream/30 border border-walnut/15 rounded-none px-4 py-3 text-sm text-charcoal focus:outline-hidden focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-walnut/60 mb-2">Email address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., fatuma@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-cream/30 border border-walnut/15 rounded-none px-4 py-3 text-sm text-charcoal focus:outline-hidden focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-walnut/60 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g., +254 712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-cream/30 border border-walnut/15 rounded-none px-4 py-3 text-sm text-charcoal focus:outline-hidden focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-walnut/60 mb-2">Topic / Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-cream/30 border border-walnut/15 rounded-none px-4 py-3 text-sm text-charcoal focus:outline-hidden cursor-pointer focus:border-gold"
                  >
                    <option value="General Inquiry">General showroom inquiry</option>
                    <option value="Custom Size Wood Order">Request Custom Dimensions</option>
                    <option value="Product Sourcing question">Timber lumber question</option>
                    <option value="Delivery Dispatch Inquiry">Free Setup timeline check</option>
                    <option value="Interior Design Consult">Interior design partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-walnut/60 mb-2">Brief Carpentry detailing message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail specify the sizes, timber waxes, fabrics, or showroom tour dates requested..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-cream/30 border border-walnut/15 rounded-none px-4 py-3 text-sm text-charcoal focus:outline-hidden focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-walnut hover:bg-gold hover:text-walnut text-cream font-sans font-bold py-3.5 px-6 rounded-none transition-all uppercase text-xs tracking-widest cursor-pointer shadow-md focus:outline-hidden select-none"
              >
                Send Message / Request Showroom Slot
              </button>

            </form>
          ) : (
            <div className="py-12 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-none flex items-center justify-center mx-auto animate-pulse">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-walnut">Message Sent Successfully! 🎉</h3>
                <p className="font-sans text-xs sm:text-sm text-charcoal/60 leading-relaxed max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-charcoal/80">{fullName}</span>. We have registered your subject under <span className="font-semibold text-charcoal/85">"{subject}"</span>. Owen or Amara will review the sketch and reply personally via <span className="font-semibold text-charcoal/80">{email}</span> within 24 hours.
                </p>
              </div>
              
              <button
                onClick={handleResetForm}
                className="bg-walnut/5 hover:bg-black/5 text-walnut font-sans text-xs uppercase font-bold py-2.5 px-6 rounded-none transition-colors cursor-pointer"
              >
                Send another message
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: CONTACT INFORMATION */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-walnut">Contact Details</h3>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
              Feel free to visit our flagship workshop. To test furniture ergonomics, touch wood grains, and consult with lead carpenter Owen.
            </p>

            <div className="space-y-4 font-sans text-sm text-charcoal/80 font-light">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-walnut/5 text-gold-dark rounded-none shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase text-walnut">Flagship Showroom</h4>
                  <p className="text-xs pt-0.5">Mwanzi Road, Opp. Westgate Mall, Westlands, Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-walnut/5 text-gold-dark rounded-none shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase text-walnut">Direct Telephone</h4>
                  <p className="text-xs pt-0.5">+254 700 000 000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-walnut/5 text-gold-dark rounded-none shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase text-walnut">Carpentry Inbound</h4>
                  <p className="text-xs pt-0.5">hello@aofurnitures.co.ke</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-walnut/5 text-gold-dark rounded-none shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase text-walnut">Working Hours</h4>
                  <p className="text-xs pt-0.5">Mon–Sat: 8:00 AM – 7:00 PM <br />Sun: 10:00 AM – 5:00 PM (Showrooms only)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick live WhatsApp direct trigger */}
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-none text-left space-y-4">
            <div className="flex gap-3 text-emerald-800">
              <MessageCircle className="w-6 h-6 shrink-0 text-[#25D366] fill-[#25D366]" />
              <div>
                <h4 className="font-serif font-bold text-walnut text-base">Require Immediate Advice?</h4>
                <p className="font-sans text-xs text-emerald-700 font-light leading-relaxed mt-1">Chat directly with Owen and Amara on WhatsApp! Send photos of your rooms or dimensions for immediate quotes.</p>
              </div>
            </div>
            <button
              onClick={triggerWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans font-bold py-2.5 rounded-none text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer focus:outline-hidden shadow-xs"
            >
              <span>Instant Chat on WhatsApp →</span>
            </button>
          </div>

        </div>

      </div>

      {/* EMBEDDED MAP POSITION (Iframe placeholder but fully designed) */}
      <section className="bg-white/50 border border-walnut/10 rounded-none p-2.5 mb-16 relative overflow-hidden">
        <div className="aspect-video w-full max-h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.334080352227!2d36.802188613437295!3d-1.2587520935541813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f171691da635f%3s0x600121848594-d8644e57abab!2sWestgate%20Shopping%20Mall!5e0!3m2!1sen!2ske!4v1716500000000!5m2!1sen!2ske" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-none filter contrast-110 select-none grayscale"
            title="A & O Flagship Westlands Showroom Map Position"
          />
        </div>
      </section>

      {/* FAQ ACCORDION SECTION - 6 QUESTIONS */}
      <section className="py-12 border-t border-walnut/10 text-left max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">General Inbound Help</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-walnut">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-walnut/10 rounded-none overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left font-serif text-base sm:text-lg font-semibold text-walnut hover:text-gold focus:outline-hidden cursor-pointer gap-4"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gold-dark shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-walnut/5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
