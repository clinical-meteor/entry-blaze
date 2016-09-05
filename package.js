Package.describe({
  name: 'clinical:entry-blaze',
  version: '1.6.0',
  summary: 'SignIn, SignUp, and ForgotPassword methods used in Clinical apps.',
  git: 'https://github.com/clinical-meteor/entry-blaze',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'clinical:entry@1.6.0',
    'meteor-platform',
    'templating',
    'clinical:router@2.0.17',
    'grove:less@0.1.1',
    'session'
  ]);

  api.imply('clinical:entry');

  api.addFiles([
    'components/entryPages.js',
    'components/entryPages.less',

    'components/entrySignIn/entrySignIn.html',
    'components/entrySignIn/entrySignIn.js',
    'components/entrySignIn/entrySignIn.less',

    'components/entrySignUp/entrySignUp.html',
    'components/entrySignUp/entrySignUp.js',
    'components/entrySignUp/entrySignUp.less',

    'components/forgotPassword/forgotPassword.html',
    'components/forgotPassword/forgotPassword.js',
    'components/forgotPassword/forgotPassword.less',

    'components/changePassword/changePassword.html',
    'components/changePassword/changePassword.js',
    'components/changePassword/changePassword.less',

  ], ['client']);
});
