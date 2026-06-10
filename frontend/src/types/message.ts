export interface Message {
  id: string;

  content: string;

  roomId: string;

  userId: string;

  createdAt: string;

  user: {
    id: string;
    username: string;
  };
}