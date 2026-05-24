import React, { useState } from 'react';
import { ShieldCheck, Calendar, MapPin, Truck, Check, Sparkles, Building2, Smartphone, CreditCard, ShoppingBag } from 'lucide-react';
import { CartItem, Page } from '../../types';

interface CheckoutProps {
  cart: CartItem[];
  onClearCart: () => void;
  onNavigate: (page: Page) => void;
  discountPercentage: number;
  couponCode: string;
}

export default function Checkout({
  cart,
  onClearCart,
  onNavigate,
  discountPercentage,
  couponCode
}: CheckoutProps) {
  const [step, setStep] = useState<2 | 3>(2); // 2: Details/Form fill, 3: Success state
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'pickup'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank' | 'card'>('mpesa');

  // Contact addresses states
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('Nairobi');

  // Card details states (mocks)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Local helper price formatter
  const formatPriceCur = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount).replace('KES', 'KSh');
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Delivery fee updates
  let deliveryFee = 0;
  if (deliveryMethod === 'express') {
    deliveryFee = 1500;
  } else if (deliveryMethod === 'pickup') {
    deliveryFee = 0;
  } else {
    // standard limit
    deliveryFee = subtotal >= 30000 ? 0 : 500;
  }

  const discountAmount = subtotal * (discountPercentage / 100);
  const totalCost = subtotal + deliveryFee - discountAmount;
  const orderNumber = 'AO-' + Math.floor(100000 + Math.random() * 90000);

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone && firstName && lastName && address && city) {
      setStep(3); // Success Screen
    }
  };

  const handleSuccessDoneHome = () => {
    onClearCart();
    onNavigate('home');
    window.scrollTo(0,0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* MINIMAL LOGO HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-walnut/15 pb-6 mb-10 gap-4 text-left">
        <button 
          onClick={() => onNavigate('home')}
          className="flex flex-col items-start cursor-pointer focus:outline-hidden"
        >
          <span className="font-serif text-3xl font-bold tracking-tight text-walnut leading-none">A & O</span>
          <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-medium text-gold leading-none mt-1">Furnitures</span>
        </button>

        {/* PROGRESS STEP BAR INDICATOR */}
        <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider">
          <span className="text-charcoal/40">1. Cart</span>
          <span className="text-charcoal/30">/</span>
          <span className={step === 2 ? 'text-walnut border-b-2 border-gold pb-0.5 font-bold' : 'text-emerald-600'}>
            2. Details {step === 3 && '✓'}
          </span>
          <span className="text-charcoal/30">/</span>
          <span className={step === 3 ? 'text-walnut border-b-2 border-gold pb-0.5 font-bold' : 'text-charcoal/40'}>
            3. Order Success
          </span>
        </div>
      </div>

      {step === 2 ? (
        
        /* TWO COLUMN SYSTEM DETAILS FORM */
        <form onSubmit={handlePlaceOrderSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left">
          
          {/* LEFT CONTAINER: FORMS FIELDS */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Section A: Customer Contacts */}
            <div className="bg-white border border-walnut/15 p-6 rounded-none space-y-4">
              <h3 className="font-serif text-xl font-bold text-walnut border-b border-walnut/5 pb-2">SECTION A: Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-charcoal/50 mb-1">Email address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. fatuma@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-cream/30 border border-walnut/15 rounded-none text-xs px-3 py-2.5 text-charcoal focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-charcoal/50 mb-1">Primary phone number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +254 712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-cream/30 border border-walnut/15 rounded-none text-xs px-3 py-2.5 text-charcoal focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Section B: Delivery Destination */}
            <div className="bg-white border border-walnut/15 p-6 rounded-none space-y-4">
              <h3 className="font-serif text-xl font-bold text-walnut border-b border-walnut/5 pb-2">SECTION B: Delivery Address</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-charcoal/50 mb-1">First name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-cream/30 border border-walnut/15 rounded-none text-xs px-3 py-2.5 text-charcoal focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-charcoal/50 mb-1">Last name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wanjiku"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-cream/30 border border-walnut/15 rounded-none text-xs px-3 py-2.5 text-charcoal focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-charcoal/50 mb-1">Street Address / Suite / Apartment *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Blk 4B, Sandspur Apts, Mwanzi Rd"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-cream/30 border border-walnut/15 rounded-none text-xs px-3 py-2.5 text-charcoal focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-charcoal/50 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nairobi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-cream/30 border border-walnut/15 rounded-none text-xs px-3 py-2.5 text-charcoal focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Delivery method radio array */}
              <div className="space-y-3 pt-4">
                <h4 className="font-sans text-xs uppercase font-bold text-walnut">Delivery Method Choose</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Standard */}
                  <div 
                    onClick={() => setDeliveryMethod('standard')}
                    className={`border p-4 rounded-none cursor-pointer transition-all text-left ${
                      deliveryMethod === 'standard' ? 'border-walnut bg-walnut/5' : 'border-walnut/15 hover:border-gold/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="del" 
                        checked={deliveryMethod === 'standard'} 
                        onChange={() => {}}
                        className="accent-walnut"
                      />
                      <span className="font-sans text-xs font-bold text-walnut">Standard Dispatch</span>
                    </div>
                    <p className="font-sans text-[10px] text-charcoal/50 mt-1 pl-5">3 to 5 Days. {subtotal >= 30000 ? 'FREE' : 'KSh 500'}</p>
                  </div>

                  {/* Express */}
                  <div 
                    onClick={() => setDeliveryMethod('express')}
                    className={`border p-4 rounded-none cursor-pointer transition-all text-left ${
                      deliveryMethod === 'express' ? 'border-walnut bg-walnut/5' : 'border-walnut/15 hover:border-gold/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="del" 
                        checked={deliveryMethod === 'express'} 
                        onChange={() => {}}
                        className="accent-walnut"
                      />
                      <span className="font-sans text-xs font-bold text-walnut">Express Cargo ✈</span>
                    </div>
                    <p className="font-sans text-[10px] text-charcoal/50 mt-1 pl-5">1 to 2 Days. KSh 1,500</p>
                  </div>

                  {/* Pickup */}
                  <div 
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`border p-4 rounded-none cursor-pointer transition-all text-left ${
                      deliveryMethod === 'pickup' ? 'border-walnut bg-walnut/5' : 'border-walnut/15 hover:border-gold/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="del" 
                        checked={deliveryMethod === 'pickup'} 
                        onChange={() => {}}
                        className="accent-walnut"
                      />
                      <span className="font-sans text-xs font-bold text-walnut">Showroom Pickup</span>
                    </div>
                    <p className="font-sans text-[10px] text-charcoal/50 mt-1 pl-5">Nairobi. FREE</p>
                  </div>

                </div>
              </div>

            </div>

            {/* Section C: Payment Portals list */}
            <div className="bg-white border border-walnut/15 p-6 rounded-none space-y-4">
              <h3 className="font-serif text-xl font-bold text-walnut border-b border-walnut/5 pb-2">SECTION C: Select Payment Gateway</h3>
              
              <div className="flex gap-4 border-b border-walnut/5 pb-4">
                {[
                  { tag: 'mpesa', label: 'SAFARICOM M-PESA', icon: <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" /> },
                  { tag: 'bank', label: 'BANK TRANSFER', icon: <Building2 className="w-4 h-4 text-sky-600 shrink-0" /> },
                  { tag: 'card', label: 'DEBIT/CREDIT CARD', icon: <CreditCard className="w-4 h-4 text-indigo-600 shrink-0" /> }
                ].map((pm) => (
                  <button
                    key={pm.tag}
                    type="button"
                    onClick={() => setPaymentMethod(pm.tag as any)}
                    className={`flex-1 flex items-center justify-center gap-1.5 border py-2 px-3 rounded-none text-[10px] sm:text-xs font-sans font-semibold cursor-pointer transition-all select-none
                      ${paymentMethod === pm.tag ? 'border-walnut bg-walnut/5 shadow-xs' : 'border-walnut/15 hover:border-gold/30'}`}
                  >
                    {pm.icon}
                    <span>{pm.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* PAYMENT SUB-PANEL BODIES */}
              <div className="font-sans text-xs bg-cream/30 p-4 rounded-none border border-walnut/10 space-y-2">
                
                {paymentMethod === 'mpesa' && (
                  <div className="space-y-2">
                    <p className="font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-1.5">
                      <span>✓ SAFARICOM M-PESA PAYBILL GATEWAY</span>
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-charcoal/70">
                      <li>Go to your Safaricom M-PESA Tool menu</li>
                      <li>Select <span className="font-bold">Lipa Na M-PESA</span> → <span className="font-bold">Paybill</span></li>
                      <li>Enter Business Number: <span className="font-bold">3B1F0E (A & O Furnitures)</span></li>
                      <li>Account Name: Use your LastName <span className="font-bold">"{lastName || 'Order'}"</span></li>
                      <li>Pay the exact order amount shown in Summary</li>
                    </ol>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="space-y-2">
                    <p className="font-bold text-sky-700 uppercase tracking-wide flex items-center gap-1.5">
                      <span>✓ DIRECT WIRE BANK TRANSFER</span>
                    </p>
                    <ul className="pl-4 space-y-1 text-charcoal/70 list-disc">
                      <li>Bank: <span className="font-bold">NCBA Bank Kenya Limited</span></li>
                      <li>Account Name: <span className="font-bold">A & O Furniture Master-Craft Ltd</span></li>
                      <li>Account Number: <span className="font-bold">003-3B1F0E-001</span></li>
                      <li>Branch: <span className="font-bold">Westlands Plaza Corporate Branch</span></li>
                      <li>Send payment receipt copy to hello@aofurnitures.co.ke</li>
                    </ul>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3 pt-1">
                    <p className="font-bold text-indigo-700 uppercase tracking-wide">✓ SECURE DEBIT / CREDIT CARD CHANNELS (MOCK)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] uppercase font-bold text-charcoal/50 mb-1">Card number</label>
                        <input
                          type="text"
                          placeholder="4000 1234 5678 9010"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-walnut/15 rounded-none text-xs p-2 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-charcoal/50 mb-1">Expiry date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-walnut/15 rounded-none text-xs p-2 focus:outline-hidden text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-charcoal/50 mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          placeholder="***"
                          maxLength={3}
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          className="w-full bg-white border border-walnut/15 rounded-none text-xs p-2 focus:outline-hidden text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Submit Place Order final actions */}
            <div className="text-left space-y-3">
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-walnut hover:text-white font-sans font-bold py-4 px-6 rounded-none transition-all uppercase text-xs tracking-widest cursor-pointer shadow-xl border border-gold focus:outline-hidden"
              >
                Place Secure Order ({formatPriceCur(totalCost)})
              </button>
              <p className="font-sans text-[10px] text-charcoal/40 text-center leading-relaxed">
                By clicking "Place Secure Order", you agree to our A & O furniture structural warranty charters and 14-day exchange policies. All card orders are secured via bank grade 256-bit SSL tunnels.
              </p>
            </div>

          </div>

          {/* RIGHT CONTAINER: MINI ORDER SUMMARY (STICKY) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-walnut/15 p-6 rounded-none space-y-4 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-walnut border-b border-walnut/10 pb-2">Order Summary</h3>
              
              {/* Product items thumbnail row lists */}
              <div className="divide-y divide-walnut/5 max-h-[180px] overflow-y-auto pr-2 space-y-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 py-2 text-left justify-between items-center">
                    <div className="flex gap-2.5 min-w-0 items-center">
                      <img 
                        src={item.product.image} 
                        className="w-10 h-10 object-cover rounded-none border border-walnut/10 shrink-0" 
                        alt=""
                      />
                      <div>
                        <h4 className="font-serif text-xs font-semibold text-walnut truncate max-w-[150px]">{item.product.name}</h4>
                        <p className="font-sans text-[9px] text-charcoal/40 uppercase font-bold tracking-wider">{item.selectedSize} | {item.quantity} ×</p>
                      </div>
                    </div>
                    <span className="font-sans text-xs font-bold text-walnut shrink-0">
                      {formatPriceCur(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial math arrays */}
              <div className="border-t border-walnut/10 pt-4 space-y-2 font-sans text-xs text-charcoal/70">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-walnut">{formatPriceCur(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Selected Delivery setup fee</span>
                  <span className="font-bold text-gold-dark">{deliveryFee === 0 ? 'FREE' : formatPriceCur(deliveryFee)}</span>
                </div>

                {discountPercentage > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-none text-[11px]">
                    <span className="uppercase tracking-wider">Discount ({couponCode})</span>
                    <span>-{formatPriceCur(discountAmount)}</span>
                  </div>
                )}

                <div className="border-t border-walnut/10 pt-3 flex justify-between items-baseline">
                  <span className="font-serif text-base font-bold text-walnut">Final Total</span>
                  <span className="font-sans text-lg sm:text-xl font-bold text-walnut">{formatPriceCur(totalCost)}</span>
                </div>
              </div>

              {/* Secure guarantee widget */}
              <div className="flex gap-3 text-emerald-800 bg-emerald-50/50 border border-emerald-200/50 p-4 rounded-none mt-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-left font-sans text-[10px] text-charcoal/70 leading-relaxed">
                  <span className="font-bold block uppercase text-emerald-800">Your purchase is fully insured!</span>
                  In case of transit damages or scratches, our delivery team replaces panels instantly on installation. Zero friction, zero risk.
                </div>
              </div>

            </div>
          </div>

        </form>
      ) : (
        
        /* THE GLORIOUS ORDER SUCCESS PAGE SCREEN */
        <div className="max-w-2xl mx-auto py-16 text-center space-y-8 animate-in zoom-in-95 duration-300">
          
          {/* Animated checkmark ring */}
          <div className="mx-auto w-20 h-20 bg-emerald-100/80 text-emerald-600 rounded-none flex items-center justify-center scale-105 shadow-md border border-emerald-200">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>

          <div className="space-y-3">
            <span className="font-sans text-xs uppercase font-bold text-gold-dark tracking-[0.2em] flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold fill-gold" />
              <span>HAND-SANDED QUALITY GUARANTEED</span>
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-walnut leading-none">Order Placed Successfully! 🎉</h1>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed max-w-lg mx-auto font-light">
              Blessings to your living space! We have registered your invoice. Our head artisan, Amara, has allocated lumber logs and scheduled assembly preparation for your selected pieces.
            </p>
          </div>

          {/* Core metadata info container */}
          <div className="bg-white border border-walnut/15 p-6 rounded-none grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-lg mx-auto font-sans">
            <div>
              <span className="block text-[9px] uppercase font-bold text-charcoal/40 mb-1">Receipt Invoice</span>
              <span className="font-mono text-sm sm:text-base font-bold text-walnut tracking-wide">{orderNumber}</span>
            </div>
            <div className="border-y sm:border-y-0 sm:border-x border-walnut/5 py-4 sm:py-0 sm:px-6">
              <span className="block text-[9px] uppercase font-bold text-charcoal/40 mb-1">Dispatch Mode</span>
              <span className="text-xs sm:text-sm font-bold text-walnut capitalize">{deliveryMethod} Delivery</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase font-bold text-charcoal/40 mb-1">Expected setup</span>
              <span className="text-xs sm:text-sm font-bold text-gold-dark flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="font-bold">{deliveryMethod === 'express' ? '1 to 2 Days' : deliveryMethod === 'pickup' ? 'Ready Today' : '3 to 5 Days'}</span>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-sans text-xs text-charcoal/50 max-w-md mx-auto leading-relaxed pl-4 border-l-2 border-gold italic">
              "We have sent payment receipts and dispatch updates to <span className="font-semibold text-charcoal/60">{email}</span>. One of our delivery heroes will call you on <span className="font-semibold text-charcoal/60">{phone}</span> to confirm precise driving pathways and gated entry access!"
            </p>

            <button
              onClick={handleSuccessDoneHome}
              className="bg-walnut hover:bg-gold text-cream hover:text-walnut font-sans font-bold py-3.5 px-10 rounded-none transition-all uppercase text-xs tracking-widest cursor-pointer shadow-xl inline-block border border-walnut hover:border-gold"
            >
              Continue Browsing Collections
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
