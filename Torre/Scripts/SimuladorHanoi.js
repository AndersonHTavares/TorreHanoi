

$(document).ready(function () {
   

    $('#divhistorico').animate({ scrollTop: 9999999 }, 500);

    //gerar Comnbos 
    var cboHanoi1 = $('#cboHanoi1');
    var cboHanoi2 = $('#cboHanoi2');
    var cboHanoi3 = $('#cboHanoi3');
    cboHanoi1.find('option').remove();
    cboHanoi2.find('option').remove();
    cboHanoi3.find('option').remove();

            for (i = 1; i < 16; i++) {
                $('<option>').val(i).text(i).appendTo(cboHanoi1);
                $('<option>').val(i).text(i).appendTo(cboHanoi2);
                $('<option>').val(i).text(i).appendTo(cboHanoi3);
            }
        
});

function GerarSimulador() {

    var cboHanoi1 = $("#cboHanoi1").val();
    var cboHanoi2 = $("#cboHanoi2").val();
    var cboHanoi3 = $("#cboHanoi3").val();

    $.ajax
     ({ 
         url: '/Home/Simular',
         type: 'POST',
         data: { 'qtddiscohanoi1': Number(cboHanoi1), 'qtddiscohanoi2': Number(cboHanoi2), 'qtddiscohanoi3': Number(cboHanoi3) },
         success: function (dados) {

             var resultado = jQuery.parseJSON(dados);

                 $("#HanoiID1").html(" Hanoi ID <br />" + resultado[0]);
                 $("#HanoiID2").html(" Hanoi ID <br />" + resultado[1]);
                 $("#HanoiID3").html(" Hanoi ID <br />" + resultado[2]);
                      
             },
        error: function (erro) {
            alert(erro);
        }
    });
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var month = a.getMonth()+1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function formatar(data) {

    var x = data;
    var re = /-?\d+/;
    var m = re.exec(x);
    var d = new Date(parseInt(m[0], 10));

    return d;
}


function VerificarSimulador() {

    var SimuladorId = $("#SimuladorId").val();
   
    if (!isNumber(SimuladorId)) {
        alert('Sem Resultados na base');
        return;
    }

    $.ajax
     ({
         url: '../api/Hanois/',
         type: 'GET',
         data: { 'id': Number(SimuladorId) },
         success: function (dados) {
             var resultado = jQuery.parseJSON(dados.results);

             if (resultado.length > 0) {
                 var QtdDiscos = Number(resultado[0].qtddiscosInicial);

                 $("#divhistorico").html('');


                 var  iniciochamada = "";
                 var terminochamada = "Simulação em andamento..."
                 var qtsjogadas = 0;
                 var jogadas = "";
                 for (i = 0; i < resultado.length; i++) {
                     if (resultado[i].data_fim_simulacao == null) {
                         qtsjogadas = qtsjogadas + 1;
                         jogadas = jogadas + "<li>" + resultado[i].movimento_De + "->" + resultado[i].movimento_Para + "</li>";
                     } else {
                         terminochamada = resultado[i].data_fim_simulacao;
                     }


                 }


                 $("#divhistorico").html(jogadas);
                 $("#qtddiscos").html(QtdDiscos);
                 $("#iniciochamada").html(timeConverter(formatar(  resultado[0].data_inicio_simulacao)));
                 $("#terminochamada").html(timeConverter(formatar(terminochamada)));


                 solve(QtdDiscos, qtsjogadas);
             }
             else
                 alert('Sem Resultados na base')
         },
         error: function (erro) {
             alert(erro);
         }
     });
}