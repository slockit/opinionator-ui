import React, { Component } from 'react';
import { sendVote } from '../../interfaces/DatabaseInterface'
import "../styles/SinglePollProposal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercentage, faGasPump, faCoins, faCogs, faCubes, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

class SinglePollProposal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      inputAddress: '',
      inputSignature: '',
    }

    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleSignatureChange = this.handleSignatureChange.bind(this)
    this.handleClickOnProposalBox = this.handleClickOnProposalBox.bind(this)
    this.handleClickOnSendSignatureButton = this.handleClickOnSendSignatureButton.bind(this)
  }

  handleClickOnProposalBox() {
    this.setState({
      expanded: !this.state.expanded && parseInt(this.props.endDate) > parseInt(Date.now().toString().substring(0, 10))
    });
  }

  handleSignatureChange(event) {
    this.setState({
      inputSignature: event.target.value
    }, this.checkSignature)
  }

  handleAddressChange(event) {
    this.setState({
      inputAddress: event.target.value
    })
  }

  getMessage() {
    return JSON.stringify({
      pollContractAddress: this.props.pollContractAddress,
      poll_id: this.props.pollId,
      proposal_id: this.props.proposalData.id
    })
  }

  async handleClickOnSendSignatureButton() {
    let signatureMatches = await this.checkSignature()
    if (signatureMatches) {
      try {
        await sendVote({
          message: this.getMessage(),
          version: '0.1',
          signature: this.state.inputSignature
        })
        alert("Thank you for participating")
        this.setState({
          inputAddress: '',
          inputSignature: ''
        })
      } catch (error) {
        //show notification
        alert("Error: You already participated. Please try another address\n" + error)
      }
    } else {
      //show notification
      alert("Error: Signature does not match")
    }
  }

  async checkSignature() {
    let returnValue = false
    try {
      returnValue = await this.props.web3Interface.web3.eth.accounts.recover(this.getMessage(), this.state.inputSignature).toLowerCase() === this.state.inputAddress
    } catch (error) {
      //show notification
      alert("Error: " + error)
    }
    return returnValue
  }

  render() {

    const loadingScreen = <div></div>
    const message = this.getMessage()
    return (
      <div>
        {!this.props.proposalData ? loadingScreen :
        <div className="box proposalBox-buttom-spacer" >
            <div className="columns">
                <div className="column has-text-left is-2">
                    <div className="title is-5">{this.props.proposalData.name}</div>
                </div>
                <div className="column has-text-left">
                    <div>{this.props.proposalData.description}</div>
                </div>
                <div className="column has-text-right">
                    {this.state.expanded ? <FontAwesomeIcon icon={faAngleUp} onClick={this.handleClickOnProposalBox}/> : <FontAwesomeIcon icon={faAngleDown} onClick={this.handleClickOnProposalBox}/>}
                </div>
            </div>
            <div className="columns">

                <div className="column">
                    <FontAwesomeIcon icon={faPercentage} /> 
                    {this.props.proposalData.percentage}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faGasPump} /> 
                    {this.props.proposalData.gas}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faCoins} /> 
            { /**slice the last 18 digits to get eth instead of wei (not nice but simple enough (calculation is still accurate, only for display))*/ }
                    {this.props.proposalData.coin.slice(0, -18)}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faCogs} /> 
                    {this.props.proposalData.dev}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faCubes} /> 
                    {this.props.proposalData.miner}
                </div>
            </div>

            <div className="columns">
                <div className="column has-text-right">
                    <progress className="progress is-link" value={this.props.proposalData.percentage} max="100"/>
                </div>
            </div>

            { /** Form for signing */ }
            {!this.state.expanded ? null :

          <div className="section">

            <div className='field'>
                <div className="control has-icon-left">
                <label className="label">Your Address</label>
                    <input className="input" type='text' placeholder='Enter your address' onChange={this.handleAddressChange} value={this.state.inputAddress} required/>
                </div>
            </div>

            <div className='field'>
                <div className="control has-icon-left">
                <label className="label">The message to vote on</label>
                    <input className="input is-disabled" type='text' value={message} readOnly={true}/>
                </div>
            </div>

            <div className='field'>
                <div className="control has-icon-left">
                <label className="label">Paste signature here</label>
                    <input className="input proposalBox-buttom-spacer" type='text' placeholder='Enter your Signature' onChange={this.handleSignatureChange} value={this.state.inputSignature} required/>
                </div>
            </div>

            {<button className="button is-left is-link" onClick={this.handleClickOnSendSignatureButton}>Send Signature</button>}

            </div>}
        </div>
      }
      </div>
      );
  }
}

export default SinglePollProposal;