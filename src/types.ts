type EmployeeProfileType = {
  id: number;
  public: {
    first_name: string;
    last_name: string;
    user_name: string;
    password: string;
    gender: string;
    email: string;
    company_phone_number: string;
    office: string;
    department: string;
    position: string;
    team: string;
    linked_in: string;
    birthday: string;
    phone_number: string;
  };

  hrInformation: {
    status: string;
    employment_type: string;
    occupation_type: string;
    supervisor: string;
    hire_date: string;
    contract_end: string;
    length_of_probation: string;
    notice_period: string;
    weekly_hours: string;
    cost_center: string;
    nationality: string;
    resident_permit_valid_until: string;
  };

  personalData: {
    street_and_house_number: string;
    postal_code: string;
    city: string;
    private_email: string;
    private_phone: string;
  };

  payrollInformation: {
    salary_type: string;
    tax_id: string;
    social_security_number: string;
    wage_tax_class: string;
    children: string;
    child_allowance: string;
    marital_status: string;
    religious_denomination: string;
    type_of_health_insurance: string;
    name_of_health_insurance: string;
    main_or_secondary_occupation: string;
    wage_tax_allowance: string;
  };

  bankDetails: {
    holder_of_bank_account: string;
    iban: string;
    bic: string;
  };

  emergencyContact: {
    emergency_name: string;
    emergency_number: string;
  };

  employeeEquipment: {
    notebook: string;
    cell_phone: string;
  };

  development: {
    training: string;
  };
};

type EmployeeProfileUnformatedType = {
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
  gender: string;
  email: string;
  company_phone_number: string;
  office: string;
  department: string;
  position: string;
  team: string;
  linked_in: string;
  birthday: string;
  phone_number: string;
  status: string;
  employment_type: string;
  occupation_type: string;
  supervisor: string;
  hire_date: string;
  contract_end: string;
  length_of_probation: string;
  notice_period: string;
  weekly_hours: string;
  cost_center: string;
  nationality: string;
  resident_permit_valid_until: string;
  street_and_house_number: string;
  postal_code: string;
  city: string;
  private_email: string;
  private_phone: string;
  salary_type: string;
  tax_id: string;
  social_security_number: string;
  wage_tax_class: string;
  children: string;
  child_allowance: string;
  marital_status: string;
  religious_denomination: string;
  type_of_health_insurance: string;
  name_of_health_insurance: string;
  main_or_secondary_occupation: string;
  wage_tax_allowance: string;
  holder_of_bank_account: string;
  iban: string;
  bic: string;
  emergency_name: string;
  emergency_number: string;
  notebook: string;
  cell_phone: string;
  training: string;
};

interface ObjectType {
  [key: string]: string | number | object;
}

export { EmployeeProfileType, ObjectType, EmployeeProfileUnformatedType };
