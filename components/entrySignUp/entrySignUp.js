//==================================================================================================
// ROUTER

Router.route('/entrySignUp', {
  template: 'entrySignUp',
  name: 'entrySignUp'
});
Router.route('/sign-up', {
  template: 'entrySignUp',
  name: 'signUpRoute'
});

//==================================================================================================



Template.entrySignUp.helpers({
  getSignUpMessageColor: function (){
    if (Entry.errorMessages.get('signInError')) {
      return "color: #a94442; background-color: #f2dede; border-color: #ebccd1;";
    } else {
      return "color: black;";
    }
  },
  getSignUpMessage: function (){
    if (Entry.errorMessages.get('signInError')) {
      return Entry.errorMessages.get('signInError');
    } else {
      return Session.get('defaultSignInMessage');
    }
  },
  getButtonText: function () {
    if (Entry.errorMessages.get('signInError')) {
      return Entry.errorMessages.get('signInError').message;
    } else {
      return "Sign In";
    }
  },
  getEmailStyling: function () {
    if (Entry.errorMessages.equals('email', "Email is required")) {
      return "border: 1px solid #a94442";
    } else if (Entry.errorMessages.equals('email', "Email is poorly formatted")) {
      return "border: 1px solid #f2dede";
    } else if (Entry.errorMessages.equals('email', "Email present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getPasswordStyling: function () {
    if (Entry.errorMessages.equals('password', "Password is required")) {
      return "border: 1px solid #a94442";
    } else if (Entry.errorMessages.equals('password', "Password is weak")) {
      return "border: 1px solid #f2dede";
    } else if (Entry.errorMessages.equals('password', "Password present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },

  // TODO:  this needs to change
  // confirm password is all-or-nothing
  // so it shouldn't be checking for whether the password is weak
  getConfirmPasswordStyling: function () {
    if (Entry.errorMessages.equals('confirm', "Password is required")) {
      return "border: 1px solid #a94442";
    } else if (Entry.errorMessages.equals('confirm', "Passwords do not match")) {
      return "border: 1px solid #a94442";
    } else if (Entry.errorMessages.equals('confirm', "Password is weak")) {
      return "border: 1px solid #f2dede";
    } else if (Entry.errorMessages.equals('confirm', "Passwords match")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getFullNameStyling: function () {
    if (Entry.errorMessages.equals('fullName', "Name is required")) {
      return "border: 1px solid #a94442";
    } else if (Entry.errorMessages.equals('fullName', "Name is probably not complete")) {
      return "border: 1px solid #f2dede";
    } else if (Entry.errorMessages.equals('fullName', "Name present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  }
});

Template.entrySignUp.events({
  "click #signUpPageSignInButton": function (event) {
    event.preventDefault();
    Router.go('/entrySignIn');
  },
  'change, keyup #signUpPageEmailInput': function (event, template) {
    var email = $('[name="email"]').val();

    Entry.verifyEmail(email);
    Entry.errorMessages.set('signInError', null);
  },
  'change, keyup #signUpPagePasswordInput': function (event, template) {
    var password = $('[name="password"]').val();

    Entry.verifyPassword(password);
    Entry.errorMessages.set('signInError', null);
  },
  'change, keyup #signUpPagePasswordConfirmInput': function (event, template) {

    var password = $('[name="password"]').val();
    var confirmPassword = $('[name="confirm"]').val();
    // var password = $('#signUpPagePasswordInput').val();
    // var confirmPassword = $('#signUpPagePasswordConfirmInput').val();

    Entry.verifyConfirmPassword(password, confirmPassword);
    Entry.errorMessages.set('signInError', null);
  },
  'change, keyup #signUpPageFullNameInput': function (event, template) {
    var fullName = template.$('[name="fullName"]').val();

    Entry.verifyFullName(fullName);
    Entry.errorMessages.set('signInError', null);
  },
  'click #signUpPageJoinNowButton': function (event, template) {

    Entry.signUp(
      $('#signUpPageEmailInput').val(),
      $('#signUpPagePasswordInput').val(),
      $('#signUpPagePasswordConfirmInput').val(),
      $('#signUpPageFullNameInput').val()
    );
  }
});
