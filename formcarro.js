$(document).ready(function () {
    $("form").submit(function (event) {
        var formData = {
            id: $("#id").val(),
            brand: $("#brand").val(),
            model: $("#model").val(),
            category_id: $("#category_id").val(),
        };

        $.ajax({
            type: "POST",
            url: "https://g65366e6ba1cfc5-rentacar.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/car/car",
            data: formData,
            encode: true,
        }).done(function (data) {
            console.log(data);
            $("form").empty().append(
                '<div class="alert alert-success">El carro ha sido creado con éxito</div>',
                '<a href="formregistrocarro.html" class="btn btn-primary">Volver</a>'
            );

        }).fail(function (data) {
            console.log(data);
            $("form").empty().append(
                '<div class="alert alert-danger">Ha ocurrido el siguiente error:' + data.responseJSON.cause + '</div>',
                '<a href="formregistrocarro.html" class="btn btn-primary">Volver</a>'
            );
        });

        event.preventDefault();
    });
});
