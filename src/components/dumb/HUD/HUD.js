import React from "react";

// components
import HUDBox from "./HUDBox";

// style
import "./HUD.scss";
import "../../../styles/css/lcarssdk.css"
import "../../../styles/addons/scrollbutton/scrollbutton.css"
import "../../../styles/addons/levelBar/levelBar.css"
import "../../../styles/templates/bracket/bracket.css"
import "../../../styles/templates/dialog/dialog.css"
import "../../../styles/templates/framing/framing.css"
import "../../../styles/templates/button/button.css"
import "../../../styles/themes/theme_ussNotAffiliated.css"
import "./module.css"


class HUD extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  addMessage(text) {
    this.setState({ messages: [...this.state.messages, text] });
  }
  showInfo(message) {
    this.refs.info.textContent = message;
  }

  render() {
    const { ethereum } = this.props;
    return (
      // <div className="HUD">
      //   <h1 className="title">ETHEREUM EXPLORER</h1>
      //   <div className="panelsTop">
      //     <HUDBox
      //       title="ETH blocks mined"
      //       subtitle={ethereum.latestBlock.number}
      //     />
      //   </div>
      //   {this.state.messages.map(message => <p>{message}</p>)}
      // </div>
      <div className="wrapper row flexh" id="wpr_viewport">
    {/* <!--Left Column--> */}
    <div className="column flexv">
        {/* <!--Bracket--> */}
        <div className="wrapper sdk bracket typeA">
            <div className="wrapper content"></div>
            <div className="elbow top-left small bg-green-1 no-event horizontal">
                <div className="bar">
                    <div className="block"></div>
                </div>
                <div className="bar"></div>
            </div>
            <div className="elbow top-right small bg-green-4 no-event horizontal">
                <div className="bar">
                    <div className="block"></div>
                </div>
                <div className="bar"></div>
            </div>
            <div className="elbow bottom-left small bg-green-1 no-event horizontal">
                <div className="bar">
                    <div className="block"></div>
                </div>
                <div className="bar"></div>
            </div>
            <div className="elbow bottom-right small bg-green-3 no-event horizontal">
                <div className="bar">
                    <div className="block"></div>
                </div>
                <div className="bar"></div>
            </div>
            <div className="column flexv">
                <div className="bar flexcv bg-green-2"></div>
                <div className="bar flexcv bg-green-1">
                    <div className="bar bg-white"></div>
                </div>
                <div className="bar flexcv bg-blue-4"></div>
            </div>
            <div className="column flexv">
                <div className="bar flexcv bg-green-4"></div>
                <div className="bar flexcv bg-green-1"></div>
                <div className="bar flexcv bg-blue-4"></div>
            </div>
            <div className="column flexv">
                <div className="bar flexcv bg-green-3"></div>
                <div className="bar flexcv bg-blue-3">
                    <div className="bar bg-white"></div>
                </div>
                <div className="bar flexcv bg-green-3"></div>
            </div>
            <div className="column flexv">
                <div className="bar flexcv bg-green-1"></div>
                <div className="bar flexcv bg-green-3"></div>
                <div className="bar flexcv bg-green-4"></div>
            </div>
        </div>
        {/* <!--First Button Group--> */}
        <div className="wrapper flexh button-wrap">
            <div className="button bg-blue-3 left"></div>
            <div className="button bg-blue-4"></div>
            <div className="button bg-green-4 left"></div>
            <div className="button bg-blue-2"></div>
            <div className="button bg-green-4 left"></div>
            <div className="button bg-green-2"></div>
        </div>
        {/* <!--Column Spacer--> */}
        <div className="wrapper" style={{maxHeight: '190px', flex: '4'}}></div>
        {/* <!--Second Button Group--> */}
        <div className="wrapper flexh button-wrap">
            <div className="button bg-green-2 left"></div>
            <div className="button bg-blue-2"></div>
            <div className="button bg-blue-4 left"></div>
            <div className="button bg-green-2"></div>
            <div className="button bg-blue-1 left ra_g1"></div>
            <div className="button bg-blue-4"></div>
        </div>
        {/* <!--Column Spacer--> */}
        {/* <div className="wrapper spacer flexcv" style=" margin:0;"></div> */}
        {/* <!--Last Complex Button--> */}
        <div className="complexButton">
            <div className="cap left bg-green-4"></div>
            <div className="block bg-green-4"></div>
            {/* <div className="text" style="width: 65px;">55</div> */}
            <div className="button right bg-blue-1"></div>
        </div>
    </div>
    {/* <!--Button Column-->     */}
    <div className="wrapper column flexv" style={{minWidth:'150px'}}>
        <div className="button bg-blue-1"></div>
        <div className="button bg-blue-2"></div>
        <div className="button bg-blue-4 step-two"></div>
        <div className="button bg-green-3 step-three"></div>
        <div className="button bg-blue-4 step-three"></div>
        <div className="button bg-blue-3"></div>
        <div className="button bg-green-3"></div>
        <div className="button bg-blue-3"></div>
        <div className="button bg-blue-2 flexcv"></div>
    </div>

    <div className="wrapper column flexv flexch" id="wpr_mainView">
        {/* <!--Header-->     */}
        <div className="row header flexh">
            {/* <!--Header Column-->     */}
            <div className="column flexv">
                <div className="button bg-green-3 step-two"  data-label="LCARS"></div>
                <div className="elbow bottom-left bg-green-4 flexcv default horizontal">
                    <div className="bar">
                        <div className="block"></div>
                    </div>
                </div>
            </div>
            <div className="wrapper flexch flexv">
                {/* <!--Header Content-->     */}
                <div className="wrapper content flexcv">
                    <div className="title">LCARS Hardcode - API DISABLED</div>
                    <div className="wrapper flexh button-wrap">
                        <div className="button bg-green-1 pill"></div>
                        <div className="button bg-green-3 pill"></div>
                        <div className="button bg-blue-1 pill"></div>
                        <div className="button bg-green-4 pill"></div>
                        <div className="button bg-blue-3 pill"></div>
                        <a className="button bg-green-1 pill blink" target="_blank" data-label="Docs" href="https://github.com/Aricwithana/LCARS-SDK/wiki"></a>
                    </div>
                </div>
                {/* <!--Header Bar Row-->     */}
                <div className="row frame flexh">
                    <div className="bar bg-blue-2"></div>
                    <div className="bar bg-blue-1"></div>
                    <div className="bar bg-blue-3"></div>
                    <div className="bar bg-green-1 flexch"></div>
                    <div className="bar bg-blue-3"></div>
                    <div className="bar bg-blue-2"></div>
                    <div className="bar bg-blue-3"></div>
                </div>
            </div>
        </div>
        {/* <!--Body-->     */}
        <div className="wrapper main flexh flexcv">
            {/* <!--Body Button Column-->     */}
            <div className="wrapper column flexv">
                <div className="elbow top-left bg-green-4 step-two default horizontal">
                    <div className="bar">
                        <div className="block"></div>
                    </div>
                </div>
                <div className="button bg-blue-4"></div>
                <div className="button bg-green-4 step-two"></div>
                <div className="button bg-green-1"></div>
                <div className="button bg-green-2 step-two"></div>
                <div className="button bg-blue-4 flexcv" data-altLabel="LCARS"></div>
            </div>
            {/* <!--Body Bar Row-->     */}
            <div className="column flexch flexv">
                <div className="row flexh frame">
                    <div className="bar bg-green-4"></div>
                    <div className="bar bg-blue-4 small"></div>
                    <div className="bar bg-blue-1"></div>
                    <div className="bar bg-green-3 flexch"></div>
                    <div className="bar bg-blue-2"></div>
                    <div className="bar bg-green-3"></div>
                    <div className="bar bg-green-1"></div>
                </div>
                {/* <!--Body Content-->     */}
                {/* <div className="wrapper content flexcv" style=" overflow:auto;"></div> */}
            </div>
        </div>
    </div>
</div>

    );
  }
}

export default HUD;
