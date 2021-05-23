function execute() {
  var db = firebase.firestore();
  var html = "";
  var element = document.getElementsByTagName("tbody")[0];
  element.innerHTML = "";
  var index = 1;
  var num_of_office =
    document.getElementsByTagName("input")[0].value == 0
      ? 0.2
      : document.getElementsByTagName("input")[0].value;
  var head_count =
    document.getElementsByTagName("input")[1].value == 0
      ? 0.2
      : document.getElementsByTagName("input")[1].value;
  var num_of_incident =
    document.getElementsByTagName("input")[2].value == 0
      ? 0.2
      : document.getElementsByTagName("input")[2].value;
  var Client_Presence =
    document.getElementsByTagName("input")[3].value == 0
      ? 0.2
      : document.getElementsByTagName("input")[3].value;
  var Severity =
    document.getElementsByTagName("input")[4].value == 0
      ? 0.2
      : document.getElementsByTagName("input")[4].value;
  db.collection("results")
    .get()
    .then((querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log(data);
        var risk_score = (
          Client_Presence *
            parseInt(data["dynamic_rcscore"]["Client_Presence"]) +
          head_count * parseInt(data["dynamic_rcscore"]["Head Count"]) +
          num_of_office *
            parseInt(data["dynamic_rcscore"]["Number_of_office"]) +
          num_of_incident *
            parseInt(data["dynamic_rcscore"]["Number_of_incident"]) +
          Severity * parseInt(data["dynamic_rcscore"]["Severity"])
        ).toFixed(2);
        var base_risk_score = (
          0.2 * parseInt(data["dynamic_rcscore"]["Client_Presence"]) +
          0.2 * parseInt(data["dynamic_rcscore"]["Head Count"]) +
          0.2 * parseInt(data["dynamic_rcscore"]["Number_of_office"]) +
          0.2 * parseInt(data["dynamic_rcscore"]["Number_of_incident"]) +
          0.2 * parseInt(data["dynamic_rcscore"]["Severity"])
        ).toFixed(2);
        html += "<tr>";
        html += "<th scope='row'>" + index + "</th>";
        html +=
          "<td class='cell expand-maximum-on-hover'>" +
          data["Date_time"] +
          "</td>";
        html +=
          "<td class='cell expand-maximum-on-hover'>" +
          data["incident_title"] +
          "</td>";
        // html +=
        //   "<td class='cell expand-maximum-on-hover'>" +
        //   data["incident_description"] +
        //   "</td>";
        html +=
          "<td class='cell expand-maximum-on-hover'>" +
          data["incident_country"] +
          "</td>";
        html +=
          "<td class='cell expand-maximum-on-hover'>" +
          data["risk_category"] +
          "</td>";
        html +=
          "<td class='cell expand-maximum-on-hover'>" +
          data["Severity"] +
          "</td>";
        html +=
          "<td class='cell expand-maximum-on-hover'>" +
          data["ey_offimp"] +
          "</td>";
        html +=
          "<td class='cell expand-maximum-on-hover'>" + data["noe"] + "</td>";
        html +=
          "<td class='cell expand-maximum-on-hover'>" + data["noct"] + "</td>";
        html +=
          "<td class='cell expand-maximum-on-hover'>" + data["noet"] + "</td>";
        if (risk_score === base_risk_score)
          html +=
            "<td class='cell expand-maximum-on-hover'>" +
            risk_score +
            "<i class='fa fa-arrows-h' style='font-size:30px;color:blue'></i></td>";
        else if (risk_score > base_risk_score)
          html +=
            "<td class='cell expand-maximum-on-hover'>" +
            risk_score +
            "<i class='fa fa-arrow-up' style='font-size:30px;color:red'></i></td>";
        else
          html +=
            "<td class='cell expand-maximum-on-hover'>" +
            risk_score +
            "<i class='fa fa-arrow-down' style='font-size:30px;color:green'></i></td>";
        html +=
          "<td class='cell expand-maximum-on-hover'>" +
          data["event_eiscore"] +
          "</td>";
        html += "</tr>";
        index = index + 1;
      });
      // do something with documents
    })
    .then(() => {
      element.innerHTML = html;
      console.log(html);
      console.log(element.innerHTML);
    });
}
execute();
