import { View, StyleSheet, TextInput, Pressable } from "react-native"
import { Text } from "../common/components/Text"
import { useEstimateContext } from "./context"
import type { EstimateRow, EstimateSection } from "@/data"
import { useState } from "react"
import { EditItemForm } from "./EditItemForm"
import {
	calculateSectionTotal,
	calculateEstimateTotal,
} from "../common/lib/estimate"
import { EditSectionForm } from "./EditSectionForm"

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

export default function EstimateScreenDesktop() {
	const { estimate, updateTitle, updateRow, updateSection } =
		useEstimateContext()
	const [editMode, setEditMode] = useState<EditMode>(null)

	const handleItemPress = (item: EstimateRow) => {
		setEditMode({ type: "item", data: item })
	}

	const handleSectionPress = (section: EstimateSection) => {
		setEditMode({ type: "section", data: section })
	}

	const handleSaveItem = (updatedItem: EstimateRow) => {
		updateRow(updatedItem.id, updatedItem)
		setEditMode(null)
	}

	const handleSaveSection = (updates: Partial<EstimateSection>) => {
		if (editMode?.type === "section") {
			updateSection(editMode.data.id, updates)
			setEditMode(null)
		}
	}

	const handleClose = () => {
		setEditMode(null)
	}

	const renderEditForm = () => {
		if (!editMode) {
			return (
				<View style={styles.noSelection}>
					<Text type="subtitle">
						Select an item or section to edit
					</Text>
				</View>
			)
		}

		if (editMode.type === "item") {
			return (
				<EditItemForm
					item={editMode.data}
					onSave={handleSaveItem}
					onClose={handleClose}
				/>
			)
		}

		return (
			<EditSectionForm
				section={editMode.data}
				onSave={handleSaveSection}
				onClose={handleClose}
			/>
		)
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
							<Pressable
								style={[
									styles.sectionHeader,
									editMode?.type === "section" &&
										editMode.data.id === section.id &&
										styles.selectedSection,
								]}
								onPress={() => handleSectionPress(section)}
							>
								<Text type="subtitle">{section.title}</Text>
								<Text type="subtitle">
									${calculateSectionTotal(section).toFixed(2)}
								</Text>
							</Pressable>

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
										editMode?.type === "item" &&
											editMode.data.id === row.id &&
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
				<View style={styles.formContainer}>{renderEditForm()}</View>
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
	selectedSection: {
		backgroundColor: "#e6f0ff",
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
