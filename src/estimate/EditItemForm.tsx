import { View, StyleSheet, TextInput } from "react-native"
import { Text } from "../common/components/Text"
import { Button } from "../common/components/Button"
import { EstimateRow, UOM_LABELS, UnitOfMeasure } from "@/data"
import { useState } from "react"

interface EditItemFormProps {
	item: EstimateRow
	onSave: (updatedItem: EstimateRow) => void
	onClose: () => void
}

export function EditItemForm({ item, onSave, onClose }: EditItemFormProps) {
	const [title, setTitle] = useState(item.title)
	const [price, setPrice] = useState(item.price.toString())
	const [quantity, setQuantity] = useState(item.quantity.toString())
	const [uom, setUom] = useState<UnitOfMeasure>(item.uom)

	const handleSave = () => {
		onSave({
			...item,
			title,
			price: parseFloat(price),
			quantity: parseFloat(quantity),
			uom,
		})
	}

	return (
		<View style={styles.container}>
			<Text type="subtitle" style={styles.header}>
				Edit Item
			</Text>

			<View style={styles.field}>
				<Text>Title</Text>
				<TextInput
					style={styles.input}
					value={title}
					onChangeText={setTitle}
					placeholder="Enter title"
				/>
			</View>

			<View style={styles.field}>
				<Text>Price</Text>
				<TextInput
					style={styles.input}
					value={price}
					onChangeText={setPrice}
					keyboardType="decimal-pad"
					placeholder="Enter price"
				/>
			</View>

			<View style={styles.field}>
				<Text>Quantity</Text>
				<TextInput
					style={styles.input}
					value={quantity}
					onChangeText={setQuantity}
					keyboardType="decimal-pad"
					placeholder="Enter quantity"
				/>
			</View>
			<View style={styles.formActions}>
				<Button onPress={handleSave} style={styles.button}>
					Save
				</Button>
				<Button
					variant="secondary"
					onPress={onClose}
					style={styles.button}
				>
					Cancel
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	header: {
		marginBottom: 16,
	},
	field: {
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		marginTop: 4,
	},
	formActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 8,
		marginTop: 24,
	},
	button: {
		minWidth: 100,
	},
})
