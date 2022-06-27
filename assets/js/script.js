"use strict";
// La traccia non era molto precisa, quindi ho svolto il lavoro secondo quanto ho inteso io, cercando di rispettarla per quanto mi fosse possibile, rendendo alcune soluzioni più macchinose per rispettare la richiesta dei metodi precisi
// Il telefono ha le seguenti funzionalità:
/*
Telefonata solo con numero inserito;
Telefonata solo con credito superiore a 20 centesimi;
Richiesta e aggiornamento del credito residuo telefonando al numero 404;
Aggiunta di 1 euro di credito al saldo;
Conta dei minuti totali di chiamate e del numero di chiamate nella sezione 'registro';
Aggiornamento della lista dei numeri chiamati nella sezione 'registro';
Aggiornamento del timer delle chiamate e la conta del credito speso per la chiamata (consultabile "telefonando" il numero 404)  */
document.addEventListener("DOMContentLoaded", function () {
    createSmartpgone();
});
let credito1 = Number(prompt('Credito Utente-1'));
let credito2 = Number(prompt('Credito Utente-2'));
let credito3 = Number(prompt('Credito Utente-3'));
class Smartphone {
    constructor(id, carica, numChiamate, min, sec) {
        this.id = id;
        this.carica = carica;
        this.numChiamate = numChiamate;
        this.min = min;
        this.sec = sec;
    }
    ricarica() {
        return this.carica++;
    }
    chiamata() {
        this.sec++;
        if (this.sec >= 60) {
            this.sec = 0;
            this.min++;
        }
        let opCredito = (this.carica - ((this.min + 1) * 0.2));
        return [`Minuti totali delle telefonate: 
                ${this.min} : ${(this.sec)}`, opCredito];
    }
    numero404() {
        let crRes = (this.carica - ((this.min + 1) * 0.2)) - 1;
        return crRes;
    }
}
let firstUser = new Smartphone('Paolo', credito1, 0, 0, 0);
let secondUser = new Smartphone('Anna', credito2, 0, 0, 0);
let thirdUser = new Smartphone('Francesca', credito3, 0, 0, 0);
let arrUsers = [firstUser, secondUser, thirdUser];
function createSmartpgone() {
    arrUsers.forEach(user => {
        let a = document.querySelector('#smartphone');
        let telA = document.createElement('div');
        telA.className = 'col';
        a === null || a === void 0 ? void 0 : a.appendChild(telA);
        let divCredito = document.createElement('div');
        divCredito.className = 'd-flex justify-content-between';
        telA.append(divCredito);
        let pCredito = document.createElement('p');
        pCredito.className = 'mb-0 ms-1';
        pCredito.innerText = `Il credito iniziale di ${user.id} 
        è di ${user.ricarica().toFixed(2)}€`;
        divCredito.append(pCredito);
        let btnCredito = document.createElement('button');
        btnCredito.type = 'button';
        btnCredito.innerText = '+1€';
        btnCredito.className = 'btn btn-success ms-3';
        btnCredito.onclick = function () {
            pCredito.innerHTML = `Il credito aggiornato di ${user.id}
            è di ${user.ricarica().toFixed(2)}€`;
            pCredito.innerText = `Il credito aggiornato di ${user.id} 
                    è di ${(user.numero404().toFixed(2))}€`;
        };
        divCredito.append(btnCredito);
        let p404 = document.createElement('p');
        p404.className = 'mt-3 creditoRes';
        p404.innerText = 'CHIAMA IL -404- PER CONOSCERE IL CREDITO RESIDUO';
        telA.append(p404);
        let arrTastiera = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'];
        let arrNumeri = [];
        let arrDigit = [];
        let timer;
        let moneys;
        let divCel = document.createElement('div');
        divCel.className = 'p-3 schermoTastierino';
        telA.append(divCel);
        let userTel = document.createElement('p');
        userTel.className = 'text-white mb-5';
        userTel.innerText = `Telefono di ${user.id}`;
        divCel.append(userTel);
        let inputNumber = document.createElement('input');
        inputNumber.setAttribute('readonly', 'true');
        inputNumber.type = 'text';
        inputNumber.className = 'w-100 my-3';
        divCel.append(inputNumber);
        let divTasiera = document.createElement('div');
        divTasiera.className = 'row row-cols-3 mx-2 mb-3';
        divCel.append(divTasiera);
        arrTastiera.forEach(num => {
            let numbersDiv = document.createElement('div');
            numbersDiv.className = 'col';
            numbersDiv.onclick = function () {
                arrDigit.push(num);
                insertNum();
            };
            divTasiera.append(numbersDiv);
            let numbers = document.createElement('p');
            numbers.className = 'text-white text-center numTast';
            numbers.innerText = num;
            numbersDiv.append(numbers);
        });
        let divOnTel = document.createElement('div');
        divOnTel.className = 'row row-cols-3 mx-2';
        divCel.append(divOnTel);
        let clearChiamata = document.createElement('i');
        clearChiamata.className = 'col bi bi-trash-fill text-center';
        clearChiamata.onclick = function () {
            arrDigit.length = 0;
            inputNumber.value = arrDigit.splice(0, arrDigit.length);
        };
        divOnTel.append(clearChiamata);
        let onChiamata = document.createElement('i');
        onChiamata.className = 'col bi bi-telephone-fill text-center';
        onChiamata.onclick = function () {
            if (inputNumber.value === '') {
                alert(`Inserisci un numero sul telefono di ${user.id}`);
            }
            else if (inputNumber.value === '404') {
                if (user.min === 0 && user.sec === 0) {
                    pCredito.innerText = `Il credito aggiornato di ${user.id} 
                    è di ${(user.carica - 1).toFixed(2)}€`;
                    alert(`Il tuo credito è di ${(user.carica - 1).toFixed(2)}€`);
                    arrDigit.length = 0;
                    inputNumber.value = arrDigit.splice(0, arrDigit.length);
                }
                else {
                    alert(`Il tuo credito è di ${(user.numero404().toFixed(2))}€`);
                    pCredito.innerText = `Il credito aggiornato di ${user.id} 
                    è di ${(user.numero404().toFixed(2))}€`;
                    arrDigit.length = 0;
                    inputNumber.value = arrDigit.splice(0, arrDigit.length);
                }
            }
            else {
                if ((user.chiamata()[1] - 1) >= 0.2) {
                    timer = setInterval(() => {
                        minChiamataTot.innerText = user.chiamata()[0];
                        minChiamate.innerText = user.chiamata()[0];
                    }, 100);
                    arrNumeri.push(inputNumber.value);
                    nChiamate.innerText = `Chiamate: ${arrNumeri.length}`;
                    moneys = setInterval(() => {
                        if ((user.chiamata()[1] - 1) < 0.2) {
                            clearInterval(timer);
                            clearInterval(moneys);
                            alert('Il tuo credito non è sufficiente');
                            divReg.style.display = 'none';
                            divCel.style.display = 'block';
                            divTel.style.display = 'none';
                        }
                    }, 3000);
                    divReg.style.display = 'none';
                    divCel.style.display = 'none';
                    divTel.style.display = 'block';
                }
                else {
                    clearInterval(timer);
                    clearInterval(moneys);
                    alert('Il tuo credito non è sufficiente');
                    divReg.style.display = 'none';
                    divCel.style.display = 'block';
                    divTel.style.display = 'none';
                }
            }
        };
        divOnTel.append(onChiamata);
        let backChiamata = document.createElement('i');
        backChiamata.onclick = function () {
            arrDigit.pop();
            insertNum();
        };
        backChiamata.className = 'col bi bi-backspace-fill text-center';
        divOnTel.append(backChiamata);
        function insertNum() {
            arrDigit.toString();
            inputNumber.value = arrDigit.join('');
        }
        let divTastReg = document.createElement('div');
        divTastReg.className = 'row row-cols-2 mt-4 btmAlign';
        divCel.append(divTastReg);
        let pTastiera = document.createElement('a');
        pTastiera.innerText = 'Tastiera';
        pTastiera.className = 'col';
        divTastReg.append(pTastiera);
        let pRegistro = document.createElement('a');
        pRegistro.innerText = 'Registro';
        pRegistro.onclick = function () {
            divReg.style.display = 'block';
            divCel.style.display = 'none';
            divTel.style.display = 'none';
        };
        pRegistro.className = 'col';
        divTastReg.append(pRegistro);
        let divReg = document.createElement('div');
        divReg.className = 'p-3 schermoRegistro';
        telA.append(divReg);
        let titleReg = document.createElement('h3');
        titleReg.innerText = 'Telefono';
        titleReg.className = 'text-center text-white mt-5';
        divReg.append(titleReg);
        let divChiamate = document.createElement('div');
        divChiamate.className = 'd-flex justify-content-between mt-5';
        divReg.append(divChiamate);
        let nChiamate = document.createElement('div');
        nChiamate.className = 'text-white';
        nChiamate.innerText = `Chiamate effettuate: ${user.numChiamate}`;
        divChiamate.append(nChiamate);
        let cancChiamate = document.createElement('i');
        cancChiamate.className = 'bi bi-trash';
        cancChiamate.onclick = function () {
            lista.innerHTML = '';
            arrNumeri.length = 0;
            nChiamate.innerText = `Chiamate effettuate: ${arrNumeri.length}`;
        };
        divChiamate.append(cancChiamate);
        let minChiamate = document.createElement('div');
        minChiamate.className = 'text-white';
        minChiamate.innerText = `Durata Chiamate: ${user.min} : ${user.sec}`;
        divReg.append(minChiamate);
        let lista = document.createElement('div');
        lista.className = 'mt-3 lista';
        divReg.append(lista);
        let divTastRegReg = document.createElement('div');
        divTastRegReg.className = 'row row-cols-2 mt-4 btmAlign';
        divReg.append(divTastRegReg);
        let pRegTastiera = document.createElement('a');
        pRegTastiera.innerText = 'Tastiera';
        pRegTastiera.onclick = function () {
            divReg.style.display = 'none';
            divCel.style.display = 'block';
            divTel.style.display = 'none';
        };
        pRegTastiera.className = 'col';
        divTastRegReg.append(pRegTastiera);
        let pRegRegistro = document.createElement('a');
        pRegRegistro.innerText = 'Registro';
        pRegRegistro.className = 'col';
        divTastRegReg.append(pRegRegistro);
        let divTel = document.createElement('div');
        divTel.className = 'p-3 schermoChiamata';
        telA.append(divTel);
        let pNumeroChiamato = document.createElement('p');
        pNumeroChiamato.className = 'text-white mt-5 pt-5';
        divTel.append(pNumeroChiamato);
        let minChiamataTot = document.createElement('div');
        minChiamataTot.className = 'text-white text-center mt-4';
        minChiamataTot.innerText = `Minuti totali delle telefonate: 
        ${user.min} : ${user.sec}`;
        divTel.append(minChiamataTot);
        let coloffTel = document.createElement('div');
        coloffTel.className = 'row row-cols-1 mt-5 pt-5';
        divTel.append(coloffTel);
        let offChiamata = document.createElement('i');
        offChiamata.className = 'bi bi-telephone-x-fill col text-center mt-5';
        offChiamata.onclick = function () {
            clearInterval(timer);
            clearInterval(moneys);
            lista.innerHTML = '';
            arrNumeri.forEach(num => {
                let listBlock = document.createElement('div');
                lista.append(listBlock);
                let listIcon = document.createElement('i');
                listIcon.className = 'bi bi-telephone-outbound-fill text-white';
                listBlock.append(listIcon);
                let numberList = document.createElement('p');
                numberList.className = 'text-white';
                numberList.innerText = num;
                listBlock.append(numberList);
            });
            divReg.style.display = 'none';
            divCel.style.display = 'block';
            divTel.style.display = 'none';
        };
        coloffTel.append(offChiamata);
    });
}
