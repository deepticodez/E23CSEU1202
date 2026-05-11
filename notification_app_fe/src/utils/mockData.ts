import type { Notification } from "../types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "mock-1",
    title: "Interview Scheduled",
    message: "Your technical interview with Google has been scheduled for tomorrow at 10 AM.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    viewed: false,
    type: "placement",
  },
  {
    id: "mock-2",
    title: "Semester Results Published",
    message: "The results for Semester 6 have been published. Check your portal for detailed marks.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    viewed: false,
    type: "result",
  },
  {
    id: "mock-3",
    title: "Tech Symposium 2026",
    message: "Register for the upcoming national level Tech Symposium. Early bird registrations close today.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    viewed: true,
    type: "event",
  },
  {
    id: "mock-4",
    title: "Resume Shortlisted",
    message: "Congratulations! Your resume has been shortlisted for the final round by Microsoft.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    viewed: false,
    type: "placement",
  },
  {
    id: "mock-5",
    title: "Re-evaluation Results",
    message: "The re-evaluation results for Database Management Systems are now available.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    viewed: true,
    type: "result",
  },
  {
    id: "mock-6",
    title: "Campus Drive Alert",
    message: "Amazon is visiting the campus next week. Please ensure your profile is updated.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    viewed: false,
    type: "placement",
  },
  {
    id: "mock-7",
    title: "Annual Sports Meet",
    message: "The Annual Sports Meet is scheduled for next month. Trials begin this weekend.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // 5 days ago
    viewed: true,
    type: "event",
  },
  {
    id: "mock-8",
    title: "Offer Letter Released",
    message: "Your offer letter from Adobe has been released. Please accept it within 3 days.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(), // 6 days ago
    viewed: false,
    type: "placement",
  },
  {
    id: "mock-9",
    title: "Cultural Fest Registration",
    message: "Registrations for the inter-college cultural fest are now open. Form your teams now!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(), // 7 days ago
    viewed: true,
    type: "event",
  },
  {
    id: "mock-10",
    title: "Mid-Term Examination Schedule",
    message: "The schedule for the upcoming mid-term examinations has been released on the notice board.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 192).toISOString(), // 8 days ago
    viewed: true,
    type: "result",
  },
];
