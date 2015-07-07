'use strict';

angular.module('rmail-admin')
  .value(
    'EMAIL_REGEXP',
    new RegExp("^\\w+([\.-]?\\w+)*@\\w+([\\.-]?\w+)*(\\.\\w{1,500})")
  );