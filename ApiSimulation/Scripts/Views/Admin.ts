﻿
let viewModel = new Models.ViewModel.AdminViewModel();

$(function ()
{
    viewModel.Load();
    ko.applyBindings(viewModel);

    $("#btn-new-operation").click(() => viewModel.AddNew());
    $("#iframe-modal").on("load", () => { $("#iframe-loading").hide(); });
});

function PushNotification()
{
    $("#iframe-modal").attr("src", "/Admin/NotificationList");
    $("#iframe-loading").show();

    $("#modal-global .modal-title").html("<b>Push Notification</b>");
    $("#modal-global").modal('toggle');
}

function TextAreaChangeSize(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

function AllTextAreaSizeFix()
{
    setTimeout(function () {
        $("textarea").each(function (indx, element) {
            TextAreaChangeSize(element);
        });
    }, 500);
    
}
