import React from "react";

export default function LeaderPointStandard() {
  return (
    <div className="flex w-full justify-center">
      <div className="newsletter w-2/3 ">
        <pre>{`
        Point Standards

Guild Specialist:
   Expected: 500 <= x
   Promotable: Avg. 750 <= x
   Poor Performance: x < 350
   Auto-Probation: x < 180
Junior Guild Officer:
   Expected: 700 <= x
   Promotable: Avg. 1000 <= x
   Poor Performance: x < 600
   Auto-Probation: x < 350
Guild Officer:
   Expected: 750 <= x
   Poor Performance: x < 600
   Auto-Probation: x < 400
Senior Officer:
   Expected: 1000 <= x
   Poor Performance: x < 750
   Auto-Probation: x < 500

Performance evaluated once monthly. 
Staff consistently in "Poor Performance" averages are considered for demotion one step down.
Staff with "Promotable" averages are considered for promotion one step up. 
GO+ promotions are based on more than points.`}</pre>
      </div>
    </div>
  );
}
