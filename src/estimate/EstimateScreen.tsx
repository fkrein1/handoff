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
import { sampleEstimate } from "@/data"
import {
	calculateSectionTotal,
	calculateEstimateTotal,
} from "../common/lib/estimate"
import { EditItemForm } from "./components/EditItemForm"
import type { EstimateRow } from "@/data"
import { useEstimateContext } from "./context"

export default function EstimateScreen() {
	const bottomSheetRef = useRef<BottomSheet>(null)
	const [selectedItem, setSelectedItem] = useState<EstimateRow | null>(null)
	const { estimate, updateTitle, updateRow } = useEstimateContext()

	const handleItemPress = (item: EstimateRow) => {
		setSelectedItem(item)
		bottomSheetRef.current?.expand()
	}

	const handleSaveItem = (updatedItem: EstimateRow) => {
		updateRow(updatedItem.id, updatedItem)
		bottomSheetRef.current?.close()
		setSelectedItem(null)
	}

	const handleCloseBottomSheet = () => {
		bottomSheetRef.current?.close()
		setSelectedItem(null)
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
						<Text type="subtitle">
							{section.title}: $
							{calculateSectionTotal(section).toFixed(2)}
						</Text>

						{section.rows.map((row) => (
							<Pressable
								key={row.id}
								style={styles.row}
								onPress={() => handleItemPress(row)}
							>
								<View style={styles.rowHeader}>
									<Text type="default">{row.title}</Text>
									{row.supplier && (
										<Text type="default">
											{row.supplier.name}{" "}
											{row.supplier.sku &&
												`(${row.supplier.sku})`}
										</Text>
									)}
								</View>
								<View style={styles.rowDetails}>
									<Text>
										${row.price.toFixed(2)} × {row.quantity}{" "}
										{row.uom}
									</Text>
									<Text type="default">
										${(row.price * row.quantity).toFixed(2)}
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
					{selectedItem && (
						<EditItemForm
							item={selectedItem}
							onSave={handleSaveItem}
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
		padding: 12,
		borderRadius: 8,
		backgroundColor: "#f5f5f5",
		margin: 16,
	},
	section: {
		marginHorizontal: 16,
		marginBottom: 24,
		backgroundColor: "#ffffff",
		padding: 16,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	row: {
		marginTop: 12,
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	rowHeader: {
		marginBottom: 4,
	},
	rowDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	sectionTotal: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
		paddingTop: 12,
		borderTopWidth: 2,
		borderTopColor: "#f0f0f0",
	},
	estimateTotal: {
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 16,
		padding: 16,
		backgroundColor: "#f8f8f8",
		borderRadius: 8,
	},
})
