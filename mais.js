window.addEventListener("DOMContentLoaded", function () {
    // get the form elements defined in your form HTML above
  
    var form = document.getElementById("my-form");
    // var button = document.getElementById("my-form-button");
    var status = document.getElementById("status");
  
    // Success and Error functions for after the form is submitted
  
    function good() {
      form.reset();
      status.classList.add("good");
      status.innerHTML = "Mérci nous allons vous envoyer un message dans les prochaine 24h !";
    }
  
    function no() {
      status.classList.add("no");
      status.innerHTML = "Oops! Un Problème est survenue !";
    }
  
    // handle the form submission event
  
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, good, no);
    });
  });
  
  // helper function for sending an AJAX request
  
  function ajax(method, url, data, good, no) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        good(xhr.response, xhr.responseType);
      } else {
        no(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
  