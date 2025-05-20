import { ProductCategory } from '@/components/ProductDetailModal';
import { useTranslation } from '../contexts/TranslationContext';

// Import SVG images
import alcoholImage from '@/assets/images/alcohol.svg';
import aromaticsImage from '@/assets/images/aromatics.svg';
import aliphaticsImage from '@/assets/images/aliphatics.svg';
import glycolsImage from '@/assets/images/glycols.svg';
import ketonesImage from '@/assets/images/ketones.svg';
import aminesImage from '@/assets/images/amines.svg';

// Create translations for product descriptions
const productDescriptions = {
  en: {
    alcohols: "Premium-grade alcohols for various industrial applications including cleaning, extraction, and synthesis processes.",
    ipaDesc: "A colorless, flammable chemical compound with a strong odor. It is the simplest example of a secondary alcohol, where the alcohol carbon atom is attached to two other carbon atoms.",
    butanolDesc: "A primary alcohol with a 4-carbon structure. It is a colorless liquid that is poorly soluble in water but miscible with most organic solvents.",
    methanolDesc: "The simplest alcohol, a light, volatile, colorless, flammable liquid with a distinctive odor. It is used as a feedstock, solvent, and fuel.",
    ethanolDesc: "A primary alcohol that is a colorless, slightly toxic chemical compound with a distinctive odor. It is widely used in disinfectants, solvents, fuels, and the beverage industry."
  },
  zh: {
    alcohols: "高级醇类产品，适用于各种工业应用，包括清洁、提取和合成工艺。",
    ipaDesc: "无色、易燃的化学化合物，具有强烈的气味。它是仅次于乙醇的简单的醇，其中醇碳原子连接到两个其他碳原子。",
    butanolDesc: "一种含有4个碳原子的初级醇。它是一种无色液体，在水中溶解度较差，但可与大多数有机溶剂混溶。",
    methanolDesc: "最简单的醇，是一种轻、挥发性、无色、易燃的液体，有特殊的气味。用作原料、溶剂和燃料。",
    ethanolDesc: "一种是无色、微毒的化学化合物，有特殊的气味。它广泛用于消毒、溶剂、燃料和饮料工业。"
  },
  ms: {
    alcohols: "Alkohol gred premium untuk pelbagai aplikasi industri termasuk pembersihan, pengekstrakan, dan proses sintesis.",
    ipaDesc: "Sebatian kimia tidak berwarna, mudah terbakar dengan bau yang kuat. Ia adalah contoh paling mudah alkohol sekunder, di mana atom karbon alkohol melekat pada dua atom karbon lain.",
    butanolDesc: "Alkohol primer dengan struktur 4-karbon. Ia adalah cecair tidak berwarna yang kurang larut dalam air tetapi boleh bercampur dengan kebanyakan pelarut organik.",
    methanolDesc: "Alkohol paling ringkas, cecair yang ringan, mudah meruap, tidak berwarna, mudah terbakar dengan bau yang khas. Ia digunakan sebagai bahan mentah, pelarut, dan bahan api.",
    ethanolDesc: "Alkohol primer yang merupakan sebatian kimia tidak berwarna, sedikit toksik dengan bau yang khas. Ia digunakan secara meluas dalam disinfektan, pelarut, bahan api, dan industri minuman."
  }
};

// Helper function to get the current language
const getCurrentLanguage = () => {
  // Get the language from localStorage
  const storedLanguage = localStorage.getItem('selectedLanguage');
  return storedLanguage ? JSON.parse(storedLanguage).code : 'en';
};

// Function to get translated text
const getTranslatedText = (textKey) => {
  const language = getCurrentLanguage();
  const availableLanguages = ['en', 'zh', 'ms'];
  const lang = availableLanguages.includes(language) ? language : 'en';
  
  return productDescriptions[lang][textKey] || productDescriptions.en[textKey];
};

export const productData: ProductCategory[] = [
  {
    id: "alcohols",
    title: "Alcohols",
    description: getCurrentLanguage() === 'zh' ? "高级醇类产品，适用于各种工业应用，包括清洁、提取和合成工艺。" : 
                 getCurrentLanguage() === 'ms' ? "Alkohol gred premium untuk pelbagai aplikasi industri termasuk pembersihan, pengekstrakan, dan proses sintesis." :
                 "Premium-grade alcohols for various industrial applications including cleaning, extraction, and synthesis processes.",
    image: alcoholImage,
    tags: ["Chemical", "Industrial"],
    details: [
      {
        name: "Isopropyl Alcohol (IPA)",
        description: getCurrentLanguage() === 'zh' ? "无色、易燃的化学化合物，具有强烈的气味。它是仅次于乙醇的简单的醇，其中醇碳原子连接到两个其他碳原子。" : 
                     getCurrentLanguage() === 'ms' ? "Sebatian kimia tidak berwarna, mudah terbakar dengan bau yang kuat. Ia adalah contoh paling mudah alkohol sekunder, di mana atom karbon alkohol melekat pada dua atom karbon lain." :
                     "A colorless, flammable chemical compound with a strong odor. It is the simplest example of a secondary alcohol, where the alcohol carbon atom is attached to two other carbon atoms.",
        casNumber: "67-63-0",
        applications: [
          "Cleaning and disinfection",
          "Manufacturing processes",
          "Industrial solvent",
          "Personal care products",
          "Pharmaceutical processing"
        ],
        specifications: {
          "Appearance": "Clear, colorless liquid",
          "Purity": ">99.8%",
          "Water Content": "<0.1%",
          "Acidity": "<0.001%"
        }
      },
      {
        name: "n-Butanol",
        description: "A primary alcohol with a 4-carbon structure. It is a colorless liquid that is poorly soluble in water but readily soluble in conventional organic solvents.",
        casNumber: "71-36-3",
        applications: [
          "Production of butyl acetate",
          "Direct solvent in paints and coatings",
          "Industrial cleaners",
          "Plasticizers",
          "Textile manufacturing"
        ]
      },
      {
        name: "Methanol",
        description: "The simplest alcohol, a light, volatile, colorless, flammable liquid with a distinctive odor. It is used as a solvent, fuel, and antifreeze.",
        casNumber: "67-56-1",
        applications: [
          "Solvent for industrial processes",
          "Fuel additive",
          "Production of formaldehyde",
          "Antifreeze component",
          "Biodiesel manufacturing"
        ]
      },
      {
        name: "Ethanol",
        description: "A primary alcohol that is a colorless, slightly toxic chemical compound with a distinctive odor. It is used in many industrial applications and as a fuel source.",
        casNumber: "64-17-5",
        applications: [
          "Solvent in chemical processes",
          "Fuel additive",
          "Cleaning agent",
          "Antiseptic and disinfectant",
          "Food and beverage industry"
        ]
      }
    ]
  },
  {
    id: "aromatics",
    title: "Aromatics",
    description: "High-quality aromatic chemicals for coatings, plastics, and pharmaceutical applications.",
    image: aromaticsImage,
    tags: ["Aromatics", "Chemical"],
    details: [
      {
        name: "Toluene",
        description: "An aromatic hydrocarbon that is widely used as an industrial feedstock and solvent. It is a colorless, water-insoluble liquid with a smell similar to paint thinners.",
        casNumber: "108-88-3",
        applications: [
          "Paint thinner and solvent",
          "Fuel additive",
          "Chemical intermediate",
          "Production of benzene and xylene",
          "Manufacturing of explosives"
        ]
      },
      {
        name: "Xylene",
        description: "A mixture of three isomers of dimethylbenzene. It's a clear, colorless, sweet-smelling liquid that is widely used as a solvent.",
        casNumber: "1330-20-7",
        applications: [
          "Printing, rubber, and leather industries",
          "Solvent in paints and coatings",
          "Manufacturing of plastics",
          "Synthesis of other chemicals",
          "Cleaning agent in laboratories"
        ]
      },
      {
        name: "Benzene",
        description: "An important organic chemical compound with a sweet smell. It is primarily used as a precursor to the manufacture of chemicals with more complex structures.",
        casNumber: "71-43-2",
        applications: [
          "Production of styrene, phenol, and cyclohexane",
          "Manufacturing of plastics and resins",
          "Rubber industry",
          "Solvent for fats, oils, and paints",
          "Chemical synthesis"
        ]
      }
    ]
  },
  {
    id: "aliphatics",
    title: "Aliphatics",
    description: "Premium aliphatic hydrocarbons for industrial applications and manufacturing processes.",
    image: aliphaticsImage,
    tags: ["Aliphatics", "Chemical"],
    details: [
      {
        name: "Hexane",
        description: "A straight-chain alkane with six carbon atoms. It is a colorless liquid with a slightly disagreeable odor, mainly used as a solvent.",
        casNumber: "110-54-3",
        applications: [
          "Extraction of vegetable oils",
          "Industrial cleaning and degreasing",
          "Laboratory chemical reactions",
          "Polymerization processes",
          "Textile industry solvent"
        ]
      },
      {
        name: "Heptane",
        description: "A straight-chain alkane with seven carbon atoms. It is a colorless liquid that is insoluble in water and often used as a non-polar solvent.",
        casNumber: "142-82-5",
        applications: [
          "Laboratory solvent",
          "Pharmaceutical manufacturing",
          "Food processing",
          "Rubber cement formulations",
          "Fuel research"
        ]
      },
      {
        name: "Special Aliphatic Solvents",
        description: "Custom blends of aliphatic hydrocarbons designed for specific industrial applications requiring precise performance characteristics.",
        applications: [
          "Specialty coatings and paints",
          "Industrial cleaning solutions",
          "Advanced adhesive formulations",
          "Oil and gas industry",
          "Custom manufacturing processes"
        ]
      }
    ]
  },
  {
    id: "glycols",
    title: "Glycols",
    description: "High-quality glycols for diverse industrial applications and manufacturing processes.",
    image: glycolsImage,
    tags: ["Glycols", "Industrial"],
    details: [
      {
        name: "Mono Ethylene Glycol (MEG)",
        description: "An important industrial compound used as a raw material in the manufacture of polyester fibers and as a coolant and antifreeze.",
        casNumber: "107-21-1",
        applications: [
          "Antifreeze and coolant in automotive applications",
          "Polyester fiber manufacturing",
          "Heat transfer fluid",
          "Dehydrating agent",
          "Humectant in various products"
        ]
      },
      {
        name: "Di Ethylene Glycol (DEG)",
        description: "A colorless, odorless, non-volatile liquid with a sweet taste. It is miscible with water, alcohol, ether, acetone, and ethylene glycol.",
        casNumber: "111-46-6",
        applications: [
          "Solvent in resins and dyes",
          "Plasticizer production",
          "Gas dehydration processes",
          "Textile conditioning",
          "Component in brake fluids"
        ]
      },
      {
        name: "Tri Ethylene Glycol (TEG)",
        description: "A colorless, odorless, non-volatile liquid that is soluble in water. It has a high boiling point and low freezing point.",
        casNumber: "112-27-6",
        applications: [
          "Natural gas dehydration",
          "Air disinfection and deodorization",
          "Plasticizer in vinyl compositions",
          "Solvent in printing inks",
          "Humectant in various industries"
        ]
      }
    ]
  },
  {
    id: "ketones",
    title: "Ketones & Esters",
    description: "Premium ketones and esters for industrial solvent applications and chemical processes.",
    image: ketonesImage,
    tags: ["Ketones", "Esters"],
    details: [
      {
        name: "Acetone",
        description: "The simplest and most important ketone. It is a colorless, volatile, flammable liquid and is the smallest ketone.",
        casNumber: "67-64-1",
        applications: [
          "Solvent for cleaning and degreasing",
          "Production of plastics and synthetic fibers",
          "Nail polish remover",
          "Laboratory solvent",
          "Paint and varnish manufacturing"
        ]
      },
      {
        name: "Methyl Ethyl Ketone (MEK)",
        description: "An organic compound with the formula CH₃C(O)CH₂CH₃. It is a colorless liquid with a sharp, sweet odor reminiscent of acetone.",
        casNumber: "78-93-3",
        applications: [
          "Solvent for surface coatings",
          "Manufacturing of plastics",
          "Dewaxing of lubricating oils",
          "Adhesive formulations",
          "Printing ink solvent"
        ]
      },
      {
        name: "Methyl Isobutyl Ketone (MIBK)",
        description: "A colorless liquid with a pleasant odor. It is soluble in alcohol, ether, and benzene but only slightly soluble in water.",
        casNumber: "108-10-1",
        applications: [
          "Solvent for paints, varnishes, and lacquers",
          "Extraction solvent in metal processing",
          "Production of rubber chemicals",
          "Manufacturing of pharmaceuticals",
          "Synthetic resin production"
        ]
      },
      {
        name: "Specialty Esters",
        description: "Various ester compounds used in industrial applications for their solvent properties and as intermediates in chemical synthesis.",
        applications: [
          "Flavors and fragrances",
          "Plasticizers for polymers",
          "Solvents in coatings",
          "Lubricants in specialized applications",
          "Pharmaceutical intermediates"
        ]
      }
    ]
  },
  {
    id: "amines",
    title: "Amines",
    description: "High-quality amine chemicals for various industrial processes and applications.",
    image: aminesImage,
    tags: ["Amines", "Chemical"],
    details: [
      {
        name: "Mono Ethanol Amine (MEA)",
        description: "A clear, viscous liquid with an odor similar to ammonia. It is the simplest amino alcohol.",
        casNumber: "141-43-5",
        applications: [
          "Acid gas scrubbing",
          "Production of surfactants",
          "Pharmaceutical synthesis",
          "Wood preservative formulations",
          "Corrosion inhibitors in metalworking fluids"
        ]
      },
      {
        name: "Di Ethanol Amine (DEA)",
        description: "A secondary amine and a dialcohol. It is a colorless liquid with a mild ammonia-like odor.",
        casNumber: "111-42-2",
        applications: [
          "Gas sweetening processes",
          "Detergent manufacturing",
          "Cosmetics production",
          "Textile finishing",
          "Corrosion inhibition in cooling systems"
        ]
      },
      {
        name: "Tri Ethanol Amine (TEA)",
        description: "A tertiary amine and a triol. It is a colorless, viscous liquid with an ammonia-like odor.",
        casNumber: "102-71-6",
        applications: [
          "Cement grinding aid",
          "Surfactant in personal care products",
          "Gas treating formulations",
          "Corrosion inhibitors",
          "Textile processing chemicals"
        ]
      }
    ]
  }
];