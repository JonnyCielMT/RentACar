var urlClient = "https://g9e816ea0199bc6-db202109241525.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client"

function traerInfoClient() {
    $.ajax({
        url: urlClient,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuestaClient(respuesta.items);
        }
    });
}

function pintarRespuestaClient(items) {
    $("#resultadoClient").empty();
    let myTable = "<table border=1 >";
    myTable += "<tr>";
    myTable += "<th>ID</th>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>Email</th>";
    myTable += "<th>Edad</th>";
    myTable += "</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable += "<td> <button onclick='mostrarEditarClient(" + items[i].id + ")'>Editar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoClient").append(myTable);
}


function mostrarEditarClient(idElemento) {
    document.getElementById("divDetalleClient").style.display = "block";
    document.getElementById("idClientMostrar").innerHTML = idElemento;
    $.ajax({
        url: urlClient + "/" + idElemento,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            document.getElementById("detaNameClient").value = respuesta.items[0].name;
            document.getElementById("detaEmailClient").value = respuesta.items[0].email;
            document.getElementById("detaAgeClient").value = respuesta.items[0].age;
        }
    });
}


function editarInfoClient() {
    let myData = {
        id: $("#idClientMostrar").text(),
        name: $("#detaNameClient").val(),
        email: $("#detaEmailClient").val(),
        age: $("#detaAgeClient").val()
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: urlClient,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            document.getElementById("divDetalleClient").style.display = "none";
            traerInfoClient()
            alert("Se ha actualizado.");
        }
    })
}

function cancelar() {
    document.getElementById("divDetalleClient").style.display = "none";
}
