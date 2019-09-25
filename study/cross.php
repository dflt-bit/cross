<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="cross.css">
</head>
<body>

<div class="head">

    <div id="start" class="start">
        <span>Начать игру</span>
    </div>

    <div id="login" class="login">
        <span>Войти</span>
    </div>

    <div id="registration" class="login">
        <span>Регистрация</span>
    </div>

</div>

<div class="wrapper">

    <div id="field" class="field"></div>

    <div id="scopes" class="scopes">
        <div class="column">
            <div>Крестики</div>
            <div id="cross">0</div>
        </div>
        <div class="column">
            <div>Нолики</div>
            <div id="zero">0</div>
        </div>
    </div>

</div>

<div class="popup" id="popup">
    <div class="content">
        <div class="head" id="popup-head"></div>
        <div class="body" id="popup-body"></div>
        <div class="cross" id="popup-cross"></div>
    </div>
</div>

<div class="popup" id="popup-create">
    <div class="content">
        <div class="head">Введите ширину поля</div>
        <div class="body">
            <input type="number" id="width"/>
        </div>
        <div class="button" id="create">
            <span>Создать</span>
        </div>
    </div>
</div>

<div class="popup" id="popup-login">
    <div class="content">
        <div class="head">Войти</div>
        <div class="body">
            <form>
                <label for="login-input">
                    <span>Логин</span>
                    <input type="text" name="login" id="login-input" required/>
                </label>
                <label for="password">
                    <span>Пароль</span>
                    <input type="password" name="password" id="password" required/>
                </label>
            </form>
        </div>
        <div class="button" id="login-submit">
            <span>Войти</span>
        </div>
        <div class="cross" id="popup-cross-login"></div>
    </div>
</div>

<div class="popup" id="popup-registration">
    <div class="content">
        <div class="head">Зарегистрироваться</div>
        <div class="body">
            <form id="form-registration">
                <label for="name">
                    <span>Имя</span>
                    <input type="text" name="name" id="name" required/>
                </label>
                <label for="name">
                    <span>Фамилия</span>
                    <input type="text" name="last-name" id="last-name" required/>
                </label>
                <label for="login">
                    <span>Логин</span>
                    <input type="text" name="login-registration" id="login-registration" required/>
                </label>
                <label for="password-registration">
                    <span>Пароль</span>
                    <input type="password" name="password" id="password-registration" required/>
                </label>
                <label for="repeat-password">
                    <span>Повторите пароль</span>
                    <input type="password" name="repeat-password" id="repeat-password" required/>
                </label>
            </form>
        </div>
        <div class="button" id="registration-submit">
            <span>Зарегистрироваться</span>
        </div>
        <div class="cross" id="popup-cross-registration"></div>
    </div>
</div>

<script src="cross.js"></script>
</body>
</html>
