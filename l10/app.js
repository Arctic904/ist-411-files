var app = angular.module('userApp', []);
const port = 3004;
const baseUrl = `https://ist411.up.ist.psu.edu:${port}`

app.controller('UserController', function ($scope) {
    $scope.newUser = {};
    $scope.editUser = {};
    $scope.user = {};
    $scope.errorMessage = '';

    // Create user
    $scope.addUser = function () {
        console.log('Adding user', $scope.newUser); // Debugging log
        $.ajax({
            url: baseUrl + '/create-user',
            type: 'POST',
            data: JSON.stringify($scope.newUser),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("User created successfully");
                    $scope.newUser = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error adding user:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error adding user: " + errorThrown);
                    $scope.errorMessage = "Error adding user: " + errorThrown;
                });
            }
        });
    };

    // Read user
    $scope.readUser = function (id) {
        console.log('Reading user with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/read-user/' + id,
            type: 'GET',
            success: function (data) {
                $scope.$apply(function () {
                    $('#read-result').html('Name: ' + data.name + ', Age: ' + data.age);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error reading user:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error reading user: " + errorThrown);
                    $scope.errorMessage = "Error reading user: " + errorThrown;
                });
            }
        });
    };

    // Update user
    $scope.updateUser = function () {
        console.log('Updating user', $scope.editUser); // Debugging log
        $.ajax({
            url: baseUrl + '/update-user/' + $scope.editUser.id,
            type: 'PATCH',
            data: JSON.stringify($scope.editUser),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("User updated successfully");
                    $scope.editUser = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error updating user:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error updating user: " + errorThrown);
                    $scope.errorMessage = "Error updating user: " + errorThrown;
                });
            }
        });
    };

    // Delete user
    $scope.deleteUser = function (id) {
        console.log('Deleting user with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/delete-user/' + id,
            type: 'DELETE',
            success: function () {
                $scope.$apply(function () {
                    alert("User deleted successfully");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error deleting user:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error deleting user: " + errorThrown);
                    $scope.errorMessage = "Error deleting user: " + errorThrown;
                });
            }
        });
    };
});
