import { createContext, useContext, useState } from "react";

const InterviewContext = createContext(null);

// Custom hook for using the interview context
export const useInterview = () => useContext(InterviewContext);

export const InterviewProvider = ({ children }) => {
  // const { userDetails } = useAuth();
  const [appearedInterview, setappearedInterview] = useState([]);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [interviewQuestions, setInterviewQuestions] = useState([])
  // const [loading, setloading] = useState(false);
  const value = {
    scheduledInterviews,
    appearedInterview,
    // loading,
    // loadUserInterviews,
    setappearedInterview,
    setScheduledInterviews,
    interviewQuestions,
    setInterviewQuestions
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};
