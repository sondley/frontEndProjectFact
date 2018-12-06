import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';

//Components
import CustomMenu from "../../components/custom-menu/custom-menu";

const dummyData = [
  { y: "2", x: "Enero" },
  { y: "4", x: "Febrero" },
  { y: "3", x: "Marzo" },
  { y: "1", x: "Abril" },
  { y: "7", x: "Mayo" },
  { y: "4", x: "Junio" },
  { y: "5", x: "Julio" },
  { y: "9", x: "Agosto" },
  { y: "4", x: "Septiembre" },
  { y: "7", x: "Octubre" },
  { y: "5", x: "Noviembre" },
  { y: "3", x: "Diciembre" }
];

class ShoppingInquiryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1000
    }
  }

  componentDidMount = () => {
    const width = document.getElementsByClassName("contentContainer")[0].clientWidth - 28;
    console.log(width);
    this.setState({ width });
  }

  render() {
    return (
      <CustomMenu>
        <BarChart
          colorBars
          axes
          grid
          barWidth={this.state.width / 12}
          data={dummyData}
          height={600}
          width={this.state.width}
        />
      </CustomMenu>
    );
  }
}

export default ShoppingInquiryScreen;
