class Response implements IBase
{
    Header: Header;

    ID: number;
    Url: string; 
    CreateDate: Date;
    Hit: number;

    Detail: Array<ResponseDetail>;

}