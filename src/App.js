import React from "react";
import WebexSDKAdapter from "@webex/sdk-component-adapter";
import Webex from "webex";
import { WebexMeeting, WebexDataProvider } from "@webex/components";

import "./App.css";
import "@webex/components/dist/webexComponents.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const webex = new Webex({
      credentials:
        "MmYyYmI4MmQtYzE3NS00MmNjLWFkZDctNzE1YmI3NTM4ZjUwODkxZmQyOTMtOWUy_PF84_consumer"
    });
    this.adapter = new WebexSDKAdapter(webex);
    this.state = {
      adapterConnected: false
    };
  }

  async componentDidMount() {
    await this.adapter.connect();
    this.setState({ adapterConnected: true });
  }

  async componentWillUnmount() {
    await this.adapter.disconnect();
  }

  render() {
    const { adapterConnected } = this.state;

    const meeting = adapterConnected ? (
      <WebexDataProvider adapter={this.adapter}>
        <WebexMeeting meetingDestination="arash.koush@gmail.com" />
      </WebexDataProvider>
    ) : null;

    return <div className="App">{meeting}</div>;
  }
}
