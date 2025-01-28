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
	| "ROLL" // Roll

export interface Supplier {
	name: string
	productUrl?: string
	imageUrl?: string
	sku?: string
}

export interface EstimateRow {
	id: string
	title: string
	price: number
	quantity: number
	uom: UnitOfMeasure
	supplier?: Supplier
}

export interface EstimateSection {
	id: string
	title: string
	rows: EstimateRow[]
}

export interface Estimate {
	id: string
	title: string
	sections: EstimateSection[]
	createdAt: Date
	updatedAt: Date
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
}

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
				},
				{
					id: "d2",
					title: "Debris disposal",
					price: 450.0,
					quantity: 1,
					uom: "LS",
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
							"https://www.homedepot.com/p/Hampton-Bay-Shaker-Base-Cabinets/123456",
						imageUrl:
							"https://images.homedepot.com/hampton-bay-shaker-base-cabinet.jpg",
						sku: "HDC-SHK-BC-36",
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
						productUrl:
							"https://www.homedepot.com/p/Hampton-Bay-Shaker-Wall-Cabinets/123457",
						imageUrl:
							"https://images.homedepot.com/hampton-bay-shaker-wall-cabinet.jpg",
						sku: "HDC-SHK-WC-30",
					},
				},
				{
					id: "c3",
					title: "Cabinet hardware - Matte Black Pulls",
					price: 5.0,
					quantity: 24,
					uom: "EA",
					supplier: {
						name: "Build.com",
						productUrl:
							"https://www.build.com/product/black-cabinet-pulls/123458",
						imageUrl:
							"https://images.build.com/matte-black-cabinet-pulls.jpg",
						sku: "BCH-BLK-5IN",
					},
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
						name: "Stone World",
						productUrl:
							"https://www.stoneworld.com/granite/luna-pearl",
						imageUrl:
							"https://images.stoneworld.com/luna-pearl-granite.jpg",
						sku: "GRN-LP-2CM",
					},
				},
				{
					id: "ct2",
					title: "Backsplash installation",
					price: 18.0,
					quantity: 30,
					uom: "SF",
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
						name: "Floor & Decor",
						productUrl:
							"https://www.flooranddecor.com/porcelain-tile/carrara-look",
						imageUrl:
							"https://images.flooranddecor.com/carrara-porcelain-tile.jpg",
						sku: "FD-PT-CAR-12x24",
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
				},
			],
		},
	],
}
