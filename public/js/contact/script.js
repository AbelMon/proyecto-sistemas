/*$('#form').on('submit', function () {
    if($('#email').val() == ""){
        $('#errormessage').html("Please provide at least an email ");
        return false;
    } else {
        return true;
    }
});*/


$("#send").click(function(event) {

    var name = $("#name").val();
    isValidName(name);

    var email = $("#email").val();
    isValidEmail(email);

    var lastName = $("#lastName").val();
    isValidLastName(lastName);

    if (canProceedToRequest(name, email, lastName)) {
        startAjaxRequest(name, email, lastName);
    }

});


function validEmailRegex(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


var startAjaxRequest = function(name, email, lastName) {
    $.ajax({
        url: "/user",
        data: {
            name: name,
            email: email,
            lastName: lastName
        },
        type: "POST",
        dataType: "json",

        success: function(json) {
            alert("Te has registrado a M/A Tech. Puedes verificarlo en tu correo electrónico.");
            hideErrorTexts();
        },

        error: function(xhr, status) {
            manageError(xhr);
        }
    });
}

var manageError = function(xhr) {
    hideErrorTexts();

    if (xhr.status === 409) {
        alert("Ups!! El usuario ya está registrado en la base de datos.");
        return;
    }

    alert("Al parecer el programador es un tonto y no validó este error. Lo sentimos.");
}

var hideErrorTexts = function() {
    $("#errorEmail").val("");
    $("#errorName").val("");
    $("#errorLastName").val("");
    location.reload();
}


var canProceedToRequest = function(name, email, lastName) {

    if (!isValidText(name)) {
        return false;
    }

    if (!isValidText(email)) {
        return false;
    }

    if (!isValidText(lastName)) {
        return false;
    }

    if (!validEmailRegex(email)) {
        $("#errorEmail").text("Ingresa un email válido.");
        return false;
    }

    return true;
}


var isValidName = function(name) {

    if (isValidText(name)) {
        $("#errorName").text("");
        return;
    }

    $("#errorName").text("Debes ingresar un nombre");
    return;
}

var isValidEmail = function(email) {

    if (isValidText(email)) {
        $("#errorEmail").text("");
        return;
    }

    $("#errorEmail").text("Debes ingresar un email");
    return;
}


var isValidLastName = function(lastName) {
    

    if (isValidText(lastName)) {
        $("#errorLastName").text("");
        return;
    }
    $("#errorLastName").text("Debes ingresar un apellido");
    return;
}


var isValidText = function(text) {
    if (text === "" || text === null) {
        return false;
    }

    return true;
}

