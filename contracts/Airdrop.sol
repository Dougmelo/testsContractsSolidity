

import "./CryptoToken.sol";
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Airdrop  {

    // Using Libs

    // Structs

      struct Subscribe{
        address subscribeAdress;
       // bool paydOut;
    }

    // Enum
   enum Status { ACTIVE, PAUSED, CANCELLED } // mesmo que uint8


    // Properties
    
    address private owner;
    address public tokenAddress;
    mapping(uint => Subscribe) private subscribers;
    mapping(address => bool) private isSubscribers;
    uint private subscribersLength;
    Status contractState; 

    // Modifiers
    modifier isOwner() {
        require(msg.sender == owner , "Sender is not owner!");
        _;
    }

    // Events
    event NewSubscriber(address beneficiary, uint amount);

    // Constructor
    constructor(address token) {
        owner = msg.sender;
        tokenAddress = token;
        //contractState = Status.PAUSED;
    }


    // Public Functions

    function subscribe(address _subscribe) public {
       require(contractState == Status.ACTIVE,"The Airdrop is not available!");
       hasSubscribed(_subscribe);
       require( _subscribe != address(0), "There is no user to interact with the contract!");
       Subscribe memory subs = Subscribe(_subscribe);
       subscribers[subscribersLength] = subs;
       isSubscribers[_subscribe] = true;
       subscribersLength++;
    }

    function execute() public isOwner  {
     
       require(contractState == Status.ACTIVE,"The Airdrop is not available!");
       uint256 balance = getBalance();
       require(balance > 0, "Insufficient Balance to Transfer");
       uint256 amountToTransfer = balance / subscribersLength;
        
        for (uint i = 0; i < subscribersLength; i++) {
          setTransferCriptoToken(i, amountToTransfer);
        }    
    }

    function setTransferCriptoToken(uint i, uint256 amountToTransfer ) private{

           require(subscribers[i].subscribeAdress != address(0));
           require(CryptoToken(tokenAddress).transfer(subscribers[i].subscribeAdress, amountToTransfer));
           emit NewSubscriber(subscribers[i].subscribeAdress, amountToTransfer);
    }

     function getState() public view returns(Status) {
        return contractState;
   }

   function setState(uint256 num) public isOwner{
       
        if(num == 0){
             contractState = Status.ACTIVE;
        }
        if(num == 1){
             contractState = Status.PAUSED;
        }
        if(num == 2){
             contractState = Status.CANCELLED;
             kill();
        }
    }

    // Private Functions
    function hasSubscribed(address _subscribe) private view returns(bool) {
           require(isSubscribers[_subscribe] == false, "Vaza!!!"); 
           return true;
    }

     function getSubscribed(address _subscribe) public view isOwner returns(bool) {
           return isSubscribers[_subscribe];
    }
    function getBalance() private view returns (uint256) {
    uint256 balance = CryptoToken(tokenAddress).balanceOf(address(this));
    return balance;
    }
   function getTokenAddress() public view returns (address) {
   return tokenAddress;
   }
    // Kill
    function kill() public isOwner {
        selfdestruct(payable(owner));
    } 
}