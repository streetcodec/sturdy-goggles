// fetch('http://codeforces.com/api/user.rating?')


var ratings = [];
var ranks = [];
async function getData()
{
  ratings = [];
  ranks = [];
  let handle = document.getElementById("unameid").value;
	let myobj = await fetch(`http://codeforces.com/api/user.rating?handle=${handle}`);
	//console.log(`http://codeforces.com/api/user.rating?handle=${handle}`);
	let Text = await myobj.text();
	//console.log(myobj);
	//console.log(Text);
  const obj = JSON.parse(Text);
   for(let i in obj.result) ratings.push(obj.result[i].newRating); // Filling ratings[]
   Cal_Rating();   
   Avg_Gained();
   //console.log(obj);
    //document.getElementById("R3").innerHTML = obj.result[0].rank;
   
   for (let i in obj.result) ranks.push( obj.result[i].rank); // Filling ranks[]
     
    user_stats(); 
   //document.getElementById("R4").innerHTML = ranks;
   //  let myobj1 = await fetch(` https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10`)
   //  let Text1 = await myobj1.text();
   //  document.getElementById("R2").innerHTML = Text1;
}

async function Cal_Rating()   // Displays Current,Max Rating! (User.info API)
{   
  let handle = document.getElementById("unameid").value;   
  let response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
  let T = await response.text();
  var res_obj = JSON.parse(T);
  document.getElementById("Current_Rating").innerHTML = "Current Rating: " +  res_obj.result[0].rating + "(" + res_obj.result[0].rank +")";
  document.getElementById("Max_Rating").innerHTML = "Max Rating: " +  res_obj.result[0].maxRating + "(" + res_obj.result[0].maxRank +")";
}
function Avg_Gained() // Displays Average Rating Gained per Contest!
{
  document.getElementById("Avg_Gained").innerHTML = "Average Rating Gained Per Rated Contest: " +( (ratings[ratings.length - 1] - ratings[0]) / ratings.length) ;
}
var correct = 0;
  var incorrect = 0;
  var mx = 0;
  var correct_attempts = 0;
async function user_stats()
{
  let handle = document.getElementById("unameid").value;   
  let response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
  let T = await response.text();
  console.log(T);
  var res_obj = JSON.parse(T);
  var k = [];
  var m = new Map();
  for(let i in res_obj.result) 
    {
      var id = res_obj.result[i].problem.contestId + '/' + res_obj.result[i].problem.index;
      if(m.has(id))var k = m.get(id);
      else
      {
          if(res_obj.result[i].verdict == "OK") k = [1,0];
          else k = [0,1];
          m.set(id,k);
          continue;
      } 

      if(res_obj.result[i].verdict == "OK") k[0]++;
      else k[1]++; 
      
      m.set(id , k);

        
    }
   console.log(m);
   var m1 = new Map(); // contains programming Language and frequency.
   for(let i in res_obj.result) 
   {
     var lang = res_obj.result[i].programmingLanguage;
     if(m1.has(lang)) 
     {
      let x = m1.get(lang);
      x++;
      m1.set(lang , x);
     }
     else m1.set(lang , 1);
   }
   console.log(m1);
   var arr = [['programmingLanguage' , 'frequency']];
   for(var i in m1)
    {
        var a = [i,m1[i]];
        
    }
  
  m.forEach(function(value,key)
  {
       correct += value[0];
       incorrect += value[1];
       if(value[0] != 0) correct_attempts++;
       mx = Math.max(mx,(value[0]+value[1]));
  });
  var max_link = [];
  m.forEach(function(value,key)
  {
    if(mx == (value[0] + value[1])) max_link.push(id);
  });
 console.log(correct);  // Total Correct Attempts
 console.log(incorrect); // Total incorect Attempts
 console.log(mx); // Max Attempted Question!
 console.log(max_link);
 console.log(m.size); // Attempted
 console.log(correct_attempts); // Total Correct Questions!
      google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() 
      {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Stat');
        data.addColumn('number', '');
        data.addRows([
          ['Total Solved Question',  correct_attempts ],
          ['Total Correct Attempts',  correct],
          ['Total Incorrect Attempts',  incorrect],
          ['Max Attempted Single Question', mx ]
          
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: true, width: '50%', height: '100%'});
      }

    //   google.charts.load('current', {'packages':['corechart']});
    //   google.charts.setOnLoadCallback(drawChart);

      
     
    // console.log(arr);
    //   function drawChart()
    //    {

    //     var data = google.visualization.arrayToDataTable(arr);

    //     var options = {
    //       title: 'Programming Languages Used!',
    //       is3D: true
    //     };

    //     var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    //     chart.draw(data, options);
    //   }




 }
// M
// For Dark Mode!
const toggleSwitch =
 document.querySelector('.theme-slider input[type="checkbox"]');

/* Function to change theme */
function switchTheme(e) 
{

 /* Once checkbox is checked default theme change to dark */
 if (e.target.checked) {
  document.documentElement.setAttribute('theme', 'dark');
 }

 /* While page in dark mode and checkbox is
 checked then theme back to change light*/
 else {
  document.documentElement.setAttribute('theme', 'light');
 }
}

toggleSwitch.addEventListener('change', switchTheme, false);
// M

//Table!



// Load google charts
// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);

// // Draw the chart and set the chart values
// function drawChart() {
//   var data = google.visualization.arrayToDataTable([
//   ['Task', 'Hours per Day'],
//   ['Work', 8],
//   ['Eat', 2],
//   ['TV', 4],
//   ['Gym', 2],
//   ['Sleep', 8]
// ]);

//   // Optional; add a title and set the width and height of the chart
//   var options = {'title':'My Average Day', 'width':550, 'height':400};

//   // Display the chart inside the <div> element with id="piechart"
//   var chart = new google.visualization.PieChart(document.getElementById("piechart"));
//   chart.draw(data, options);
// }

// Rank Graph!
// var xyValues = [];
// for(let i  = 0; i<ranks.length ; i++)
// {
//   xyValues.push({x: i , y : ranks[i]});
// }
// var xyValues = [
//   {x:50, y:7},
//   {x:60, y:8},
//   {x:70, y:8},
//   {x:80, y:9},
//   {x:90, y:9},
//   {x:100, y:9},
//   {x:110, y:10},
//   {x:120, y:11},
//   {x:130, y:14},
//   {x:140, y:14},
//   {x:150, y:15}
// ];

// new Chart("Rank_Chart", {
//   type: "line",
//   data: {
//     datasets: [{
//       pointRadius: 4,
//       pointBackgroundColor: "rgb(0,0,255)",
//       data: ranks
//     }]
//   },
//   options: {
//     legend: {display: false},
//     scales: {
//       xAxes: [{ticks: {min: 0, max:100}}],
//       yAxes: [{ticks: {min: 0, max:20000}}],
//     }
//   }
// })