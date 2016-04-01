let ViewModelClassic: Array<Response>;


$(() =>
{

    ResponseModelServerGet(() =>
    {
        ViewModelObservable = ClassicObjectToObservable(ViewModelClassic);
        ko.applyBindings(ViewModelObservable);
    });
       
});

//#region Business Logic

// #region Response
let ResponseModelServerGet = (callBackFunc: () => void): void =>
{
    $.getJSON("/Operation/GetResponseList", (result) =>
    {
        ResponseModelFill(result);
        callBackFunc();
    });
};

let ResponseModelFill = (responseJson: Array<Response>): void =>
{
    ViewModelClassic = responseJson;
        
    ViewModelClassic.forEach((item) =>
    {
        item.Header = new Header();
        item.Detail = new Array<ResponseDetail>();
    });
}
//#endregion

// #region ResponseDetail
let ResponseDetailModelServerGet = (responseId: number, callBackFunc: () => void): void =>
{
    $.getJSON("/Operation/GetResponseDetailListByParentID", { responseId: responseId }, (result) =>
    {
        ResponseDetailModelFill(result);
        callBackFunc();
    });
};

let ResponseDetailModelFill = (responseDetailJson: Array<ResponseDetail>): void =>
{
    ViewModelClassic.forEach((item) =>
    {
        responseDetailJson.forEach((detailItem) =>
        {
            if (item.ID == detailItem.ResponseID)
            {
                if (!detailItem.Header)
                    detailItem.Header = new Header();

                item.Detail.push(detailItem);
            }
        });
    });
}
//#endregion


let ResponseDetailClick = (responseId: number) =>
{


   // $("[data-id=" + responseId + "] > .panel-body").slideToggle();

    //ViewModelClassic.forEach((item) =>
    //{
    //    if (item.ID == responseId)
    //    {
    //        item.Detail.length
    //    }
    //});

    ResponseDetailModelServerGet(responseId, () => { UpdateObserveble(ViewModelObservable, ViewModelClassic) });
}


//#endregion