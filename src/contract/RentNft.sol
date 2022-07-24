// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC4907.sol";

contract NftlaunchPad is Ownable, ERC4907 {
  using Strings for uint256;

  using Counters for Counters.Counter;
  Counters.Counter private currentTokenId;

  string public baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 0.1 ether;
  uint256 public maxSupply = 100;
  uint256 public maxMintAmount = 3;
  bool public paused = false;
  mapping(address => bool) public whitelisted;
  uint256 public baseAmount = 20000000000000; //0.00002 ethers
  struct NftItem {
      bool rentable;
      uint256 amountPerMinute;
      bool sell;
      uint256 amountSell;

  }
  mapping(uint256 => NftItem) public NftItems;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC4907(_name, _symbol) {
    setBaseURI(_initBaseURI);
    mint(msg.sender, 3);   
    
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint(address _to, uint256 _mintAmount) public payable {    
    uint256 supply = currentTokenId.current();
    require(!paused);
    require(_mintAmount > 0);
    require(_mintAmount <= maxMintAmount);
    require(supply + _mintAmount <= maxSupply);

    if (msg.sender != owner()) {
        if(whitelisted[msg.sender] != true) {
          require(msg.value >= cost * _mintAmount);
        }
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      currentTokenId.increment();
      _safeMint(_to, currentTokenId.current());
       NftItems[currentTokenId.current()] = NftItem(
        {
            rentable: false,
            amountPerMinute: baseAmount,
            sell: false,
            amountSell: 0
        });
        
    }
  }

  function rent(uint256 _tokenId, uint64 _expires) public payable virtual {
        uint256 dueAmount = NftItems[_tokenId].amountPerMinute * _expires;
        require(msg.value == dueAmount, "Uncorrect amount");
        require(userOf(_tokenId) == address(0), "Already rented");
        require(NftItems[_tokenId].rentable, "Renting disabled for the NFT");
        payable(ownerOf(_tokenId)).transfer(dueAmount);
        UserInfo storage info = _users[_tokenId];
        info.user = msg.sender;
        info.expires = block.timestamp + (_expires * 60);
        emit UpdateUser(_tokenId, msg.sender, _expires);
    }

    function setRentFee(uint256 _tokenId, uint256 _amountPerMinute) public {
      require(_isApprovedOrOwner(_msgSender(), _tokenId), "Caller is not token owner nor approved");
      NftItems[_tokenId].amountPerMinute = _amountPerMinute;
    }

    function setRentable(uint256 _tokenId, bool _rentable) public {
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "Caller is not token owner nor approved");
        NftItems[_tokenId].rentable = _rentable;
    }

    function setSell(uint256 _tokenId, bool _sell, uint256 _amount) public {
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "Caller is not token owner nor approved");
        NftItems[_tokenId].sell = _sell;
        NftItems[_tokenId].amountSell = _amount;
    }

    function buyItem (uint256 _tokenId) public payable{
        require(msg.value == NftItems[_tokenId].amountSell, "Uncorrect amount");
        address seller = ownerOf(_tokenId);
        _transfer(seller, msg.sender, _tokenId);
        payable(seller).transfer(msg.value); 
        NftItems[_tokenId].sell = false;
        NftItems[_tokenId].amountSell = 0;
    }

  function mintSpecifiedToken(address _to, uint256 _tokenId) public payable {
    uint256 supply = currentTokenId.current();
    require(!paused);
    require(supply + 1 <= maxSupply);
      _safeMint(_to, _tokenId);
   
  }

  function totalSupply() public view returns (uint _totalSupply){
    return currentTokenId.current();
  }

 
  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  //only owner
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
 function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
  }
 
  function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
  }

  function withdraw() public payable onlyOwner {
    require(payable(msg.sender).send(address(this).balance));
  }
}