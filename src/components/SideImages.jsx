import React from 'react';

export default function SideImages() {
  return (
    <>
      <img
        src="/groups/Group.png"
        alt="Group Icon 1"
        className="absolute 
                   top-[85%] sm:top-[88%] md:top-[90%] 
                   left-[2%] sm:left-[3%] md:left-[4%] 
                   w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] xl:w-[140px]
                   z-10"
      />
      <img
        src="/groups/Group (1).png"
        alt="Group Icon 2"
        className="absolute 
                   top-[92%] sm:top-[94%] md:top-[97%] 
                   left-[4%] sm:left-[6%] md:left-[8%] 
                   w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] xl:w-[140px]
                   z-10"
      />
      <img
        src="/groups/Group (2).png"
        alt="Group Icon 3"
        className="absolute 
                   top-[140%] sm:top-[145%] md:top-[150%] 
                   left-[2%] sm:left-[3%] md:left-[5%] 
                   w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] xl:w-[140px]
                   z-10"
      />
    </>
  );
}