import { EstimateProvider } from "@/src/estimate/context";
import EstimateScreen from "@/src/estimate/EstimateScreen";

export default function Index() {
  return (
    <EstimateProvider>
      <EstimateScreen />
    </EstimateProvider>
  );
}
