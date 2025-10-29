import { createContext, useContext, useState } from "react";

const InterviewContext = createContext(null);

// Custom hook for using the interview context
export const useInterview = () => useContext(InterviewContext);

export const InterviewProvider = ({ children }) => {
  // const { userDetails } = useAuth();
  const [appearedInterview, setappearedInterview] = useState([]);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);

  // const [loading, setLoading] = useState(false);

  // const dummyAppearedInterviews = [
  //   {
  //     id: "1",
  //     interviewName: "Frontend Developer Interview",
  //     candidateName: "John Doe",
  //     candidateImage:
  //       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     date: "2024-09-01",
  //     duration: "45 min",
  //     status: "completed",
  //     userId: userDetails?.name,
  //     recordingUrl: "",
  //     notes: "",
  //     feedback: "",
  //   },
  //   {
  //     id: "2",
  //     interviewName: "React Native Developer",
  //     candidateName: "Jane Smith",
  //     candidateImage:
  //       "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     date: "2024-09-02",
  //     duration: "30 min",
  //     status: "completed",
  //     userId: userDetails.name,
  //     recordingUrl: "",
  //     notes: "",
  //     feedback: "",
  //   },
  // ];

  // const dummyScheduledInterviews = [
  //   {
  //     id: "3",
  //     interviewName: "Backend Developer Interview",
  //     candidateName: "Mike Johnson",
  //     candidateImage:
  //       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     date: "2024-09-10",
  //     time: "10:00 AM",
  //     duration: "60 min",
  //     status: "scheduled",
  //     userId: userDetails.name,
  //     meetingLink: "",
  //     notes: "",
  //   },
  //   {
  //     id: "4",
  //     interviewName: "Full Stack Developer",
  //     candidateName: "Sarah Wilson",
  //     candidateImage:
  //       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     date: "2024-09-12",
  //     time: "2:00 PM",
  //     duration: "45 min",
  //     status: "scheduled",
  //     userId: userDetails.name,
  //     meetingLink: "",
  //     notes: "",
  //   },
  //   {
  //     id: "5",
  //     interviewName: "UI/UX Designer Interview",
  //     candidateName: "Alex Brown",
  //     candidateImage:
  //       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     date: "2024-09-15",
  //     time: "11:00 AM",
  //     duration: "40 min",
  //     status: "scheduled",
  //     userId: userDetails.name,
  //     meetingLink: "",
  //     notes: "",
  //   },
  // ];

  // useEffect(() => {
  //  loadUserInterviews()
  // }, []);

  // Empty functions
  // const loadUserInterviews = async () => {
  //   setLoading(true);
  //   try {
  //     //API call for fetchin the interviews
  //     setappearedInterview(dummyAppearedInterviews);
  //     setScheduledInterviews(dummyScheduledInterviews);
  //   } catch (error) {
  //     Alert.alert("Error loading interviews")
  //     console.error("Error loading interviews:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const value = {
    scheduledInterviews,
    appearedInterview,
    // loading,
    // loadUserInterviews,
    setappearedInterview,
    setScheduledInterviews,
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};
