import BottomSheetComponent, { BottomSheetProps } from "@gorhom/bottom-sheet"
import { forwardRef } from "react"

export type BottomSheet = BottomSheetComponent

export const BottomSheet = forwardRef<BottomSheetComponent, BottomSheetProps>(
	function BottomSheet(props, ref) {
		return <BottomSheetComponent ref={ref} {...props} />
	}
)
