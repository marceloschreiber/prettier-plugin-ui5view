const prettier = require("prettier");
const code = `
<mvc:View displayBlock="true" controllerName="com.sap.ibso.sigma.controller.Master" height="100%" 
    xmlns="sap.m" 
    xmlns:f="sap.f" 
    xmlns:mvc="sap.ui.core.mvc">
    <f:DynamicPage id="dynamicPageId" toggleHeaderOnTitleClick="false" class="master-page">
        <f:title>
            <f:DynamicPageTitle>
                <f:heading>
                    <Title text="{i18n>label.master.title}" />
                </f:heading>
            </f:DynamicPageTitle>
        </f:title>
    </f:DynamicPage>
</mvc:View>

`;
console.log(
  prettier.format(code, {
    parser: "xml",
    plugins: ["."]
  })
);
