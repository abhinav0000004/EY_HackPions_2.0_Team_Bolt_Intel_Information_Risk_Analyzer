var gaugeElement = document.querySelectorAll(".gauge");

function Loading_Chart() {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "Top Oil Reserves",
    },
    axisY: {
      title: "Reserves(MMbbl)",
    },
    data: [
      {
        type: "column",
        showInLegend: true,
        legendMarkerColor: "grey",
        legendText: "MMbbl = one million barrels",
        dataPoints: [
          { y: 300878, label: "Jan" },
          { y: 266455, label: "Feb" },
          { y: 169709, label: "March" },
          { y: 158400, label: "April" },
          { y: 142503, label: "May" },
          { y: 101500, label: "June" },
          { y: 97800, label: "July" },
          { y: 80000, label: "August" },
          { y: 80000, label: "Sept" },
          { y: 80000, label: "Oct" },
          { y: 80000, label: "Nov" },
          { y: 80000, label: "Dec" },
        ],
      },
    ],
  });
  chart.render();
}

function setGaugeValue(gauge, value) {
  console.log(gauge);
  if (value < 0 || value > 5) {
    return;
  }
  var rot = (2 * value) / 10;
  gauge.querySelector(".gauge__fill").style.transform = `rotate(${
    rot / 2
  }turn)`;
  gauge.querySelector(".gauge__cover").textContent = `${value}`;
}
for (var i = 0; i < gaugeElement.length; i++) {
  console.log(gaugeElement[i]);
  setGaugeValue(gaugeElement[i], 5);
}

Loading_Chart();
function execute() {
  const val = document.querySelector(".input_country").value;
  console.log(val);
  for (var i = 0; i < gaugeElement.length; i++) {
    console.log(gaugeElement[i]);
    setGaugeValue(gaugeElement[i], val);
  }
}
