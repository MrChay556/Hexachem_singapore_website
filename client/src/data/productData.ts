import { ProductCategory } from '@/components/ProductDetailModal';

export const productData: ProductCategory[] = [
  {
    id: "alcohols",
    title: "Alcohols",
    description: "Premium-grade alcohols for various industrial applications including cleaning, extraction, and synthesis processes.",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Chemical", "Industrial"],
    details: [
      {
        name: "Isopropyl Alcohol (IPA)",
        description: "A colorless, flammable chemical compound with a strong odor. It is the simplest example of a secondary alcohol, where the alcohol carbon atom is attached to two other carbon atoms.",
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
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db74?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
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
    image: "https://images.unsplash.com/photo-1616458964840-5108e4d3adb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
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
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
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
    image: "https://images.unsplash.com/photo-1629461461658-d7ec10b73161?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
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
    image: "https://images.unsplash.com/photo-1581093458791-9cd6747f5948?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
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