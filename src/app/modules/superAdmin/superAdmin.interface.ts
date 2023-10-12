type IName = {
  firstName: string;
  lastName: string;
};

export type ISuperAdmin = {
  name: IName;
  email: string;
  contactNo?: string;
  profileImage?: string;
};
