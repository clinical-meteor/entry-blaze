//==========================================

Router.route('/changePassword', {
  name: "changePassword",
  template: "changePassword"
});


Template.changePassword.helpers({
  getChangePasswordMessageColor: function (){
    if (Entry.errorMessages.get('changePasswordError')) {
      return "color: #a94442; background-color: #f2dede; border-color: #ebccd1;"
    } else {
      return "color: black;"
    }
  },
  getChangePasswordMessage: function (){
    if (Entry.errorMessages.get('changePasswordError')) {
      return Entry.errorMessages.get('changePasswordError');
    } else {
      return Session.get('defaultSignInMessage');
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
  }
});

Template.changePassword.events({
  'change, keyup #changePasswordPagePasswordInput': function (event, template) {
    var password = $('[name="password"]').val();
    var confirmPassword = $('[name="confirm"]').val();

    Entry.verifyPassword(password);
    Entry.errorMessages.set('changePasswordError', null);
  },
  'change, keyup #changePasswordPagePasswordConfirmInput': function (event, template) {
    var password = $('[name="password"]').val();
    var confirmPassword = $('[name="confirm"]').val();

    Entry.verifyConfirmPassword(password, confirmPassword);
    Entry.errorMessages.set('changePasswordError', null);
  },
  "submit": function (event, template) {
    event.preventDefault();

    var oldPassword = $('[name="oldPassword"]').val();

    var password = $('[name="password"]').val();
    var confirmPassword = $('[name="confirm"]').val();

    Entry.verifyConfirmPassword(password, confirmPassword);
    Entry.errorMessages.set('changePasswordError', null);

    Accounts.changePassword(oldPassword, confirmPassword, function(error) {
      if (error) {
        console.warn(error);
        return;
      }
      console.log('Password changed!');
    });
  }
});
