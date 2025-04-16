import Entypo from "@expo/vector-icons/Entypo";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { View, Pressable, Button, SectionList } from "react-native";

import type { EstimateRow, EstimateSection } from "@/data";

import { BottomSheet } from "../common/components/BottomSheet";
import { Text } from "../common/components/Text";
import { TextField } from "../common/components/TextField";
import { ThemeSwitch } from "../common/components/ThemeSwith";
import { useThemeScheme } from "../common/hooks/useCurrentThemeScheme";
import {
  calculateSectionTotal,
  calculateEstimateTotal,
} from "../common/lib/estimate";
import { formatCurrency } from "../common/lib/formatting";
import { createThemedStyleSheet } from "../common/theme/themedStyles";
import { numbersAliasTokens } from "../common/theme/tokens/alias/numbers";
import { ThemeScheme } from "../common/theme/types";

import { EditForm } from "./EditForm";
import { useEstimateScreen } from "./useEstimateScreen";

export default function EstimateScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
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
      <ThemeSwitch />
      <SectionList
        sections={estimate.sections.map((section) => ({
          ...section,
          data: section.rows,
        }))}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => {
          const isFirstSection = section.id === estimate.sections[0]?.id;
          return (
            <Pressable
              onPress={() => handleSectionPress(section)}
              style={[
                styles.sectionHeader,
                isFirstSection && styles.firstSectionHeader,
              ]}
            >
              <View style={styles.sectionLeftContent}>
                <Text style={styles.sectionHeaderText}>{section.title}</Text>
                <View style={styles.plusIconWrapper}>
                  <Entypo
                    style={styles.plusIcon}
                    name="plus"
                    size={numbersAliasTokens.sizing.icon.lg}
                  />
                </View>
              </View>
              <Text style={styles.sectionHeaderText}>
                {formatCurrency(calculateSectionTotal(section))}
              </Text>
            </Pressable>
          );
        }}
        renderItem={({ item: row }) => (
          <Pressable style={styles.row} onPress={() => handleItemPress(row)}>
            <View style={styles.rowLeftContent}>
              <Text style={styles.rowTitle}>{row.title}</Text>
              <Text style={styles.rowPriceDetails}>
                {formatCurrency(row.price)} × {row.quantity} {row.uom}
              </Text>
            </View>
            <Text style={styles.rowTitle}>
              {formatCurrency(row.price * row.quantity)}
            </Text>
          </Pressable>
        )}
        ListHeaderComponent={
          <TextField
            style={styles.titleInput}
            value={estimate.title}
            onChangeText={updateTitle}
            multiline
            keyboardAppearance={theme}
            placeholder="Enter estimate title"
          />
        }
        ListFooterComponent={
          <View style={styles.estimateTotal}>
            <Text style={styles.estimateTotalText}>Total:</Text>
            <Text style={styles.estimateTotalText}>
              {formatCurrency(calculateEstimateTotal(estimate))}
            </Text>
          </View>
        }
      />

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={["50%"]}
        index={-1}
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
    titleInput: {
      ...fonts.bold.headline.sm,
      color: colors.text.primary,
      paddingInline: numbers.spacing.md,
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
    plusIconWrapper: {
      borderRadius: numbers.borderRadius.pill,
      backgroundColor: colors.layer.alpha.lightNeutral,
      height: numbers.sizing.icon.xl,
      width: numbers.sizing.icon.xl,
      alignItems: "center",
      justifyContent: "center",
    },
    plusIcon: {
      color: colors.icon.primary,
    },
    row: {
      flexDirection: "row",
      padding: numbers.spacing.sm,
      borderBottomWidth: numbers.outlineHeight.xs,
      borderColor: colors.outline.medium,
      justifyContent: "space-between",
      alignItems: "flex-start",
      backgroundColor: colors.layer.solid.light,
    },
    rowLeftContent: {
      flex: 1,
      marginRight: numbers.spacing.sm,
    },
    rowTitle: {
      ...fonts.regular.text.md,
      color: colors.text.primary,
      marginBottom: numbers.spacing["3xs"],
    },
    rowPriceDetails: {
      ...fonts.regular.text.sm,
      color: colors.text.secondary,
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
