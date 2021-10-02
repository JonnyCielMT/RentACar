
function traerInfoCar() {
    $.ajax({
        url: "https://g9e816ea0199bc6-db202109241525.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/car/car",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuestaCar(respuesta.items);
        }
    });
}

function pintarRespuestaCar(items) {
    $("#resultadoCar").empty();
    let myTable = "<table border=1 >";
    myTable += "<tr>";
    myTable += "<th>ID</th>";
    myTable += "<th>Marca</th>";
    myTable += "<th>Modelo</th>";
    myTable += "<th>Categoría</th>";
    myTable += "</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].brand + "</td>";
        myTable += "<td>" + items[i].model + "</td>";
        myTable += "<td>" + items[i].category_id + "</td>";
        myTable += "<td> <button onclick='mostrarEditarCar(" + items[i].id + ")'>Editar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoCar").append(myTable);
}



function mostrarEditarCar(idElemento) {
    document.getElementById("divDetalleCar").style.display = "block";
    document.getElementById("idMostrar").innerHTML = idElemento;
    $.ajax({
        url: "https://g9e816ea0199bc6-db202109241525.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/car/car" + "/" + idElemento,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            document.getElementById("detaBrandCar").value = respuesta.items[0].brand;
            document.getElementById("detaModelCar").value = respuesta.items[0].model;
            document.getElementById("detaCategoryCar").value = respuesta.items[0].category_id;
        }
    });
}


function editarInfoCar() {
    let myData = {
        id: $("#idMostrar").text(),
        brand: $("#detaBrandCar").val(),
        model: $("#detaModelCar").val(),
        category_id: $("#detaCategoryCar").val()
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g9e816ea0199bc6-db202109241525.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/car/car",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            document.getElementById("divDetalleCar").style.display = "none";
            traerInfoCar()
            alert("Se ha actualizado.");
        }
    })
}

function cancelar() {
    document.getElementById("divDetalleCar").style.display = "none";
}
