import React from "react";
import { render } from "react-dom";

class Pagination extends React.Component {
  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={this.props.previousPage.bind()}>
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={this.props.nextPage.bind()}>
              Next
            </a>
          </li>
          <li className="m-2">page: {this.props.page}</li>
          <li className="m-2">total: {this.props.total_pages}</li>
        </ul>
      </nav>
    );
  }
}
export default Pagination;
