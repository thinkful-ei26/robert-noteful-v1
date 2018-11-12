/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();

  api.search({}, response => {
    store.notes = response;
    console.log(store.currentSearchTerm);
    noteful.render();
  });

});