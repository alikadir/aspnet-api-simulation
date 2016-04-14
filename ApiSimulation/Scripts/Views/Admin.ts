
let viewModel = new Models.ViewModel.AdminViewModel();

$(function ()
{
    viewModel.Load();
    ko.applyBindings(viewModel);

    $("#btn-new-operation").click(() => viewModel.AddNew());
});

