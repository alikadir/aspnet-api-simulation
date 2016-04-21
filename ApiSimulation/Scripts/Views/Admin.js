var viewModel = new Models.ViewModel.AdminViewModel();
$(function () {
    viewModel.Load();
    ko.applyBindings(viewModel);
    $("#btn-new-operation").click(function () { return viewModel.AddNew(); });
    $("#iframe-log-detail").on("load", function () { $("#iframe-loading").hide(); });
});
//# sourceMappingURL=Admin.js.map