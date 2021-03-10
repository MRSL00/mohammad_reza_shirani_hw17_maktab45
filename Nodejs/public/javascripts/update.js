$(document).ready(function () {
    $(".up").click(function (e) {
        e.preventDefault();
        let Info = {
            name: $("input[name=name]").val(),
            rgscode: $("input[name=rgscode]").val(),
            city: $("input[name=city]").val(),
            state: $("input[name=state]").val(),
            CreatedAt: $("input[name=CreatedAt]").val(),
            phone: $("input[name=phone]").val(),
          };
        $.ajax({
          method: "post",
          url: `/company/${$(this).attr("companyId")}`,
          data: Info,
          success: function (data) {
            if (data === "update") {
              alert("iformation updated");
              $(location).attr("href", "http://localhost:1000/company/home");
            }
          },
          error: function (err) {
            console.log(err);
          },
        });
      });
});