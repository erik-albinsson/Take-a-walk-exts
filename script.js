async function fetchData() {
    
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      async function success(pos) {
        var crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        
    const res=await fetch (`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${crd.longitude}/lat/${crd.latitude}/data.json`,
    {mode: "no-cors"});
    const record=await res.json();
    console.log(record.timeSeries[0]);
    x = record.timeSeries[0].parameters[10].values[0]
    document.getElementById("data").innerHTML= x > 15 ? "ja" : "nej";
        
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
    navigator.geolocation.getCurrentPosition(success, error, options)
    
}
fetchData();