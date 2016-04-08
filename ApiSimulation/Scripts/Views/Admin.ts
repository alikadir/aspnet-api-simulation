let viewModel: IViewModel;


$(function ()
{
    viewModel = new ViewModel();

    viewModel.Load();
    ko.applyBindings(viewModel);

    $("#btn-new-operation").click(() => viewModel.AddNew());

});

