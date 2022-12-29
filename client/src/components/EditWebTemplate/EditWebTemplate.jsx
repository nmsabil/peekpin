import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../../firebase";
import SuccessBlock from "../SuccessBlock/SuccessBlock";
import Loader from "../Loader/Loader";

function EditWebTemplate(props) {
  const [value, setValue] = useState("");
  const [which, setWhich] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "Email Templates"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (
          props.version === "Pro Plus 2016" &&
          doc.data().software === "Pro Plus 2016"
        ) {
          setWhich(doc);
          setValue(doc.data().html);
        } else if (
          props.version === "Pro Plus 2019" &&
          doc.data().software === "Pro Plus 2019"
        ) {
          setWhich(doc);
          setValue(doc.data().html);
        } else if (
          props.version === "Pro Plus 2021" &&
          doc.data().software === "Pro Plus 2021"
        ) {
          setWhich(doc);
          setValue(doc.data().html);
        } else if (
          props.version === "HB 2021" &&
          doc.data().software === "HB 2021"
        ) {
          setWhich(doc);
          setValue(doc.data().html);
        }
      });
    });
    return () => unsub();
  }, [props.version]);

  const handleSubmit = async () => {
    const refemail = doc(db, "Email Templates", which.id);
    await updateDoc(refemail, {
      html: value,
    }).then(setUpdated(true));
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const data = `
  
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
  <style type="text/css">
#outlook a {
	padding:0;
}
.ExternalClass {
	width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
	line-height:100%;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
ol li{
  Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:23px;color:#333333;font-size:15px
}
ol li a{
     color: #ED8E20;
     text-decoration: none;
}
ol li a:hover{
     color: #ED8E20;
     text-decoration: underline;
      color: #ED8E20;
}
td .download-steps h2{
  margin-bottom: 10px;line-height:24px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:left
}
td .download-steps h1{
  margin-bottom: 10px;line-height:24px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:left
}
[data-ogsb] .es-button {
	border-width:0!important;
	padding:15px 30px 15px 30px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:32px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:32px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } .h-auto { height:auto!important } }
</style>
 
  <div class="es-wrapper-color"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#eeeeee"></v:fill>
			</v:background>
		<![endif]-->
   
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr style="border-collapse:collapse"></tr>
         <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0">
           <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center">
             <tr style="border-collapse:collapse">
              <td align="left" style="Margin:0;padding-top:35px;padding-bottom:35px;padding-left:35px;padding-right:35px">
               <table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:530px">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="left" style="padding:0;Margin:0;font-size:0px"><a href="softwarepin.com" ><img class="adapt-img" src="https://ioghrw.stripocdn.email/content/guids/2c12906f-8b16-468f-bc38-07c40af7df18/images/logotransperant.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="252"></a></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0">
           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr style="border-collapse:collapse">
              <td style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:35px;padding-right:35px;background-color:#f7f7f7" bgcolor="#f7f7f7" align="left">
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td class="download-steps" valign="top" align="center" style="padding:0;Margin:0;width:530px">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px"><h3 style="Margin-bottom: 10px;line-height:19px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:16px;font-style:normal;font-weight:bold;color:#333333;text-align:left">Hello Sabil</h3><h3 style="Margin:0;line-height:19px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:16px;font-style:normal;font-weight:bold;color:#333333;text-align:left"></h3></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="left" style="padding:0;Margin:0;padding-bottom:15px"><h2 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#333333;text-align:left"><strong>Office ${props.version}</strong></h2></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="left" bgcolor="#044767" style="padding:15px;Margin:0"><h2 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:white"><strong>Product key:</strong></h2><h2 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:white"><strong>F3PNT-V9WH4-BHYTC-XD3TJ-2G34X</strong></h2></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0">
                        ${value}
                       </td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr style="border-collapse:collapse">
              <td align="left" style="Margin:0;padding-top:15px;padding-bottom:25px;padding-left:35px;padding-right:35px">
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;padding-top:20px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333">If you have any questions or inquiries, reply to this email or send an email to&nbsp;<a href="mailto:support@softwarepin.com" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ED8E20;font-size:20px">support@softwarepin.com</a>&nbsp;and we’ll get back to you shortly.</h3></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr style="border-collapse:collapse"></tr>
         <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0">
           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#1b9ba3;width:600px" cellspacing="0" cellpadding="0" bgcolor="#1b9ba3" align="center">
             <tr style="border-collapse:collapse">
              <td align="left" style="Margin:0;padding-top:35px;padding-bottom:35px;padding-left:35px;padding-right:35px">
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:24px;font-style:normal;font-weight:bold;color:#ffffff"><strong>Use Code <span style="color:#ed8e20"></span><span style="color:#ed8e20"></span>DND202 to get 15% off future purchases or contact us to request a quote for bulk purchases.</strong></h2></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0">
           <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr style="border-collapse:collapse">
              <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:35px;padding-right:35px">
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">SoftwarePin<br><a href="mailto:support@softwarepin.com" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px">support@softwarepin.com</a><br><a style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px" href="www.softwarePin.com">www.softwarePin.com</a></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       </td>
     </tr>
   </table>
  </div>`;

  return (
    <div>
      <div className='title-add d-flex flex-column mt-5'>
        <h1 className='mb-4' style={{ fontSize: "1.5rem" }}>
          {props.title}
        </h1>
        {updated ? (
          <Alert variant='success'>Success Template updated</Alert>
        ) : (
          ""
        )}
      </div>
      {value ? (
        <div>
          <ReactQuill
            className='bg-white'
            theme='snow'
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
          <Button onClick={handleSubmit} variant='primary w-100' type='submit'>
            Update
          </Button>

          <div
            style={{ height: "auto" }}
            className='mt-5 mb-5 templateStyle d-flex justify-content-center align-items-center flex-direction-column flex-column '
          >
            <p>Success preview</p>
            <SuccessBlock
              software={props.version}
              productKey='F3PNT-V9WH4-BHYTC-XD3TJ-2G34X'
              email='example@softwarepin.com'
              value={value}
            />

            <p className='mt-5'>Email preview</p>
            <div dangerouslySetInnerHTML={{ __html: data }}></div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default EditWebTemplate;
