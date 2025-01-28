import { createContext, useContext } from "react"
import type { Estimate, EstimateRow, EstimateSection } from "@/data"
import { PropsWithChildren, useState } from "react"
import { sampleEstimate } from "@/data"

interface EstimateContextValue {
	estimate: Estimate
	updateTitle: (title: string) => void
	updateSection: (
		sectionId: string,
		updates: Partial<EstimateSection>
	) => void
	updateRow: (rowId: string, updates: Partial<EstimateRow>) => void
}

export const EstimateContext = createContext<EstimateContextValue | null>(null)

export function EstimateProvider({ children }: PropsWithChildren) {
	const [estimate, setEstimate] = useState<Estimate>(sampleEstimate)

	const updateTitle = (title: string) => {
		setEstimate((prev) => ({
			...prev,
			title,
			updatedAt: new Date(),
		}))
	}

	const updateSection = (
		sectionId: string,
		updates: Partial<EstimateSection>
	) => {
		setEstimate((prev) => ({
			...prev,
			updatedAt: new Date(),
			sections: prev.sections.map((section) =>
				section.id === sectionId ? { ...section, ...updates } : section
			),
		}))
	}

	const updateRow = (rowId: string, updates: Partial<EstimateRow>) => {
		setEstimate((prev) => ({
			...prev,
			updatedAt: new Date(),
			sections: prev.sections.map((section) => ({
				...section,
				rows: section.rows.map((row) =>
					row.id === rowId ? { ...row, ...updates } : row
				),
			})),
		}))
	}

	return (
		<EstimateContext.Provider
			value={{
				estimate,
				updateTitle,
				updateSection,
				updateRow,
			}}
		>
			{children}
		</EstimateContext.Provider>
	)
}

export function useEstimateContext() {
	const context = useContext(EstimateContext)
	if (!context) {
		throw new Error("useEstimate must be used within an EstimateProvider")
	}
	return context
}
