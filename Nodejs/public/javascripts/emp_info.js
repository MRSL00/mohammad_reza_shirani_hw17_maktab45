$(document).ready(function () {
  $(".up").click(function (e) {
    e.preventDefault();
    const myValue = $("input[name=admin]").val();
    const isTrueval = myValue === "true";
    let Info = {
      first_name: $("input[name=first_name]").val(),
      last_name: $("input[name=last_name]").val(),
      ntlcode: $("input[name=ntlcode]").val(),
      gender: $("input[name=gender]").val(),
      admin: isTrueval,
      dob: $("input[name=dob]").val(),
      company: $("input[name=company]").val(),
    };
    console.log(Info)
    console.log(`/employee/${$(".up").attr("employeeId")}`)
    $.ajax({
      method: "post",
      url: `/employee/${$(".up").attr("employeeId")}`,
      data: Info,
      success: function (data) {
        console.log(data)
        if (data === "update") {
          alert("iformation updated");
          $(location).attr(
            "href",
            "http://localhost:1000/company/" + $("input[name=company]").val()
          );
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
