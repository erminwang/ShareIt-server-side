$(document).ready(function() {
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('#confirm-password').keyup(function() {
         let icon = $('#alert-icon');
         let password = $('#signup-password').val();
         let confirmPassword = $(this).val();
         if(password.length < confirmPassword.length || !password.startsWith(confirmPassword)) {
             icon.removeClass().addClass("fas fa-times-circle");
             icon.css("display", "block");
         } else if (password === confirmPassword){
             icon.removeClass().addClass("fas fa-check-circle");
             icon.css("display", "block");
         } else {
             icon.css("display", "none");
         }
    });

    $('#register-submit').click(function(event) {
        event.preventDefault();
        let email = $('#signup-email').val();
        let password = $('#signup-password').val();
        if(!email || !password) {
            alert("Please enter correct email and password.");
        } else {
            var data = {
                    "email": email,
                    "password": password
            };
            $.ajax({
                type: "POST",
                url: getHostURL() + "/api/users/signup",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response, textStatus, request) {
                    let token = request.getResponseHeader('x-auth');
                    localStorage.setItem("token", token);
                },
                error: function(errorMsg) {
                    console.log("error!!!");
                    let errorList = JSON.parse(errorMsg.responseText);
                    let errors = errorList.e.errors;
                    let alertMessages = "";
                    Object.keys(errors).forEach(function(key) {
                        alertMessages += `<div class="alert alert-danger" role="alert">
                                            <strong>${key} -> </strong> ${errors[key].message.toString()}
                                          </div>`
                    });
                    $('#holder-alert').append(alertMessages);
                }
            });
        }

    })
});