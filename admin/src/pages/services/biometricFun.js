let secugen_lic = "";
export function CallSGIFPGetData(
  setFinger_data,
  setMatchScore,
  data,
  setFoundedApp
) {
  var uri = "https://localhost:8443/SGIFPCapture";

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let fpobject = JSON.parse(xmlhttp.responseText);
      // console.log("here is the first template: " , fpobject);
      console.log("data", data);
      
          data?.map((finger) =>
            matchingfingers(fpobject.TemplateBase64, finger, setMatchScore,setFoundedApp)
          );

        setFinger_data((prev) => ({
          ...prev,
          [`img`]: "data:image/bmp;base64," + fpobject.BMPBase64,
          [`template`]: fpobject.TemplateBase64,
          [`quality`]: fpobject.ImageQuality,
        }));
      
     
      // console.log("fpobject", fpobject);
      // matchingfingers(fpobject.TemplateBase64);
    } else if (xmlhttp.status == 404) {
      console.log("error", xmlhttp);
    } else if (xmlhttp.status == 54) {
      alert("time out try again");
    }
  };
  xmlhttp.onerror = function () {
    console.log("error", xmlhttp);
  };
  var params = "Timeout=" + "10000";
  params += "&Quality=" + "50";
  params += "&licstr=" + encodeURIComponent(secugen_lic);
  params += "&templateFormat=" + "ISO";
  xmlhttp.open("POST", uri, true);
  xmlhttp.send(params);
}

 function matchingfingers(
  user_data,
  fingerprint,
  setMatchScore,
  setFoundedApp
) {
  console.log("heeeeeeeeeere");
  var uri = "https://localhost:8443/SGIMatchScore";
  var xmlhttp = new XMLHttpRequest();

  var params = "Timeout=" + "100000";
  params += "&Template1=" + encodeURIComponent(user_data);
  params += "&Template2=" + encodeURIComponent(fingerprint.fingerData);

  params += "&TemplateFormat=" + "ISO ";
  xmlhttp.open("POST", uri, true);
  xmlhttp.send(params);

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var fpobjecttt = JSON.parse(xmlhttp.responseText);
      console.log("==============hhhhhhhhhhhh=========",fingerprint)
        setMatchScore(fpobjecttt.MatchingScore);
        
        // setSuspected(fingerprint)
      if (fpobjecttt.MatchingScore > 75) {
        setFoundedApp(fingerprint)
      }
      // console.log("matching response::::: ", fpobjecttt);
      // callback(fpobjecttt); // Call the callback with the result
    } else if (xmlhttp.status == 404) {
      // console.log("EEEEEEEEEEEEEEE");
      // failCall(xmlhttp.status);
      // callback(0); // Call the callback with an error
    }
  };
}