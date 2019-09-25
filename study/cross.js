const field = {
    cells: [],
    bCross: true,
    field: document.getElementById('field'),
    winCross: 0,
    winZero: 0,
    win: false,
    width: 0,
    resultId: 0,
    startGame: function () {

        document.getElementById('popup-create')
                .setAttribute('style', 'display: flex;');

        document.getElementById('create')
                .addEventListener('click', () => {

                    const width = document.getElementById('width').value;

                    if (width > 1) {
                        this.width = parseInt(width);

                        document.getElementById('popup-create')
                                .setAttribute('style', '');

                        if (this.cells.length === 0) {
                            this.render();
                        }
                    } else {
                        this.showPopup('Ошибка', 'Ширина введена некорректно!');
                    }
                });
    },
    newGame: function () {

        this.cells = [];
        this.field.innerHTML = '';
        this.win = false;

        this.startGame();
    },
    render: function () {

        document.getElementById('cross').innerHTML = this.winCross;
        document.getElementById('zero').innerHTML = this.winZero;

        this.field.setAttribute(
            'style',
            'width: ' + (this.width * 100) + 'px;'
        );

        for (let i = 0; i < this.width * this.width; i++) {

            let cell = document.createElement('div');
            cell.classList.add('cell');

            cell.addEventListener('click', ( event ) => {

                if (
                    !event.target.classList.contains('cross') &&
                    !event.target.classList.contains('zero') &&
                    !this.win
                ) {
                    event.target.classList.add(this.bCross ? 'cross' : 'zero');

                    this.checkWin();

                    if (!this.win) {
                        this.bCross = !this.bCross;
                    }
                }
            });

            this.cells.push(cell);

            this.field.appendChild(cell);
        }
    },
    checkWinHorizontal: function () {

        let win = false;

        for (let i = 0; i < this.cells.length && !win; i += this.width) {

            const cellI = this.cells[i];

            let winRow = true;

            if (!!cellI &&
                (cellI.classList.contains('cross') ||
                    cellI.classList.contains('zero'))
            ) {
                for (let j = i + 1; j < i + this.width && winRow; j++) {

                    const cellJ = this.cells[j];

                    if ((!cellJ.classList.contains('cross') &&
                        !cellJ.classList.contains('zero')) ||
                        cellI.classList[1] !== cellJ.classList[1]
                    ) {
                        winRow = false;
                    }
                }
            } else {
                winRow = false;
            }

            if (winRow) {
                win = true;
            }
        }

        return win;
    },
    checkWinVertical: function () {

        let win = false;

        for (let i = 0; i < this.width && !win; i++) {

            const cellI = this.cells[i];

            let winColumn = false;
            let count = 0;

            if (!!cellI &&
                (cellI.classList.contains('cross') ||
                    cellI.classList.contains('zero'))
            ) {
                for (let j = i + this.width; j < this.cells.length && !winColumn; j += this.width) {

                    const cellJ = this.cells[j];

                    if ((cellJ.classList.contains('cross') ||
                        cellJ.classList.contains('zero')) &&
                        cellI.classList[1] === cellJ.classList[1]
                    ) {
                        count++;
                    }
                }

                if (count === this.width - 1) {
                    winColumn = true;
                }
            }

            if (winColumn) {
                win = true;
            }
        }

        return win;
    },
    checkWinDiagonalLeft: function () {

        let win = false;
        let count = 1;

        const cellStart = this.cells[0];

        if (!!cellStart &&
            (cellStart.classList.contains('zero') ||
                cellStart.classList.contains('cross'))
        ) {
            for (let i = this.width + 1; i < this.cells.length && !win; i += this.width + 1) {

                const cellI = this.cells[i];

                if ((cellI.classList.contains('cross') ||
                    cellI.classList.contains('zero')) &&
                    cellStart.classList[1] === cellI.classList[1]
                ) {
                    count++;
                }
            }

            if (count === this.width) {
                win = true;
            }
        }

        return win;
    },
    checkWinDiagonalRight: function () {

        let win = false;
        let count = 1;

        const cellStart = this.cells[this.width - 1];

        if (!!cellStart &&
            (cellStart.classList.contains('cross') ||
                cellStart.classList.contains('zero'))
        ) {
            for (let i = this.width * 2 - 2; i < this.cells.length && !win; i += this.width - 1) {

                const cellI = this.cells[i];

                if ((cellI.classList.contains('cross') ||
                    cellI.classList.contains('zero')) &&
                    cellStart.classList[1] === cellI.classList[1]
                ) {
                    count++;
                }
            }

            if (count === this.width) {
                win = true;
            }
        }

        return win;
    },
    checkWin: function () {

        // let width =

        if (this.checkWinHorizontal() ||
            this.checkWinVertical() ||
            this.checkWinDiagonalLeft() ||
            this.checkWinDiagonalRight()
        // if( this.cells[0].classList.length > 1 &&
        //     this.cells[1].classList.length > 1 &&
        //     this.cells[2].classList.length > 1 &&
        //     this.cells[0].classList[1] === this.cells[1].classList[1] &&
        //     this.cells[1].classList[1] === this.cells[2].classList[1]
        //     ||
        //     this.cells[3].classList.length > 1 &&
        //     this.cells[4].classList.length > 1 &&
        //     this.cells[5].classList.length > 1 &&
        //     this.cells[3].classList[1] === this.cells[4].classList[1] &&
        //     this.cells[4].classList[1] === this.cells[5].classList[1]
        //     ||
        //     this.cells[6].classList.length > 1 &&
        //     this.cells[7].classList.length > 1 &&
        //     this.cells[8].classList.length > 1 &&
        //     this.cells[6].classList[1] === this.cells[7].classList[1] &&
        //     this.cells[7].classList[1] === this.cells[8].classList[1]
        //     ||
        //     this.cells[0].classList.length > 1 &&
        //     this.cells[4].classList.length > 1 &&
        //     this.cells[8].classList.length > 1 &&
        //     this.cells[0].classList[1] === this.cells[4].classList[1] &&
        //     this.cells[4].classList[1] === this.cells[8].classList[1]
        //     ||
        //     this.cells[2].classList.length > 1 &&
        //     this.cells[4].classList.length > 1 &&
        //     this.cells[6].classList.length > 1 &&
        //     this.cells[2].classList[1] === this.cells[4].classList[1] &&
        //     this.cells[4].classList[1] === this.cells[6].classList[1]
        //     ||
        //     this.cells[0].classList.length > 1 &&
        //     this.cells[3].classList.length > 1 &&
        //     this.cells[6].classList.length > 1 &&
        //     this.cells[0].classList[1] === this.cells[3].classList[1] &&
        //     this.cells[3].classList[1] === this.cells[6].classList[1]
        //     ||
        //     this.cells[1].classList.length > 1 &&
        //     this.cells[4].classList.length > 1 &&
        //     this.cells[7].classList.length > 1 &&
        //     this.cells[1].classList[1] === this.cells[4].classList[1] &&
        //     this.cells[4].classList[1] === this.cells[7].classList[1]
        //     ||
        //     this.cells[2].classList.length > 1 &&
        //     this.cells[5].classList.length > 1 &&
        //     this.cells[8].classList.length > 1 &&
        //     this.cells[2].classList[1] === this.cells[5].classList[1] &&
        //     this.cells[5].classList[1] === this.cells[8].classList[1]
        ) {
            //alert('Выиграли: ' + (this.bCross ? 'крестики' : 'нолики'));

            this.win = true;

            setTimeout(
                () => {
                    // alert('Выиграли: ' + (this.bCross ? 'крестики' : 'нолики'));

                    this.showPopup('выиграли', (this.bCross ? 'Крестики' : 'Нолики'));

                    // console.log(this.bCross);

                    if (this.bCross) {
                        this.winCross++;
                    } else {
                        this.winZero++;
                    }

                    this.updateWin();

                    this.newGame();
                },
                100
            );
        } else {

            let draw = true;

            for (let i = 0; i < this.cells.length && draw; i++) {

                if (
                    !this.cells[i].classList.contains('cross') &&
                    !this.cells[i].classList.contains('zero')
                ) {
                    draw = false;
                }
            }

            if (draw) {

                // alert('Ничья!');

                this.win = true;

                setTimeout(
                    () => {
                        this.showPopup('ничья');
                        this.newGame();
                    },
                    100
                );

                // this.newGame();
            }
        }
    },
    showPopup: function ( head, body = '', zIndex = 99 ) {

        document.getElementById('popup')
                .setAttribute(
                    'style',
                    'display: flex; z-index: ' + zIndex + ';'
                );

        document.getElementById('popup-head').innerHTML = head;
        document.getElementById('popup-body').innerHTML = body;

        document.getElementById('popup-cross').addEventListener('click', () => {
            document.getElementById('popup').setAttribute('style', '');
        });
    },
    login: function ( login, password ) {

        console.log(login);
        console.log(password);

        fetch(
            'http://localhost/api/login.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            }
        ).then(res => res.json()).then(res => this.loginStart(res, 'popup-login'));
    },
    updateWin: function () {

        fetch(
            'http://localhost/api/update_res.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cross: this.winCross,
                    zero: this.winZero,
                    id: this.resultId
                })
            }
        ).then().then();
    },
    registration: function(){
        const elements = document.getElementById('form-registration').elements;

        console.log(elements);

        // let errors = [];

        // let password ='';
        // let repeatPassword = '';

        let values = {};

        for(let el of elements){
            if(el.nodeName === 'INPUT'){
                // if(!el.value){
                //     errors.push('Не все поля заполнены');
                //     break;
                // }
                // if(el.name === 'password'){
                //     password = el.value;
                // }
                // if(el.name === 'repeat-password'){
                //     repeatPassword = el.value;
                // }

                values[el.name] = el.value;
            }
        }

        // if(password != repeatPassword){
        //     errors.push('Пароли не совпадают!');
        // }

        // if(errors.length === 0){
            fetch(
                'http://localhost/api/registration.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)

                }
            ).then(res => res.json()).then(res => {

                if( !res['error'] && !!res ){
                    this.loginStart(res, 'popup-registration');
                }else{

                    if(res['error'].length != 0 && res['error'] == 'Не все поля заполнены!'){
                        console.log(elements);

                        for(let el of elements){
                            if(el.nodeName === 'INPUT' && el.value === ""){
                                // elId = toString(el.id);
                                document.getElementById(el.id).setAttribute('style', 'border-color: red;');
                            }else{
                                document.getElementById(el.id).setAttribute('style', '');
                            }
                        }
                    }else if(!!res['error']){
                        for(let el of elements){
                            if(el.nodeName === 'INPUT' && (el.id === 'password-registration' || el.id === 'repeat-password')){
                                // elId = toString(el.id);
                                document.getElementById(el.id).setAttribute('style', 'border-color: red;');
                            }else{
                                document.getElementById(el.id).setAttribute('style', '');
                            }
                        }
                    }

                    this.showPopup('Ошибка', res['error']);
                }
            })
        // }else{
        //     this.showPopup('Ошибка', errors);
        // }
    },
    loginStart: function(res, popupId){
        if(!res['error']){
            this.winCross = res['cross'];
            this.winZero = res['zero'];
            this.resultId = res['res_id'];

            document.getElementById(popupId).setAttribute('style', '');

            this.startGame();
        }else{
            this.showPopup('Ошибка', res['error']);
        }
    }
};

document.getElementById('start')
        .addEventListener('click', function () {
            field.startGame();
        });

document.getElementById('login')
        .addEventListener('click', function () {
            document.getElementById('popup-login')
                    .setAttribute('style', 'display: flex');

            document.getElementById('popup-cross-login')
                    .addEventListener('click', () => {
                        document.getElementById('popup-login')
                                .setAttribute('style', '');
                    });

            document.getElementById('login-submit')
                    .addEventListener('click', event => {
                        event.preventDefault();

                        field.login(
                            document.getElementById('login-input').value,
                            document.getElementById('password').value
                        );
                    });
        });

document.getElementById('registration').addEventListener('click', event => {

    document.getElementById('popup-registration').setAttribute('style', 'display: flex;');


    document.getElementById('popup-cross-registration').addEventListener('click', () => {

                document.getElementById('popup-registration').setAttribute('style', '');
            });

    document.getElementById('registration-submit').addEventListener('click', event => {
                event.preventDefault();

                field.registration();
            });
});

        

// const xhr = new XMLHttpRequest();
//
// xhr.open('GET', 'http://192.168.64.2', false);
//
// xhr.send();
//
// if(xhr.status == 200){
//     console.log(xhr);
// }
//
//
// fetch(
//     'http://192.168.64.2',
//     {
//         method: 'GET',
//         // headers: {},
//         // body: {}
//     }
// ).then(res => res.text()).then(res => {
//
//     console.log(res);
//
// });










