import type { Notification } from "../types/notification";
import { PRIORITY_WEIGHTS } from "./constants";

export const calculatePriorityScore = (notification: Notification): number => {
  return PRIORITY_WEIGHTS[notification.type];
};

export const sortNotificationsByPriority = (
  notifications: Notification[],
): Notification[] => {
  return [...notifications].sort((a, b) => {
    const scoreA = calculatePriorityScore(a);
    const scoreB = calculatePriorityScore(b);

    if (scoreA !== scoreB) {
      return scoreB - scoreA; // Higher priority first
    }

    // If same priority, most recent first
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
};
