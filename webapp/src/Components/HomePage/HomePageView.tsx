import React from "react";
import HeaderBar from "../HeaderBar";
import TimeZone from "../TimeZone";
import LogoutButton from "../Buttons/LogoutButton";

interface HomePageViewProps {
  data: any;
  authenticate: Function;
}

const HomePageView: React.FC<HomePageViewProps> = props => {
  return (
    <div>
      <HeaderBar />
      <div className="App">
        <TimeZone data={props.data} />
        <LogoutButton authenticate={props.authenticate} />
      </div>
    </div>
  );
};

export default HomePageView;
