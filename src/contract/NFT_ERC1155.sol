pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC1155 {
    
    constructor() ERC1155('ipfs://Qmf8HbWaXaYKrkzaXAFf2oMMAHJuyuVvc7ZUtugESK1LK7/{id}.json') {
        for(uint  i = 0 ; i < 5 ; i++) {
           _mint(msg.sender, i, 1, bytes(abi.encodePacked("Test NFT #", Strings.toString(i)))); 
        }
    }
    
    function uri(uint _tokenId) override public view returns(string memory) {
        return string(abi.encodePacked(
            "ipfs://Qmf8HbWaXaYKrkzaXAFf2oMMAHJuyuVvc7ZUtugESK1LK7/",
            Strings.toString(_tokenId),
            ".json"
        ));
    }

    function name() public pure returns(string memory) {
        string memory collection = "test nft";
        return collection;
    }
}