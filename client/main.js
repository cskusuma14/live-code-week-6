$(document).ready(function () {
    $("#btnLogin").click(function () {
        $("#formLogin").toggle();
    });

    $("#btnAddFood").click(function () {
        $("#formFood").toggle();
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
                $("#btnAddFood").css('display', 'inline-block');
                $("#btnLogout").css('display', 'inline-block');
                $("#dataFood").css('display', 'block');
                getData(localStorage.getItem('access_token'))

            })
            .fail(function (err) {
                console.log(err)
            })
    });

    $("#btnLogout").click(function () {
        $("#btnLogin").css('display', 'inline-block');
        $("#btnLogout").css('display', 'none');
        $("#dataFood").css('display', 'none');
        $("#btnAddFood").css('display', 'none');
        localStorage.clear()
    });

    $("#formFood").submit(function (e) {
        e.preventDefault();

        let objFood = {}
        objFood.title = $('#titleFood').val()
        objFood.price = $('#priceFood').val()
        objFood.ingredients = $('#ingredientsFood').val()
        objFood.tag = $('#tagFood').val()

        $.ajax({
            url: "http://localhost:3000/foods",
            type: "POST",
            headers: {
                "Content-Type": "application/json",
                "access_token": localStorage.getItem('access_token')
            },
            data: JSON.stringify(objFood)
        })
            .done(function (result) {
                $("#formFood").toggle();
                getData(localStorage.getItem('access_token'))
            })
            .fail(function (err) {
                console.log(err)
            })
    });
});

function deleteFood(id) {
    console.log('a')
    $.ajax({
        url: "http://localhost:3000/foods/" + id,
        type: "DELETE",
        headers: {
            "access_token": localStorage.getItem('access_token')
        }
    })
        .done(function (result) {
            getData(localStorage.getItem('access_token'))
        })
        .fail(function (err) {
            console.log(err)
        })
}

function getData(token) {
    $.ajax({
        url: "http://localhost:3000/foods",
        type: "GET",
        headers: {
            "access_token": localStorage.getItem('access_token')
        }
    })
        .done(function (result) {
            console.log(result)
            $("#tbody").html("")
            for (let i = 0; i < result.data.length; i++) {
                console.log(result.data[i])
                $("#tbody").append(
                    `<tr>
                    <td> ${result.data[i].title} </td>
                    <td> ${result.data[i].price} </td>
                    <td> ${result.data[i].ingredients} </td>
                    <td> ${result.data[i].tag} </td>
                    <td> <button type="button" class="btn btn-primary" id="btnDelete" onclick="deleteFood(${result.data[i].id})">Delete</button> </td>

                    </tr>`)
            }
        })
        .fail(function (err) {
            console.log(err)
        })
}