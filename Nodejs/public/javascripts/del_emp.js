$(document).ready(function () {
  $(".del_emp").click(function () {
    $.ajax({
      method: "delete",
      url: `/employee/${$(this).attr("employeeId")}`,
      success: function (data) {
        if (data === "delete") {
          alert("Employee removed");
          $(location).attr(
            "href",
            `http://localhost:1000/company/${window.location.href.substr(30)}`
          );
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
