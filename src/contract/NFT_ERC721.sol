pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftTestERC721 is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 0.01 ether;
  uint256 public maxSupply = 100;
  uint256 public maxMintAmount = 2;
  bool public paused = false;
  mapping(address => bool) public whitelisted;

  //add table for each token to indicate if it mint
  //with this you can safe a number

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    mint(msg.sender, 3);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint(address _to, uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();

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
      _safeMint(_to, supply + i);
    }
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function getNumberMint()
    public
    view
    returns (uint[] memory)
  {
    uint256 ownerTokenCount = balanceOf(owner());
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(owner(), i);
    }
    return tokenIds;
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

function getMessageHash(
      address _to,
      uint _amount,
      string memory _message,
      uint _nonce
  ) public pure returns (bytes32) {
      return keccak256(abi.encodePacked(_to, _amount, _message, _nonce));
  }

  function getEthSignedMessageHash(bytes32 _messageHash)
      public
      pure
      returns (bytes32)
  {
      /*
      Signature is produced by signing a keccak256 hash with the following format:
      "\x19Ethereum Signed Message\n" + len(msg) + msg
      */
      return
          keccak256(
              abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
          );
  }

  function verify(
      address _signer,
      address _to,
      uint _amount,
      string memory _message,
      uint _nonce,
      bytes memory signature
  ) public pure returns (bool) {
      bytes32 messageHash = getMessageHash(_to, _amount, _message, _nonce);
      bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

      return recoverSigner(ethSignedMessageHash, signature) == _signer;
  }

  function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature)
      public
      pure
      returns (address) {
      (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

      return ecrecover(_ethSignedMessageHash, v, r, s);
  }

  function splitSignature(bytes memory sig)
      public
      pure
      returns (
          bytes32 r,
          bytes32 s,
          uint8 v
      ) {
      require(sig.length == 65, "invalid signature length");

      assembly {
          /*
          First 32 bytes stores the length of the signature

          add(sig, 32) = pointer of sig + 32
          effectively, skips first 32 bytes of signature

          mload(p) loads next 32 bytes starting at the memory address p into memory
          */

          // first 32 bytes, after the length prefix
          r := mload(add(sig, 32))
          // second 32 bytes
          s := mload(add(sig, 64))
          // final byte (first byte of the next 32 bytes)
          v := byte(0, mload(add(sig, 96)))
      }

      // implicitly return (r, s, v)
  }


}