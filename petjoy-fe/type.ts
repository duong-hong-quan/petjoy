export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface AppActionResultDto {
  data: any;
  message: string[];
  isSuccess: boolean;
}
export interface User {
  id: number;

  email: string;

  password: string;

  name: string;

  profilePicture: string;
  isAdmin: boolean;
  isBanned: boolean;
}

export interface Pet {
  id: number;

  name: string;

  dob: Date;

  breed: string;

  profilePicture: string;

  ownerId?: number;

  petTypeId: number;

  filterPetTypeId: number;

  isHiringPetTypeId: number;

  owner: User;

  likes: Like[];

  petType: PetType;

  filterPetType: PetType;

  isHiringPetType: PetType;

  matchs: Match[];
}
export interface Like {
  id: number;
  originPetId: number;
  likePetId: number;
  isLike: boolean;
  originPet: Pet;

  likePet: Pet;
}

export interface Match {
  id: number;

  userId: number;
  matchUserId: number;

  petId: number;

  user: User;

  matchUser: User;

  pet: Pet;

  matchDate: Date;
}
export interface Payment {
  id: number;

  userId: number;
  paymentPackageId: number;

  user: User;

  paymentPackage: PaymentPackage;

  amount: number;

  paymentDate: Date;
  status: boolean;
}
export interface PaymentPackage {
  id: number;

  name: string;

  price: number;

  description: string;

  duration: number; // Duration in days
}

export interface PetType {
  id: number;

  name: string;

  pets: Pet[];

  hiringPetTypes: Pet[];

  filterPetTypes: Pet[];
}
export interface Room {
  id: number;
  petOneId: number;
  petTwoId: number;
  createdAt: string;
  petOne: Pet;
  petTwo: Pet;
}
export interface Message {
  text: string;
  userId: number;
  timestamp: number;
  room: number;
}
export interface Category {
  id: number;

  name: string;

  blogs: Blog[];
}

export interface Blog {
  id: number;

  blogName: string;

  blogImg: string;

  content: string;

  userId: number;

  categoryId: number;
  user: User;
  category: Category;
}
export interface BanReport {
  id: number;

  reason: string;

  reporterId: number;

  reportedId: number;

  isResolved: boolean;

  resolvedAt: Date;

  createdAt: Date;

  reporter: User;

  reported: User;
}
