import { Image } from "expo-image";
import { View, Pressable, ScrollView } from "react-native";

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
import { ThemeSwitch } from "./components/ThemeSwitch";
import { useEstimateScreen } from "./useEstimateScreen";

export default function EstimateScreenDesktop() {
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

  const { theme } = useThemeScheme();
  const styles = getStyles(theme);

  const EditFormComponent = () => {
    if (!editMode) {
      return (
        <View style={styles.noSelection}>
          <Text style={styles.noSelectionText}>
            Select an item or section to edit
          </Text>
        </View>
      );
    }

    return (
      <EditForm
        key={editMode.data.id}
        mode={editMode.type}
        data={editMode.data}
        onSave={editMode.type === "item" ? handleSaveItem : handleSaveSection}
        onClose={handleStopEdit}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Draft />
          <TextField
            style={styles.titleInput}
            value={estimate.title}
            onChangeText={updateTitle}
            placeholder="Enter estimate title"
          />
        </View>
        <ThemeSwitch />
      </View>

      <View style={styles.content}>
        <View style={styles.tableContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {estimate.sections.map((section) => (
              <View key={section.id} style={[styles.section, styles.shadow]}>
                <Pressable
                  style={[
                    styles.sectionHeader,
                    editMode?.type === "section" &&
                      editMode.data.id === section.id &&
                      styles.selectedSection,
                  ]}
                  onPress={() => handleStartSectionEdit(section)}
                >
                  <Text style={styles.tablePrimaryText}>{section.title}</Text>
                  <Text style={styles.tablePrimaryText}>
                    {formatCurrency(calculateSectionTotal(section))}
                  </Text>
                </Pressable>
                {section.rows.map((row, index) => {
                  const isLastRow = index === section.rows.length - 1;
                  return (
                    <Pressable
                      key={row.id}
                      style={[
                        styles.tableRow,
                        editMode?.type === "item" &&
                          editMode.data.id === row.id &&
                          styles.selectedRow,
                        isLastRow && styles.lastTableRow,
                      ]}
                      onPress={() => handleStartItemEdit(row)}
                    >
                      <View style={styles.rowLeftContent}>
                        <Text style={styles.rowTitle}>{row.title}</Text>
                        <View style={styles.rowDetails}>
                          <Text style={styles.rowPriceDetails}>
                            {formatCurrency(row.price)} × {row.quantity}{" "}
                            {row.uom}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.rowRightContent}>
                        <Text style={styles.rowTitle}>
                          {formatCurrency(row.price * row.quantity)}
                        </Text>
                        {row.supplier?.logoUrl && (
                          <Image
                            style={styles.image}
                            source={row.supplier.logoUrl}
                            contentFit="contain"
                            alt={`${row.supplier.name} logo`}
                          />
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ))}

            <View style={[styles.estimateTotal, styles.shadow]}>
              <Text style={styles.estimateText}>Total:</Text>
              <Text style={styles.estimateText}>
                {formatCurrency(calculateEstimateTotal(estimate))}
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={[styles.formContainer, styles.shadow]}>
          <EditFormComponent />
        </View>
      </View>
    </View>
  );
}

export const getStyles = (theme: ThemeScheme) =>
  createThemedStyleSheet(theme, ({ colors, numbers, fonts }) => ({
    container: {
      flex: 1,
      backgroundColor: colors.layer.solid.light,
      paddingInline: numbers.spacing["3xl"],
      paddingBlock: numbers.spacing.lg,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: numbers.spacing.sm,
      marginBottom: numbers.spacing.lg,
      backgroundColor: colors.layer.solid.light,
    },
    headerLeft: {
      flex: 1,
      gap: numbers.spacing["2xs"],
    },
    titleInput: {
      ...fonts.bold.headline.sm,
      color: colors.text.primary,
    },
    content: {
      flex: 1,
      flexDirection: "row",
      gap: numbers.spacing.lg,
    },
    tableContainer: {
      flex: 7,
    },
    tablePrimaryText: {
      ...fonts.bold.text.md,
      color: colors.text.primary,
    },
    formContainer: {
      alignSelf: "flex-start",
      padding: numbers.spacing["2xs"],
      flex: 3,
      borderWidth: numbers.outlineHeight.xs,
      borderRadius: numbers.borderRadius.lg,
      borderColor: colors.outline.medium,
      backgroundColor: colors.layer.solid.light,
    },
    section: {
      marginBottom: numbers.spacing.sm,
      borderRadius: numbers.borderRadius.lg,
    },
    selectedSection: {
      backgroundColor: colors.layer.solid.dark,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: numbers.spacing.sm,
      backgroundColor: colors.layer.solid.medium,
      borderWidth: numbers.outlineHeight.xs,
      borderColor: colors.outline.medium,
      borderTopLeftRadius: numbers.borderRadius.lg,
      borderTopRightRadius: numbers.borderRadius.lg,
    },
    tableRow: {
      flexDirection: "row",
      padding: numbers.spacing.sm,
      backgroundColor: colors.layer.solid.light,
      borderWidth: numbers.outlineHeight.xs,
      borderColor: colors.outline.medium,
      cursor: "pointer",
      borderTopWidth: 0,
    },
    lastTableRow: {
      borderBottomLeftRadius: numbers.borderRadius.lg,
      borderBottomRightRadius: numbers.borderRadius.lg,
    },
    selectedRow: {
      backgroundColor: colors.layer.solid.dark,
    },
    rowLeftContent: {
      flex: 1,
      marginRight: numbers.spacing.sm,
    },
    rowRightContent: {
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    rowTitle: {
      ...fonts.regular.text.md,
      color: colors.text.primary,
      marginBottom: numbers.spacing["3xs"],
    },
    rowDetails: {
      opacity: 0.7,
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
      borderWidth: numbers.outlineHeight.xs,
      borderColor: colors.outline.medium,
      borderRadius: numbers.borderRadius.lg,
      marginBottom: numbers.spacing["3xs"],
    },
    estimateText: {
      ...fonts.regular.text.md,
      color: colors.text.primary,
    },
    noSelection: {
      justifyContent: "center",
      alignItems: "center",
      height: numbers.sizing.container["2xs"],
    },
    noSelectionText: {
      ...fonts.regular.text.xs,
      color: colors.text.primary,
    },
    image: {
      width: numbers.sizing.icon.xl,
      height: numbers.sizing.icon.xl,
      backgroundColor: colors.icon.white,
      borderRadius: numbers.borderRadius.sm,
      borderWidth: numbers.outlineHeight.xs,
      borderColor: colors.outline.light,
    },
    shadow: {
      shadowColor: colors.layer.solid.deepest,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  }));
