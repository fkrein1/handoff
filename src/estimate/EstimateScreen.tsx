import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';

import type { EstimateRow, EstimateSection } from '@/data';

import { BottomSheet } from '../common/components/BottomSheet';
import { Text } from '../common/components/Text';
import { TextField } from '../common/components/TextField';
import {
	calculateSectionTotal,
	calculateEstimateTotal,
} from '../common/lib/estimate';

import { EditForm } from './EditForm';
import { useEstimateScreen } from './useEstimateScreen';

export default function EstimateScreen() {
	const bottomSheetRef = useRef<BottomSheet>(null);

	const {
		estimate,
		updateTitle,
		editMode,
		handleStartItemEdit,
		handleStartSectionEdit,
		handleSaveItem,
		handleSaveSection,
		handleStopEdit,
	} = useEstimateScreen();

	const handleSectionPress = (section: EstimateSection) => {
		handleStartSectionEdit(section);
		bottomSheetRef.current?.expand();
	};

	const handleItemPress = (item: EstimateRow) => {
		handleStartItemEdit(item);
		bottomSheetRef.current?.expand();
	};

	const handleCloseBottomSheet = () => {
		bottomSheetRef.current?.close();
		handleStopEdit();
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<TextField
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
							<Text>{section.title}</Text>
							<Text>
								${calculateSectionTotal(section).toFixed(2)}
							</Text>
						</Pressable>
						{section.rows.map((row) => (
							<Pressable
								key={row.id}
								style={styles.row}
								onPress={() => handleItemPress(row)}
							>
								<View style={styles.rowLeftContent}>
									<Text style={styles.rowTitle}>
										{row.title}
									</Text>
									<Text style={styles.rowPriceDetails}>
										${row.price.toFixed(2)} × {row.quantity}{' '}
										{row.uom}
									</Text>
								</View>
								<Text>
									${(row.price * row.quantity).toFixed(2)}
								</Text>
							</Pressable>
						))}
					</View>
				))}
				<View style={styles.estimateTotal}>
					<Text>Total:</Text>
					<Text>${calculateEstimateTotal(estimate).toFixed(2)}</Text>
				</View>
			</ScrollView>

			<BottomSheet
				ref={bottomSheetRef}
				enablePanDownToClose
				snapPoints={['50%']}
				index={-1}
			>
				<BottomSheetView>
					{editMode && (
						<EditForm
							key={editMode.data.id}
							mode={editMode.type}
							data={editMode.data}
							onSave={
								editMode.type === 'item'
									? handleSaveItem
									: handleSaveSection
							}
							onClose={handleCloseBottomSheet}
						/>
					)}
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	titleInput: {
		fontSize: 24,
		fontWeight: 'bold',
		padding: 16,
		backgroundColor: '#fff',
	},
	section: {
		marginBottom: 16,
		backgroundColor: '#fff',
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16,
		backgroundColor: '#f5f5f5',
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	row: {
		flexDirection: 'row',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rowLeftContent: {
		flex: 1,
		marginRight: 16,
	},
	rowTitle: {
		fontSize: 16,
		marginBottom: 4,
		fontWeight: '500',
	},
	rowPriceDetails: {
		fontSize: 14,
	},
	estimateTotal: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#e0e0e0',
		marginTop: 8,
	},
});
