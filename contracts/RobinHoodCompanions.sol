// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RobinHoodCompanions
 * @dev ERC-721 NFT Companion platform running on Robinhood Chain
 */
contract RobinHoodCompanions {
    string public name = "Cove Companions";
    string public symbol = "COVE";
    uint256 public totalSupply = 0;
    address public owner;

    struct CompanionData {
        string name;
        string species;
        string role;
        uint256 level;
        uint256 exp;
        uint256 hunger;
        uint256 lastFedTimestamp;
        string twitterHandle;
    }

    mapping(uint256 => CompanionData) public companions;
    mapping(address => uint256) public userCompanion;
    mapping(string => bool) public twitterClaimed;
    mapping(uint256 => address) public tokenOwner;

    event CompanionHatched(uint256 indexed tokenId, address indexed owner, string twitterHandle, string name);
    event CompanionFed(uint256 indexed tokenId, uint256 expGained, uint256 newHunger);
    event LevelUp(uint256 indexed tokenId, uint256 newLevel);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Hatches an exclusive companion for the caller
     */
    function hatch(
        string memory _name,
        string memory _species,
        string memory _role,
        string memory _twitterHandle
    ) external returns (uint256) {
        require(userCompanion[msg.sender] == 0, "Already hatched a companion");
        require(!twitterClaimed[_twitterHandle], "Twitter handle already assigned");

        totalSupply++;
        uint256 newTokenId = totalSupply;

        companions[newTokenId] = CompanionData({
            name: _name,
            species: _species,
            role: _role,
            level: 1,
            exp: 0,
            hunger: 0,
            lastFedTimestamp: block.timestamp,
            twitterHandle: _twitterHandle
        });

        tokenOwner[newTokenId] = msg.sender;
        userCompanion[msg.sender] = newTokenId;
        twitterClaimed[_twitterHandle] = true;

        emit CompanionHatched(newTokenId, msg.sender, _twitterHandle, _name);
        return newTokenId;
    }

    /**
     * @notice Feeds companion, resets hunger, and awards EXP
     */
    function feed(uint256 _tokenId) external {
        require(tokenOwner[_tokenId] == msg.sender || msg.sender == owner, "Unauthorized");
        CompanionData storage comp = companions[_tokenId];

        require(block.timestamp >= comp.lastFedTimestamp + 1 hours, "Feeding is on 60 min cooldown");

        comp.lastFedTimestamp = block.timestamp;
        comp.hunger = 0;
        comp.exp += 15;

        if (comp.exp >= 100) {
            comp.level += 1;
            comp.exp = comp.exp - 100;
            emit LevelUp(_tokenId, comp.level);
        }

        emit CompanionFed(_tokenId, 15, 0);
    }

    function getCompanion(uint256 _tokenId) external view returns (CompanionData memory) {
        return companions[_tokenId];
    }
}
