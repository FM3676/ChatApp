export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAvatarImageSet: string;
  avatarImage: string;
}

export interface Message {
  message: { text: string };
  users: [string, string];
  sender: string;
}

export interface MessageList {
  fromSelf: boolean;
  message: string;
}
