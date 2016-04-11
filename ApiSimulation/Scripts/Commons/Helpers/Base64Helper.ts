namespace Commons.Helpers
{
    export class Base64Helper
    {

        public static detectContentType = (base64: string): any =>
        {
            return base64.substring(base64.indexOf(Commons.Constants.Base64Constant.Base64StartTag) + Commons.Constants.Base64Constant.Base64StartTag.length, base64.indexOf(Commons.Constants.Base64Constant.Base64EndTag));
        }

        public static clearBase64 = (base64: string, contentType: string): any =>
        {
            let combine = Commons.Constants.Base64Constant.Base64StartTag + contentType + Commons.Constants.Base64Constant.Base64EndTag.replace("base64,", "");
            return base64.substring(base64.indexOf(combine) + combine.length);
        }
    }

}