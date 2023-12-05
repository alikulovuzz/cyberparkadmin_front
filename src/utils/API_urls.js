export const host = process.env.NODE_ENV=="production"?"http://localhost:8081":"http://localhost:8081";
// admin 
export const user_signin = "/user/signin"
export const admin_me = "/user/me"

export const company_signin = "company_form/signin"

//docker run -p 3000:3000 -d azamat/reactfront:test1
// me 
export const company_me = "company_form/me"
export const company_list = "/company_form/list"

// /audit/v2
export const audit_v2 = "audit/v2"
export const getlist_v2 = "/audit/getlist_v2"

export const upload = "upload"

export const release_product = "/audit/release_product"
export const release_republic = "/audit/release_republic"
export const residental_payroll = "/audit/residental_payroll"
export const invesment = "/audit/invesment"
export const import_funds = "/audit/import_funds"