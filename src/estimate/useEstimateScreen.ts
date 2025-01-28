import type { EstimateRow, EstimateSection } from "@/data"
import { useEstimateContext } from "./context"

interface UseEstimateScreenResult {
	estimate: ReturnType<typeof useEstimateContext>["estimate"]
	editMode: ReturnType<typeof useEstimateContext>["editMode"]
	updateTitle: (title: string) => void
	handleStartItemEdit: (item: EstimateRow) => void
	handleStartSectionEdit: (section: EstimateSection) => void
	handleSaveItem: (updatedItem: EstimateRow) => void
	handleSaveSection: (updates: Partial<EstimateSection>) => void
	handleClose: () => void
}

export function useEstimateScreen(): UseEstimateScreenResult {
	const {
		estimate,
		editMode,
		updateTitle,
		updateItem,
		updateSection,
		selectItem,
		selectSection,
		clearSelection,
	} = useEstimateContext()

	const handleSaveItem = (updatedItem: EstimateRow) => {
		updateItem(updatedItem.id, updatedItem)
	}

	const handleSaveSection = (updates: Partial<EstimateSection>) => {
		if (editMode?.type === "section") {
			updateSection(editMode.data.id, updates)
		}
	}

	const handleClose = () => {
		clearSelection()
	}

	return {
		estimate,
		editMode,
		updateTitle,
		handleStartItemEdit: selectItem,
		handleStartSectionEdit: selectSection,
		handleSaveItem,
		handleSaveSection,
		handleClose,
	}
}
