const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const DIARIO = document.getElementById('diario');
const MET = document.getElementById('met');
const METODO = document.getElementById('metodo');

CALCULAR.addEventListener('click', () => {
    const DATO = document.getElementById('peso').value
    //validamos que se cargue un dato:
    if (DATO > 0){
        ERROR.style.display = 'none'
        let flujo = calcFlujo(DATO);
        if (DATO >30){
            METODO.innerHTML = 'Método de superficie corporal';
            let mantenimiento = redondear(flujo*2000);
            flujo = redondear(flujo*1500);
            FLU.innerHTML = 'SC * 1500 = ' + flujo;
            MAN.innerHTML = 'SC * 2000 = ' + mantenimiento;
            DIARIO.style.display = 'none';
            METODO.style.display = 'block';
            MET.style.display = 'block';
            FLU.style.display = 'block';
            MAN.style.display = 'block';
        }else{
            METODO.innerHTML = 'Método Holliday-Segar';
            DIARIO.innerHTML = 'Volumen Diario: '+flujo+' cc';
            flujo = redondear(flujo/24);
            mantenimiento = flujo*1.5;
            mantenimiento = redondear(mantenimiento);
            FLU.innerHTML = 'Mantenimiento: '+flujo + ' cc/hr';
            MAN.innerHTML = 'm+m/2: ' + mantenimiento + ' cc/hr';
            METODO.style.display = 'block';
            MET.style.display = 'block';
            DIARIO.style.display = 'block';
            FLU.style.display = 'block';
            MAN.style.display = 'block';
        }
    } else {
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
        METODO.style.display = 'none';
        MET.style.display = 'none';
        DIARIO.style.display = 'none';
    }
})

function calcFlujo(peso){
    let resto = peso;
    let flujo = 0;
    if (peso>30){
        flujo = ((peso*4)+7)/(peso+90);
    }else{
        if (peso<=10){
            flujo += peso*100;
        } 
        else if (peso>10 && peso<20){
            resto -= 10;
            flujo = (10*100)+(resto*50);
        }else if(peso == 20){
            flujo = (10*100)+(10*50);
        }
        else{
            resto -= 20;
            flujo= (10*100) + (10*50) + (resto*20);
        }
    }
    return flujo;
}


function redondear(numero) {
    // .5 o menos, baja. Si no, sube
    let diferencia = numero - parseInt(numero);
    if (diferencia < 0.5) {
        return Math.floor(numero);
    } else {
        return Math.ceil(numero);
    }
}