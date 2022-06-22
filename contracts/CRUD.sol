// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CRUD {
    struct User {
        uint256 id;
        string name;
    }
    User[] public users;

    function createUser(uint256 _id, string calldata _name) external {
        if (users.length == 0) {
            User memory newUser = User(_id, _name);
            users.push(newUser);
        } else {
            for (uint256 i = 0; i < users.length; i++) {
                if (users[i].id == _id) {
                    revert("User already exists");
                }
            }
            User memory newUser = User(_id, _name);
            users.push(newUser);
        }
    }

    function removeUser(uint256 _id) external returns (bool) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == _id) {
                users[i] = users[users.length - 1];
                users.pop();
                return true;
            }
        }
        revert("User not found");
    }

    function getUser(uint256 _id) external view returns (string memory name) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == _id) {
                return (users[i].name);
            }
        }
        revert("User not found");
    }

    function updateUser(uint256 _id, string memory _newName)
        external
        returns (bool)
    {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == _id) {
                users[i].name = _newName;
                return true;
            }
        }
        revert("User not found");
    }
}
