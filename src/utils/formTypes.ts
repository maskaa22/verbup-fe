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
  label: string,
  placeholder: string
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

export interface progressWord {
                id: number,
                status: string,
                word: {
                  id: number,
                    basic: string
                }
}
export interface userProgress {
  progressPs: progressWord[],
  progressPp: progressWord[]
}

export interface authState {
  user: {
    name: string | null;
    email: string | null;
  };
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  isError: boolean;
}

export interface loginResponce {
  accessToken: string;
  message: string;
  user: {
    avatar: null;
    id: string;
    email: string;
    username: string;
  }
}

export interface getProgressResponce {
  data: {
  progressPs: progressWord[],
  progressPp: progressWord[]
}
}