var urlMessage = "https://g9e816ea0199bc6-db202109241525.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/message"




function traerInfoMessage() {
    $.ajax({
        url: urlMessage,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuestaMessage(respuesta.items);
        }
    });
}

function pintarRespuestaMessage(items) {
    $("#resultadoMessage").empty();
    let myTable = "<table border=1 >";
    myTable += "<tr>";
    myTable += "<th>ID</th>";
    myTable += "<th>Texto del mensaje</th>";
    myTable += "</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].messagetext + "</td>";
        myTable += "<td> <button onclick='mostrarEditarMessage(" + items[i].id + ")'>Editar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoMessage").append(myTable);
}

function mostrarEditarMessage(idElemento) {
    document.getElementById("divDetalleMessage").style.display = "block";
    document.getElementById("idMessageMostrar").innerHTML = idElemento;
    $.ajax({
        url: urlMessage + "/" + idElemento,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            document.getElementById("detaMessagetextMessage").value = respuesta.items[0].messagetext;
        }
    });
}


function editarInfoMessage() {
    let myData = {
        id: $("#idMessageMostrar").text(),
        messagetext: $("#detaMessagetextMessage").val()
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: urlMessage,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            document.getElementById("divDetalleMessage").style.display = "none";
            traerInfoMessage()
            alert("Se ha actualizado.");
        }
    })
}

function cancelar() {
    document.getElementById("divDetalleMessage").style.display = "none";
}
