$(document).ready(() => {
  $("input[name=company]").val(window.location.href.substr(35));

  $("button").click(function (e) {
    const myValue = $("input[name=admin]").val();
    const isTrueval = myValue === "true";
    e.preventDefault();
    let Info = {
      first_name: $("input[name=first_name]").val(),
      last_name: $("input[name=last_name]").val(),
      ntlcode: $("input[name=ntlcode]").val(),
      gender: $("input[name=gender]").val(),
      admin: isTrueval,
      dob: $("input[name=dob]").val(),
      company: $("input[name=company]").val(),
    };
    $.ajax({
      method: "put",
      url: "/employee",
      data: Info,
      success: function (data) {
        console.log(data);
        if (data === "add") {
          alert("employee added");
          $(location).attr(
            "href",
            `http://localhost:1000/company/${window.location.href.substr(35)}`
          );
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
