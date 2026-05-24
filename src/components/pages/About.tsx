import { Trees, Quote, BadgeCheck, Users2, MapPin, Map, Phone } from 'lucide-react';
import { Page } from '../../types';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

export default function About({ onNavigate }: AboutProps) {
  
  const stats = [
    { value: '500+', label: 'Happy Homes Cozified' },
    { value: '8 Years', label: 'In Business' },
    { value: '200+', label: 'Products Master-Crafted' },
    { value: '3 Active', label: 'Nairobi Showrooms' }
  ];

  const values = [
    { icon: <Trees className="w-6 h-6" />, title: 'Premium Cured Hardwoods', text: 'We strictly log sustainable certified Mahogany, Oak and Teak. Standard particle boards are banned from our studio floors.' },
    { icon: <BadgeCheck className="w-6 h-6" />, title: 'Rigorous Quality Checks', text: 'Every wooden leg joint sits double beveled, hand-supported, and moisture-controlled to withstand warping for decades.' },
    { icon: <Users2 className="w-6 h-6" />, title: 'Artisan Pride', text: 'All products are handcrafted 100% locally in our Nairobi woodhouse, preserving carpentry heritage.' }
  ];

  const team = [
    { name: 'Amara Osei', role: 'Co-Founder & Lumber Sourcing', bio: 'Amara travels across East Africa inspecting sustainably harvested timber blocks and overseeing our kiln curing processes.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
    { name: 'Owen Osei', role: 'Co-Founder & Lead Carpenter', bio: 'Owen coordinates the main Westlands design benches. He translates classic mid-century contours into robust solid-wood masterpieces.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
    { name: 'Fatuma Mwangi', role: 'Head of Interior Design', bio: 'Fatuma helps home designers customize fabrics and wood stains to match distinctive high-contrast lighting.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
    { name: 'James Kariuki', role: 'Showroom Client Manager', bio: 'James coordinates complimentary setups, logistics dispatching, and schedules live Westlands showroom walk-throughs.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' }
  ];

  const locations = [
    { title: 'Westlands Signature Flagship', address: 'Mwanzi Road, Opp. Westgate Mall, Nairobi', phone: '+254 700 000 001', hours: 'Mon–Sat 8am–7pm | Sun 10am–5pm' },
    { title: 'Karen Design Atelier', address: 'Karen Road, Near The Hub Mall, Nairobi', phone: '+254 700 000 002', hours: 'Mon–Sat 9am–6pm | Closed Sundays' },
    { title: 'Mombasa Road Logistics Center', address: 'Cabinet Center Block, Mombasa Road, Nairobi', phone: '+254 700 000 003', hours: 'Mon–Fri 8am–5pm' }
  ];

  return (
    <div className="w-full">
      
      {/* SECTION 1 — HERO HEADER */}
      <section className="relative h-[250px] sm:h-[350px] flex items-center justify-center bg-walnut text-cream overflow-hidden">
        {/* Background dark wood wash style */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=1600&q=80"
          alt="Artisanal workshop details"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-30"
        />
        
        <div className="relative max-w-4xl mx-auto px-4 text-center z-20 space-y-3">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-gold block">Our Humble Heritage</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Two Brothers. One Vision. <br className="hidden sm:inline" />
            Furniture That Lasts a Lifetime.
          </h1>
        </div>
      </section>

      {/* SECTION 2 — OUR STORY EDITORIAL DESCRIPTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Story Copy Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">Est. 2018 in Nairobi</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-walnut leading-snug">
              Hand-Sanding Heritage From Mombasa to Westlands
            </h2>
            
            <div className="space-y-4 font-sans text-sm text-charcoal/70 leading-relaxed font-light">
              <p>
                A & O Furnitures was founded by brothers Amara and Owen Osei out of a crowded, single-car garage in Nairobi back in 2018. Having spent their childhood summers fetching tools for their grandfather’s legendary dhow-building workshop in Mombasa, the brothers inherited a profound reverence for curing timber, reading wood grain directions, and locking joints with custom hardwood pegs.
              </p>
              <p>
                They witnessed mass-manufactured import furniture crumbling under dry weather, warping at the hips, or utilizing sawdust composites packed with noxious chemical adhesives. Determined to offer stable, beautiful, and affordable luxury, Owen took to drawing timeless contours while Amara set off sourcing premium grade, kiln-dried native French Oak and sustainably harvested Coastal Mahogany timber.
              </p>
              <p>
                Today, our Mwanzi Road studio spans thousands of feet of space, housing master craftsmen and supporting modern high-precision tools. Yet, the smell of natural raw beeswax and the sound of quiet hands sanding wood grain remain the organic heart of who we are. Every single sofa, table, and canopy frame is built manually, inspected personally, and designed to inspire comfort for a lifetime.
              </p>
            </div>

            {/* Quote Insert */}
            <div className="border-l-4 border-gold bg-walnut/5 p-5 rounded-none flex gap-4 text-left">
              <Quote className="w-10 h-10 text-gold-dark shrink-0 hidden sm:block" />
              <div>
                <p className="font-serif text-base italic text-walnut font-medium">
                  "Wood carries an individual heartbeat. If you do not rush the sanding, if you match the dowels with patience, the timber rewards you by never shifting a millimeter."
                </p>
                <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-charcoal/50 mt-1 block">— Owen Osei, Co-founder</span>
              </div>
            </div>
          </div>

          {/* Graphic/Inspiratory Column */}
          <div className="lg:col-span-5 relative aspect-square bg-walnut/5 rounded-none overflow-hidden border border-walnut/10 shadow-lg shrink-0">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
              alt="Artisan smoothing wood seams"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-walnut/5 pointer-events-none" />
          </div>

        </div>
      </section>

      {/* SECTION 3 — ANIMATED STATS STRIP */}
      <section className="bg-walnut text-cream py-12 border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((st, i) => (
              <div key={i} className="text-center space-y-1">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-white leading-none">{st.value}</p>
                <div className="w-6 h-0.5 bg-gold mx-auto my-1.5" />
                <p className="font-sans text-[10px] sm:text-xs text-cream/60 uppercase tracking-widest">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR VALUES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-b border-walnut/10">
        <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">Our Living Philosophy</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-walnut mt-2 mb-12">How We Uphold Quality</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div 
              key={i}
              className="bg-white border border-walnut/5 p-8 rounded-none text-left space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-walnut/5 text-gold-dark rounded-none inline-block">
                {v.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-walnut">{v.title}</h3>
              <p className="font-sans text-xs sm:text-sm text-charcoal/60 leading-relaxed font-light">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — MEET THE TEAM */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">The Craft Hands</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-walnut mt-2 mb-12">Meet Amara, Owen & Team</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <div 
              key={i}
              className="bg-cream border border-walnut/10 rounded-none overflow-hidden flex flex-col hover:shadow-lg transition-shadow text-left"
            >
              <div className="aspect-square bg-walnut/5 overflow-hidden">
                <img 
                  src={m.img} 
                  alt={m.name} 
                  className="w-full h-full object-cover grayscale focus:grayscale-0 hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-walnut leading-none">{m.name}</h4>
                  <span className="font-sans text-[10px] text-gold-dark font-bold uppercase tracking-wider mt-1 block">{m.role}</span>
                  <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light mt-3">
                    {m.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — SHOWROOM LOCATIONS */}
      <section className="bg-white/50 border-t border-walnut/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">Come Touch the Wood</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-walnut mt-2 mb-12">Our Showroom Locations</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {locations.map((loc, i) => (
              <div 
                key={i}
                className="bg-cream border border-walnut/10 p-6 rounded-none flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex gap-2.5 items-start text-walnut">
                    <MapPin className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                    <h3 className="font-serif text-lg font-bold leading-tight">{loc.title}</h3>
                  </div>
                  <div className="font-sans text-xs sm:text-sm text-charcoal/70 space-y-1.5 pl-7">
                    <p className="font-light">{loc.address}</p>
                    <p className="flex items-center gap-1.5 pt-1 text-[11px] uppercase tracking-wider font-semibold text-gold-dark">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{loc.phone}</span>
                    </p>
                    <p className="text-[10px] text-charcoal/40 italic mt-1">{loc.hours}</p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-walnut/5 hover:bg-walnut text-walnut hover:text-white font-sans text-xs uppercase font-bold py-2 px-4 rounded-none text-center transition-colors focus:outline-hidden cursor-pointer pl-7 block border border-walnut/10"
                >
                  Get Directions & Contact
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — ATTAIN AD CONVERSION BANNER */}
      <section className="bg-walnut text-cream py-16 px-4 border-t border-gold/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">Come Visit Our Nairobi Workshop</h2>
          <p className="font-sans text-xs sm:text-sm text-cream/70 max-w-xl mx-auto leading-relaxed font-light">
            Nothing compares to rubbing your hand against cured raw lumber yourself. Touch the grains, adjust custom cushions, and review floor swatches with Owen and Fatuma today.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-gold hover:bg-gold-dark text-walnut hover:text-cream font-sans font-bold py-3.5 px-8 rounded-none transition-all text-xs tracking-widest uppercase cursor-pointer focus:outline-hidden"
          >
            Schedule a Personal Consult Visit Room
          </button>
        </div>
      </section>

    </div>
  );
}
