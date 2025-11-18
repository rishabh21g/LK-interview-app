import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import * as Sharing from "expo-sharing";
import JSZip from "jszip";
import { Alert } from "react-native";

export async function finishInterview(segments, setSegments) {
  try {
    const zip = new JSZip();

    for (let i = 0; i < segments.length; i++) {
      const fileUri = segments[i];
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      zip.file(`segment-${i + 1}.m4a`, base64, { base64: true });
    }

    const zipContent = await zip.generateAsync({ type: "base64" });
    const zipFileUri =
      FileSystem.documentDirectory + "interview_recordings.zip";

    await FileSystem.writeAsStringAsync(zipFileUri, zipContent, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("Created zip at:", zipFileUri);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(zipFileUri);
    } else {
      Alert.alert("Sharing not available", `File at: ${zipFileUri}`);
    }
  } catch (error) {
    console.error("Failed to zip recordings:", error);
  } finally {
    setSegments([]);
    router.replace("/(main)/home");
  }
}
