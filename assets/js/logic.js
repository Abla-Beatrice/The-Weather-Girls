 

d3.json("all_over90.json").then(function(data){
 

    console.log(data);
  var results = data.results

  var first_line = data.results[1].values
  var second_line = data.results[11].values
  var third_line = data.results[12].values
  var fourth_line = data.results[6].values
  var fifth_line = data.results[8].values
  
  
  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: [1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009],
      
      datasets: [{ 
          data: first_line,
          label: data.results[1].city_name,
          borderColor: "#3e95cd",
          fill: false
        }, { 
          data: second_line,
          label: data.results[11].city_name,
          borderColor: "#8e5ea2",
          fill: false
        }, { 
          data: third_line,
          label: data.results[12].city_name,
          borderColor: "#3cba9f",
          fill: false
        }, { 
          data: fourth_line,
          label: data.results[6].city_name,
          borderColor: "#e8c3b9",
          fill: false
        }, { 
          data: fifth_line,
          label: data.results[8].city_name,
          borderColor: "#c45850",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        spanGaps: true,
        text: 'Number of Days over 90 Degrees F'
      }
    }
  })

});
    
 




  d3.json("all_over90.json").then(function(result) { 
    console.log(result.results[11].city_name)

    var results = result.results
    
    var first_line = result.results[1].values
    var second_line = result.results[11].values
    var third_line = result.results[12].values
    var fourth_line = result.results[6].values
    var fifth_line = result.results[8].values
    var ctx =  document.getElementById("bar-chart-grouped").getContext("2d");
      
    var data = {
        labels: [1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009],
        datasets: [{ 
          label: result.results[1].city_name,
          backgroundColor: "#77a8a8",
          data: first_line,
                              
        }, { 
          
          label: result.results[11].city_name,
          backgroundColor: "#d6d4e0",
          data: second_line,
        }, { 
          data: third_line,
          label: result.results[12].city_name,
          backgroundColor: "#b5b9aa0",
          
        }, { 
          data: fourth_line,
          label: result.results[6].city_name,
          backgroundColor: "#622569",
          
        }, { 
          data: fifth_line,
          label: result.results[8].city_name,
          backgroundColor: "#d64161",
          
        }
      ]
      };
    var myBarChart = new Chart(ctx, {
      type:'bar',
      data:data,
      options: {
        barValueSpacing: 40,
        scales:{
          xAxes: [{
            barPercentage: 0.98
          }]
        }
      }


    })
        
  })


 


      






