export type UnitOfMeasure =
  | "SF" // Square Feet
  | "LF" // Linear Feet
  | "EA" // Each
  | "SY" // Square Yard
  | "CY" // Cubic Yard
  | "HR" // Hour
  | "DAY" // Day
  | "LS" // Lump Sum
  | "TON" // Ton
  | "GAL" // Gallon
  | "BF" // Board Feet
  | "BOX" // Box
  | "SET" // Set
  | "ROLL"; // Roll

export interface Supplier {
  name: string;
  productUrl?: string;
  logoUrl?: string;
  sku?: string;
}

export interface EstimateRow {
  id: string;
  title: string;
  price: number;
  quantity: number;
  uom: UnitOfMeasure;
  supplier?: Supplier;
}

export interface EstimateSection {
  id: string;
  title: string;
  rows: EstimateRow[];
}

export interface Estimate {
  id: string;
  title: string;
  sections: EstimateSection[];
  createdAt: Date;
  updatedAt: Date;
}

export const UOM_LABELS: Record<UnitOfMeasure, string> = {
  SF: "Square Feet",
  LF: "Linear Feet",
  EA: "Each",
  SY: "Square Yard",
  CY: "Cubic Yard",
  HR: "Hour",
  DAY: "Day",
  LS: "Lump Sum",
  TON: "Ton",
  GAL: "Gallon",
  BF: "Board Feet",
  BOX: "Box",
  SET: "Set",
  ROLL: "Roll",
};

export const sampleEstimate: Estimate = {
  id: "1",
  title: "Kitchen Remodel - 123 Main St",
  createdAt: new Date("2024-02-20"),
  updatedAt: new Date("2024-02-20"),
  sections: [
    {
      id: "s1",
      title: "Demolition",
      rows: [
        {
          id: "d1",
          title: "Remove existing cabinets",
          price: 45.0,
          quantity: 8,
          uom: "HR",
          supplier: {
            name: "Lowe's",
            logoUrl:
              "https://pub-ca0b94acca574deeadc8cbc9c1fc1a09.r2.dev/lowes.png",
          },
        },
        {
          id: "d2",
          title: "Debris disposal",
          price: 450.0,
          quantity: 1,
          uom: "LS",
          supplier: {
            name: "Lowe's",
            logoUrl:
              "https://pub-ca0b94acca574deeadc8cbc9c1fc1a09.r2.dev/lowes.png",
          },
        },
      ],
    },
    {
      id: "s2",
      title: "Cabinets",
      rows: [
        {
          id: "c1",
          title: "Base cabinets - Hampton Bay Shaker",
          price: 250.0,
          quantity: 12,
          uom: "LF",
          supplier: {
            name: "Home Depot",
            productUrl:
              "https://www.homedepot.com/p/Hampton-Bay-Designer-Series-Melvern-Assembled-36x34-5x23-75-in-Base-Kitchen-Cabinet-with-Ball-Bearing-Drawer-Glides-in-White-B36-MELW/305468743",
            logoUrl:
              "https://pub-ca0b94acca574deeadc8cbc9c1fc1a09.r2.dev/home-depot.png",
            sku: "305468743",
          },
        },
        {
          id: "c2",
          title: "Upper cabinets - Hampton Bay Shaker",
          price: 200.0,
          quantity: 10,
          uom: "LF",
          supplier: {
            name: "Home Depot",
            // This URL is just for demo purposes
            productUrl:
              "https://www.homedepot.com/p/Hampton-Bay-Designer-Series-Melvern-Assembled-30x30x11-75-in-Wall-Kitchen-Cabinet-in-White-W3030-MELW/305468086",
            logoUrl:
              "https://pub-ca0b94acca574deeadc8cbc9c1fc1a09.r2.dev/home-depot.png",
            sku: "305468086",
          },
        },
        {
          id: "c3",
          title: "Cabinet hardware - Matte Black Pulls",
          price: 5.0,
          quantity: 24,
          uom: "EA",
        },
      ],
    },
    {
      id: "s3",
      title: "Countertops",
      rows: [
        {
          id: "ct1",
          title: "Granite countertops - Luna Pearl",
          price: 75.0,
          quantity: 35,
          uom: "SF",
          supplier: {
            name: "Lowe's",
            logoUrl:
              "https://pub-ca0b94acca574deeadc8cbc9c1fc1a09.r2.dev/lowes.png",
          },
        },
        {
          id: "ct2",
          title: "Backsplash installation",
          price: 18.0,
          quantity: 30,
          uom: "SF",
          supplier: {
            name: "Home Depot",
            logoUrl:
              "https://pub-ca0b94acca574deeadc8cbc9c1fc1a09.r2.dev/home-depot.png",
          },
        },
      ],
    },
    {
      id: "s4",
      title: "Flooring",
      rows: [
        {
          id: "f1",
          title: "Porcelain tile - Carrara Look",
          price: 12.0,
          quantity: 120,
          uom: "SF",
          supplier: {
            name: "Home Depot",
            logoUrl:
              "https://pub-ca0b94acca574deeadc8cbc9c1fc1a09.r2.dev/home-depot.png",
          },
        },
        {
          id: "f2",
          title: "Floor underlayment",
          price: 2.5,
          quantity: 120,
          uom: "SF",
        },
        {
          id: "f3",
          title: "Grout and materials",
          price: 175.0,
          quantity: 1,
          uom: "LS",
          supplier: {
            name: "Lowe's",
            logoUrl:
              "https://pub-ca0b94acca574deeadc8cbc9c1fc1a09.r2.dev/lowes.png",
          },
        },
      ],
    },
  ],
};
