import "./styles/main.css";
import "./styles/main.scss";
import { Component } from "react";
import ReactDom from "react-dom";

class AppContainer extends Component {
  render() {
    return (
      <>
        <h3>Hello world!</h3>
      </>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
