import { View, StyleSheet, TextInput, Pressable } from "react-native"
import { Text } from "../common/components/Text"
import type { EstimateRow } from "@/data"
import { useState } from "react"
import { EditItemForm } from "./EditItemForm"
import {
	calculateSectionTotal,
	calculateEstimateTotal,
} from "../common/lib/estimate"
import { useEstimateContext } from "./context"

export default function EstimateScreenDesktop() {
	const { estimate, updateTitle, updateRow } = useEstimateContext()
	const [selectedItem, setSelectedItem] = useState<EstimateRow | null>(null)

	const handleItemPress = (item: EstimateRow) => {
		setSelectedItem(item)
	}

	const handleSaveItem = (updatedItem: EstimateRow) => {
		updateRow(updatedItem.id, updatedItem)
		setSelectedItem(null)
	}

	const handleCloseForm = () => {
		setSelectedItem(null)
	}

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TextInput
					style={styles.titleInput}
					value={estimate.title}
					onChangeText={updateTitle}
					placeholder="Enter estimate title"
				/>
			</View>

			{/* Main content */}
			<View style={styles.content}>
				{/* Left side - Table */}
				<View style={styles.tableContainer}>
					{estimate.sections.map((section) => (
						<View key={section.id} style={styles.section}>
							<View style={styles.sectionHeader}>
								<Text type="subtitle">{section.title}</Text>
								<Text type="subtitle">
									${calculateSectionTotal(section).toFixed(2)}
								</Text>
							</View>

							{/* Table header */}
							<View style={styles.tableHeader}>
								<Text style={styles.col1}>Item</Text>
								<Text style={styles.col2}>Supplier</Text>
								<Text style={styles.col3}>Price</Text>
								<Text style={styles.col4}>Quantity</Text>
								<Text style={styles.col5}>Total</Text>
							</View>

							{/* Table rows */}
							{section.rows.map((row) => (
								<Pressable
									key={row.id}
									style={[
										styles.tableRow,
										selectedItem?.id === row.id &&
											styles.selectedRow,
									]}
									onPress={() => handleItemPress(row)}
								>
									<Text style={styles.col1}>{row.title}</Text>
									<Text style={styles.col2}>
										{row.supplier?.name}{" "}
										{row.supplier?.sku &&
											`(${row.supplier.sku})`}
									</Text>
									<Text style={styles.col3}>
										${row.price.toFixed(2)}
									</Text>
									<Text style={styles.col4}>
										{row.quantity} {row.uom}
									</Text>
									<Text style={styles.col5}>
										${(row.price * row.quantity).toFixed(2)}
									</Text>
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
				</View>

				{/* Right side - Edit form */}
				<View style={styles.formContainer}>
					{selectedItem ? (
						<EditItemForm
							item={selectedItem}
							onSave={handleSaveItem}
							onClose={handleCloseForm}
						/>
					) : (
						<View style={styles.noSelection}>
							<Text type="subtitle">Select an item to edit</Text>
						</View>
					)}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
		backgroundColor: "#ffffff",
	},
	titleInput: {
		fontSize: 24,
		fontWeight: "bold",
		padding: 12,
		borderRadius: 8,
		backgroundColor: "#f5f5f5",
	},
	content: {
		flex: 1,
		flexDirection: "row",
	},
	tableContainer: {
		flex: 2,
		padding: 16,
	},
	formContainer: {
		flex: 1,
		borderLeftWidth: 1,
		borderLeftColor: "#e0e0e0",
		backgroundColor: "#ffffff",
		padding: 16,
	},
	section: {
		backgroundColor: "#ffffff",
		borderRadius: 8,
		marginBottom: 16,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: "#f8f8f8",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	tableHeader: {
		flexDirection: "row",
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
		backgroundColor: "#f5f5f5",
	},
	tableRow: {
		flexDirection: "row",
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
		cursor: "pointer",
	},
	selectedRow: {
		backgroundColor: "#f0f7ff",
	},
	col1: { flex: 3 }, // Item name
	col2: { flex: 2 }, // Supplier
	col3: { flex: 1 }, // Price
	col4: { flex: 1 }, // Quantity
	col5: { flex: 1 }, // Total
	estimateTotal: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: "#ffffff",
		borderRadius: 8,
		marginTop: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	noSelection: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
