import type { EstimateRow, EstimateSection } from "@/data"
import { useEstimateContext } from "./context"

export function useEstimateScreen() {
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
