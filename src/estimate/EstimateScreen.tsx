import { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useRef, useMemo } from "react";
import { View, Pressable, Keyboard } from "react-native";

import type { EstimateRow, EstimateSection } from "@/data";

import { BottomSheet, BottomSheetType } from "../common/components/BottomSheet";
import { Text } from "../common/components/Text";
import { TextField } from "../common/components/TextField";
import { useThemeScheme } from "../common/hooks/useCurrentThemeScheme";
import {
  calculateSectionTotal,
  calculateEstimateTotal,
} from "../common/lib/estimate";
import { formatCurrency } from "../common/lib/formatting";
import { createThemedStyleSheet } from "../common/theme/themedStyles";
import { ThemeScheme } from "../common/theme/types";

import { Draft } from "./components/Draft";
import { EditForm } from "./components/EditForm";
import { EstimateSectionRow } from "./components/EstimateSectionRow";
import { ThemeSwitch } from "./components/ThemeSwitch";
import { useEstimateScreen } from "./useEstimateScreen";

type ListItem =
  | {
      id: string;
      type: "section";
      data: EstimateSection;
      isFirstSection: boolean;
    }
  | {
      id: string;
      type: "row";
      data: EstimateRow;
      sectionId: string;
    };

export default function EstimateScreen() {
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const { theme } = useThemeScheme();
  const styles = getStyles(theme);

  const {
    estimate,
    updateTitle,
    editMode,
    handleStartItemEdit,
    handleStartSectionEdit,
    handleSaveItem,
    handleSaveSection,
    handleStopEdit,
    handleDeleteItem,
  } = useEstimateScreen();

  const handleSectionPress = useCallback(
    (section: EstimateSection) => {
      handleStartSectionEdit(section);
      bottomSheetRef.current?.expand();
    },
    [handleStartSectionEdit],
  );

  const handleItemPress = useCallback(
    (item: EstimateRow) => {
      handleStartItemEdit(item);
      bottomSheetRef.current?.expand();
    },
    [handleStartItemEdit],
  );

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    handleStopEdit();
  }, [handleStopEdit]);

  const listData = useMemo<ListItem[]>(() => {
    const items: ListItem[] = [];
    estimate.sections.forEach((section, index) => {
      // Add section header
      items.push({
        id: `section-${section.id}`,
        type: "section",
        data: section,
        isFirstSection: index === 0,
      });

      // Add section rows
      section.rows.forEach((row) => {
        items.push({
          id: row.id,
          type: "row",
          data: row,
          sectionId: section.id,
        });
      });
    });
    return items;
  }, [estimate]);

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (item.type === "section") {
        const section = item.data as EstimateSection;
        return (
          <Pressable
            onPress={() => handleSectionPress(section)}
            style={[
              styles.sectionHeader,
              item.isFirstSection && styles.firstSectionHeader,
            ]}
          >
            <View style={styles.sectionLeftContent}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
            <Text style={styles.sectionHeaderText}>
              {formatCurrency(calculateSectionTotal(section))}
            </Text>
          </Pressable>
        );
      } else {
        const row = item.data as EstimateRow;
        return (
          <EstimateSectionRow
            row={row}
            handleItemPress={handleItemPress}
            handleDeleteItem={handleDeleteItem}
          />
        );
      }
    },
    [handleSectionPress, handleItemPress, handleDeleteItem, styles],
  );

  const ListHeaderComponent = useCallback(
    () => (
      <View style={styles.titleWrapper}>
        <Draft />
        <TextField
          style={styles.titleInput}
          value={estimate.title}
          onChangeText={updateTitle}
          multiline
          keyboardAppearance={theme}
          placeholder="Enter estimate title"
        />
      </View>
    ),
    [estimate.title, updateTitle, theme, styles],
  );

  const ListFooterComponent = useCallback(
    () => (
      <View style={styles.estimateTotal}>
        <Text style={styles.estimateTotalText}>Total:</Text>
        <Text style={styles.estimateTotalText}>
          {formatCurrency(calculateEstimateTotal(estimate))}
        </Text>
      </View>
    ),
    [estimate, styles],
  );

  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        <ThemeSwitch />
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={listData}
          estimatedItemSize={50}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={["20%"]}
        index={-1}
        backgroundStyle={styles.sheet}
        onChange={(index) => index === -1 && Keyboard.dismiss()}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
      >
        <BottomSheetView>
          {editMode && (
            <EditForm
              key={editMode.data.id}
              mode={editMode.type}
              data={editMode.data}
              onSave={
                editMode.type === "item" ? handleSaveItem : handleSaveSection
              }
              onClose={handleCloseBottomSheet}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

export const getStyles = (theme: ThemeScheme) =>
  createThemedStyleSheet(theme, ({ colors, numbers, fonts }) => ({
    container: {
      flex: 1,
      backgroundColor: colors.layer.solid.medium,
    },
    listContainer: {
      flex: 1,
    },
    switch: {
      padding: numbers.spacing.md,
    },
    sheet: {
      backgroundColor: colors.layer.solid.light,
    },
    titleWrapper: {
      paddingInline: numbers.spacing.md,
      marginBottom: numbers.spacing.lg,
      gap: numbers.spacing["xs"],
    },
    titleInput: {
      ...fonts.bold.headline.sm,
      color: colors.text.primary,
    },
    firstSectionHeader: {
      borderTopWidth: numbers.outlineHeight.xs,
    },
    sectionHeader: {
      backgroundColor: colors.layer.solid.medium,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: numbers.spacing.sm,
      borderBottomWidth: numbers.outlineHeight.xs,
      borderColor: colors.outline.medium,
    },
    sectionHeaderText: {
      ...fonts.bold.text.md,
      backgroundColor: colors.layer.solid.medium,
      color: colors.text.primary,
    },
    sectionLeftContent: {
      flex: 1,
      flexDirection: "row",
      gap: numbers.spacing["3xs"],
      alignItems: "center",
    },
    estimateTotal: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: numbers.spacing.sm,
      backgroundColor: colors.layer.solid.medium,
    },
    estimateTotalText: {
      ...fonts.regular.text.md,
      color: colors.text.primary,
    },
  }));
