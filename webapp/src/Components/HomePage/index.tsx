import React from "react";
import HeaderBar from "../HeaderBar";
import TimeZone from "../TimeZone";

interface HomePageProps {
  data: any;
}

const HomePage: React.FC<HomePageProps> = props => {
  return (
    <div>
      <HeaderBar />
      <div className="App">
        <TimeZone data={props.data} />
      </div>
    </div>
  );
};

export default HomePage;
