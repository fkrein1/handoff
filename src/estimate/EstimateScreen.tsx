import {
	View,
	StyleSheet,
	TextInput,
	ScrollView,
	Pressable,
} from "react-native"
import { Text } from "../common/components/Text"
import { BottomSheet } from "../common/components/BottomSheet"
import { useRef, useState } from "react"
import { BottomSheetView } from "@gorhom/bottom-sheet"
import {
	calculateSectionTotal,
	calculateEstimateTotal,
} from "../common/lib/estimate"
import { EditItemForm } from "./EditItemForm"
import { EditSectionForm } from "./EditSectionForm"
import type { EstimateRow, EstimateSection } from "@/data"
import { useEstimateContext } from "./context"

type EditMode =
	| {
			type: "item"
			data: EstimateRow
	  }
	| {
			type: "section"
			data: EstimateSection
	  }
	| null

export default function EstimateScreen() {
	const bottomSheetRef = useRef<BottomSheet>(null)
	const [editMode, setEditMode] = useState<EditMode>(null)
	const { estimate, updateTitle, updateRow, updateSection } =
		useEstimateContext()

	const handleItemPress = (item: EstimateRow) => {
		setEditMode({ type: "item", data: item })
		bottomSheetRef.current?.expand()
	}

	const handleSectionPress = (section: EstimateSection) => {
		setEditMode({ type: "section", data: section })
		bottomSheetRef.current?.expand()
	}

	const handleSaveItem = (updatedItem: EstimateRow) => {
		updateRow(updatedItem.id, updatedItem)
		bottomSheetRef.current?.close()
		setEditMode(null)
	}

	const handleSaveSection = (updates: Partial<EstimateSection>) => {
		if (editMode?.type === "section") {
			updateSection(editMode.data.id, updates)
			bottomSheetRef.current?.close()
			setEditMode(null)
		}
	}

	const handleCloseBottomSheet = () => {
		bottomSheetRef.current?.close()
		setEditMode(null)
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				<TextInput
					style={styles.titleInput}
					value={estimate.title}
					onChangeText={updateTitle}
					placeholder="Enter estimate title"
				/>
				{estimate.sections.map((section) => (
					<View key={section.id} style={styles.section}>
						<Pressable
							onPress={() => handleSectionPress(section)}
							style={styles.sectionHeader}
						>
							<Text type="subtitle">
								{section.title}: $
								{calculateSectionTotal(section).toFixed(2)}
							</Text>
						</Pressable>
						{section.rows.map((row) => (
							<Pressable
								key={row.id}
								style={styles.row}
								onPress={() => handleItemPress(row)}
							>
								<View style={styles.rowHeader}>
									<Text
										type="default"
										style={styles.rowTitle}
									>
										{row.title}
									</Text>
									<Text
										type="default"
										style={styles.rowTotal}
									>
										${(row.price * row.quantity).toFixed(2)}
									</Text>
								</View>
								<View style={styles.rowDetails}>
									<Text
										type="default"
										style={styles.supplier}
									>
										{row.supplier?.name}{" "}
										{row.supplier?.sku &&
											`(${row.supplier.sku})`}
									</Text>
									<Text type="default">
										${row.price.toFixed(2)} × {row.quantity}{" "}
										{row.uom}
									</Text>
								</View>
							</Pressable>
						))}
					</View>
				))}
				<View style={styles.estimateTotal}>
					<Text type="title">Total:</Text>
					<Text type="title">
						${calculateEstimateTotal(estimate).toFixed(2)}
					</Text>
				</View>
			</ScrollView>

			<BottomSheet
				ref={bottomSheetRef}
				enablePanDownToClose
				snapPoints={["50%"]}
				index={-1}
			>
				<BottomSheetView>
					{editMode?.type === "item" && (
						<EditItemForm
							item={editMode.data}
							onSave={handleSaveItem}
							onClose={handleCloseBottomSheet}
						/>
					)}
					{editMode?.type === "section" && (
						<EditSectionForm
							section={editMode.data}
							onSave={handleSaveSection}
							onClose={handleCloseBottomSheet}
						/>
					)}
				</BottomSheetView>
			</BottomSheet>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleInput: {
		fontSize: 24,
		fontWeight: "bold",
		padding: 16,
	},
	section: {
		marginBottom: 16,
		backgroundColor: "#fff",
	},
	sectionHeader: {
		padding: 16,
		backgroundColor: "#f5f5f5",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	row: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	rowHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	rowTitle: {
		flex: 1,
		marginRight: 8,
	},
	rowTotal: {
		fontWeight: "bold",
	},
	rowDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
		opacity: 0.7,
	},
	supplier: {
		flex: 1,
		marginRight: 8,
	},
	estimateTotal: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
	},
})
