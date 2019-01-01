class Billete {
    constructor(v, c) {
        this.valor = v;
        this.cantidad = c;
        this.image = new Image();
        this.image.width = 200;
        this.image.style.display = 'block';
        this.image.style.margin = '10px auto';
        this.image.src = 'images/' + this.valor + '-rupees.jpg';
    }
}

var caja = [];
caja.push( new Billete(100, 10));
caja.push( new Billete(50, 10));
caja.push( new Billete(20, 10));
caja.push( new Billete(10, 10));
caja.push( new Billete(5, 10));

var cajaTotal = 0;

for(c of caja) {
    cajaTotal = cajaTotal + c.valor * c.cantidad;
}

var showMoney = document.getElementById('show');
var billEntrega = [];
var x = document.getElementById('extraer');
x.addEventListener('click', entregarDinero);

function entregarDinero() {
    var dineroExtraer = document.getElementById('dinero').value;
    if(dineroExtraer % 5 != 0){
        showMoney.innerHTML = 'Only multiples of 5 please.';
    } else {
        var restarCaja = dineroExtraer;
        showMoney.innerHTML = '';
        if (cajaTotal >= dineroExtraer) {
            for(b of caja){
                if(b.cantidad > 0) {
                    cantBill = Math.floor( dineroExtraer / b.valor );
                    if(b.cantidad > cantBill) {
                        billEntrega.push( new Billete(b.valor, cantBill));
                        dineroExtraer = dineroExtraer - b.valor * cantBill;
                        b.cantidad = b.cantidad - cantBill;
                    } else {
                        billEntrega.push( new Billete(b.valor, b.cantidad));
                        dineroExtraer = dineroExtraer - b.valor * b.cantidad;
                        b.cantidad = 0;
                    }
                } 
            }
            for( e of billEntrega){
                if(e.cantidad){
                    //showMoney.innerHTML += e.cantidad + ' billetes de ' + e.valor + '<br>';
                    for (i = 0; i < e.cantidad; i++) {
                        showMoney.appendChild(e.image.cloneNode(true));
                    }
                }
            }
            cajaTotal = cajaTotal - restarCaja;
        } else {
            showMoney.innerHTML = 'I`m sorry, the money inside of me is not enough to cover your request.';
        }
        billEntrega = [];
    }
}