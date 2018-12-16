class LoginCTRL {

    constructor(event) {
        this.url = "http://localhost:8084/ZtoresAPI/api/";;
        this.form = event.target;
        this.username = event.target.children[0];
        this.password = event.target.children[1];
        this.password2 = event.target.children[2];
        this.check = event.target.children[4].children[0];
        this.msg = event.target.children[5];
        this.log = view.$("#login")
        this.bg = view.$(".loginBG")
        this.user = {
            username: this.username.value,
            password: this.password.value,
            type: "user",
        }
    }

    loginHandler() {
        if (this.user.username != "" && this.user.password != "") {
            if (this.form.dataset.id == "Login")
                this.validateLog()
            else if (this.form.dataset.id == "Register")
                this.validateReg()
        } else {
            this.print("All fields must be entered");
        }
    }

    validateLog() {
        //validate the user credentials with post for security
        fetcher.API(this.url + "users/valid/", "POST", this.user)
            .then((valid) => {
                if (valid) {
                    (!this.check.checked) ? //add/remove remebr cookie
                    model.setCookie("RMMBRM", null, 0):
                        model.setCookie("RMMBRM", (this.user.username).u_capsWord());
                    model.setUser(this.user.username); //persit user
                    //Initiate LOGIN session
                    window.location.href = "SessionControl?login=true";
                } else {
                    this.print("Invalid Username or Password");
                }
            });
    }

    validateReg() {
        fetcher.API(this.url + "users/" + this.user.username, "GET")
            .then((user) => {
                if (fetcher.isEmpty(user)) { //valid username
                    if (this.user.password === this.password2.value) {
                        if (this.check.checked) {
                            //hide login
                            setTimeout(() => {
                                view.paintLogin("Login", false, this.user.username.u_capsWord());
                                this.print("WELCOME Please LOG IN!")
                            }, 700);
                            //persist new user 
                            fetcher.API(this.url + "users/", "POST", this.user)
                        } else
                            this.print("Please Accept our Terms of Service")
                    } else
                        this.print("Passwords do not match")
                } else
                    this.print("Sorry, that Username is Taken")
            })
    }

    print(txt) {
        this.msg.innerText = txt;
        view.removeClass(this.msg, "hideOP", 3000);
        view.addClass(this.msg, "fadeIn", 3000);
    }

}