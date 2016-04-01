class ResponseDetail implements IBase
{
    Header: Header = new Header();

    ID: number;
    ResponseID: number;
    ContentType: string;
    ContentRaw: string;
    CreateDate: Date;
    Hit: number;
    Delay: number;

}