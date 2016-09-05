
// REFACTOR:  Move to ActiveRecord object
Session.set("defaultSignInMessage", "Improve your clinical practice with checklists.");
Session.setDefault("redirectUri", false);

//==================================================================================================
// ROUTER

Router.route('/entrySignIn', {
  template: 'entrySignIn',
  name: 'entrySignIn'
});
Router.route('/sign-in', {
  template: 'entrySignIn',
  name: 'signInRoute'
});

//TODO: deprecate this sooner rather than later
//TODO: update the FHIR conformance statement at /metadata
Router.route('/oauth', {
  template: 'entrySignIn',
  name: 'oauthSignIn',
  onAfterAction: function (){
    //console.log('/oauth params', this.params.query);
    Session.set('urlParams', this.params.query);
    Session.set('responseType', this.params.query.response_type);
    Session.set('clientId', this.params.query.client_id);
    Session.set('redirectUri', this.params.query.redirect_uri);
  }
});
Router.route('/oauth/authorize', {
  template: 'entrySignIn',
  name: 'oauthAuthorizeSignIn',
  onAfterAction: function (){
    //console.log('/oauth/authorize params', this.params.query);
    Session.set('urlParams', this.params.query);
    Session.set('responseType', this.params.query.response_type);
    Session.set('clientId', this.params.query.client_id);
    Session.set('redirectUri', this.params.query.redirect_uri);
  }
});


//==================================================================================================
// COMPONENT OUTPUTS




Template.entrySignIn.helpers({
  getSignInMessageColor: function (){
    if (Entry.errorMessages.get('signInError')) {
      return "color: #a94442; background-color: #f2dede; border-color: #ebccd1;"
    } else {
      return "color: black;"
    }
  },
  getSignInMessage: function (){
    if (Entry.errorMessages.get('signInError')) {
      return Entry.errorMessages.get('signInError');
    } else {
      return Session.get('defaultSignInMessage');
    }
  },
  getButtonText: function () {
    return "Sign In";
    // if (Entry.errorMessages.get('signInError')){
    //   return Entry.errorMessages.get('signInError');
    // } else {
    //   return "Sign In";
    // }
  },
  getEmailValidationStyling: function () {
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
  getPasswordValidationStyling: function () {
    if (Entry.errorMessages.equals('password', "Password is required")) {
      return "border: 1px solid #a94442";
    } else if (Entry.errorMessages.equals('password', "Password is weak")) {
      return "border: 1px solid #f2dede";
    } else if (Entry.errorMessages.equals('password', "Password present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  }
});


//==================================================================================================
// COMPONENT OUTPUTS

Template.entrySignIn.events({
  'click #logoutButton': function () {
    Meteor.logout();
  },
  'click #forgotPasswordButton': function (event) {
    event.preventDefault();
    Router.go('/forgotPassword');
  },
  "click #needAnAccountButton": function (event) {
    event.preventDefault();
    Router.go('/entrySignUp');
  },
  'keyup input[name="email"]': function (event, template) {
    var email = $('input[name="email"]').val();

    Entry.verifyEmail(email);
    Entry.errorMessages.set('signInError', null);
  },
  'change input[name="email"]': function (event, template) {
    var email = $('input[name="email"]').val();

    Entry.verifyEmail(email);
    Entry.errorMessages.set('signInError', null);
  },
  'keyup #signInPagePasswordInput': function (event, template) {
    var password = $('input[name="password"]').val();

    Entry.verifyPassword(password);
    Entry.errorMessages.set('signInError', null);
  },
  'change #signInPagePasswordInput': function (event, template) {
    var password = $('input[name="password"]').val();

    Entry.verifyPassword(password);
    Entry.errorMessages.set('signInError', null);
  },
  // 'submit': function (event, template) {
  //   event.preventDefault();
  //   var emailValue = template.$('[name=email]').val();
  //   var passwordValue = template.$('[name=password]').val();
  //
  //   Entry.signIn(emailValue, passwordValue);
  // },
  'click #signInToAppButton': function (event, template){
    console.log('click #signInToAppButton');
    // var emailValue = template.$('[name=email]').val();
    // var passwordValue = template.$('[name=password]').val();
    var emailValue = template.$('#signInPageEmailInput').val();
    var passwordValue = template.$('#signInPagePasswordInput').val();

    console.log('responseType', Session.get('responseType'));
    console.log('clientId', Session.get('clientId'));
    console.log('redirectUri', Session.get('redirectUri'));


    Entry.signIn(emailValue, passwordValue, Session.get('redirectUri'));

    event.preventDefault();
  }
});



//==================================================================================================
