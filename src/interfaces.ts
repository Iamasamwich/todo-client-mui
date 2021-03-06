export interface IminTodo {
  id: number;
  todo: string;
  dueDate: string;
}

export interface Istep {
  id: number;
  step: string;
  done: boolean;
  todoId: number;
};

export interface Itodo extends IminTodo {
  done: boolean;
  steps: Istep[];
};

export interface Ires {
  status: number;
  message: string;
};

export interface IstepRes extends Ires {
  step: Istep;
};

export interface ItodosRes extends Ires {
  todos: Itodo[];
};

export interface ItodoRes extends Ires {
  todo: Itodo;
};

export interface IupdateUserRes extends Ires{
  user: {
    name: string;
    email: string;
  };
};

export interface IupdatePwordBody {
  pword: string;
  newPword: string;
};

export interface IloginBody {
  email: string;
  pword: string;
}

export interface IaddUserBody {
  name: string;
  email: string;
  pword: string;
};

export interface IupdateUserBody {
  name: string;
  email: string;
  pword: string;
};

export interface IaddStepBody {
  todoId: number;
  step: string;
  done: boolean;
};

export interface IaddTodoBody {
  todo: string;
  dueDate: string;
};

export interface IupdateStepBody {
  stepId: number;
  todoId: number;
  body: {
    step: string;
    done: boolean;
  };
};

export interface IremoveTodo {
  todoId: number;
};

export interface IremoveStep extends IremoveTodo {
  stepId: number;
};