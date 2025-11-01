import { Product } from '../context/CartContext';

export const categories = [
  'Fresh Food',
  'Dry Goods', 
  'Frozen proteins',
  'Drinks',
  'Snacks',
  'Health & Beauty',
  'Meat, Fish & Poultry',
  'Vegetables & Fresh Produce',
  'Ready Meals',
  'Pantry',
  'Bakery',
  'Beer, Wine & Spirit',
  'Ethnic Foods',
  'Household',
  'Beauty & Personal Care'
];

const image = '/nimi.png';
const image2 = '/DarlinNaturalTwist.png';
const image3 = '/DarlinNaturalTwistt.png';
const image4 = '/WigCap.png';
const image5 = '/MamasTasteBrownBeans.png';
const image6 = '/MamaTasteYamFlavour.png';
const image7 = '/PeeledBeans.png';
const image9 = '/PureGrowBeanFlour.png';
const image10 = '/TropicalSunBrownBeans.png';
const image8 = '/MamasPrideAmala.png';
const image11 = '/banana.jpeg';
const image12 = '/plantain.jpeg';
const image13 = '/snails.png';
const image14 = '/yam.png';
const image15 = '/pepper.png';
 const image16 = '/bread.jpeg';
 const image17 = '/goldenmorn.jpeg';
 const image18 = '/broom.jpeg';
 const image19 = '/Aboniki.png';
const image20 = '/flower.jpeg';
const image21 = '/tetmosol.jpeg';
const image22 = '/tura.jpeg';
const image23 = '/okro.jpeg';
const image24 = '/efor.png';
const image25 = '/milo.png';
const image26 = '/bournvita.png';
const image27 = '/pap.jpeg';
const image28 = '/dryfish.jpeg';
const image29 = '/custard.png';


export const products: Product[] = [
  { id: '1',
    name: 'Darling Natural Twist',
    price: 8.99,
    image: image3,
    category: 'Beauty & Personal Care',
    description: '',
    inStock: true,
    weight: '300g'
  },
  { id: '2',
    name: 'Darling Kinky Twist',
    price: 8.99,
    image: image2,
    category: 'Beauty & Personal Care',
    description: 'Super Long',
    inStock: true,
    weight: '300g'
  },
  { id: '3',
    name: 'Wig Cap ',
    price: 8.99,
    image: image4,
    category: 'Beauty & Personal Care',
    description: '(2 in 1)',
    inStock: true,
    weight: '300g'
  },
  { id: '4',
    name: 'Yam',
    price: 6.99,
    image: image14,
    category: 'Fresh Food',
    description: 'Yam',
    inStock: true,
    weight: '1.5kg'
  },
  
  { id: '5',
    name: 'Mama\'s Taste Brown Beans',
    price: 5.99,
    image: image5,
    category: 'Fresh Food',
    description: '',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '6',
    name: 'Tropical Sun Peeled Beans',
    price: 15.99,
    image: image7,
    category: 'Fresh Food',
    description: '',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '7',
    name: 'puregro Bean Flour',
    price: 5.99,
    image: image9,
    category: 'Fresh Food',
    description: '',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '8',
    name: 'Tropical Sun Brown Beans',
    price: 8.99,
    image: image10,
    category: 'Fresh Food',
    description: '',
    inStock: true,
    weight: '1.5kg'
  },
  
  { id: '9',
    name: 'Mama\'s Taste Yam Flour',
    price: 5.99,
    image: image6,
    category: 'Fresh Food',
    description: 'Amala',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '10',
    name: 'Bananas (per bunch)',
    price: 6.99,
    image: image11,
    category: 'Fresh Food',
    description: 'Bananas',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '12',
    name: 'Plantains (per bunch)',
    price: 6.99,
    image: image12,
    category: 'Fresh Food',
    description: 'Plantains',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '13',
    name: 'Nimi Store Snails (per pack)',
    price: 6.99,
    image: image13,
    category: 'Frozen proteins',
    description: 'Snails',
    inStock: true,
    weight: '1.5kg'
  },
  
  { id: '14',
    name: 'Mama\'s Pride Yam Flour',
    price: 6.99,
    image: image8,
    category: 'Fresh Food',
    description: 'Amala',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '55',
    name: 'Pepper',
    price: 6.99,
    image: image15,
    category: 'Fresh Food',
    description: 'Pepper',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '16',
    name: 'Abuja Bread',
    price: 6.99,
    image: image16,
    category: 'Snacks',
    description: 'Bread',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '17',
    name: 'Golden Morn Cereal 1kg',
    price: 6.99,
    image: image17,
    category: 'Snacks',
    description: 'Golden Morn',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '18',
    name: 'Brooms',
    price: 6.99,
    image: image18,
    category: 'Beauty & Personal Care',
    description: 'Broom',
    inStock: true,
    weight: '1.5kg'
  },

  { id: '19',
    name: 'Aboniki Balm',
    price: 6.99,
    image: image19,
    category: 'Beauty & Personal Care',
    description: 'Aboniki',
    inStock: true,
    weight: '1.5kg'
  },
  { id: '20',
    name: 'puregro Sorrel',
    price: 6.99,
    image: image20,
    category: 'Drinks',
    description: 'puregro Sorrel',
    inStock: true,
    weight: '250g'
  },
  { id: '21',
    name: 'Tetmosol Soap',
    price: 6.99,
    image: image21,
    category: 'Beauty & Personal Care',
    description: 'puregro Sorrel',
    inStock: true,
    weight: '250g'
  },
  { id: '22',
    name: 'Tura Soap',
    price: 6.99,
    image: image22,
    category: 'Beauty & Personal Care',
    description: 'Tura Soap',
    inStock: true,
    weight: '250g'
  },
  { id: '23',
    name: 'Milo',
    price: 6.99,
    image: image25,
    category: 'Snacks',
    description: 'Milo',
    inStock: true,
    weight: '250g'
  },
  { id: '24',
    name: 'Efo',
    price: 6.99,
    image: image24,
    category: 'Fresh Food',
    description: 'Efo',
    inStock: true,
    weight: ''
  },
  { id: '25',
    name: 'Okro',
    price: 6.99,
    image: image23,
    category: 'Fresh Food',
    description: 'Okro',
    inStock: true,
    weight: ''
  },
  { id: '26',
    name: 'Bournvita',
    price: 6.99,
    image: image26,
    category: 'Snacks',
    description: 'Bournvita',
    inStock: true,
    weight: '250g'
  },
  { id: '27',
    name: 'Pap',
    price: 6.99,
    image: image27,
    category: 'Snacks',
    description: 'Pap',
    inStock: true,
    weight: '250g'
  },
  { id: '28',
    name: 'Dry Fish',
    price: 12.99,
    image: image28,
    category: 'Fresh Food',
    description: 'Dry Fish',
    inStock: true,
    weight: ''
  },
  { id: '29',
    name: 'Custard',
    price: 5.50,
    image: image29,
    category: 'Snacks',
    description: 'Custard',
    inStock: true,
    weight: '250g'
  },
  


    
];

// Updated product arrays for homepage sections
export const groceriesProducts = products.filter(product => 
  ['Fresh Food', 'Dry Goods', 'Frozen proteins', 'Drinks', 'Snacks', 'Vegetables & Fresh Produce'].includes(product.category)
);

export const ethnicFoodsProducts = products.filter(product => 
  product.category === 'Ethnic Foods'
);

export const meatFishProducts = products.filter(product => 
  product.category === 'Meat, Fish & Poultry'
);

export const beautyHouseholdProducts = products.filter(product => 
  ['Health & Beauty', 'Household'].includes(product.category)
);

// Keep original arrays for backward compatibility
export const featuredProducts = products.slice(0, 10);
export const newArrivals = products.slice(10, 20);