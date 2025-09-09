export interface RegFormValues {
  username: string;  
  email: string;
  password: string;
}

export interface LogFormValues { 
  email: string;
  password: string;
}

export interface ChangePasswordFormValues {
  current: string;  
  new: string;
  repeat: string;
}
export interface NameField {
label: string
name: string
type?: string
placeholder?: string
icon: string
}

export interface FromInputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  icon: string
}

export interface InputPswProps {
  isFor: string,
  label: string
}

export interface LogFormValues {
email: string,
password: string,
}

export interface UserPayload {
  token: string,
        username: string,
        useremail: string
}