import { useState } from "react"
import type { EstimateRow, EstimateSection } from "@/data"
import { useEstimateContext } from "./context"

export type EditMode =
	| {
			type: "item"
			data: EstimateRow
	  }
	| {
			type: "section"
			data: EstimateSection
	  }
	| null

interface UseEstimateScreenPayload {
	estimate: ReturnType<typeof useEstimateContext>["estimate"]
	editMode: EditMode
	updateTitle: (title: string) => void
	updateRow: (rowId: string, updates: Partial<EstimateRow>) => void
	updateSection: (
		sectionId: string,
		updates: Partial<EstimateSection>
	) => void
	handleStartItemEdit: (item: EstimateRow) => void
	handleStartSectionEdit: (section: EstimateSection) => void
	handleSaveItem: (updatedItem: EstimateRow) => void
	handleSaveSection: (updatedSection: Pick<EstimateSection, "title">) => void
	handleClose: () => void
}

export function useEstimateScreen(): UseEstimateScreenPayload {
	const { estimate, updateTitle, updateRow, updateSection } =
		useEstimateContext()
	const [editMode, setEditMode] = useState<EditMode>(null)

	const handleSaveItem = (updatedItem: EstimateRow) => {
		if (editMode?.type !== "item") {
			return
		}

		updateRow(editMode.data.id, updatedItem)
		setEditMode(null)
	}

	const handleSaveSection = (
		updatedSection: Pick<EstimateSection, "title">
	) => {
		if (editMode?.type !== "section") {
			return
		}

		updateSection(editMode.data.id, updatedSection)
		setEditMode(null)
	}

	const handleClose = () => {
		setEditMode(null)
	}

	const handleStartItemEdit = (item: EstimateRow) => {
		setEditMode({ type: "item", data: item })
	}

	const handleStartSectionEdit = (section: EstimateSection) => {
		setEditMode({ type: "section", data: section })
	}

	return {
		estimate,
		editMode,
		updateTitle,
		updateRow,
		updateSection,
		handleStartItemEdit,
		handleStartSectionEdit,
		handleSaveItem,
		handleSaveSection,
		handleClose,
	}
}
