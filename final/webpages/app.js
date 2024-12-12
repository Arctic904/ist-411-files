var app = angular.module('userApp', ["ngRoute"]);
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

app.controller('UserLoginController', function ($scope) {
    $scope.newUser = {};
    $scope.editUser = {};
    $scope.user = {};
    $scope.errorMessage = '';

    // Login user
    $scope.loginUser = function () {
        console.log('Logging in user', $scope.newUser); // Debugging log
        $.ajax({
            url: baseUrl + '/login',
            type: 'POST',
            data: JSON.stringify($scope.newUser),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("User Logged In successfully");
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

    // Register user
    $scope.loginUser = function () {
        console.log('Registering user', $scope.newUser); // Debugging log
        $.ajax({
            url: baseUrl + '/register',
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
            url: baseUrl + '/user/' + id,
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
            url: baseUrl + '/user/' + $scope.editUser.id,
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
            url: baseUrl + '/user/' + id,
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
})

app.controller('OrderController', function ($scope) {
    $scope.newOrder = {};
    $scope.editOrder = {};
    $scope.order = {};
    $scope.errorMessage = '';

    // Create order
    $scope.addOrder = function () {
        console.log('Adding order', $scope.newOrder); // Debugging log
        $.ajax({
            url: baseUrl + '/create-order',
            type: 'POST',
            data: JSON.stringify($scope.newOrder),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("Order created successfully");
                    $scope.newOrder = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error adding order:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error adding order: " + errorThrown);
                    $scope.errorMessage = "Error adding order: " + errorThrown;
                });
            }
        });
    };

    // Read order
    $scope.readOrder = function (id) {
        console.log('Reading order with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/read-order/' + id,
            type: 'GET',
            success: function (data) {
                $scope.$apply(function () {
                    $('#read-result').html('Name: ' + data.name + ', Age: ' + data.age);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error reading order:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error reading order: " + errorThrown);
                    $scope.errorMessage = "Error reading order: " + errorThrown;
                });
            }
        });
    };

    // Update order
    $scope.updateOrder = function () {
        console.log('Updating order', $scope.editOrder); // Debugging log
        $.ajax({
            url: baseUrl + '/update-order/' + $scope.editOrder.id,
            type: 'PATCH',
            data: JSON.stringify($scope.editOrder),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("Order updated successfully");
                    $scope.editOrder = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error updating order:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error updating order: " + errorThrown);
                    $scope.errorMessage = "Error updating order: " + errorThrown;
                });
            }
        });
    };

    // Delete order
    $scope.deleteOrder = function (id) {
        console.log('Deleting order with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/delete-order/' + id,
            type: 'DELETE',
            success: function () {
                $scope.$apply(function () {
                    alert("Order deleted successfully");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error deleting order:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error deleting order: " + errorThrown);
                    $scope.errorMessage = "Error deleting order: " + errorThrown;
                });
            }
        });
    };
});

app.controller('ReturnController', function ($scope) {
    $scope.newReturn = {};
    $scope.editReturn = {};
    $scope.return = {};
    $scope.errorMessage = '';

    // Create return
    $scope.addReturn = function () {
        console.log('Adding return', $scope.newReturn); // Debugging log
        $.ajax({
            url: baseUrl + '/create-return',
            type: 'POST',
            data: JSON.stringify($scope.newReturn),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("Return created successfully");
                    $scope.newReturn = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error adding return:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error adding return: " + errorThrown);
                    $scope.errorMessage = "Error adding return: " + errorThrown;
                });
            }
        });
    };

    // Read return
    $scope.readReturn = function (id) {
        console.log('Reading return with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/read-return/' + id,
            type: 'GET',
            success: function (data) {
                $scope.$apply(function () {
                    $('#read-result').html('Name: ' + data.name + ', Age: ' + data.age);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error reading return:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error reading return: " + errorThrown);
                    $scope.errorMessage = "Error reading return: " + errorThrown;
                });
            }
        });
    };

    // Update return
    $scope.updateReturn = function () {
        console.log('Updating return', $scope.editReturn); // Debugging log
        $.ajax({
            url: baseUrl + '/update-return/' + $scope.editReturn.id,
            type: 'PATCH',
            data: JSON.stringify($scope.editReturn),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("Return updated successfully");
                    $scope.editReturn = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error updating return:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error updating return: " + errorThrown);
                    $scope.errorMessage = "Error updating return: " + errorThrown;
                });
            }
        });
    };

    // Delete return
    $scope.deleteReturn = function (id) {
        console.log('Deleting return with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/delete-return/' + id,
            type: 'DELETE',
            success: function () {
                $scope.$apply(function () {
                    alert("Return deleted successfully");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error deleting return:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error deleting return: " + errorThrown);
                    $scope.errorMessage = "Error deleting return: " + errorThrown;
                });
            }
        });
    };
});

app.controller('ProductController', function ($scope) {
    $scope.newProduct = {};
    $scope.editProduct = {};
    $scope.product = {};
    $scope.errorMessage = '';

    // Create product
    $scope.addProduct = function () {
        console.log('Adding product', $scope.newProduct); // Debugging log
        $.ajax({
            url: baseUrl + '/create-product',
            type: 'POST',
            data: JSON.stringify($scope.newProduct),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("Product created successfully");
                    $scope.newProduct = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error adding product:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error adding product: " + errorThrown);
                    $scope.errorMessage = "Error adding product: " + errorThrown;
                });
            }
        });
    };

    // Read product
    $scope.readProduct = function (id) {
        console.log('Reading product with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/read-product/' + id,
            type: 'GET',
            success: function (data) {
                $scope.$apply(function () {
                    $('#read-result').html('Name: ' + data.name + ', Age: ' + data.age);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error reading product:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error reading product: " + errorThrown);
                    $scope.errorMessage = "Error reading product: " + errorThrown;
                });
            }
        });
    };

    // Update product
    $scope.updateProduct = function () {
        console.log('Updating product', $scope.editProduct); // Debugging log
        $.ajax({
            url: baseUrl + '/update-product/' + $scope.editProduct.id,
            type: 'PATCH',
            data: JSON.stringify($scope.editProduct),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("Product updated successfully");
                    $scope.editProduct = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error updating product:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error updating product: " + errorThrown);
                    $scope.errorMessage = "Error updating product: " + errorThrown;
                });
            }
        });
    };

    // Delete product
    $scope.deleteProduct = function (id) {
        console.log('Deleting product with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/delete-product/' + id,
            type: 'DELETE',
            success: function () {
                $scope.$apply(function () {
                    alert("Product deleted successfully");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error deleting product:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error deleting product: " + errorThrown);
                    $scope.errorMessage = "Error deleting product: " + errorThrown;
                });
            }
        });
    };
});

app.controller('CartController', function ($scope) {
    $scope.newCart = {};
    $scope.editCart = {};
    $scope.cart = {};
    $scope.errorMessage = '';

    // Create cart
    $scope.addCart = function () {
        console.log('Adding cart', $scope.newCart); // Debugging log
        $.ajax({
            url: baseUrl + '/create-cart',
            type: 'POST',
            data: JSON.stringify($scope.newCart),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("Cart created successfully");
                    $scope.newCart = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error adding cart:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error adding cart: " + errorThrown);
                    $scope.errorMessage = "Error adding cart: " + errorThrown;
                });
            }
        });
    };

    // Read cart
    $scope.readCart = function (id) {
        console.log('Reading cart with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/read-cart/' + id,
            type: 'GET',
            success: function (data) {
                $scope.$apply(function () {
                    $('#read-result').html('Name: ' + data.name + ', Age: ' + data.age);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error reading cart:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error reading cart: " + errorThrown);
                    $scope.errorMessage = "Error reading cart: " + errorThrown;
                });
            }
        });
    };

    // Update cart
    $scope.updateCart = function () {
        console.log('Updating cart', $scope.editCart); // Debugging log
        $.ajax({
            url: baseUrl + '/update-cart/' + $scope.editCart.id,
            type: 'PATCH',
            data: JSON.stringify($scope.editCart),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("Cart updated successfully");
                    $scope.editCart = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error updating cart:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error updating cart: " + errorThrown);
                    $scope.errorMessage = "Error updating cart: " + errorThrown;
                });
            }
        });
    };

    // Delete cart
    $scope.deleteCart = function (id) {
        console.log('Deleting cart with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/delete-cart/' + id,
            type: 'DELETE',
            success: function () {
                $scope.$apply(function () {
                    alert("Cart deleted successfully");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error deleting cart:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error deleting cart: " + errorThrown);
                    $scope.errorMessage = "Error deleting cart: " + errorThrown;
                });
            }
        });
    };
});

app.controller('BillController', function ($scope) {
    $scope.newBill = {};
    $scope.editBill = {};
    $scope.bill = {};
    $scope.errorMessage = '';

    // Create bill
    $scope.addBill = function () {
        console.log('Adding bill', $scope.newBill); // Debugging log
        $.ajax({
            url: baseUrl + '/create-bill',
            type: 'POST',
            data: JSON.stringify($scope.newBill),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("Bill created successfully");
                    $scope.newBill = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error adding bill:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error adding bill: " + errorThrown);
                    $scope.errorMessage = "Error adding bill: " + errorThrown;
                });
            }
        });
    };

    // Read bill
    $scope.readBill = function (id) {
        console.log('Reading bill with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/read-bill/' + id,
            type: 'GET',
            success: function (data) {
                $scope.$apply(function () {
                    $('#read-result').html('Name: ' + data.name + ', Age: ' + data.age);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error reading bill:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error reading bill: " + errorThrown);
                    $scope.errorMessage = "Error reading bill: " + errorThrown;
                });
            }
        });
    };

    // Update bill
    $scope.updateBill = function () {
        console.log('Updating bill', $scope.editBill); // Debugging log
        $.ajax({
            url: baseUrl + '/update-bill/' + $scope.editBill.id,
            type: 'PATCH',
            data: JSON.stringify($scope.editBill),
            contentType: 'application/json',
            success: function (data) {
                $scope.$apply(function () {
                    alert("Bill updated successfully");
                    $scope.editBill = {};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error updating bill:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error updating bill: " + errorThrown);
                    $scope.errorMessage = "Error updating bill: " + errorThrown;
                });
            }
        });
    };

    // Delete bill
    $scope.deleteBill = function (id) {
        console.log('Deleting bill with id', id); // Debugging log
        $.ajax({
            url: baseUrl + '/delete-bill/' + id,
            type: 'DELETE',
            success: function () {
                $scope.$apply(function () {
                    alert("Bill deleted successfully");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error deleting bill:', errorThrown); // Debugging log
                $scope.$apply(function () {
                    alert("Error deleting bill: " + errorThrown);
                    $scope.errorMessage = "Error deleting bill: " + errorThrown;
                });
            }
        });
    };
});