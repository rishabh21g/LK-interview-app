import { useEffect } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";
import { grantPermission } from "../utils/grantPermission";

export const usePermissionCheck = (
  audioRecorder,
  videoPermission,
  requestVideoPermission
) => {
  const checkAndPromptPermissions = async () => {
    const audioStatus = await audioRecorder.getStatus();
    const hasAudioPermission = audioStatus?.canRecord;
    const hasVideoPermission = videoPermission?.granted;

    if (!hasAudioPermission || !hasVideoPermission) {
      const missingPermissions = [];
      if (!hasAudioPermission) missingPermissions.push("Microphone");
      if (!hasVideoPermission) missingPermissions.push("Camera");

      if (Platform.OS !== "web") {
        ToastAndroid.show(
          `Please enable ${missingPermissions.join(" and ")} to continue the interview`,
          ToastAndroid.LONG
        );
      }

      Alert.alert(
        "Permissions Required",
        `${missingPermissions.join(" and ")} permission${missingPermissions.length > 1 ? "s are" : " is"} required to proceed with the interview. Please grant the permissions.`,
        [
          {
            text: "Grant Permissions",
            onPress: async () => {
              if (!hasAudioPermission) await grantPermission();
              if (!hasVideoPermission) await requestVideoPermission();
            },
          },
        ],
        { cancelable: false }
      );

      return false;
    }
    return true;
  };

  useEffect(() => {
    let permissionCheckInterval;

    const startPermissionCheck = async () => {
      const hasPermissions = await checkAndPromptPermissions();

      if (!hasPermissions) {
        permissionCheckInterval = setInterval(async () => {
          const audioStatus = await audioRecorder.getStatus();
          const hasAudioPermission = audioStatus?.canRecord;
          const hasVideoPermission = videoPermission?.granted;

          if (!hasAudioPermission || !hasVideoPermission) {
            await checkAndPromptPermissions();
          } else {
            clearInterval(permissionCheckInterval);
            if (Platform.OS !== "web") {
              ToastAndroid.show(
                "All permissions granted. You can now start the interview!",
                ToastAndroid.SHORT
              );
            }
          }
        }, 5000);
      }
    };

    const timeout = setTimeout(startPermissionCheck, 2000);

    return () => {
      clearTimeout(timeout);
      if (permissionCheckInterval) {
        clearInterval(permissionCheckInterval);
      }
    };
  }, [videoPermission, audioRecorder, requestVideoPermission]);
};
