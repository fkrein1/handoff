import { View, StyleSheet, TextInput } from "react-native"
import { Text } from "../common/components/Text"
import { Button } from "../common/components/Button"
import { EstimateRow, EstimateSection, UOM_LABELS, UnitOfMeasure } from "@/data"
import { useState } from "react"

type EditFormProps = {
	mode: "item" | "section"
	data: EstimateRow | EstimateSection
	onSave: (updates: any) => void
	onClose: () => void
}

export function EditForm({ mode, data, onSave, onClose }: EditFormProps) {
	const [title, setTitle] = useState(data.title)
	const [price, setPrice] = useState(
		mode === "item" ? (data as EstimateRow).price.toString() : ""
	)
	const [quantity, setQuantity] = useState(
		mode === "item" ? (data as EstimateRow).quantity.toString() : ""
	)
	const [uom, setUom] = useState<UnitOfMeasure>(
		mode === "item" ? (data as EstimateRow).uom : "EA"
	)

	const handleSave = () => {
		if (mode === "item") {
			onSave({
				...data,
				title,
				price: parseFloat(price),
				quantity: parseFloat(quantity),
				uom,
			})
		} else {
			onSave({ title })
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.header}>
				Edit {mode === "item" ? "Item" : "Section"}
			</Text>

			<View style={styles.field}>
				<Text>Title</Text>
				<TextInput
					style={styles.input}
					value={title}
					onChangeText={setTitle}
					placeholder={`Enter ${mode} title`}
				/>
			</View>

			{mode === "item" && (
				<>
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
				</>
			)}

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
