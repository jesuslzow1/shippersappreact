import React from "react";

export const ProgressBar = ({current}) => {
  if(current === 1){
    current = 0
  }
  return (
     <>
    <div className="progress">
      <div
        className="progress-bar progress_bar_width"
        role="progressbar"
        aria-valuenow={(current * 100).toString()}
        aria-valuemin="0"
        aria-valuemax="100"
        >
        {current * 100}%
      </div>
    </div>
    
        </>
  );
};
