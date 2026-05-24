import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'oslo-sofa',
    name: 'Oslo Minimalist 3-Seater Sofa',
    category: 'living-room',
    price: 89500,
    originalPrice: 105000,
    rating: 4.8,
    reviewCount: 24,
    badge: 'Bestseller',
    material: 'Premium Velvet & Pine Wood Frame',
    colors: [
      { name: 'Forest Green', hex: '#1E3E2F' },
      { name: 'Warm Bouclé', hex: '#E6DFD5' },
      { name: 'Charcoal Grey', hex: '#4A4A4A' },
      { name: 'Rust Orange', hex: '#C25D38' }
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
    ],
    inStock: true,
    stockCount: 8,
    description: 'Breathe sophisticated elegance into your home. The Oslo 3-Seater Sofa is structurally built of cured kiln-dried Pine Wood and upholstered in extra-soft, stain-resistant Belgian velvet. Combining deep-seated comfort with sleek Nordic contours, it is perfectly tailored for the modern African home.',
    specs: {
      Dimensions: '210cm W x 88cm D x 80cm H',
      Weight: '42 kg',
      Material: 'Solid Kiln-Dried Pine Wood, High-Density Foam, Belgian Velvet Upholstery',
      Color: 'Available in Forest Green, Bouclé, Charcoal, and Rust',
      Assembly: 'Professional home assembly included (on delivery)'
    }
  },
  {
    id: 'nairobi-dining',
    name: 'Nairobi Solid Oak Dining Table',
    category: 'dining-room',
    price: 145000,
    originalPrice: 160000,
    rating: 4.9,
    reviewCount: 18,
    badge: 'New',
    material: 'Sustainable Solid Oak',
    colors: [
      { name: 'Natural Oak', hex: '#D2B48C' },
      { name: 'Dark Walnut', hex: '#3B1F0E' }
    ],
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&q=80',
      'https://images.unsplash.com/photo-1530018607912-eff2df114f11?w=800&q=80',
      'https://images.unsplash.com/photo-1622384914144-8df656ddbe6f?w=800&q=80'
    ],
    inStock: true,
    stockCount: 3,
    description: 'An commanding design statement. Handcrafted from premium grade sustainably sourced French Oak, the Nairobi Dining Table showcases stunning natural grain, live-edge inspired details, and extreme durability. Seat 6 to 8 guests in ultimate comfort and timeless style.',
    specs: {
      Dimensions: '220cm L x 100cm W x 76cm H',
      Weight: '68 kg',
      Material: '100% Solid Certified French White Oak Wood',
      Color: 'Natural Matte Oak, Rich Dark Walnut Stain',
      Assembly: 'Full assembly required (complimentary crew setup setup available)'
    }
  },
  {
    id: 'serengeti-bed',
    name: 'Serengeti King Size Canopy Bed',
    category: 'bedroom',
    price: 180000,
    originalPrice: 210000,
    rating: 4.7,
    reviewCount: 31,
    badge: 'Bestseller',
    material: 'Stained Hardwood Teak',
    colors: [
      { name: 'Charred Oak', hex: '#1C1C1C' },
      { name: 'Walnut Stain', hex: '#4A2E1B' },
      { name: 'Natural Teak', hex: '#C29F68' }
    ],
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80'
    ],
    inStock: true,
    stockCount: 4,
    description: 'Bring modern-African luxury to your master suite. Inspired by high-end boutique lodges, the Serengeti Bed is carved entirely out of sustainably harvested solid Teak hardwood. Its signature clean canopy framework lends airiness while expressing structural permanence and hand-sanded luxury.',
    specs: {
      Dimensions: '203cm W x 220cm L x 215cm H',
      Weight: '75 kg',
      Material: 'Sustainably Logged Solid Teak Wood Frame, Steel Connector Reinforcements',
      Color: 'Charred Oak, Warm Walnut, Bleached Teak',
      Assembly: 'Requires local assembly (our delivery heroes perform free setups)'
    }
  },
  {
    id: 'amboseli-sideboard',
    name: 'Amboseli Walnut Fluted Sideboard',
    category: 'living-room',
    price: 115000,
    originalPrice: 125000,
    rating: 4.6,
    reviewCount: 15,
    badge: 'New',
    material: 'Fluted American Walnut',
    colors: [
      { name: 'American Walnut', hex: '#3B1F0E' },
      { name: 'Smoked Oak', hex: '#231F20' }
    ],
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
      'https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?w=800&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80'
    ],
    inStock: true,
    stockCount: 6,
    description: 'A striking fusion of texture and storage. Featuring three seamless cabinets behind elegant, hand-sanded vertical walnut flutes, the Amboseli Sideboard sits beautifully on brushed brass dowels. Perfect for dining-room side storage or as an opulent console beneath your gallery television setup.',
    specs: {
      Dimensions: '160cm W x 45cm D x 75cm H',
      Weight: '55 kg',
      Material: 'Kiln-Dried American Walnut veneer panels and solid hardwood frame',
      Color: 'Natural Honey Walnut, Matte Smoked Carbonized Oak',
      Assembly: 'Delivered fully assembled'
    }
  },
  {
    id: 'rift-armchair',
    name: 'Rift Bouclé Statement Armchair',
    category: 'living-room',
    price: 49000,
    originalPrice: 58000,
    rating: 4.9,
    reviewCount: 42,
    badge: 'Bestseller',
    material: 'Textured Bouclé & Steel Inner Frame',
    colors: [
      { name: 'Oatmeal Milk', hex: '#F0EBE1' },
      { name: 'Clay Coral', hex: '#D28674' },
      { name: 'Sage Green', hex: '#8F9B8C' }
    ],
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
      'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=800&q=80'
    ],
    inStock: true,
    stockCount: 11,
    description: 'Perfect for reading nooks and accent settings. The Rift Armchair is hand-upholstered in high-loop Belgian Bouclé yarn for delicious tactile warmth. With an engineered body shape designed to support anatomical lumbar postures, it adds sculptured high-craft texture to any room catalog.',
    specs: {
      Dimensions: '84cm W x 82cm D x 78cm H',
      Weight: '22 kg',
      Material: 'Curved Inner Steel structure, Polyurethane fire-safe foam, French Tweed/Bouclé fabric',
      Color: 'Bouclé Ivory, Terra Coral, Healing Sage',
      Assembly: 'Delivered fully assembled'
    }
  },
  {
    id: 'mara-coffee-table',
    name: 'Mara Travertine & Teak Coffee Table',
    category: 'living-room',
    price: 38000,
    originalPrice: 45000,
    rating: 4.5,
    reviewCount: 9,
    badge: 'Only 3 left!',
    material: 'Natural Travertine Matte & Teak Wood',
    colors: [
      { name: 'Honeydew Travertine', hex: '#EAE6DF' }
    ],
    image: 'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=800&q=80'
    ],
    inStock: true,
    stockCount: 3,
    description: 'A striking statement piece celebrating tactile materials. The Mara Coffee Table contrasts a heavy, organic, unfilled Ivory Travertine stone slab atop three chunky cylinder columns carved of sustainably farmed solid Kenyan Teak wood. An architectural marvel in any lounge.',
    specs: {
      Dimensions: '90cm Diameter x 38cm H',
      Weight: '38 kg',
      Material: '100% Brazilian Cream Ivory Travertine stone, hand-carved Teak columns',
      Color: 'Ivory Cream Stone with Sand Mottle',
      Assembly: 'Place stone directly onto Teak bases (safely cushioned)'
    }
  },
  {
    id: 'elgon-chair',
    name: 'Elgon Walnut Ergonomic Desk Chair',
    category: 'office',
    price: 32000,
    originalPrice: 38000,
    rating: 4.8,
    reviewCount: 54,
    badge: 'Bestseller',
    material: 'Premium Vegan Leather & Walnut Accent Wrap',
    colors: [
      { name: 'Saddle Tan', hex: '#A05A2C' },
      { name: 'Satin Black', hex: '#111111' }
    ],
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&q=80',
      'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=800&q=80'
    ],
    inStock: true,
    stockCount: 14,
    description: 'Transform your home workspace with high-end ergonomics. The Elgon features a luxury hand-bent walnut bentwood frame back, seamlessly wrapped with heavy-duty vegan saddle leather and active gas-piston hardware. Move, swivel, and design with unparalleled core support.',
    specs: {
      Dimensions: '64cm w x 64cm D x 108-116cm adjustable H',
      Weight: '19 kg',
      Material: 'Bent Walnut veneer, Brushed Carbon base frame, High-tensile vegan leather',
      Color: 'Saddle brown with walnut grain, Ebony black',
      Assembly: '15-minute simple instruction kit included'
    }
  },
  {
    id: 'tsavo-desk',
    name: 'Tsavo Live-Edge Hardwood Writing Desk',
    category: 'office',
    price: 75000,
    originalPrice: 85000,
    rating: 4.7,
    reviewCount: 12,
    badge: 'New',
    material: 'Hardwood Mahogany',
    colors: [
      { name: 'Natural Mahogany', hex: '#4E2C1C' }
    ],
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80'
    ],
    inStock: true,
    stockCount: 5,
    description: 'A monument of productivity. Carved lovingly out of a single slab of sustainable salvaged Coastal Kenyan Mahogany, this writing desk highlights original knots, grain variations, and live natural edges. Paired with textured powder-coated black carbon geometric legs.',
    specs: {
      Dimensions: '140cm L x 70cm W x 74cm H',
      Weight: '34 kg',
      Material: 'Coastal East African Mahogany Hardwood, Carbon Steel Base Legs',
      Color: 'Rich Red-Honey Mahogany',
      Assembly: 'Bolt geometric legs to steel sleeve sockets (all tools supplied)'
    }
  },
  {
    id: 'lamu-sunbed',
    name: 'Lamu Modern Teak Lounger',
    category: 'outdoor',
    price: 30000,
    originalPrice: 35000,
    rating: 4.6,
    reviewCount: 20,
    badge: 'Sale',
    material: 'Waterproof Finished Teak & Canvas',
    colors: [
      { name: 'Sand White Canvas', hex: '#F4F1EA' },
      { name: 'Navy Stripes', hex: '#1C3144' }
    ],
    image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80'
    ],
    inStock: true,
    stockCount: 9,
    description: 'Soak up the coastal breeze. Handcrafted specifically for weathering hot coastal heat and heavy rainfall, the Lamu lounger is constructed out of supreme A-Grade Teak hardwood and marine-mesh canvas. Reclinable to 5 bespoke angles for effortless patio relaxation.',
    specs: {
      Dimensions: '200cm L x 68cm W x 32cm H',
      Weight: '18 kg',
      Material: 'Marine-Grade Natural Teak Hardwood, UV-treated Waterproof Canvas liner',
      Color: 'Natural Honey Teak Wood, Bleached White Canvas',
      Assembly: 'Delivered pre-assembled and folded flat'
    }
  },
  {
    id: 'naivasha-nightstand',
    name: 'Naivasha Fluted Bedside Table',
    category: 'bedroom',
    price: 18500,
    originalPrice: 22000,
    rating: 4.8,
    reviewCount: 45,
    badge: 'Sale',
    material: 'FSC Oak Wood',
    colors: [
      { name: 'Bleached Ash', hex: '#EBE5D9' },
      { name: 'Walnut Stain', hex: '#4A2E1B' }
    ],
    image: 'https://images.unsplash.com/photo-1532372320978-9b4d7a92b24d?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1532372320978-9b4d7a92b24d?w=800&q=80',
      'https://images.unsplash.com/photo-1544457070-4cd9641400d7?w=800&q=80'
    ],
    inStock: true,
    stockCount: 12,
    description: 'Pure aesthetic symmetry by your bed structure. Built with two deep, soft-closing drawers clad in beautiful, custom semi-circular wood reeds. Complete with small brass knobs and hidden protective silicone bases to guarantee pristine floors.',
    specs: {
      Dimensions: '50cm W x 42cm D x 60cm H',
      Weight: '14 kg',
      Material: 'Solid Oak timber drawer faces, Engineered structural birch wood core, Brass knobs',
      Color: 'Bleached Ash, Walnut, Coal Black',
      Assembly: 'No assembly required'
    }
  },
  {
    id: 'kilifi-outdoor-set',
    name: 'Kilifi Teak Patio Dining Group',
    category: 'outdoor',
    price: 135000,
    originalPrice: 155000,
    rating: 4.9,
    reviewCount: 11,
    badge: 'New',
    material: 'Natural Oil Guard Teak Wood',
    colors: [
      { name: 'Natural Honey', hex: '#D2B48C' }
    ],
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80'
    ],
    inStock: true,
    stockCount: 2,
    description: 'An expansive modern setting for dining under the stars. Built with oil-rubbed marine Teak wood, the group comprises one rectangular slat-top table and four accompanying backrest chairs. Designed with slight drainage slats to shed rainwater effortlessly.',
    specs: {
      Dimensions: 'Table: 160cm L x 90cm W x 75cm H | Chairs: 56cm W x 58cm D x 85cm H',
      Weight: '48 kg (Combined Set)',
      Material: 'High-oil Premium Grade Natural Teak wood, stainless outdoor fasteners',
      Color: 'Warm honey timber with high UV natural sealer',
      Assembly: 'Table legs require simple attachment (our staff handles this free)'
    }
  },
  {
    id: 'watamu-rocker',
    name: 'Watamu Rattan Accent Lounge Rocker',
    category: 'outdoor',
    price: 24500,
    originalPrice: 29000,
    rating: 4.7,
    reviewCount: 16,
    badge: 'Only 3 left!',
    material: 'Handwoven Rattan & Iron Frame',
    colors: [
      { name: 'Straw Weave', hex: '#DFBA8D' },
      { name: 'Matte Charcoal', hex: '#333333' }
    ],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80'
    ],
    inStock: true,
    stockCount: 3,
    description: 'Unwind and rock with coastal flair. The Watamu Accent Rocker uses locally sourced hand-wrapped Kenyan wicker and cane rattan cords, securely suspended on reinforced powder-coated black iron frame support rails. Add lazy-afternoon luxury to any patio or balcony space.',
    specs: {
      Dimensions: '75cm W x 95cm D x 90cm H',
      Weight: '12 kg',
      Material: 'Organic untreated Natural Rattan cane, Iron undercarriages, Solid Teak rocker base arches',
      Color: 'Wicker Straw Yellow, Bold Black Carbon Frame',
      Assembly: 'Rocker runners attach via 4 included hex bolts'
    }
  }
];

export const TESTIMONIALS = [
  {
    name: 'Zahra Nyambura',
    location: 'Karen, Nairobi',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    quote: 'Absolutely stunning quality! The Serengeti Canopy Bed feels like a luxury resort in our home. Amara & Owen personally ensured the prompt setup, which was exceptional.'
  },
  {
    name: 'David Ochieng',
    location: 'Westlands, Nairobi',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    quote: 'Our Nairobi Solid Oak Dining Table has become the centerpiece of our home gatherings. Exceptional grains, sturdy build, and the free professional setup was a lifesaver.'
  },
  {
    name: 'Nuru Mbeki',
    location: 'Nyali, Mombasa',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80',
    quote: 'Ordered the Lamu Loungers for our coastal patio. Water runs right off them, and the wood looks better with age. The WhatsApp help desk was fast and informative!'
  }
];

export const INSTAGRAM_PHOTOS = [
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&q=80',
  'https://images.unsplash.com/photo-1616486038856-3c48de1cca76?w=300&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&q=80',
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=300&q=80',
  'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300&q=80',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=300&q=80'
];

export const COUPONS = [
  { code: 'WELCOME10', discountPercent: 10, label: '10% Welcome Discount' },
  { code: 'AO20', discountPercent: 20, label: '20% Premium Discount' },
  { code: 'FREESHIP', discountPercent: 0, freeShipping: true, label: 'Free Delivery' }
];

export const FAQS = [
  {
    question: 'Do you offer custom furniture dimensions or materials?',
    answer: 'Yes! We custom craft pieces to your custom space and preference. Simply email us or click the "WhatsApp Us" button to send your exact sketches or custom dimensions. Our master designer, Fatuma Mwangi, will offer a digital blueprint and custom estimate.'
  },
  {
    question: 'What is your standard delivery timeline in Kenya?',
    answer: 'Standard Delivery within Nairobi takes 3 to 5 business days. Express Delivery takes 1 to 2 business days. Outside of Nairobi (Mombasa, Kisumu, Nakuru, Eldoret), deliveries usually take 5 to 7 business days, fully tracked.'
  },
  {
    question: 'Can I return a product if it does not fit my space?',
    answer: 'We offer an easy 14-day return and exchange policy on all in-stock products, provided they are in completely pristine, unused condition. Custom-made order pieces are eligible for adjustments but not full cash returns.'
  },
  {
    question: 'Do you deliver outside Nairobi?',
    answer: 'Yes, we deliver countrywide across Kenya via our trusted furniture logistics dispatch vehicles. Rates are free for orders above KSh 30,000, and flat KSh 500 for standard orders elsewhere.'
  },
  {
    question: 'How do I care for my solid wood and velvet products?',
    answer: 'For mahogany and teak wood products, wipe with a soft lint-free microfibre cloth and rub natural wood beeswax every six months. For velvet upholstery, vacuum with a soft brush attachment and treat spills immediately with mild dish soap and warm water dabbed with an absorbent napkin.'
  },
  {
    question: 'Can I visit the furniture showroom without an assembly appointment?',
    answer: 'We love visitors! You can drop by our main Westlands showroom during regular office hours without any reservation. To get Owen or Fatuma to guide you personally, click "Book a Showroom Visit" to book a dedicated slot!'
  }
];
