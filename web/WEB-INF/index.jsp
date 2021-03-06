<%-- 
    Document   : index
    Created on : Nov 21, 2018, 8:47:52 PM
    Author     : Omar Villanueva
--%>
<%@page session="false"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,400i|Nunito:300,300i" rel="stylesheet">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <link rel="icon" href="img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="./css/style.css">
    <title>Ztore.</title>
</head>


<body class="container">
    <div id="sidebar" class="sidebar">
        <a href="#header" class="sidebar__btn active">
            <svg>
                <use xlink:href='./img/sprites.svg#icon-home'></use>
            </svg>
        </a>
        <a href="#shop" class="sidebar__btn ">
            <span class="sidebar__btn--span"></span>
            <img src="img/logow.png" alt="Ztore logo" class="sidebar__btn--logo">
        </a>
        <a href="#ztore" class="sidebar__btn">
            <span class="sidebar__btn--span"></span>
            <svg>
                <use xlink:href='img/sprites.svg#icon-client'></use>
            </svg>
        </a>

        <a id="cart_btn" href="#cart" class="sidebar__btn">
            <span class="sidebar__btn--span"></span>
            <div class="sidebar__btn--cart">
                <svg>
                    <use xlink:href='img/sprites.svg#icon-shopping-cart'></use>
                </svg>
                <span class="inCart">6</span>
            </div>
        </a>

        <a id="logout_btn" href="#header" class="sidebar__btn">
            <span class="sidebar__btn--span"></span>
            <svg>
                <use xlink:href='img/sprites.svg#icon-exit'></use>
            </svg>
        </a>
    </div>

    <header id="header" class="header">
        <img src="./img/logo.png" alt="Ztore logo" class="header__logo">
        <h3 id="username-user" class="heading-4 light slideInRight">A VIP place to call your own</h3>
        <h1 class="heading-1">ZTORE. the ultimate shopping experience</h1>
        <a href="#shop" class="btn header__btn">Browse in</a>
        <div class="header__seenon-text">Seen on</div>
        <div class="header__seenon-logos">
            <img src="./img/logo-bbc.png" alt="Seen on logo 1">
            <img src="./img/logo-forbes.png" alt="Seen on logo 2">
            <img src="./img/logo-techcrunch.png" alt="Seen on logo 3">
            <img src="./img/logo-bi.png" alt="Seen on logo 4">
        </div>
    </header>

    <div id="login" class="login animated">
    </div>

    <section class="features ">
        <div class="feature"><svg class='feature__icon'>
                <use xlink:href='img/sprite.svg#icon-global'></use>
            </svg>
            <h4 class="heading-4 --dark">Shipping World Wide</h4>
            <p class="feature__text">Doesn't matter where you are. Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Libero, quis at! we can get to you in a matter of minutes</p>
        </div>
        <div class="feature"><svg class='feature__icon'>
                <use xlink:href='img/sprite.svg#icon-trophy'></use>
            </svg>
            <h4 class="heading-4 --dark">Award Winning Store</h4>
            <p class="feature__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis tenetur ullam
                perferendis. Doesn't matter where you are. we can get to you in a matter of minutes</p>
        </div>
        <div class="feature"><svg class='feature__icon'>
                <use xlink:href='img/sprite.svg#icon-map-pin'></use>
            </svg>
            <h4 class="heading-4 --dark">Help Centers Close to You</h4>
            <p class="feature__text">Doesn't matter where you are. we can get to you in a matter of minutes Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Ipsum, sunt!</p>
        </div>
        <div class="feature"><svg class='feature__icon'>
                <use xlink:href='img/sprite.svg#icon-key'></use>
            </svg>
            <h4 class="heading-4 --dark">Your Profile is Private</h4>
            <p class="feature__text">Doesn't matter where you are. we can get to you in a matter of minutes Lorem ipsum
                dolor sit amet.</p>
        </div>
        <div class="feature"><svg class='feature__icon'>
                <use xlink:href='img/sprites.svg#icon-bitcoin'></use>
            </svg>
            <h4 class="heading-4 --dark">We Accept e-Currencies</h4>
            <p class="feature__text">Doesn't matter where you are. we can get to you in a matter of minutes</p>
        </div>
        <div class="feature"><svg class='feature__icon'>
                <use xlink:href='img/sprite.svg#icon-lock'></use>
            </svg>
            <h4 class="heading-4 --dark">Secure Payments</h4>
            <p class="feature__text">Doesn't matter where you are. we can get to you in a matter of minutes</p>
        </div>
    </section>

    <div id="shop" class="promo__pictures revealOnScroll ">
        <figure class="promo__figure--2"></figure>
    </div>

    <div class="promo__content ">
        <h3 class="heading-3 mb-sm">Ztore's new winter collection!</h3>
        <h2 class="heading-2 mb-md">&ldquo;Discounts that will upset Santa!&rdquo;</h2>
        <p class="promo__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore quis ipsum quisquam
            repudiandae dolor deleniti iusto corporis velit! Corporis, eaque? </p>
        <button class="btn">view the deals</button>
    </div>


    <section id="ztore" class="store ">
    </section>

    <section id="cart" class="cart ">
    </section>

    <aside class="checkout ">
        <h2 class="heading-3"> Your Cart </h2>

        <form action="" method="post" class="checkout__form">
            <p class="checkout__form--date"> <span> Date:</span><span> Mon 11 Sep 2018 - 04:35 PM</span></p>
            <p class="checkout__form--subtotal"> <span> Subtotal:</span><span>$0.00</span></p>
            <p class="checkout__form--GST"> <span> GST 5%:</span><span>$0.00</span></p>
            <p class="checkout__form--shipping"> <span> Shipping:</span><span> $0.00</span></p>
            <p class="checkout__form--discount"> <span> Discount 10%:</span><span> $0.00</span></p>


            <h3 class="checkout__form--total">Total:
                <span class="total-price">$0.00</span>
            </h3>

            <div class="orderMsg primary orderMsg hideOP" style="text-align: center; font-weight: 600; transition:all .2s;"> Your Cart is Empty</div>
            <div class="checkout__form--btn">
                <a type="submit" id="checkoutBtn" class="checkout__form--btn__link" href="#cart">
                    <svg class='checkout__form--btn__icon'>
                        <use xlink:href='./img/sprites.svg#icon-currency'></use>
                    </svg>
                    <span class="checkout__form--btn__text">Check Out</span>
                </a>
            </div>
        </form>
    </aside>

    <footer class="footer ">
        <ul class="nav">
            <li class="nav__item"><a href="#" class="nav__link">More about Ztore</a></li>
            <li class="nav__item"><a href="#" class="nav__link">Become a partner</a></li>
            <li class="nav__item"><a href="#" class="nav__link">Become an investor</a></li>
            <li class="nav__item"><a href="#" class="nav__link">Come work with us</a></li>
            <li class="nav__item"><a href="#" class="nav__link">Contact us</a></li>
        </ul>
        <p class="copyright light">
            &copy; Copyright 2019 by <a href="http://www.DigitalVilla.co" class="light"> Digital Villa.</a> to learn
            more visit us at
        </p>
    </footer>

    <div class="adminPanel animated">
        <div class="adminPanel__header">
            <div>
                <h3 id="username-admin" class="heading-4">Welcome back Villa</h3>
                <h1 class="heading-1 primary ">ZTORE. Admin Panel</h1>
            </div>
            <div class="control">
                <button class="btn tableBtn" onclick="fillTable(false,this)">Items</button>
                <button class="btn tableBtn active" onclick="fillTable(true,this)">Users</button>
            </div>
        </div>
        <button class="exit__btn" onclick="control.logOutHandler()">
            <svg class='exit__btn--icon'>
                <use xlink:href='./img/sprites.svg#icon-exit'></use>
            </svg>
        </button>

        <div id="adminContainer">
            <div class="table-responsive-vertical ">
                <!-- Table starts here -->
                <table id="table" class="table table-hover  table-mc-light-blue shadow-z-1">

                </table>
                <div class="newItem">
                    <div class="newItem__input animated"></div>
                    <button class="newItem__Btn ad__Btn " onclick="addUser(this.parentNode.previousElementSibling)">
                        <svg class='ad__Btn--icon '>
                            <use xlink:href='./img/sprites.svg#icon-plus-circle'></use>
                        </svg> 
                    </button>
                </div>
                <h3 id="adminMsg" class="heading-2 animated primary hideOP" style="text-align: center; margin-top: 1rem; font-size: 1.8rem;"></h3>
            </div>
        </div>
    </div>

    <div class="invoice animated fadeIn" style="display: none">
       
    </div>



    <!-- //Model -->
    <script type="text/javascript" src="./js/model/fetch.js"></script>
    <script type="text/javascript" src="./js/model/model.js"></script>
    <!-- //view -->
    <script type="text/javascript" src="./js/view/myViews.js"></script>
    <script type="text/javascript" src="./js/view/view.js"></script>
    <!-- //controller-->
    <script type="text/javascript" src="./js/controller/AdminCTRL.js"></script>
    <script type="text/javascript" src="./js/controller/LoginCTRL.js"></script>
    <script type="text/javascript" src="./js/controller/ZtoreCTRL.js"></script>
    <script type="text/javascript" src="./js/controller/controller.js"></script>

    <script type="text/javascript" src="./js/main.js"></script>
</body>


</html>