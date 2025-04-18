import { Image } from "expo-image";
import React from "react";
import { Pressable, View } from "react-native";

import type { EstimateRow } from "@/data";

import { Text } from "../../common/components/Text";
import { useThemeScheme } from "../../common/hooks/useCurrentThemeScheme";
import { formatCurrency } from "../../common/lib/formatting";
import { createThemedStyleSheet } from "../../common/theme/themedStyles";
import { ThemeScheme } from "../../common/theme/types";

interface EstimateSectionRowProps {
  row: EstimateRow;
  handleItemPress: (row: EstimateRow) => void;
}

export function EstimateSectionRow({
  row,
  handleItemPress,
}: EstimateSectionRowProps) {
  const { theme } = useThemeScheme();
  const styles = getStyles(theme);
  return (
    <Pressable style={styles.row} onPress={() => handleItemPress(row)}>
      <View style={styles.rowLeftContent}>
        <Text style={styles.rowTitle}>{row.title}</Text>
        <Text style={styles.rowPriceDetails}>
          {formatCurrency(row.price)} × {row.quantity} {row.uom}
        </Text>
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
}

const getStyles = (theme: ThemeScheme) =>
  createThemedStyleSheet(theme, ({ colors, numbers, fonts }) => ({
    row: {
      flexDirection: "row",
      padding: numbers.spacing.sm,
      borderBottomWidth: numbers.outlineHeight.xs,
      borderColor: colors.outline.medium,
      justifyContent: "space-between",
      alignItems: "stretch",
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
    rowRightContent: {
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    image: {
      width: numbers.sizing.icon.xl,
      height: numbers.sizing.icon.xl,
      backgroundColor: colors.icon.white,
      borderRadius: numbers.borderRadius.sm,
      borderWidth: numbers.outlineHeight.xs,
      borderColor: colors.outline.light,
    },
  }));
