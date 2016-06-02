var viewModel = new Models.ViewModel.AdminViewModel();
$(function () {
    viewModel.Load();
    ko.applyBindings(viewModel);
    $("#btn-new-operation").click(function () { return viewModel.AddNew(); });
    $("#iframe-modal").on("load", function () { $("#iframe-loading").hide(); });
});
function PushNotification() {
    $("#iframe-modal").attr("src", "/Admin/NotificationList");
    $("#iframe-loading").show();
    $("#modal-global .modal-title").html("<b>Push Notification</b>");
    $("#modal-global").modal('toggle');
}
//# sourceMappingURL=Admin.js.map