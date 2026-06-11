export interface message {
  id: string;

  content: string;

  createdAt: string;

  userId: string;

  roomId: string;

  user: {
    id: string;
    username: string;
  };
}
