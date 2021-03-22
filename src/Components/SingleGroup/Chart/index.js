import {CanvasJSChart} from 'canvasjs-react-charts'

const Chart = ({records, startBalance, groupCreationDate}) => {
	const dataPoints = [];
	dataPoints.push(...records.map((record) => {
		return {x: new Date(record.creationDate), y: record.balance}
	}));
  const options = {
		animationEnabled: true,
		title:{
			text: "Balance changing"
		},
		axisX: {
			valueFormatString: "DD.MM.YY"
		},
		axisY: {
			title: "Balance",
			prefix: "$"
		},
		data: [{
			yValueFormatString: "$#,###",
			xValueFormatString: "DDDD.MMMM.YYYY.hh.mm.ss",
			type: "spline",
			dataPoints: [
				{ x: new Date(groupCreationDate), y: startBalance },
				...dataPoints
			]
			}]
		}

  return (
    <CanvasJSChart options = {options}/>
  );
};

export default Chart;
