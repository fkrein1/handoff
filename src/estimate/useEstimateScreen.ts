import type { EstimateRow, EstimateSection } from "@/data";

import { useEstimateContext } from "./context";

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
    deleteItem,
  } = useEstimateContext();

  const handleSaveItem = (updatedItem: EstimateRow) => {
    if (editMode?.type !== "item") {
      return;
    }

    updateItem(updatedItem.id, updatedItem);
  };

  const handleDeleteItem = (deletedItem: EstimateRow) => {
    deleteItem(deletedItem.id);
  };

  const handleSaveSection = (updates: Partial<EstimateSection>) => {
    if (editMode?.type !== "section") {
      return;
    }

    updateSection(editMode.data.id, updates);
  };

  return {
    estimate,
    editMode,
    updateTitle,
    handleStartItemEdit: selectItem,
    handleStartSectionEdit: selectSection,
    handleSaveItem,
    handleSaveSection,
    handleStopEdit: clearSelection,
    handleDeleteItem,
  };
}
