import { EmployeeProfileType } from "./types";

const employeeProfileBlank: EmployeeProfileType = {
  id: 0,
  public: {
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    gender: "",
    email: "",
    company_phone_number: "",
    office: "",
    department: "",
    position: "",
    team: "",
    linked_in: "",
    birthday: "",
    phone_number: "",
  },

  hrInformation: {
    status: "",
    employment_type: "",
    occupation_type: "",
    supervisor: "",
    hire_date: "",
    contract_end: "",
    length_of_probation: "",
    notice_period: "",
    weekly_hours: "",
    cost_center: "",
    nationality: "",
    resident_permit_valid_until: "",
  },

  personalData: {
    street_and_house_number: "",
    postal_code: "",
    city: "",
    private_email: "",
    private_phone: "",
  },

  payrollInformation: {
    salary_type: "",
    tax_id: "",
    social_security_number: "",
    wage_tax_class: "",
    children: "",
    child_allowance: "",
    marital_status: "",
    religious_denomination: "",
    type_of_health_insurance: "",
    name_of_health_insurance: "",
    main_or_secondary_occupation: "",
    wage_tax_allowance: "",
  },

  bankDetails: {
    holder_of_bank_account: "",
    iban: "",
    bic: "",
  },

  emergencyContact: {
    emergency_name: "",
    emergency_number: "",
  },

  employeeEquipment: {
    notebook: "",
    cell_phone: "",
  },

  development: {
    training: "",
  },
};

export { employeeProfileBlank };
