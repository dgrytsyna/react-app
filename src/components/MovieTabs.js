import React from "react";
import { render } from "react-dom";

class MovieTabs extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const handleClick = value => () => {
      this.props.updateSortBy(value);
    };
    const getClassByValue = value => {
      return `nav-link ${this.props.sort_by === value ? "active" : ""}`;
    };
    console.log("MovieTabs render");
    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <div
            className={getClassByValue("popularity.desc")}
            onClick={handleClick("popularity.desc")}
          >
            {" "}
            Popularity desc{" "}
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassByValue("revenue.desc")}
            onClick={handleClick("revenue.desc")}
          >
            {" "}
            Revenue desc{" "}
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassByValue("vote_average.desc")}
            onClick={handleClick("vote_average.desc")}
          >
            Vote average desc
          </div>
        </li>
      </ul>
    );
  }
}
export default MovieTabs;
