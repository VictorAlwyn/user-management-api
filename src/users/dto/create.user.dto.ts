export interface CreateUserDto {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  address?: string;
  postcode?: string;
  phoneNumber?: string;
}
