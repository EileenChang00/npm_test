import React from "react";
import c3 from "c3";

export default function YChart(){
  //connect airtable
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
  //import moment
  var moment = require('moment');
  React.useEffect(()=>{
    
  })
  React.useEffect(() => {
    c3.generate({
      bindto: "#chart",
      data: {
        columns: [
          ["2019", 30, 200, 100, 400, 150, 250],
          ["2020", 30, 200, 100, 400, 150, 250],
          ["2021", 50, 20, 10, 40, 15, 25],
        ],
        type: "bar",
      },
    });
  }, []);
  
  return(
  <div id="chart" />
  )
};