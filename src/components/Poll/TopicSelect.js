import React from 'react';

const TopicSelect = ({ topics, onchange, value }) => {
  return (
    <React.Fragment>
      {topics ? (
        <React.Fragment>
          <p>Check Question topic</p>
          <select value={value} onChange={onchange}>
            <option value=''></option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.topic}>
                {topic.topic}
              </option>
            ))}
          </select>
        </React.Fragment>
      ) : (
        <div>No topics was passed!</div>
      )}
    </React.Fragment>
  );
};

export default TopicSelect;
