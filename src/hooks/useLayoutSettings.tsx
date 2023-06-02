import { selectSettings } from "src/redux/slices/appSlice";
import { useAppSelector } from "src/redux/store";

function useLayoutSettings() {
  const settings = useAppSelector(selectSettings);

  const layoutSettings = {
    textMaxWidth: ["100%", null, null, "60vw", "45vw"],
    containerMaxWidth: settings.display === "wide" ? "90vw" : "60vw"
  }

  return layoutSettings;
}

export default useLayoutSettings
