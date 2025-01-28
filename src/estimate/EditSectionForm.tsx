import { View, TextInput, StyleSheet } from "react-native"
import { Text } from "../common/components/Text"
import type { EstimateSection } from "@/data"
import { useState } from "react"
import { Button } from "../common/components/Button"

interface EditSectionFormProps {
	section: EstimateSection
	onSave: (updates: Partial<EstimateSection>) => void
	onClose: () => void
}

export function EditSectionForm({
	section,
	onSave,
	onClose,
}: EditSectionFormProps) {
	const [title, setTitle] = useState(section.title)

	const handleSave = () => {
		onSave({ title })
	}

	return (
		<View style={styles.editForm}>
			<Text type="subtitle" style={styles.formHeader}>
				Edit Section
			</Text>
			<View style={styles.field}>
				<Text>Title</Text>
				<TextInput
					style={styles.input}
					value={title}
					onChangeText={setTitle}
					placeholder="Enter section title"
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
	selectedSection: {
		backgroundColor: "#e6f0ff",
	},
	editForm: {
		padding: 16,
	},
	formHeader: {
		marginBottom: 24,
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
