$(document).ready(function () {
    $("#btnLogin").click(function () {
        $("#formLogin").toggle();
    });

    $("#formLogin").submit(function (e) {
        e.preventDefault();

        let objUser = {}
        objUser.email = $('#emailLogin').val()
        objUser.password = $('#passwordLogin').val()

        $.ajax({
            url: "http://localhost:3000/user/login",
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(objUser)
        })
            .done(function (result) {
                console.log(result.access_token)
                localStorage.setItem("access_token", result.access_token)
                $("#formLogin").toggle();
                $("#btnLogin").css('display', 'none');
                $("#btnLogout").css('display', 'inline-block');

            })
            .fail(function (err) {
                console.log(err)
            })
    });

    $("#btnLogout").click(function () {
        $("#btnLogin").css('display', 'inline-block');
        $("#btnLogout").css('display', 'none');
        localStorage.clear()
    });

});