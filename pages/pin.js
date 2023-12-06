 export const PinData={
    pin:6130

} 
import React from 'react';

const PinPage = () => {
    return (
      <div>
        {/* Your component logic here */}
        <p>Pin: {PinData.pin}</p>
      </div>
    );
  };
  
  export default PinPage;