
let viewModel = new Models.ViewModel.AdminViewModel();

$(function ()
{
    viewModel.Load();
    ko.applyBindings(viewModel);

    ko.validation.init();

    $("#btn-new-operation").click(() => viewModel.AddNew());

});

