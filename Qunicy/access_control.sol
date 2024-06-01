// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        address user;
        AccessLevel accessLevel;
    }

    enum AccessLevel { NoAccess, View, Download }

    mapping(address => string[]) value;
    mapping(address => mapping(address => AccessLevel)) ownership;
    mapping(address => Access[]) accessList;
    mapping(address => bool) publicData;

    function add(address _user, string calldata url) external {
        value[_user].push(url);
    }

    function allow(address user, AccessLevel level) external {
        ownership[msg.sender][user] = level;
        bool found = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].accessLevel = level;
                found = true;
                break;
            }
        }
        if (!found) {
            accessList[msg.sender].push(Access(user, level));
        }
    }

    function disallow(address user) external {
        ownership[msg.sender][user] = AccessLevel.NoAccess;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].accessLevel = AccessLevel.NoAccess;
                break;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        require(
            _user == msg.sender || 
            ownership[_user][msg.sender] != AccessLevel.NoAccess || 
            publicData[_user] == true,
            "You don't have access"
        );
        return value[_user];
    }

    function download(address _user) external view returns (string[] memory) {
        require(
            ownership[_user][msg.sender] == AccessLevel.Download || 
            publicData[_user] == true,
            "You don't have access to download"
        );
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    function setPublic(bool isPublicData) external {
        publicData[msg.sender] = isPublicData;
    }

    function isPublic(address _user) external view returns (bool) {
        return publicData[_user];
    }

     function setPrivate(address _user) external {
        require(msg.sender == _user || publicData[msg.sender], "You don't have permission to make this data private");
        publicData[_user] = false;
    }

    function isPrivate(address _user) external view returns (bool) {
        return !publicData[_user];
    }
}

