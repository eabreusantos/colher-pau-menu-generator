window.onload = function() {
    console.log('aqui');

    window.pratosPrincipais = [];
    window.complementos = [];

    document.querySelector("#addPrincipal").addEventListener('click', function(e) {
        let value = document.querySelector("#principais").value;
        window.pratosPrincipais.push(value);
        handlerList(pratosPrincipais, "#principaisList")
    });

    document.querySelector("#addComplemento").addEventListener('click', function(e) {
        let value = document.querySelector("#complementos").value;
        window.complementos.push(value);
        handlerList(complementos, "#complementosList")
    });


    document.querySelector("#send").addEventListener('click', function(e) {
        e.preventDefault();
        let msisdn = document.querySelector("#msisdn").value;
        
        if(pratosPrincipais.length <1) {
            alert("Informe ao menos 1 prato principal");
            return;
        }
        if(complementos.length < 1) {
            alert("Informe ao menos 1 complemento");
            return;
        }
        if (msisdn == undefined || msisdn ==null) {
            msisdn = "";
        }

        let wApiUrl = "https://api.whatsapp.com/send?phone={msisdn}&text={message}"
        
        let messageT = `🍴Colher de Pau 🍴
        . Cardápio do Dia🍳
  
   O ALMOÇO COMEÇARÁ A SER SERVIDO  PONTUALMENTE DE 11:00 AS 15:00 HRS 
  
   {pratos}
  
  👉 Guaraná natural 2.00
  
  🍝Acompanhamentos
   
    {complementos}
    
  🏍Taxa de entrega R$ 2,00 
  
  ⚠️ POR FAVOR, ENVIE SEU ENDEREÇO, PONTO DE REFERÊNCIA E FORMA DE PAGAMENTO⚠️
  
        🍽 Bom apetite!!! 🍽`;

        let pratos = "";
        pratosPrincipais.forEach(function(e) {
            pratos += `
            ✅ {item} 
            `.replace("{item}", e);
        });

        let complementosToInner = "";
        complementos.forEach(function(e) {
            complementosToInner += `
            🔹️ {item} 
            `.replace("{item}", e);
        });

        let m = messageT.replace("{pratos}", pratos).replace("{complementos}", complementosToInner);
        console.log(m);
        window.location.href = wApiUrl.replace("{msisdn}", msisdn).replace("{message}", encodeURI(m))

        console.log('Enviando...');
    });


};

function removeItem(text, type) {
    console.log("adsad", type, text);
    if(type == "principais") {
        let index = window.pratosPrincipais.indexOf(text);
        console.log(type, index);
        if(index != -1) {
            window.pratosPrincipais = window.pratosPrincipais.splice(index, 1);
            console.log(pratosPrincipais)
        }
        handlerList(window.pratosPrincipais, "#principaisList")
    }

    if(type == "complementos") {
        let index = window.complementos.indexOf(text);
        if(index != -1) {
            window.complementos.splice(index, 1);
        }
        handlerList(window.complementos, "#complementosList")
    }

}

function handlerList(list, destiny) {
    let type = "";
    if(destiny == "#principaisList") {
        type = "principais";
    } else {
        type = "complementos";
    }

    let removeButton = '<a href="#" onclick="removeItem(\'{item}\',\'{type}\')">remover<a>'
    let listT = "<li>{item} "+removeButton+"</li>";
    let toInner = "";

    list.forEach(function(e) {
        toInner += listT.replace("{item}", e).replace("{type}",type);
    });

    document.querySelector(destiny).innerHTML = toInner;
}