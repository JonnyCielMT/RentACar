$(document).ready(function () {
    $("form").submit(function (event) {
        var formData = {
            id: $("#id").val(),
            name: $("#name").val(),
            email: $("#email").val(),
            age: $("#age").val(),
        };

        $.ajax({
            type: "POST",
            url: "https://g65366e6ba1cfc5-rentacar.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
            data: formData,
            encode: true,
        }).done(function (data) {
            console.log(data);
            $("form").empty().append(
                '<div class="alert alert-success">El cliente ha sido creado con éxito</div>',
                '<a href="formregistroclient.html" class="btn btn-primary">Volver</a>'
            );

        }).fail(function (data) {
            console.log(data);
            $("form").empty().append(
                '<div class="alert alert-danger">Ha ocurrido el siguiente error:' + data.responseJSON.cause + '</div>',
                '<a href="formregistroclient.html" class="btn btn-primary">Volver</a>'
            );
        });

        event.preventDefault();
    });
});
