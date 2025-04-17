import React, { useState } from "react";
import { View, Platform } from "react-native";

import { EstimateRow, EstimateSection, UnitOfMeasure } from "@/data";
import { BottomSheetTextField } from "@/src/common/components/BottomSheet";
import { TextField } from "@/src/common/components/TextField";
import { useThemeScheme } from "@/src/common/hooks/useCurrentThemeScheme";
import { createThemedStyleSheet } from "@/src/common/theme/themedStyles";
import { ThemeScheme } from "@/src/common/theme/types";

import { Button } from "../../common/components/Button";
import { Text } from "../../common/components/Text";

type EditFormProps = {
  mode: "item" | "section";
  data: EstimateRow | EstimateSection;
  onSave: (updates: any) => void;
  onClose: () => void;
};

function isEstimateRow(data: any): data is EstimateRow {
  return "price" in data && "quantity" in data && "uom" in data;
}

export function EditForm({ mode, data, onSave, onClose }: EditFormProps) {
  const { theme } = useThemeScheme();
  const styles = getStyles(theme);

  const [title, setTitle] = useState(data.title);
  const [price, setPrice] = useState(
    isEstimateRow(data) ? data.price.toString() : "",
  );
  const [quantity, setQuantity] = useState(
    isEstimateRow(data) ? data.quantity.toString() : "",
  );
  const [uom, setUom] = useState<UnitOfMeasure>(
    isEstimateRow(data) ? data.uom : "EA",
  );

  const handleSave = () => {
    if (mode === "item") {
      onSave({
        ...data,
        title,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        uom,
      });
    } else {
      onSave({ title });
    }
    onClose();
  };

  const TextFieldComponent =
    Platform.OS === "web" ? TextField : BottomSheetTextField;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Edit {mode === "item" ? "Item" : "Section"}
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <TextFieldComponent
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder={`Enter ${mode} title`}
        />
      </View>

      {mode === "item" && (
        <>
          <View style={styles.field}>
            <Text style={styles.label}>Price</Text>
            <TextFieldComponent
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              placeholder="Enter price"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Quantity</Text>
            <TextFieldComponent
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
        <Button onPress={handleSave}>Save</Button>
        <Button variant="secondary" onPress={onClose}>
          Cancel
        </Button>
      </View>
    </View>
  );
}

export const getStyles = (theme: ThemeScheme) =>
  createThemedStyleSheet(theme, ({ colors, numbers, fonts }) => ({
    container: {
      backgroundColor: colors.layer.solid.light,
      padding: 16,
    },
    header: {
      ...fonts.bold.text.md,
      textAlign: "center",
      marginBottom: 16,
      color: colors.text.primary,
    },
    field: {
      marginBottom: 16,
    },
    label: {
      ...fonts.regular.text.xs,
      color: colors.text.secondary,
    },
    input: {
      ...fonts.regular.text.sm,
      lineHeight: 0,
      borderWidth: numbers.outlineHeight.xs,
      color: colors.text.primary,
      borderColor: colors.outline.dark,
      borderRadius: numbers.borderRadius.md,
      padding: numbers.spacing.xs,
      alignItems: "center",
    },
    formActions: {
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 24,
    },
  }));
