export interface RegFormValues {
  username: string;  
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