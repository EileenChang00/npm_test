import React from "react";
import c3 from "c3";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import "./Chart.css";

export default function Chart() {
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'key67fBsh4xiM0c3W'}).base('apphBomMb49ieU17N');
  //import moment
  var moment = require('moment');
 
  function getData(year){
    var newData = [];
    base('sale').select({
      view: "Grid view" ,
      filterByFormula: "({YearNum} = '" +year+ "')",
      }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          newData.push(record);
      });
      fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
        Month(newData);
    }
    );
  }

  function Month(newData){
      var result = [];
      for(let month=1;month<13;month++){
          var total_price = 0;
          newData.forEach(function(data){
              if(data.fields.MonthNum === month){
                  total_price += data.fields.price;
              }
          });
          result.push(total_price);
      }
      drawChart(result);
  }

  //draw chart
  function drawChart(result){
    c3.generate({
      bindto: "#chart",
      data: {
        columns: [
          ['銷售額',...result]
        ],
        type:'area-spline',
        colors:{
          "銷售額":'#FF5809'
        }
      },
      legend:{
        show: true
      },
      axis:{
        x:{
          type:'category',
          categories:['1','2','3','4','5','6','7','8','9','10','11','12'],
          label:{
            text:'月份',
            position: "outer-middle",
            stroke:'#FF5809'
          }
        },
        y:{
          label:{
            text:'金額',
            position:'outer-middle',
          }
        }
      }
    });
  };
  
  async function clicked(date){
    getData(moment(date).format('YYYY'));
   
  };
 
  const date = new Date();


  return(
    <div>
      <div><p>年銷售額圖表</p></div>
      <Datetime dateFormat={"YYYY"} timeFormat={false} closeOnSelect={true} input={true} onChange={clicked} initialValue="請選擇年份"></Datetime>
      <div id="chart" ></div>
    </div>

    
  )

}

