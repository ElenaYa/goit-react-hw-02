import { useState, useEffect } from 'react';
import Description  from './Description/Description';
import  Options  from './Options/Options';
import Feedback from './Feedback/Feedback';
import Notification from './Notification/Notification';

const App = () => {

   const [clicks, setClicks] = useState(
    () => JSON.parse(localStorage.getItem('savedFeedback')) ?? { good: 0, neutral: 0, bad: 0 }
  );

   useEffect(() => {
    window.localStorage.setItem('savedFeedback', JSON.stringify(clicks));
  }, [clicks]);

  const updateFeedback = feedbackType => {
    setClicks({
      ...clicks,
      [feedbackType]: clicks[feedbackType] + 1,
    });
  };

  const resetFeedback = () => {
    setClicks({good: 0, neutral: 0, bad: 0})
  }
  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;
  const positiveFeedback = Math.round(((clicks.good + clicks.neutral) / totalFeedback) * 100);

  return (
    <>
      <Description />
      <Options
        onUpdate={updateFeedback}
        onReset={resetFeedback}
        total={totalFeedback}/>
    
      <Feedback
        good={clicks.good}
        neutral={clicks.neutral}
        bad={clicks.bad}
        total={totalFeedback}
        positive={positiveFeedback}
      />
        
      <Notification total={totalFeedback} />
    </>
  );
};

export default App;
