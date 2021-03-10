$(document).ready(function () {
    $(".deleteBtn").click(function () {
        $.ajax({
          method: "delete",
          url: `/company/${$(this).attr("companyId")}`,
          success: function (data) {
            if (data === "delete") {
              alert("The company was deleted");
              $(location).attr("href", "http://localhost:1000/company/home");
            }
          },
          error: function (err) {
            console.log(err);
          },
        });
      });
});