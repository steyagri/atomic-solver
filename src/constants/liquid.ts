// First, define the raw data
const rawLiquidData = [
  {
    "compound_name": "Acétate de méthyle",
    "chemical_formula": "C3H6O2",
    "molar_mass": 74.079,
    "density": "0-20% (20°C)"
  },
  {
    "compound_name": "Acétone",
    "chemical_formula": "C3H6O",
    "molar_mass": 58.08,
    "density": "0-100% (20°C)",
    "concentration": 100,
    "concentration_unit": "%"
  },
  {
    "compound_name": "Acide acétique",
    "chemical_formula": "CH3COOH",
    "molar_mass": 60.052,
    "density": "0-100% (20°C)"
  },
  {
    "compound_name": "Acide chlorhydrique",
    "chemical_formula": "HCl",
    "molar_mass": 36.46,
    "density": "0-40% (20°C)"
  },
  {
    "compound_name": "Acide chloroacétique",
    "chemical_formula": "C2H3ClO2",
    "molar_mass": 94.49,
    "density": "0-32% (20°C)"
  },
  {
    "compound_name": "Acide citrique",
    "chemical_formula": "C6H8O7",
    "molar_mass": 192.123,
    "density": "0-55% (20°C)"
  },
  {
    "compound_name": "Acide nitrique",
    "chemical_formula": "HNO3",
    "molar_mass": 63.012,
    "density": "0-100% (20°C)"
  },
  {
    "compound_name": "Acide oxalique",
    "chemical_formula": "H2C2O4",
    "molar_mass": 90.034,
    "density": "0-10% (17.5°C)"
  },
  {
    "compound_name": "Acide perchlorique",
    "chemical_formula": "HClO4",
    "molar_mass": 100.45,
    "density": "0-70% (15°C)"
  },
  {
    "compound_name": "Acide phosphorique",
    "chemical_formula": "H3PO4",
    "molar_mass": 97.994,
    "density": "0-100% (20°C)"
  },
  {
    "compound_name": "Acide sulfurique",
    "chemical_formula": "H2SO4",
    "molar_mass": 98.07,
    "density": "0-100% (20°C)"
  },
  {
    "compound_name": "Sulfate d'aluminium",
    "chemical_formula": "Al2(SO4)3",
    "molar_mass": 342.132,
    "density": "0-26% (15°C)"
  },
  {
    "compound_name": "Ammoniac",
    "chemical_formula": "NH3",
    "molar_mass": 17.031,
    "density": "0-30% (20°C)"
  },
  {
    "compound_name": "Acétate d'ammonium",
    "chemical_formula": "CH3COONH4",
    "molar_mass": 77.083,
    "density": "0-45% (25°C)"
  },
  {
    "compound_name": "Carbonate d'ammonium",
    "chemical_formula": "(NH4)2CO3",
    "molar_mass": 96.086,
    "density": "-"
  },
  {
    "compound_name": "Chlorure d'ammonium",
    "chemical_formula": "NH4Cl",
    "molar_mass": 53.49,
    "density": "0-24% (20°C)"
  },
  {
    "compound_name": "Hydroxyde d'ammonium",
    "chemical_formula": "NH4OH",
    "molar_mass": 35.046,
    "density": "0-62% (20°C)"
  },
  {
    "compound_name": "Acétate de plomb(II)",
    "chemical_formula": "Pb(C2H3O2)2",
    "molar_mass": 325.3,
    "density": "-"
  },
  {
    "compound_name": "Chlorure de plomb(II)",
    "chemical_formula": "PbCl2",
    "molar_mass": 278.1,
    "density": "-"
  },
  {
    "compound_name": "Nitrate de plomb(II)",
    "chemical_formula": "Pb(NO3)2",
    "molar_mass": 331.2,
    "density": "-"
  },
  {
    "compound_name": "Acétate de plomb(IV)",
    "chemical_formula": "Pb(C2H3O2)4",
    "molar_mass": 443.4,
    "density": "-"
  },
  {
    "compound_name": "Butan-1-ol",
    "chemical_formula": "C4H10O",
    "molar_mass": 74.123,
    "density": "0-8% (20°C)"
  },
  {
    "compound_name": "Chlorure de calcium",
    "chemical_formula": "CaCl2",
    "molar_mass": 110.98,
    "density": "0-40% (20°C)"
  },
  {
    "compound_name": "Hydroxyde de calcium",
    "chemical_formula": "Ca(OH)2",
    "molar_mass": 74.092,
    "density": "-"
  },
  {
    "compound_name": "Nitrate de calcium",
    "chemical_formula": "Ca(NO3)2",
    "molar_mass": 164.086,
    "density": "0-68% (18°C)"
  },
  {
    "compound_name": "Sulfate de calcium",
    "chemical_formula": "CaSO4",
    "molar_mass": 136.13,
    "density": "-"
  },
  {
    "compound_name": "Chlorure d'aluminium",
    "chemical_formula": "AlCl3",
    "molar_mass": 133.33,
    "density": "0-40% (15°C)"
  },
  {
    "compound_name": "Chlorure de chrome(III)",
    "chemical_formula": "CrCl3",
    "molar_mass": 158.35,
    "density": "0-14% (18°C)"
  },
  {
    "compound_name": "Nitrate de chrome(III)",
    "chemical_formula": "Cr(NO3)3",
    "molar_mass": 238.008,
    "density": "-"
  },
  {
    "compound_name": "Oxyde de chrome(VI)",
    "chemical_formula": "CrO3",
    "molar_mass": 99.993,
    "density": "0-60% (15°C)"
  },
  {
    "compound_name": "Citrate de sodium",
    "chemical_formula": "Na3C6H5O7",
    "molar_mass": 258.07,
    "density": "0-36% (20°C)"
  },
  {
    "compound_name": "Dihydrogénophosphate de potassium",
    "chemical_formula": "KH2PO4",
    "molar_mass": 136.084,
    "density": "0-10% (20°C)"
  },
  {
    "compound_name": "Dihydrogénophosphate de sodium",
    "chemical_formula": "NaH2PO4",
    "molar_mass": 119.98,
    "density": "0-40% (20°C)"
  },
  {
    "compound_name": "Diméthylglyoxime",
    "chemical_formula": "(CH3CNOH)2",
    "molar_mass": 116.12,
    "density": "-"
  },
  {
    "compound_name": "EDTA disodique",
    "chemical_formula": "Na2C10H14N2O8",
    "molar_mass": 336.21,
    "density": "0-6% (20°C)"
  },
  {
    "compound_name": "Sulfate de fer(II)",
    "chemical_formula": "FeSO4",
    "molar_mass": 151.9,
    "density": "0-20% (18°C)"
  },
  {
    "compound_name": "Chlorure de fer(III)",
    "chemical_formula": "FeCl3",
    "molar_mass": 162.2,
    "density": "0-50% (20°C)"
  },
  {
    "compound_name": "Nitrate de fer(III)",
    "chemical_formula": "Fe(NO3)3",
    "molar_mass": 241.857,
    "density": "0-25% (18°C)"
  },
  {
    "compound_name": "Sulfate de fer(III)",
    "chemical_formula": "Fe2(SO4)3",
    "molar_mass": 399.86,
    "density": "0-20% (17.5°C)"
  },
  {
    "compound_name": "Éthanol",
    "chemical_formula": "C2H5OH",
    "molar_mass": 46.069,
    "density": "0-100% (20°C)"
  },
  {
    "compound_name": "Éther diéthylique",
    "chemical_formula": "(C2H5)2O",
    "molar_mass": 74.123,
    "density": "0-5% (20°C)"
  },
  {
    "compound_name": "Fructose",
    "chemical_formula": "C6H12O6",
    "molar_mass": 180.156,
    "density": "0-48% (20°C)"
  },
  {
    "compound_name": "Glucose",
    "chemical_formula": "C6H12O6",
    "molar_mass": 180.156,
    "density": "0-60% (20°C)"
  },
  {
    "compound_name": "Glycérol",
    "chemical_formula": "C3H8O3",
    "molar_mass": 92.094,
    "density": "0-100% (20°C)"
  },
  {
    "compound_name": "Hexacyanoferrate(II) de potassium",
    "chemical_formula": "K4Fe(CN)6",
    "molar_mass": 368.345,
    "density": "-"
  },
  {
    "compound_name": "Hexacyanoferrate(III) de potassium",
    "chemical_formula": "K3Fe(CN)6",
    "molar_mass": 329.247,
    "density": "-"
  },
  {
    "compound_name": "Hydrogénocarbonate de sodium",
    "chemical_formula": "NaHCO3",
    "molar_mass": 84.01,
    "density": "0-6% (20°C)"
  },
  {
    "compound_name": "Hydrogénophosphate de potassium",
    "chemical_formula": "K2HPO4",
    "molar_mass": 174.174,
    "density": "0-8% (20°C)"
  },
  {
    "compound_name": "Hydrogénophosphate de sodium",
    "chemical_formula": "Na2HPO4",
    "molar_mass": 141.96,
    "density": "0-6% (20°C)"
  },
  {
    "compound_name": "Hydrogénotartrate de sodium",
    "chemical_formula": "NaHC4H4O6",
    "molar_mass": 172.07,
    "density": "-"
  },
  {
    "compound_name": "Carbonate de potassium",
    "chemical_formula": "K2CO3",
    "molar_mass": 138.204,
    "density": "0-50% (20°C)"
  },
  {
    "compound_name": "Chlorate de potassium",
    "chemical_formula": "KClO3",
    "molar_mass": 122.55,
    "density": "0-4% (20°C)"
  },
  {
    "compound_name": "Chlorure de potassium",
    "chemical_formula": "KCl",
    "molar_mass": 74.55,
    "density": "0-24% (20°C)"
  },
  {
    "compound_name": "Chromate de potassium",
    "chemical_formula": "K2CrO4",
    "molar_mass": 194.188,
    "density": "0-30% (18°C)"
  },
  {
    "compound_name": "Cyanure de potassium",
    "chemical_formula": "KCN",
    "molar_mass": 65.116,
    "density": "-"
  },
  {
    "compound_name": "Dichromate de potassium",
    "chemical_formula": "K2Cr2O7",
    "molar_mass": 294.181,
    "density": "0-10% (20°C)"
  },
  {
    "compound_name": "Hydroxyde de potassium",
    "chemical_formula": "KOH",
    "molar_mass": 56.105,
    "density": "0-50% (15°C)"
  },
  {
    "compound_name": "Iodate de potassium",
    "chemical_formula": "KIO3",
    "molar_mass": 214,
    "density": "-"
  },
  {
    "compound_name": "Iodure de potassium",
    "chemical_formula": "KI",
    "molar_mass": 166,
    "density": "0-55% (20°C)"
  },
  {
    "compound_name": "Permanganate de potassium",
    "chemical_formula": "KMnO4",
    "molar_mass": 158.032,
    "density": "0-6% (20°C)"
  },
  {
    "compound_name": "Sulfate de potassium",
    "chemical_formula": "K2SO4",
    "molar_mass": 174.25,
    "density": "0-10% (20°C)"
  },
  {
    "compound_name": "Nitrate de cobalt(II)",
    "chemical_formula": "Co(NO3)2",
    "molar_mass": 182.941,
    "density": "-"
  },
  {
    "compound_name": "Sulfate de cobalt(II)",
    "chemical_formula": "CoSO4",
    "molar_mass": 154.99,
    "density": "-"
  },
  {
    "compound_name": "Chlorure de cuivre(I)",
    "chemical_formula": "Cu2Cl2",
    "molar_mass": 197.99,
    "density": "0-20% (20°C)"
  },
  {
    "compound_name": "Chlorure de cuivre(II)",
    "chemical_formula": "CuCl2",
    "molar_mass": 134.45,
    "density": "0-20% (20°C)"
  },
  {
    "compound_name": "Nitrate de cuivre(II)",
    "chemical_formula": "Cu(NO3)2",
    "molar_mass": 187.554,
    "density": "0-25% (20°C)"
  },
  {
    "compound_name": "Sulfate de cuivre(II)",
    "chemical_formula": "CuSO4",
    "molar_mass": 159.6,
    "density": "0-20% (18°C)"
  },
  {
    "compound_name": "Chlorure de lithium",
    "chemical_formula": "LiCl",
    "molar_mass": 42.39,
    "density": "0-30% (20°C)"
  },
  {
    "compound_name": "Chlorure de magnésium",
    "chemical_formula": "MgCl2",
    "molar_mass": 95.21,
    "density": "0-30% (20°C)"
  },
  {
    "compound_name": "Nitrate de magnésium",
    "chemical_formula": "Mg(NO3)2",
    "molar_mass": 148.313,
    "density": "-"
  },
  {
    "compound_name": "Sulfate de magnésium",
    "chemical_formula": "MgSO4",
    "molar_mass": 120.36,
    "density": "0-26% (20°C)"
  },
  {
    "compound_name": "Chlorure de manganèse(II)",
    "chemical_formula": "MnCl2",
    "molar_mass": 125.84,
    "density": "-"
  },
  {
    "compound_name": "Sulfate de manganèse(II)",
    "chemical_formula": "MnSO4",
    "molar_mass": 150.99,
    "density": "0-30% (20°C)"
  },
  {
    "compound_name": "Mannitol",
    "chemical_formula": "C6H14O6",
    "molar_mass": 182.172,
    "density": "0-15% (20°C)"
  },
  {
    "compound_name": "Méthanol",
    "chemical_formula": "CH3OH",
    "molar_mass": 32.042,
    "density": "0-100% (15°C)"
  },
  {
    "compound_name": "Acétate de sodium",
    "chemical_formula": "NaC2H3O2",
    "molar_mass": 82.03,
    "density": "0-28% (20°C)"
  },
  {
    "compound_name": "Chlorate de sodium",
    "chemical_formula": "NaClO3",
    "molar_mass": 106.44,
    "density": "0-34% (18°C)"
  },
  {
    "compound_name": "Chlorure de sodium",
    "chemical_formula": "NaCl",
    "molar_mass": 58.44,
    "density": "0-26% (20°C)"
  },
  {
    "compound_name": "Chromate de sodium",
    "chemical_formula": "Na2CrO4",
    "molar_mass": 161.97,
    "density": "0-26% (18°C)"
  },
  {
    "compound_name": "Dichromate de sodium",
    "chemical_formula": "Na2Cr2O7",
    "molar_mass": 261.97,
    "density": "0-50% (15°C)"
  },
  {
    "compound_name": "Hydroxyde de sodium",
    "chemical_formula": "NaOH",
    "molar_mass": 40,
    "density": "0-50% (20°C)"
  },
  {
    "compound_name": "Phosphate de sodium",
    "chemical_formula": "Na3PO4",
    "molar_mass": 163.94,
    "density": "0-8% (20°C)"
  },
  {
    "compound_name": "Sulfate de sodium",
    "chemical_formula": "Na2SO4",
    "molar_mass": 142.04,
    "density": "0-24% (20°C)"
  },
  {
    "compound_name": "Thiosulfate de sodium",
    "chemical_formula": "Na2S2O3",
    "molar_mass": 158.1,
    "density": "0-40% (20°C)"
  },
  {
    "compound_name": "Chlorure de nickel",
    "chemical_formula": "NiCl2",
    "molar_mass": 129.59,
    "density": "0-30% (18°C)"
  },
  {
    "compound_name": "Nitrate de nickel",
    "chemical_formula": "Ni(NO3)2",
    "molar_mass": 182.701,
    "density": "0-35% (20°C)"
  },
  {
    "compound_name": "Sulfate de nickel",
    "chemical_formula": "NiSO4",
    "molar_mass": 154.75,
    "density": "0-18% (18°C)"
  },
  {
    "compound_name": "Pentan-1-ol",
    "chemical_formula": "C5H11OH",
    "molar_mass": 88.15,
    "density": "-"
  },
  {
    "compound_name": "Peroxyde d'hydrogène",
    "chemical_formula": "H2O2",
    "molar_mass": 34.014,
    "density": "0-100% (18°C)"
  },
  {
    "compound_name": "Phénol",
    "chemical_formula": "C6H6O",
    "molar_mass": 94.113,
    "density": "0-5% (15°C)"
  },
  {
    "compound_name": "Propan-1-ol",
    "chemical_formula": "CH3CH2CH2OH",
    "molar_mass": 60.096,
    "density": "0-100% (15°C)"
  },
  {
    "compound_name": "Propan-2-ol",
    "chemical_formula": "CH3CHOHCH3",
    "molar_mass": 60.096,
    "density": "0-100% (20°C)"
  },
  {
    "compound_name": "Chlorure de mercure(II)",
    "chemical_formula": "HgCl2",
    "molar_mass": 271.49,
    "density": "-"
  },
  {
    "compound_name": "Saccharose",
    "chemical_formula": "C12H22O11",
    "molar_mass": 342.297,
    "density": "0-89% (20°C)"
  },
  {
    "compound_name": "Nitrate d'argent",
    "chemical_formula": "AgNO3",
    "molar_mass": 169.87,
    "density": "0-40% (20°C)"
  },
  {
    "compound_name": "Sulfate d'argent",
    "chemical_formula": "Ag2SO4",
    "molar_mass": 311.8,
    "density": "-"
  },
  {
    "compound_name": "Sulfate d'ammonium et de fer(II)",
    "chemical_formula": "FeSO4+(NH4)2SO4",
    "molar_mass": 284.04,
    "density": "-"
  },
  {
    "compound_name": "Tartrate de potassium et de sodium",
    "chemical_formula": "NaKC4H4O6",
    "molar_mass": 210.16,
    "density": "0-36% (20°C)"
  },
  {
    "compound_name": "Thiourée",
    "chemical_formula": "CH4N2S",
    "molar_mass": 76.12,
    "density": "0-7% (15°C)"
  },
  {
    "compound_name": "Chlorure de zinc",
    "chemical_formula": "ZnCl2",
    "molar_mass": 136.28,
    "density": "0-70% (20°C)"
  },
  {
    "compound_name": "Nitrate de zinc",
    "chemical_formula": "Zn(NO3)2",
    "molar_mass": 189.39,
    "density": "0-50% (18°C)"
  },
  {
    "compound_name": "Sulfate de zinc",
    "chemical_formula": "ZnSO4",
    "molar_mass": 161.44,
    "density": "0-16% (20°C)"
  },
  {
    "compound_name": "Chlorure d'etain(II)",
    "chemical_formula": "SnCl2",
    "molar_mass": 189.61,
    "density": "0-65% (15°C)"
  },
  {
    "compound_name": "Chlorure d'etain(IV)",
    "chemical_formula": "SnCl4",
    "molar_mass": 260.51,
    "density": "0-70% (15°C)"
  }
];

// Then, process the data to add the required properties and wrap in the expected structure
export const liquid = {
  chemicals: Array.isArray(rawLiquidData) ? 
    rawLiquidData.map(chemical => ({
      // Original properties
      compound_name: chemical.compound_name,
      chemical_formula: chemical.chemical_formula,
      molar_mass: chemical.molar_mass,
      density: chemical.density || "",
      
      // Add standardized property names for compatibility
      name: chemical.compound_name,
      formula: chemical.chemical_formula,
      molecular_weight: chemical.molar_mass,
      
      // Default values for optional properties
      concentration: chemical.concentration || 100,
      concentration_unit: chemical.concentration_unit || "%",
    })) : []
};