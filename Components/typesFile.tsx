export type Task = {
  name: string;
  completed: boolean;
  id: string;
};

export type List = {
  id: string;
  name: string;
  tasks: Task[];
};
